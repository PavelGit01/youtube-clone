'use client'

import { Heart } from 'lucide-react'

import { Heading } from '@/ui/Heading'
import { SkeletonLoader } from '@/ui/SkeletonLoader'
import { HorizontalVideoItem } from '@/ui/video-item/HorizontalVideoItem'
import { VideoItem } from '@/ui/video-item/VideoItem'

import { useProfile } from '@/hooks/useProfile'

export default function LikePage() {
	const { profile, isLoading } = useProfile()

	return (
		<section className='w-1/2'>
			<div className='flex gap-8 mb-10'>
				<Heading
					isPageHeading
					Icon={Heart}
					className='mb-0'
				>
					Liked videos
				</Heading>
				{!!profile?.likes.length && <span>{profile.likes.length} videos</span>}
			</div>
			<div>
				{isLoading && (
					<SkeletonLoader
						count={6}
						className='h-36 rounded-md'
					/>
				)}
				{!!profile?.likes?.length &&
					profile?.likes?.map(like => (
						<HorizontalVideoItem
							key={like.video.id}
							video={like.video}
						/>
					))}
				{!isLoading && !profile?.subscriptions?.length && <p>Liked video not found!</p>}
			</div>
		</section>
	)
}
