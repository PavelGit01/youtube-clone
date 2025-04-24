import type { video } from 'framer-motion/m'
import Image from 'next/image'
import Link from 'next/link'

import SubscribeButtonWrapper from '@/components/SubscribeButton/SubscribeButtonWrapper'

import { Heading } from '@/ui/Heading'
import { VerifiedBadge } from '@/ui/VerifiedBadge'

import { PAGE } from '@/config/public-page.config'

import { transformCount } from '@/utils/transform-count'

import type { ISingleVideoResponce } from '@/types/video.types'

export const VideoChannel = ({ video }: { video: ISingleVideoResponce }) => {
	return (
		<div className='flex items-center justify-between  mb-6'>
			<div className='flex gap-4 items-center'>
				<Link href={PAGE.CHANNEL(video.channel.slug)}>
					<Image
						alt={video.channel.user.name || ''}
						src={video.channel.avatarUrl}
						width={55}
						height={55}
						className='rounded-xl flex-shrink-0 shadow'
						priority
					/>
				</Link>
				<div>
					<Link href={PAGE.CHANNEL(video.channel.slug)}>
						<Heading
							className='mb-0'
							clasNameHeading='text-lg'
						>
							<span className='flex items-center gap-2'>
								{video.channel.user.name}
								{video.channel.isVerified && <VerifiedBadge size={14} />}
							</span>
						</Heading>
					</Link>

					<div className=' text-gray-400 text-sm flex items-center gap-1'>
						{transformCount(video.channel.subscribers.length)} subscribers
					</div>
				</div>
			</div>
			<SubscribeButtonWrapper slug={video.channel.slug} />
		</div>
	)
}
