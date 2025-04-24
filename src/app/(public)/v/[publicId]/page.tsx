import type { Metadata } from 'next'

import { Heading } from '@/ui/Heading'
import { VideoPlayer } from '@/ui/video-player/VideoPlayer'

import { stripHtml } from '@/utils/strip-html'

import { SimilarVideos } from './SimilarVideos'
import SingleVideo from './SingleVideo'
import { VideoActions } from './Video-actions/VideoActions'
import { VideoDescription } from './description/VideoDescription'
import { VideoChannel } from './video-channel/VideoChannel'
import { videoService } from '@/services/video.service'
import type { TPagePublicIdProp } from '@/types/page.types'

export const revalidate = 100
export const dynamic = 'force-static'

export async function generateMetadata({ params }: TPagePublicIdProp): Promise<Metadata> {
	const { publicId } = params
	const data = await videoService.byPublicId(publicId)

	const video = data.data

	return {
		title: video.title,
		description: stripHtml(video.description).slice(0, 150),
		openGraph: {
			type: 'video.other',
			images: [video.thumbnailUrl]
		}
	}
}

export async function generateStaticParams() {
	const data = await videoService.getALl()

	return data.data.videos.map(video => ({
		publicId: video.publicId
	}))
}

export default async function VideoPage({ params }: TPagePublicIdProp) {
	const { publicId } = params

	const data = await videoService.byPublicId(publicId)

	const video = data.data

	return <SingleVideo video={video} />
}
