export interface JwtDto {
  userId: string;
  /* Issued at */
  iat: number;
  exp: number;
}

export interface IPayloadUserJwt {
  userId: number;
  email?: string;
}

export interface Token {
  accessToken: string;
  refreshToken: string;
}
