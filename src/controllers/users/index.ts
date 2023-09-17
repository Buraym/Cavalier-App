import SQLite from 'tauri-plugin-sqlite-api';

const ROLE_DICT = {
    "ADMIN": "admin",
    "USER": "user",
}

// USERS
// LIST USERS
export async function list_users() {
    const db = await SQLite.open('./test.db');
    const results = await db.select<Array<any>>(`
        SELECT * FROM usuario;
    `);
    return results;
}

// RETURN USERS
export async function return_user(id: string) {
    const db = await SQLite.open('./test.db');
    const result = await db.select<Array<any>>(`
        SELECT * FROM usuario WHERE id=?1;
    `, [id]);
    
    return result[0];
}

// AUTHENTICATE  USER
export async function auth_user(email: string, password: string) {
    const db = await SQLite.open('./test.db');
    const result = await db.select<Array<any>>(`
        SELECT * FROM usuario WHERE email = ?1 AND password = ?2;
    `, [email, password]);
    
    return result[0];
}

// CREATE USER
export async function create_user(user: any) {
    const db = await SQLite.open('./test.db');
    await db.execute(`
        INSERT INTO usuario (active, name, email, password, document, contact, role)
        VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7);
    `, [true, user.name, user.email, user.password, user.document, user.contact, user.role]);
    
}

// EDIT USER
export async function edit_user(id: string, user: any) {
    const db = await SQLite.open('./test.db');
    await db.execute(`
        UPDATE usuario
        SET name = ?1, active = ?2, updated_at = ?3,
        document = ?4, contact = ?5, role = ?6,
        email = ?7, password = ?7,
        WHERE id = ?9;
    `, [user.name, user.active, new Date(), user.document, user.contact, user.role, user.email, user.password, id]);
    
}

// DELETE USER
export async function delete_user(id: string) {
    const db = await SQLite.open('./test.db');
    await db.execute(`
        DELETE FROM usuario
        WHERE id = ?1;
    `, [id]);
    
}