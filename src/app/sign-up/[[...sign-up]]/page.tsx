import { SignUp, ClerkProvider } from '@clerk/nextjs'

export default function SignUpPage() {
  return (
    <>
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-100 via-red-50 to-orange-100 relative overflow-hidden">
    {/* Decorative circles */}
    <div className="absolute -top-10 -left-10 w-40 h-40 bg-red-400 rounded-full opacity-20"></div>
    <div className="absolute top-20 right-10 w-32 h-32 bg-yellow-400 rounded-full opacity-20"></div>
    <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 w-48 h-48 bg-orange-300 rounded-full opacity-20"></div>

    {/* Card container */}
    <div className="relative z-10 w-full max-w-md">
      {/* SignUp component */}
      <div className="shadow-lg rounded-2xl p-8 bg-white border border-gray-200 mb-8">
        <SignUp
          forceRedirectUrl='/dashboard'
          appearance={{
            elements: {
              formButtonPrimary:
                "bg-green-600 hover:bg-green-700 text-white text-base py-3 px-6 rounded-xl transition",
              card:
                "shadow-none bg-transparent border-none", // prevent double-card effect
              headerTitle: "text-3xl font-extrabold text-green-800 mb-2",
              headerSubtitle: "text-gray-600 mb-4",
              socialButtonsBlockButton:
                "border border-green-300 hover:bg-green-100 text-green-700",
            },
          }}
        />
      </div>

      </div>
      </div>
    </>

  );
}
/*<!--<SignUp
        appearance={{
          elements: {
            formButtonPrimary: "bg-green-600 hover:bg-green-700 text-white text-base py-3 px-6 rounded-xl",
            card: "shadow-lg rounded-xl p-8 bg-white border border-gray-200",
            headerTitle: "text-3xl font-extrabold text-green-800 mb-2",
            headerSubtitle: "text-gray-600 mb-4",
            socialButtonsBlockButton: "border border-green-300 hover:bg-green-100 text-green-700",
          },
        }}
      />-->*/