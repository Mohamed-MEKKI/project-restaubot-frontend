"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 text-center bg-gradient-to-br from-blue-50 to-white">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
          Scale your SaaS faster with <span className="text-blue-600">YourApp</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-xl mb-6">
          Powerful tools to help you build, grow, and retain users. No code, no hassle.
        </p>
        <div className="space-x-4">
          <Link href="/sign-in" className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700">
            Get Started
          </Link>
          <Link href="#" className="px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-100">
              
            Learn More
          </Link>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-12">
            <Feature title="Easy Setup" desc="Launch in minutes with no coding." />
            <Feature title="Customizable" desc="Fully modular and responsive design." />
            <Feature title="Scalable" desc="Built for growth with enterprise-ready tools." />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-blue-600 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to grow your SaaS?</h2>
        <p className="mb-6 text-lg">Start for free. No credit card required.</p>
        <button className="px-8 py-4 bg-white text-blue-600 rounded-xl font-medium hover:bg-gray-100">
          Sign Up Now
        </button>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} YourApp. All rights reserved.
      </footer>
    </div>
  );
}

function Feature({ title, desc }: { title: string; desc: string }) {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{desc}</p>
    </div>
  );
}
