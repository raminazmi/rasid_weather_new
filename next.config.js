/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['openweathermap.org', 'rasidweather.com'],
    },
    trailingSlash: false,
    experimental: {
        serverComponentsExternalPackages: [],
    },
}

module.exports = nextConfig 