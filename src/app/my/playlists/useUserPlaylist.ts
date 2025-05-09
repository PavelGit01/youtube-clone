import { useQuery } from '@tanstack/react-query'

import { playlistsService } from '@/services/playlists.service'

export function useUserPlaylist() {
	return useQuery({
		queryKey: ['playlist'],
		queryFn: () => playlistsService.getUserPlaylists()
	})
}
