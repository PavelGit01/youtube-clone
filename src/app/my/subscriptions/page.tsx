import type { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

import SubscriptionsPage from './SubscriptionsPage'

export const metadata: Metadata = {
	title: 'Subscriptions',
	...NO_INDEX_PAGE
}

export default function SubsPage() {
	return <SubscriptionsPage />
}
