'use client'

import dynamic from 'next/dynamic'

const DynamicSearchPage = dynamic(() => import('./SearchPage'), { ssr: false })

export function SPage() {
	return <DynamicSearchPage />
}
