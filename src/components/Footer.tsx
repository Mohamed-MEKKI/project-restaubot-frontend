import { Facebook, Twitter, Instagram, Github } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative bg-secondary pt-12 pb-8 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap text-left lg:text-left">
          {/* Contact & Social Section */}
          <div className="w-full lg:w-6/12 px-4 mb-8 lg:mb-0">
            <h4 className="text-3xl text-gray-800 mb-2">Let&apos;s keep in touch!</h4>
            <p className="text-lg mt-2 mb-4 text-gray-600">
              Find us on any of these platforms. We respond within 1–2 business days.
            </p>
            <div className="flex space-x-3">
              <button
                className="bg-white shadow-md h-10 w-10 rounded-full flex items-center justify-center hover:shadow-lg transition-shadow focus:outline-none text-sky-500"
                type="button"
              >
                <Twitter className="h-5 w-5" />
              </button>
              <button
                className="bg-white shadow-md h-10 w-10 rounded-full flex items-center justify-center hover:shadow-lg transition-shadow focus:outline-none text-blue-600"
                type="button"
              >
                <Facebook className="h-5 w-5" />
              </button>
              <button
                className="bg-white shadow-md h-10 w-10 rounded-full flex items-center justify-center hover:shadow-lg transition-shadow focus:outline-none text-pink-500"
                type="button"
              >
                <Instagram className="h-5 w-5" />
              </button>
              <button
                className="bg-white shadow-md h-10 w-10 rounded-full flex items-center justify-center hover:shadow-lg transition-shadow focus:outline-none text-gray-800"
                type="button"
              >
                <Github className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Links Section */}
          <div className="w-full lg:w-6/12 px-4">
            <div className="flex flex-wrap mb-6">
              {/* Useful Links */}
              <div className="w-full md:w-6/12 px-4">
                <h6 className="uppercase text-gray-500 text-sm mb-3">Useful Links</h6>
                <ul className="space-y-2">
                  <li>
                    <a href="/about" className="text-gray-600 hover:text-gray-800 text-sm transition-colors">
                      About Us
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-600 hover:text-gray-800 text-sm transition-colors">
                      Blog
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-600 hover:text-gray-800 text-sm transition-colors">
                      Github
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-600 hover:text-gray-800 text-sm transition-colors">
                      Free Products
                    </a>
                  </li>
                </ul>
              </div>
              {/* Other Resources */}
              <div className="w-full md:w-6/12 px-4 mt-6 md:mt-0">
                <h6 className="uppercase text-gray-500 text-sm mb-3">Other Resources</h6>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="text-gray-600 hover:text-gray-800 text-sm transition-colors">
                      MIT License
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-600 hover:text-gray-800 text-sm transition-colors">
                      Terms &amp; Conditions
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-600 hover:text-gray-800 text-sm transition-colors">
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a href="/contact" className="text-gray-600 hover:text-gray-800 text-sm transition-colors">
                      Contact Us
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <hr className="my-6 border-gray-300" />

        <div className="flex flex-wrap items-center justify-center md:justify-between text-center">
          <div className="w-full md:w-auto px-4 text-sm text-gray-500">
            © {new Date().getFullYear()}{' '}
            <a
              href="https://www.creative-tim.com/product/notus-js"
              className="text-gray-600 hover:text-gray-800 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Restobot
            </a>{' '}
            by{' '}
            <a
              href="https://www.creative-tim.com"
              className="text-gray-600 hover:text-gray-800 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              MEKKI
            </a>
            .
          </div>
        </div>
      </div>

      {/* Wavy bottom border */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none pointer-events-none">
        <svg
          className="relative block w-full h-16"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="#10b981"
            fillOpacity="0.3"
            d="M0,160L80,170.7C160,181,320,203,480,192C640,181,800,139,960,138.7C1120,139,1280,181,1360,202.7L1440,224L1440,320L0,320Z"
          ></path>
        </svg>
      </div>
    </footer>
  );
}