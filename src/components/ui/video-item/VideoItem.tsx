import * as m from 'framer-motion/m'
import { type LucideIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { PAGE } from '@/config/public-page.config'

import { transformCount } from '@/utils/transform-count'
import { transformDate } from '@/utils/transform-date'

import { VideoChannelName } from './VideoChannelName'
import { VideoItemTitle } from './VideoItemTitle'
import type { IVideo } from '@/types/video.types'

interface Props {
	video: IVideo
	Icon?: LucideIcon
	isPriority?: boolean
}

export function VideoItem({ video, Icon, isPriority }: Props) {
	return (
		<m.div
			whileHover={{
				scale: 1.03,
				y: -5
			}}
			transition={{
				type: 'spring',
				stiffness: 500,
				damping: 30
			}}
		>
			<div className='relative mb-1.5'>
				<Link href={PAGE.VIDEO(video.publicId)}>
					<Image
						src={video.thumbnailUrl}
						width={250}
						height={140}
						alt={video.title}
						className='rounded-md max-h-[119px]'
						priority={isPriority}
					/>
				</Link>
				<Link
					href={PAGE.CHANNEL(video?.channel?.slug || '')}
					className='absolute left-1.5 bottom-2'
				>
					<m.div
						whileHover={{
							scale: 1.1,
							y: -5
						}}
						transition={{
							type: 'spring',
							stiffness: 500,
							damping: 30
						}}
						className='w-[35px] h-[35px] rounded-full overflow-hidden'
					>
						<Image
							src={video?.channel?.avatarUrl || ''}
							width={35}
							height={35}
							alt={video?.channel?.user?.name || ''}
							className='rounded-full shadow object-cover'
							priority={isPriority}
						/>
					</m.div>
				</Link>
			</div>
			<div className='mb-1.5 flex items-center justify-between'>
				<div className='flex items-center gap-0.5'>
					{Icon && (
						<Icon
							className='text-red-600'
							size={20}
						/>
					)}
					<span className='text-gray-400 text-sm'>{transformCount(video.viewsCount)} views</span>
				</div>
				<div>
					<span className='text-gray-400 text-xs'>{transformDate(video.createdAt)}</span>
				</div>
			</div>
			<div className='mb-1'>
				<VideoItemTitle video={video} />
			</div>
			<div>
				<VideoChannelName channel={video.channel} />
			</div>
		</m.div>
	)
}
