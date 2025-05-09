import type { Metadata } from 'next'
import Image from 'next/image'

import SubscribeButtonWrapper from '@/components/SubscribeButton/SubscribeButtonWrapper'

import { Heading } from '@/ui/Heading'
import { VerifiedBadge } from '@/ui/VerifiedBadge'

import { transformCount } from '@/utils/transform-count'

import { ChannelVideos } from './ChannelVideos'
import { channelService } from '@/services/channel.service'
import type { TPageSlugProp } from '@/types/page.types'

export const revalidate = 100

export async function generateMetadata({ params }: TPageSlugProp): Promise<Metadata> {
	const slug = (await params).slug
	const data = await channelService.bySlug(slug)

	const channel = data.data

	return {
		title: channel.user.name,
		description: channel.description,
		openGraph: {
			type: 'profile',
			images: [channel.bannerUrl]
		}
	}
}

export async function generateStaticParams() {
	const { data } = await channelService.getAll()

	return data.map(channel => ({
		slug: channel.slug
	}))
}

export default async function ChannelPage({ params }: TPageSlugProp) {
	const slug = (await params).slug

	const data = await channelService.bySlug(slug)

	const channel = data.data

	return (
		<section>
			<div>
				<div className='relative w-full h-[190px] rounded-2xl overflow-hidden shadow-md'>
					<Image
						alt={channel.user.name || ''}
						src={channel.bannerUrl}
						fill
						style={{ objectFit: 'cover' }}
						className='rounded-2xl'
						quality={100}
						priority
					/>
				</div>

				<div className='flex items-center gap-5 mb-10 mt-7 w-3/5'>
					<Image
						alt={channel.slug || ''}
						src={channel.avatarUrl}
						width={162}
						height={162}
						className='rounded-xl flex-shrink-0 shadow-md'
					/>
					<div>
						<Heading
							isPageHeading
							className='mb-2'
						>
							<span className='flex items-center gap-2'>
								{channel.user.name}
								{channel.isVerified && <VerifiedBadge size={18} />}{' '}
							</span>
						</Heading>
						<div className='mb-2 text-gray-400 text-[0.88rem] flex items-center gap-1'>
							<span>@{channel.slug}</span>
							<span className='text-xl'>·</span>
							<span>{transformCount(channel.subscribers.length)} subscribers</span>
							<span className='text-xl'>·</span>
							<span>{channel.videos.length} videos</span>
						</div>

						<article className='mb-2 text-gray-400 text-sm leading-snug'>
							{channel.description}
						</article>
						<SubscribeButtonWrapper slug={slug} />
					</div>
				</div>
			</div>
			{!!channel.videos.length && <ChannelVideos videos={channel.videos} />}
		</section>
	)
}
