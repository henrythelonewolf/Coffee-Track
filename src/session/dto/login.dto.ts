export interface LoginResponseDto {
  user: {
    email: string,
    role: string,
  },
  accessToken: string,
  expiresIn: number
}

export interface LoginRequestDto {
  user: {
    email: string,
    password: string
  }
}