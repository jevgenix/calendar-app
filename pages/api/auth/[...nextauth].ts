import type { User, NextAuthOptions } from 'next-auth'
import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import type { NextApiHandler } from 'next'

type GenericObject<T = unknown> = T & {
    [key: string]: any
}

interface AuthToken {
    user: User
    accessToken: string
    accessTokenExpires?: number
    expires_at?: number
    refreshToken: string
    error?: string
}

interface JwtInterface {
    token: AuthToken
    user: User
    account: GenericObject
}

const refreshAccessToken = async (payload: AuthToken, clientId: string, clientSecret: string,
): Promise<AuthToken> => {
    try {
        const url = new URL('https://accounts.google.com/o/oauth2/token')
        url.searchParams.set('client_id', clientId)
        url.searchParams.set('client_secret', clientSecret)
        url.searchParams.set('grant_type', 'refresh_token')
        url.searchParams.set('refresh_token', payload.refreshToken)

        const response = await fetch(url.toString(), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            method: 'POST',
        })

        const refreshToken = await response.json()

        if (!response.ok) {
            throw refreshToken
        }


        const now = new Date()
        const accessTokenExpires = now.setSeconds(
            now.getSeconds() + parseInt(refreshToken.expires_in) - 10,
        )

        return {
            ...payload,
            accessToken: refreshToken.access_token,
            accessTokenExpires,
            refreshToken: payload.refreshToken,
        }
    } catch (error) {
        console.error('ERR', error)

        return {
            ...payload,
            error: 'RefreshAccessTokenError',
        }
    }
}

const AuthHandler: NextApiHandler = (req, res) => {
    const scopes = [
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/calendar.readonly',
        'https://www.googleapis.com/auth/calendar.events',
        'https://www.googleapis.com/auth/calendar'
    ]
    const JWT_SECRET = process.env.JWT_SECRET

    const options: NextAuthOptions = {
        providers: [
            GoogleProvider({
                clientId: String(process.env.GOOGLE_CLIENT_ID),
                clientSecret: String(process.env.GOOGLE_CLIENT_SECRET),
                authorization: {
                    url: 'https://accounts.google.com/o/oauth2/v2/auth',
                    params: {
                        response_type: 'code',
                        login_hint: '@newtelco.de',
                        // prompt: 'consent',
                        include_granted_scopes: 'true',
                        access_type: 'offline',
                        scope: scopes.join(' '),
                    },
                },
            }),
        ],
        jwt: {
            secret: JWT_SECRET,
        },
        debug: process.env.NODE_ENV === 'development',
        callbacks: {
            // @ts-ignore
            async jwt({ token, user, account }: JwtInterface): Promise<AuthToken> {
                let res: AuthToken

                const now = Date.now()

                if (account && user) {
                    const accessToken = account.access_token
                    const refreshToken = account.refresh_token

                    res = {
                        accessToken,
                        accessTokenExpires: account.expires_at,
                        refreshToken,
                        user,
                    }
                    // @ts-ignore
                } else if (token.expires_at === null || now < token.expires_at) {
                    res = token
                } else {
                    res = await refreshAccessToken(
                        token,
                        String(process.env.GOOGLE_CLIENT_ID),
                        String(process.env.GOOGLE_CLIENT_SECRET),
                    )
                }

                return res
            },
            // @ts-ignore
            async session({
                token,
            }: {
                token: GenericObject
            }): Promise<GenericObject> {
                return Promise.resolve(token)
            },
        },
    }

    return NextAuth(req, res, options)
}
export default AuthHandler