const PROXY_CONFIG = [
    {
        context: [
            "/api",
            "/DownloadTemp"
        ],
        target: "http://localhost:51989",
        secure: false
    }
]

module.exports = PROXY_CONFIG;