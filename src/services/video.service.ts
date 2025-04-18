import { axiosClassic } from '@/api/axios'

import type { IExploreResponse } from '@/types/response.types'
import type { IVideo } from '@/types/video.types'

class VideoService {
	private _VIDEOS = '/videos'

	getALl(searchTerm?: string | null) {
		return axiosClassic.get<IExploreResponse>(
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

	getTrendingVideos() {
		return axiosClassic.get<IVideo[]>(`${this._VIDEOS}/trending`)
	}

	getExploreVideos() {
		return axiosClassic.get<IExploreResponse>(`${this._VIDEOS}/explore`)
	}

	getVideoGames() {
		return axiosClassic.get<IExploreResponse>(`${this._VIDEOS}/games`)
	}
}

export const videoService = new VideoService()
