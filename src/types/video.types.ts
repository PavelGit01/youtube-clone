import type { EnumVideoPlayerQuality } from '@/ui/video-player/video-player.types'
import type { IChannel } from './channel.types'
import type { IPaggination } from './pagination.types'
import type { IComment } from './comment.types'

export interface IVideo {
	id: string
	title: string
	publicId: string
	description: string
	thumbnailUrl: string
	videoFileName: string
	maxResolution: EnumVideoPlayerQuality
	viewsCount: number
	isPublic: boolean
	channel: IChannel
	createdAt: string
}

export interface IFullVideo extends IVideo {
	likes: []
	comments: IComment[]
}

export interface ISingleVideoResponce extends IFullVideo {
	similarVideos: IVideo[]
}

export interface IVideosPaggination extends IPaggination {
	videos: IVideo[]
}
