/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['openweathermap.org'],
    },
    // Remove output standalone for Netlify
    trailingSlash: true,
    eslint: {
        ignoreDuringBuilds: true,
    },
    typescript: {
        ignoreBuildErrors: true,
    }
}

module.exports = nextConfig 