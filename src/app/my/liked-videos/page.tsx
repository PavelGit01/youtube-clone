import type { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

import SubscriptionsPage from './LikedVideosPage'
import LikePage from './LikedVideosPage'

export const metadata: Metadata = {
	title: 'Liked videos',
	...NO_INDEX_PAGE
}

export default function LikedVideosPage() {
	return <LikePage />
}
