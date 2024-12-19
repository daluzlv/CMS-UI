export interface Token {
  accessToken: string;
}

export interface DecodedToken  {
  sub: string,
  iss: string,
  email: string,
}
