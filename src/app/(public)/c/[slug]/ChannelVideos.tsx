import { Flame, Video } from 'lucide-react'
import React from 'react'

import { Heading } from '@/ui/Heading'
import { VideoItem } from '@/ui/video-item/VideoItem'

import type { IChannel } from '@/types/channel.types'

export const ChannelVideos = ({ videos }: { videos: IChannel['videos'] }) => {
	return (
		<section className='mb-10'>
			<Heading Icon={Video}>Videos</Heading>
			<div className='grid-5-cols'>
				{videos.map(video => (
					<VideoItem
						key={video.id}
						video={video}
						Icon={Flame}
					/>
				))}
			</div>
		</section>
	)
}
