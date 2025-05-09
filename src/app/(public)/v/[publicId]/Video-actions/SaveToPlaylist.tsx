import { useMutation } from '@tanstack/react-query'
import { AnimatePresence } from 'framer-motion'
import * as m from 'framer-motion/m'
import { Check, ListVideo } from 'lucide-react'

import { useOutside } from '@/hooks/useOutside'

import { useUserPlaylist } from '@/app/my/playlists/useUserPlaylist'
import { playlistsService } from '@/services/playlists.service'
import type { ISingleVideoResponce } from '@/types/video.types'

interface Props {
	video: ISingleVideoResponce
}

export function SaveToPlaylist({ video }: Props) {
	const { data, refetch: refetchPlaylist } = useUserPlaylist()

	const { isShow, setIsShow, ref } = useOutside(false)

	const { mutate: togglePlaylist, isPending } = useMutation({
		mutationKey: ['toggle video'],
		mutationFn: (playlistId: string) =>
			playlistsService.toggleVideoInPlaylist(playlistId, video.id),
		onSuccess: (_, playlistId) => {
			const run = async () => {
				const { toast } = await import('react-hot-toast')
				const playList = data?.data.find(playL => playL.id === playlistId)

				const isInPlaylist = playList?.videos.some(v => v.id === video.id)

				isInPlaylist
					? toast.success('Successfully removed!', { id: 'playlist removed' })
					: toast.success('Successfully added!', { id: 'playlist added' })

				refetchPlaylist()
			}
			run()
		},
		async onError() {
			const run = async () => {
				const { toast } = await import('react-hot-toast')
				toast.error('Playlist has error!', { id: 'playlist error' })
			}
			run()
		}
	})

	return (
		<div
			className='relative'
			ref={ref}
		>
			<button
				onClick={() => setIsShow(prev => !prev)}
				className='flex items-center gap-1 transition-opacity opacity-80 hover:opacity-100'
			>
				<ListVideo size={20} />
				Save
			</button>
			<AnimatePresence>
				{isShow && (
					<m.ul
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: 10 }}
						transition={{ duration: 0.3 }}
						className='bg-gray-800 py-2 px-3 w-max max-w-36 max-h-52 scrollbar-none overflow-y-auto rounded-lg absolute bottom-8 right-0 z-10 shadow'
					>
						{data?.data.map(playlist => (
							<li
								key={playlist.id}
								className='mb-1 border-b border-border'
							>
								<button
									onClick={() => togglePlaylist(playlist.id)}
									className={
										'transition-colors border-b border-transparent hover:text-primary flex items-center gap-1'
									}
									disabled={isPending}
								>
									{playlist.videos.some(v => v.id === video.id) && <Check size={14} />}{' '}
									{playlist.title}
								</button>
							</li>
						))}
					</m.ul>
				)}
			</AnimatePresence>
		</div>
	)
}
