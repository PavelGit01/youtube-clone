import type { Metadata, Viewport } from 'next'
import { Noto_Sans } from 'next/font/google'

import { Providers } from '@/providers/Providers'

import { COLORS } from '@/constants/colors.constants'
import { SITE_NAME, SITE_URL } from '@/constants/constants'

import './globals.scss'

const notoSans = Noto_Sans({ subsets: ['latin'] })

export const fetchCache = 'default-cache'

export const metadata: Metadata = {
	icons: {
		icon: '/images/logo.svg',
		shortcut: '/images/logo.svg',
		apple: '/images/256.png',
		other: {
			rel: 'touch-icons',
			url: '/images/256.png',
			sizes: '256x256',
			type: 'image/png'
		}
	},
	title: {
		absolute: 'MEL Video',
		template: `%s | MEL Video`
	},
	description: 'Best app for vidio watching',
	openGraph: {
		type: 'website',
		siteName: 'localhost',
		emails: ['mengocainfo2@gmail.com'],
		images: [
			{
				url: '/images/og.jpg',
				width: 909,
				height: 500,
				alt: `${SITE_NAME}`
			}
		]
	},
	metadataBase: new URL(SITE_URL),
	applicationName: `${SITE_NAME}`,
	authors: {
		name: 'Pavel Popov',
		url: 'localhost'
	},
	manifest: '/manifest.json',
	publisher: 'Pavel Popov',
	formatDetection: {
		telephone: false
	}
}

export const viewport: Viewport = {
	themeColor: COLORS.bg
}

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<body className={notoSans.className}>
				<Providers>{children}</Providers>
			</body>
		</html>
	)
}
