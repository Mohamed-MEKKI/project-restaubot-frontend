/** @type {import('next').NextConfig} */


const configs = {
  images: {
    remotePatterns: [new URL('https://tailwindcss.com/plus-assets/img/component-images/bento-03-mobile.png'),
                    new URL('https://tailwindcss.com/plus-assets/img/component-images/bento-03-performance.png'),
                    new URL('https://tailwindcss.com/plus-assets/img/component-images/dark-bento-03-performance.png'),
                    new URL('https://tailwindcss.com/plus-assets/img/component-images/bento-03-security.png'),
                    new URL('https://tailwindcss.com/plus-assets/img/component-images/dark-bento-03-security.png'),
                    new URL('https://tableo.com/wp-content/uploads/Restaurant-system-AI.webp'),
                    new URL('http://localhost:8000/**'),]
  },
}

export default configs