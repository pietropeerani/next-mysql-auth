import mysql from 'mysql2/promise'
import { GetDBSettings, IDBSettings } from './db';

const connectionParams: IDBSettings = GetDBSettings();

export const executeQuery = async (query: any, data: any) => {
    try {
        const db = await mysql.createConnection(connectionParams)
        const [rows, fields] = await db.execute(query, data)
        db.end()
        return rows
    } catch (error) {
        return null
    }
}