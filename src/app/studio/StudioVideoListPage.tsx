'use client'

import { Compass, Video } from 'lucide-react'
import dynamic from 'next/dynamic'

import { Heading } from '@/ui/Heading'
import { SkeletonLoader } from '@/ui/SkeletonLoader'

const DynamicStudioVideoList = dynamic(() => import('./StudioVideoList').then(mod => mod.StudioVideoList), {
	ssr: false,
	loading: () => (
		<div>
			<SkeletonLoader
				count={3}
				className='h-32 rounded-md mb-8'
			/>
		</div>
	)
})

export function StudioVideoListPage() {
	return (
		<section className='pb-5'>
			<Heading isPageHeading Icon={Video}>Studio</Heading>
			<DynamicStudioVideoList />
		</section>
	)
}
