export interface AuthLoginRequest {
  username: string
  password: string
  expiresInMins?: number
}

export interface AuthLoginResponse {
  id: number
  username: string
  email: string
  firstName: string
  lastName: string
  gender: string
  image: string
  accessToken: string
  refreshToken: string
}

export interface AuthUser {
  id: number
  username: string
  email: string
  firstName: string
  lastName: string
  gender: string
  image: string
  role?: string
}

export interface RefreshSessionRequest {
  refreshToken?: string
  expiresInMins?: number
}

export interface RefreshSessionResponse {
  accessToken: string
  refreshToken: string
}

interface ApiErrorPayload {
  message?: string
}

const parseError = async (response: Response): Promise<string> => {
  try {
    const data = (await response.json()) as ApiErrorPayload
    if (data.message) {
      return data.message
    }
  } catch {
    // Fall back to generic HTTP message when response is not JSON.
  }

  return `HTTP Error: ${response.status}`
}

export const authApi = {
  login: async (payload: AuthLoginRequest): Promise<AuthLoginResponse> => {
    const response = await fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      throw new Error(await parseError(response))
    }

    return (await response.json()) as AuthLoginResponse
  },

  getCurrentAuthUser: async (accessToken: string): Promise<AuthUser> => {
    const response = await fetch("https://dummyjson.com/auth/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    if (!response.ok) {
      throw new Error(await parseError(response))
    }

    return (await response.json()) as AuthUser
  },

  refreshSession: async (
    payload: RefreshSessionRequest
  ): Promise<RefreshSessionResponse> => {
    const response = await fetch("https://dummyjson.com/auth/refresh", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      throw new Error(await parseError(response))
    }

    return (await response.json()) as RefreshSessionResponse
  },
}