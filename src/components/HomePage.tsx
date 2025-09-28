'use client'
import Link from "next/link"
import BentoGrids from "./BentoGrids"
import { useEffect, useState } from "react";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function HomePage (){
    const {isSignedIn, isLoaded} = useUser()
    const [isLoading, setLoading] = useState(false)

    const router = useRouter()

    
    useEffect(()=>{
        if(isSignedIn && isLoaded){
            router.replace("/dashboard")
        }
        },[router, isLoaded, isSignedIn]
    )

    return(
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-100">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 text-center bg-gradient-to-br from-blue-50 to-orange-100">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
          Manage you customers orders faster with 
          <Image src="/restaubot_logo.png" alt="Restobot Logo" className="inline-block h-12 w-auto ml-2" width={120} height={32} />
        </h1>
        <p className="text-lg md:text-xl text-orange-600 max-w-xl mb-6 font-sans">
          Powerful AI tool to help you build, grow, and retain users. No complications, no hassle.
        </p>
        <div className="space-x-4">
          <Link href="/sign-up" className="px-6 py-3 bg-orange-600 text-white rounded-xl hover:bg-blue-700">
            Get Started
          </Link>
          <Link href="/about" className="px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-100">
              
            Learn More
          </Link>
         
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-6 bg-green-100">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-12">
            <Feature title="Easy Setup" desc="Launch in minutes with no coding." />
            <Feature title="Customizable" desc="Fully modular and responsive design." />
            <Feature title="Scalable" desc="Built for growth with enterprise-ready tools." />
          </div>
          </div>
      </section>
          <BentoGrids />

          
        

      {/* CTA */}
      <section className="py-20 px-6 bg-green-600 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to grow your Buisness?</h2>
        <p className="mb-6 text-lg">Start for free. No credit card required.</p>
        <Link href="/sign-up" className="inline-block">
          <button className="px-8 py-4 bg-white text-blue-600 rounded-xl font-medium hover:bg-gray-100">
            <span className="text-blue-600">Sign Up Now</span>
          </button>
        </Link>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Restobot. All rights reserved.
      </footer>
    </div>
    )
}
function Feature({ title, desc }: { title: string; desc: string }) {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{desc}</p>
    </div>
  );
}