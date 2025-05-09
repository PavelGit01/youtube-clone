import { useMutation } from '@tanstack/react-query'
import * as m from 'framer-motion/m'
import { X } from 'lucide-react'
import type { RefObject } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useHotkeys } from 'react-hotkeys-hook'

import { Heading } from '@/ui/Heading'
import { SkeletonLoader } from '@/ui/SkeletonLoader'
import { Button } from '@/ui/button/Button'
import { Field } from '@/ui/field/Field'

import { playlistsService } from '@/services/playlists.service'
import type { IPlaylistData } from '@/types/playlist.types'

interface Props {
	refetch: () => void
	onClose: () => void
	ref: any | null
}

export function CreatePlaylist({ refetch, onClose, ref }: Props) {
	useHotkeys('esc', e => {
		e.preventDefault()
		onClose()
	})

	const {
		register,
		reset,
		handleSubmit,

		formState: { errors }
	} = useForm<IPlaylistData>({
		mode: 'onChange'
	})

	const { mutate, isPending } = useMutation({
		mutationKey: ['create playlist'],
		mutationFn: (data: IPlaylistData) => playlistsService.createPlaylist(data),
		onSuccess: () => {
			refetch()
			reset()
			onClose()
			toast.success('Playlist successfully created')
		},
		onError() {
			toast.error('Playlist has error!')
		}
	})

	const onSubmit: SubmitHandler<IPlaylistData> = data => {
		mutate(data)
	}

	return (
		<div
			style={{
				position: 'fixed',
				inset: 0,
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				backgroundColor: 'rgba(0,0,0,0.5)',
				zIndex: 50
			}}
		>
			<m.div
				initial={{ opacity: 0, scale: 0.9 }}
				animate={{ opacity: 1, scale: 1 }}
				exit={{ opacity: 0, scale: 0.9 }}
				transition={{ duration: 0.4 }}
				style={{
					position: 'relative',
					width: '28rem'
				}}
			>
				<div
					className='bg-gray-800 relative rounded-lg p-6'
					ref={ref}
				>
					<button
						onClick={onClose}
						className='absolute top-3 right-3 text-white'
						title='Close a modal'
					>
						<X />
					</button>
					<Heading clasNameHeading='text-xl'>Create a playlist</Heading>
					<form onSubmit={handleSubmit(onSubmit)}>
						{isPending ? (
							<SkeletonLoader count={2} />
						) : (
							<>
								<Field
									label='Title'
									type='text'
									registration={register('title', { required: 'Title is required!' })}
									error={errors.title?.message}
									placeholder='Enter title:'
								/>
								<Field
									label='Video public id'
									type='text'
									registration={register('videoPublicId', {
										required: 'Video public id is required',
										minLength: {
											value: 10,
											message: 'Video public id must be exactly 10 characters!'
										},
										maxLength: {
											value: 10,
											message: 'Video public id must be exactly 10 characters!'
										}
									})}
									error={errors.videoPublicId?.message}
									placeholder='Enter video publicId:'
								/>
							</>
						)}
						<div className='text-center mt-4'>
							<Button
								variant='primary'
								type='submit'
								isLoading={isPending}
							>
								Create
							</Button>
						</div>
					</form>
				</div>
			</m.div>
		</div>
	)
}
