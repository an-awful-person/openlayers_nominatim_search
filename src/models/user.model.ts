
/**
 * place holder till real user information is available.
 */
export type UserModel = {
    id:string,
    name:string,
    icon:string
}

export type AuthApiResponse = {
    refresh:string,
    access:string
}

export type JwtToken = {
    token:AuthApiResponse | undefined,
}

export type AuthJWTPayloads = {
    refresh: AuthJWTPayload,
    access: AuthJWTPayload
}

export type AuthJWTPayload = {
    token_type: string,
    exp: number,
    iat: number,
    jti: string,
    user_id: number
}

export const COMMON_LOGIN_ROUTE = '/login'