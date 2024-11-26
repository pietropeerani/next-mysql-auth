"use server";

import bcrypt from 'bcrypt';

export async function saltAndHash(password: string) {
    let hashedPassword

    // Salt generator
    const salt = await bcrypt.genSalt(10);

    // If salt is generated hash password
    if(salt) {
        hashedPassword = bcrypt.hashSync(password, salt);
    }

    return {salt, hashedPassword}
}

export async function comparePasswords(db_passowrd: string, passowrd: string) {
    const result = bcrypt.compareSync(passowrd, db_passowrd);

    if(result){
        return true
    }
    return false
} 