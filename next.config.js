/** @type {import('next').NextConfig} */
module.exports = {
  async redirects() {
    return [
      {
        source: '/visas/usa',
        destination: '/visas/united-states',
        permanent: true,
      },
      {
        // handle any nested paths under the old /visas/usa route
        source: '/visas/usa/:path*',
        destination: '/visas/united-states/:path*',
        permanent: true,
      },
    ]
  }
}
