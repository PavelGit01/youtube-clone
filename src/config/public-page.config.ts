class PublicPage {
	AUTH = '/auth'

	HOME = '/'
	TRENDING = '/trending'
	VIDEO_GAMES = '/video-games'
	SUBSCRIPTIONS = '/my/subscriptions'

	MY_CHANNEL = '/my-channel'
	PLAYLISTS = '/playlists'
	HISTORY = '/my/history'
	LIKED_VIDEOS = '/my/liked-videos'

	FEEDBACK = '/feedback'

	PLAYLIST(path?: string) {
		return `/my/playlists${path ? `/${path}` : ''}`
	}

	VIDEO(path: string) {
		return `/v/${path}`
	}

	CHANNEL(path: string) {
		return `/c/${path}`
	}

	SEARCH(searchTerm: string) {
		return `/s?term=${searchTerm}`
	}
}

export const PAGE = new PublicPage()
