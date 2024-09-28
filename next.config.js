/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
        config.module.rules.push(
            {
                test: /\.md$/i,
                use: [{
                    loader: 'raw-loader',
                    options: {
                        esModule: false
                    }
                }],
            }
        )
        return config
    },
}

module.exports = nextConfig
