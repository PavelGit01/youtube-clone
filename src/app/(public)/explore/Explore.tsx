'use client'

import { useQuery } from '@tanstack/react-query'
import { Compass } from 'lucide-react'

import { Heading } from '@/ui/Heading'
import { SkeletonLoader } from '@/ui/SkeletonLoader'
import { VideoItem } from '@/ui/video-item/VideoItem'

import { videoService } from '@/services/video.service'

export const Explore = () => {
	const { data, isLoading } = useQuery({
		queryKey: ['explore'],
		queryFn: () => videoService.getExploreVideos(),
		select: data => data.data.videos
	})

	return (
		<section>
			<Heading Icon={Compass}>Explore</Heading>
			<div className='grid-5-cols'>
				{isLoading ? (
					<SkeletonLoader
						count={5}
						className='h-36 rounded-md'
					/>
				) : data?.length ? (
					data.map(video => (
						<VideoItem
							key={video.id}
							video={video}
						/>
					))
				) : (
					<div>Explore are temporarily unavailable</div>
				)}
			</div>
		</section>
	)
}
