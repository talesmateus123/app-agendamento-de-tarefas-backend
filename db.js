import sqlite3 from 'sqlite3'
import { open } from 'sqlite'


export async function Connection() {
    return open({
        file: './tasks.db',
        driver: sqlite3.Database
    })
}