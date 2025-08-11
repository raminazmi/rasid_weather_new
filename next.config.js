/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['openweathermap.org', 'rasidweather.com'],
    },
    trailingSlash: false,
    experimental: {
        serverComponentsExternalPackages: [],
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    eslint: {
        ignoreDuringBuilds: true,
    }
}

module.exports = nextConfig 