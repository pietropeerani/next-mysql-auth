"use server";

import { SignJWT, jwtVerify } from 'jose'
import { SessionPayload } from '@/app/lib/definitions'
import { cookies } from 'next/headers'

const secretKey = process.env.SESSION_SECRET

if(secretKey === undefined) {
    throw Error("Session key undefined")
}

const encodedKey = new TextEncoder().encode(secretKey)

/*
 * Crypto functions
 */
export async function encrypt(payload: SessionPayload) {
    return new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('7d')
        .sign(encodedKey)
}

export async function decrypt(session: string | undefined = '') {
    try {
        const { payload } = await jwtVerify(session, encodedKey, {
            algorithms: ['HS256'],
        })
        return payload
    } catch (error) {
        console.log('Failed to verify session')
    }
}


/*
 * Creating session
 */
export async function createSession(userId: string) {
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    const session = await encrypt({ userId, expiresAt })

    cookies().set('session', session, {
        httpOnly: true,
        secure: true,
        expires: expiresAt,
        sameSite: 'lax',
        path: '/',
    })
}


/*
 * Updating session
 */
// export async function updateSession() {
//     const session = cookies().get('session')?.value
//     const payload = await decrypt(session)

//     if (!session || !payload) {
//         return null
//     }

//     const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
//     cookies().set('session', session, {
//         httpOnly: true,
//         secure: true,
//         expires: expires,
//         sameSite: 'lax',
//         path: '/',
//     })
// }


/*
 * Deleating session
 */
export async function deleteSession() {
    cookies().delete('session')
}