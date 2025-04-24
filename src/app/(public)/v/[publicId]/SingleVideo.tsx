'use client'

import cn from 'clsx'
import { useState } from 'react'

import { Heading } from '@/ui/Heading'
import { VideoPlayer } from '@/ui/video-player/VideoPlayer'

import { SimilarVideos } from './SimilarVideos'
import { VideoActions } from './Video-actions/VideoActions'
import { Comments } from './comments/Comments'
import { VideoDescription } from './description/VideoDescription'
import { VideoChannel } from './video-channel/VideoChannel'
import type { ISingleVideoResponce } from '@/types/video.types'

interface Props {
	video: ISingleVideoResponce
}

export default function SingleVideo({ video }: Props) {
	const [isTheaterMode, setIsTheaterMode] = useState(false)

	return (
		<section className={'grid grid-cols-[3fr_.8fr] gap-10 relative'}>
			<div>
				<div className={cn(isTheaterMode ? 'absolute top-0 left-0 w-full' : 'relative')}>
					<VideoPlayer
						fileName={video.videoFileName}
						toggleTheaterMode={() => setIsTheaterMode(!isTheaterMode)}
						maxResolution={video.maxResolution}
					/>
				</div>

				<div
					className={cn('flex justify-between items-start pb-6 border-b border-border mb-6', {
						'pt-[42.5rem]': isTheaterMode
					})}
				>
					<div>
						<Heading
							className='mb-1'
							isH1
							clasNameHeading='text-xl'
						>
							{video.title}
						</Heading>
						<div className='text-gray-400'>{video.viewsCount.toLocaleString('ru-RU')} views</div>
					</div>
					<VideoActions video={video} />
				</div>
				<VideoChannel video={video} />
				<VideoDescription description={video.description} />
				<Comments video={video} />
			</div>
			{!!video.similarVideos.length && (
				<div
					className={cn({
						'pt-[42.5rem]': isTheaterMode
					})}
				>
					<SimilarVideos videos={video.similarVideos} />
				</div>
			)}
		</section>
	)
}
