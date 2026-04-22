export interface User{

    id: number
    username: string
    password: string 
    role: 'ADMIN' | 'USER'
    imageProfile: string
    age: number
    jobe: string
    etatCompe: 'Bloque' | 'MARCHE'
}