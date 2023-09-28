import SQLite from 'tauri-plugin-sqlite-api';


// USERS
// LIST USERS
export async function list_users() {
    const db = await SQLite.open('./cavalier.db');
    const results = await db.select<Array<any>>(`
        SELECT * FROM usuario;
    `);
    return results;
}

// RETURN PAGINATED USERS LIST
export async function list_users_paginated(page: Number, perPage: Number) {
    const db = await SQLite.open('./cavalier.db');
    let results = await db.select<Array<any>>(`
        SELECT *
        FROM usuario
        ORDER BY created_at DESC
        LIMIT ${perPage}
        OFFSET (${page} - 1) * ${perPage};
    `);
    let totalPages = await db.select<Array<{ total_rows: Number }>>(`SELECT COUNT(*) AS total_rows FROM usuario;`);
    
    return {
        results,
        totalItems: Number(totalPages[0].total_rows),
        totalPages: Math.ceil(Number(totalPages[0].total_rows) / Number(perPage))
    };
}

// RETURN USERS
export async function return_user(id: string) {
    const db = await SQLite.open('./cavalier.db');
    const result = await db.select<Array<any>>(`
        SELECT * FROM usuario WHERE id=?1;
    `, [id]);
    
    return result[0];
}

// AUTHENTICATE  USER
export async function auth_user(email: string, password: string, remember: boolean) {
    const db = await SQLite.open('./cavalier.db');
    const result = await db.select<Array<any>>(`
        SELECT * FROM usuario WHERE email LIKE ?1 AND password LIKE ?2;
    `, [email, password]);
    if (result[0]) {
        if(remember) {
            await db.execute(`
                UPDATE usuario SET logged = 1 WHERE id = ?1;
            `, [result[0].id]); 
        }
        return result[0];
    } else {
        return null;
    }
}

// CHECK IF THERE IS ANY ADMIN USER
export async function check_admin_created() {
    const db = await SQLite.open('./cavalier.db');
    const result = await db.select<Array<{ admin_count: Number }>>(`
        SELECT COUNT(*) AS admin_count
        FROM usuario
        WHERE role = 'admin'
    `);
    return Boolean(result[0].admin_count);
}

// GET REMEMBERED LOGGED USER
export async function get_logged_user() {
    const db = await SQLite.open('./cavalier.db');
    const result = await db.select<Array<any>>(`
        SELECT * FROM usuario WHERE logged = 1 LIMIT 1;
    `);
    
    return result[0];
}

// LOG OUT USER FROM THE APP
export async function logout_user() {
    const db = await SQLite.open('./cavalier.db');
    await db.execute(`
            UPDATE usuario SET logged = 0;
        `);
}

// CREATE USER
export async function create_user(user: any) {
    const db = await SQLite.open('./cavalier.db');
    await db.execute(`
        INSERT INTO usuario (active, created_at, name, email, password, document, contact, role)
        VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8);
    `, [true, new Date(), user.name, user.email, user.password, user.document, user.contact, user.role]);

    const result = await db.select<Array<any>>(`
        SELECT * FROM usuario WHERE name=?1 AND email=?2 AND password = ?3;
    `, [user.name, user.email, user.password]);
    
    return result[0];
}

// EDIT USER
export async function edit_user(id: string, user: any) {
    const db = await SQLite.open('./cavalier.db');
    await db.execute(`
        UPDATE usuario
        SET name = ?1, active = ?2, updated_at = ?3,
        document = ?4, contact = ?5, role = ?6,
        email = ?7, password = ?7,
        WHERE id = ?9;
    `, [user.name, user.active, new Date(), user.document, user.contact, user.role, user.email, user.password, id]);
    
}

export async function switch_user_role(id: string, role: 'admin' | 'user') {
    const db = await SQLite.open('./cavalier.db');
    await db.execute(`
        UPDATE usuario
        SET role = ?1
        WHERE id = ?2;
    `, [role, id]);
    
}

// DELETE USER
export async function delete_user(id: string) {
    const db = await SQLite.open('./cavalier.db');
    await db.execute(`
        DELETE FROM usuario
        WHERE id = ?1;
    `, [id]);
    
}