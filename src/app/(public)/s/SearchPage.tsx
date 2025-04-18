'use client'

import { useQuery } from '@tanstack/react-query'
import { Search } from 'lucide-react'
import { useSearchParams } from 'next/navigation'

import { Heading } from '@/ui/Heading'
import { SkeletonLoader } from '@/ui/SkeletonLoader'
import { VideoItem } from '@/ui/video-item/VideoItem'

import { videoService } from '@/services/video.service'

export default function SearchPage() {
	const searchParams = useSearchParams()

	const { data, isLoading } = useQuery({
		queryKey: ['search', searchParams.get('term')],
		queryFn: () => videoService.getALl(searchParams.get('term')),
		select: data => data.data.videos
	})

	console.log(data)
	return (
		<section>
			<Heading
				isH1
				Icon={Search}
			>
				Search &quot;{searchParams.get('term')}&quot;
			</Heading>
			<div className='grid grid-cols-6 gap-7'>
				{isLoading && (
					<SkeletonLoader
						count={6}
						className='h-36 rounded-md'
					/>
				)}
				{data?.length ? (
					data.map(video => (
						<VideoItem
							key={video.id}
							video={video}
						/>
					))
				) : (
					<p>Videos not found</p>
				)}
			</div>
		</section>
	)
}
