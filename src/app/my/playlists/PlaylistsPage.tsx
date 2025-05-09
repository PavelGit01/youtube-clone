'use client'

import { useQuery } from '@tanstack/react-query'
import { ListVideo } from 'lucide-react'

import { Heading } from '@/ui/Heading'
import { SkeletonLoader } from '@/ui/SkeletonLoader'
import { Button } from '@/ui/button/Button'

import { useOutside } from '@/hooks/useOutside'

import { CreatePlaylist } from './CreatePlaylist'
import { PlaylistItem } from './PlaylistItem'
import { useUserPlaylist } from './useUserPlaylist'
import { playlistsService } from '@/services/playlists.service'

export function PlaylistsPage() {
	const { isShow, setIsShow, ref } = useOutside(false)

	const { data, isLoading, refetch } = useUserPlaylist()

	console.log(data?.data)
	return (
		<section>
			<div className='flex justify-between items-center mb-10'>
				<Heading
					isPageHeading
					Icon={ListVideo}
					className='mb-0'
				>
					Playlist
				</Heading>
				<Button
					variant='simple'
					onClick={() => setIsShow(true)}
				>
					Create a playlist
				</Button>
			</div>
			<div className='grid grid-cols-4 gap-4'>
				{isLoading ? (
					<SkeletonLoader
						count={4}
						className='h-40 rounded-md'
					/>
				) : data?.data?.length ? (
					data?.data?.map(playlist => (
						<PlaylistItem
							key={playlist.id}
							playlist={playlist}
						/>
					))
				) : (
					<p>Playlists not found!</p>
				)}
				{isShow && (
					<CreatePlaylist
						refetch={refetch}
						onClose={() => setIsShow(false)}
						ref={ref}
					/>
				)}
			</div>
		</section>
	)
}
