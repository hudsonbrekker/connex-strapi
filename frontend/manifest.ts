import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Connex',
    short_name: 'Connex',
    description: 'Connecting Users, Elevating Experiences',
    start_url: '/',
    display: 'standalone',
    icons: [
      {
        src: '/app/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  }
}