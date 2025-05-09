import { axiosClassic } from '@/api/axios'

import type { IPaginationParams } from '@/types/pagination.types'
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

	async getExploreVideos(userId?: string, params?: IPaginationParams, excludeIds?: string[]) {
		const excludeIdsString = excludeIds?.join(',') || ''
		const { data } = await axiosClassic.get<IVideosPaggination>(`${this._VIDEOS}/explore`, {
			params: userId
				? {
						userId,
						...params,
						excludeIds: excludeIdsString
					}
				: params
		})

		return data
	}

	getVideoGames() {
		return axiosClassic.get<IVideosPaggination>(`${this._VIDEOS}/games`)
	}

	updateViews(publicId: string) {
		return axiosClassic.put(`${this._VIDEOS}/update-views-count/${publicId}`)
	}
}

export const videoService = new VideoService()
