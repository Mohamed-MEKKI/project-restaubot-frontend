export default function Footer() {
  return (
    <>
    <div className="relative bg-gray-200 pt-12 pb-8">
    <div className="container mx-auto px-4">
        <div className="flex flex-wrap text-left lg:text-left">
        {/* Contact & Social Section */}
        <div className="w-full lg:w-6/12 px-4 mb-8 lg:mb-0">
            <h4 className="text-3xl font-semibold text-gray-800">Let's keep in touch!</h4>
            <p className="text-lg mt-2 mb-4 text-gray-600">
            Find us on any of these platforms. We respond within 1–2 business days.
            </p>
            <div className="flex space-x-3">
            {[
                { icon: 'twitter', color: 'text-sky-500' },
                { icon: 'facebook-square', color: 'text-blue-600' },
                { icon: 'dribbble', color: 'text-pink-500' },
                { icon: 'github', color: 'text-gray-800' },
            ].map((btn, index) => (
                <button
                key={index}
                className={`bg-white shadow-md h-10 w-10 rounded-full flex items-center justify-center focus:outline-none ${btn.color}`}
                type="button"
                >
                <i className={`fab fa-${btn.icon}`} />
                </button>
            ))}
            </div>
        </div>

        {/* Links Section */}
        <div className="w-full lg:w-6/12 px-4">
            <div className="flex flex-wrap mb-6">
            {/* Useful Links */}
            <div className="w-full md:w-6/12 px-4">
                <h6 className="uppercase text-gray-500 text-sm font-semibold mb-3">Useful Links</h6>
                <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-gray-800 text-sm font-medium">About Us</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-800 text-sm font-medium">Blog</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-800 text-sm font-medium">Github</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-800 text-sm font-medium">Free Products</a></li>
                </ul>
            </div>
            {/* Other Resources */}
            <div className="w-full md:w-6/12 px-4 mt-6 md:mt-0">
                <h6 className="uppercase text-gray-500 text-sm font-semibold mb-3">Other Resources</h6>
                <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-gray-800 text-sm font-medium">MIT License</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-800 text-sm font-medium">Terms &amp; Conditions</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-800 text-sm font-medium">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-800 text-sm font-medium">Contact Us</a></li>
                </ul>
            </div>
            </div>
        </div>
        </div>

        <hr className="my-6 border-gray-300" />

        <div className="flex flex-wrap items-center justify-center md:justify-between text-center">
        <div className="w-full md:w-auto px-4 text-sm text-gray-500 font-medium">
            © {new Date().getFullYear()}{" "}
            <a
            href="https://www.creative-tim.com/product/notus-js"
            className="text-gray-600 hover:text-gray-800"
            target="_blank"
            rel="noopener noreferrer"
            >
            Notus JS
            </a>{" "}
            by{" "}
            <a
            href="https://www.creative-tim.com"
            className="text-gray-600 hover:text-gray-800"
            target="_blank"
            rel="noopener noreferrer"
            >
            Creative Tim
            </a>.
        </div>
        </div>
    </div>
    </div>

    </>
  )
}