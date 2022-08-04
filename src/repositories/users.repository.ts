import db from '../db';
import User from '../models/user.model';


class UserRepository{

    async findAllUsers(): Promise<User[]>{
        const sql =
        `SELECT uuid, username 
         FROM application_users`
         ;
        const result = await db.query<User>(sql);
        const rows = result.rows;
        return rows || [];
    };
}

export default new UserRepository();