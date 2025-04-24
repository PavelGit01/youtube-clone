'use client'

import dynamic from 'next/dynamic'

import { SkeletonLoader } from '@/ui/SkeletonLoader'

const SubscribeButton = dynamic(
	() => import('./SubscribeButton').then(mod => mod.SubscribeButton),
	{
		ssr: false,
		loading: () => {
			return <SkeletonLoader className='w-40 h-10 mb-0 rounded' />
		}
	}
)

export default function SubscribeButtonWrapper({ slug }: { slug: string }) {
	return <SubscribeButton slug={slug} />
}
