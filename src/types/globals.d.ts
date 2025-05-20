export {}

// Create a type for the roles
export type Roles = 'admin' | 'moderator'
export type Roles = 'user' | 'client'

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: Roles
    }
  }
}