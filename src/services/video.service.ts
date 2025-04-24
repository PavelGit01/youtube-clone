import { axiosClassic } from '@/api/axios'

import type { ISingleVideoResponce, IVideo, IVideosPaggination } from '@/types/video.types'

class VideoService {
	private _VIDEOS = '/videos'

	getALl(searchTerm?: string | null) {
		return axiosClassic.get<IVideosPaggination>(
			this._VIDEOS,
			searchTerm
				? {
						params: {
							searchTerm
						}
					}
				: {}
		)
	}

	byPublicId(publicId?: string | null) {
		return axiosClassic.get<ISingleVideoResponce>(`${this._VIDEOS}/by-publicId/${publicId}`)
	}

	getTrendingVideos() {
		return axiosClassic.get<IVideo[]>(`${this._VIDEOS}/trending`)
	}

	getExploreVideos() {
		return axiosClassic.get<IVideosPaggination>(`${this._VIDEOS}/explore`)
	}

	getVideoGames() {
		return axiosClassic.get<IVideosPaggination>(`${this._VIDEOS}/games`)
	}
}

export const videoService = new VideoService()
