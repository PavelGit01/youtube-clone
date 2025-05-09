'use client'

import { useQuery } from '@tanstack/react-query'
import { ListVideo } from 'lucide-react'
import { useParams } from 'next/navigation'

import { Heading } from '@/ui/Heading'
import { SkeletonLoader } from '@/ui/SkeletonLoader'
import { VideoItem } from '@/ui/video-item/VideoItem'

import { playlistsService } from '@/services/playlists.service'

export default function SinglePlaylistPage() {
	const { id } = useParams()

	const { data, isLoading, refetch } = useQuery({
		queryKey: ['playlist', id],
		queryFn: () => playlistsService.getPlaylistById(id as string),
		enabled: !!id
	})

	return (
		<section>
			<Heading
				isPageHeading
				Icon={ListVideo}
			>
				{data?.data.title}
			</Heading>
			<div className='grid grid-cols-5 gap-7'>
				{isLoading && (
					<SkeletonLoader
						count={5}
						className='h-36 rounded-md'
					/>
				)}
				{!!data?.data?.videos.length &&
					data?.data?.videos.map(video => (
						<VideoItem
							key={video.id}
							video={video}
						/>
					))}
				{!isLoading && !data?.data?.videos.length && <p>Videos in playlist not found!</p>}
			</div>
		</section>
	)
}
