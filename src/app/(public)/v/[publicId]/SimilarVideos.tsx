import React from 'react'

import { VideoItem } from '@/ui/video-item/VideoItem'

import type { ISingleVideoResponce } from '@/types/video.types'

export const SimilarVideos = ({ videos }: { videos: ISingleVideoResponce['similarVideos'] }) => {
	return (
		<div className='grid grid-1-cols gap-8'>
			{videos.map(video => (
				<VideoItem
					key={video.id}
					video={video}
				/>
			))}
		</div>
	)
}
