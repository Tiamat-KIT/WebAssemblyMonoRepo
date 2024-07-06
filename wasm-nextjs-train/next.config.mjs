/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
        config.module.rules.push({
            test: /\.wasm$/,
            type: "webassembly/async",
        })
        config.experiments = {
            asyncWebAssembly: true,
            layers: true
        }
        return config
    }
};

export default nextConfig;

// https://qiita.com/Statham/items/4a08e95362e682b15b0b