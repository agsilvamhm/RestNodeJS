import db from '../db';
import User from '../models/user.model';
import DatabaseError from '../models/error/database.error.model';

class UserRepository{

    async findAllUsers(): Promise<User[]>{
        const sql =
        `SELECT uuid, username 
         FROM application_users`
         ;
        const {rows} = await db.query<User>(sql);
        return rows || [];
    };

    async findById(uuid: string): Promise<User>{
     try {
        const sql = 
        `SELECT uuid, username
        FROM application_users
        WHERE uuid = $1`  
        ; 
        const values = [uuid];
        const {rows} = await db.query<User>(sql, values);
        const [user] = rows; 
        return user;   
     } catch (error) {
        throw new DatabaseError('Error na consulta por Id ', error);
     }

    };

    async create(user: User): Promise<string>{
        const sql = 
        `INSERT INTO application_users 
        (username, password) VALUES 
        ($1, crypt($2, 'my_salt')) 
        RETURNING uuid
        `;
        const values = [user.username, user.password];

        const { rows } = await db.query<{ uuid: string }>(sql, values)
        const [newUser] = rows;
        return newUser.uuid;
    }

    async update(user: User): Promise<void>{
        const sql = 
        `UPDATE application_users 
        SET username = $1,
            password = crypt($2, 'my_salt')
        WHERE uuid = $3    
        `;
        const values = [user.username, user.password, user.uuid];

        await db.query(sql, values)
     }

     async remove(uuid: string):Promise<void>{
        const sql = `
        DELETE 
        FROM application_users
        WHERE uuid = $1
        `;
        const values = [uuid];
        await db.query(sql, values);
     }
}

export default new UserRepository();