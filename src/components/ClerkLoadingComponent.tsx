import { ClerkLoaded, ClerkLoading } from '@clerk/nextjs'

declare global {
  interface Window {
    Clerk: any
  }
}

export default function ClerkLoadingComponent() {
  return (
    <>
      <ClerkLoading>
        <p>Clerk is loading...</p>
      </ClerkLoading>
      <ClerkLoaded>
        <p>Clerk has loaded</p>
      </ClerkLoaded>
    </>
  )
}