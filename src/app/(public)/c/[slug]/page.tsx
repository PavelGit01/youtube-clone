import { Flame, Video } from 'lucide-react'
import type { Metadata } from 'next'

import { Heading } from '@/ui/Heading'
import { VideoItem } from '@/ui/video-item/VideoItem'

import { channelService } from '@/services/channel.service'
import type { TPageSlugProp } from '@/types/page.types'

export const revalidate = 100
export const dynamic = 'force-static'

export const metadata: Metadata = {
	title: 'Explore',
	description: 'Best video platform',
	alternates: {
		canonical: '/'
	},
	openGraph: {
		type: 'website',
		url: '/',
		title: 'Explore'
	}
}

export default async function ChannelPage({ params }: TPageSlugProp) {
	const { slug } = await params

	const data = await channelService.bySlug(slug)

	const channel = data.data

	return (
		<section>
			{!!channel.videos.length && (
				<section className='mb-10'>
					<Heading Icon={Video}>Videos</Heading>
					<div className='grid-5-cols'>
						{channel.videos.map(video => (
							<VideoItem
								key={video.id}
								video={video}
								Icon={Flame}
							/>
						))}
					</div>
				</section>
			)}
		</section>
	)
}
