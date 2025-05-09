'use client'

import cn from 'clsx'
import dynamic from 'next/dynamic'
import { useState } from 'react'

import { Heading } from '@/ui/Heading'
import { VideoPlayer } from '@/ui/video-player/VideoPlayer'

import { SimilarVideos } from './SimilarVideos'
import { VideoActions } from './Video-actions/VideoActions'
import { useUpdateViews } from './useUpdateViews'
import { VideoChannel } from './video-channel/VideoChannel'
import type { ISingleVideoResponce } from '@/types/video.types'

const DynamicVideoDescription = dynamic(() =>
	import('./description/VideoDescription').then(mod => mod.VideoDescription)
)

const DynamicComments = dynamic(() => import('./comments/Comments').then(mod => mod.Comments))

interface Props {
	video: ISingleVideoResponce
}

export default function SingleVideo({ video }: Props) {
	const [isTheaterMode, setIsTheaterMode] = useState(false)

	useUpdateViews({ video })

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
				<DynamicVideoDescription description={video.description} />
				<DynamicComments video={video} />
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
