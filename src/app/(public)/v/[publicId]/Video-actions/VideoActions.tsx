'use client'

import { useMutation } from '@tanstack/react-query'
import { Heart, ListPlus } from 'lucide-react'
import React, { startTransition, useEffect, useOptimistic, useState } from 'react'

import { COLORS } from '@/constants/colors.constants'

import { useProfile } from '@/hooks/useProfile'

import { transformCount } from '@/utils/transform-count'

import { userService } from '@/services/user.service'
import type { ISingleVideoResponce } from '@/types/video.types'

export const VideoActions = ({ video }: { video: ISingleVideoResponce }) => {
	const { profile } = useProfile()

	const isInitiallyLiked = profile?.likes.some(like => like.videoId === video.id) || false

	const [isLikedLocal, setIsLikedLocal] = useState(isInitiallyLiked)
	const [optimisticLike, setOptimisticLike] = useState<number>(video.likes.length)

	const { mutate } = useMutation({
		mutationKey: ['like', video.id],
		mutationFn: () => userService.toggleLike(video.id + '435'),
		retry: 1,
		onMutate() {
			startTransition(() => {
				const newState = !isLikedLocal
				setIsLikedLocal(newState)
				setOptimisticLike(prev => (newState ? prev + 1 : prev - 1))
			})
		},
		onError() {
			startTransition(() => {
				const revert = !isLikedLocal
				setIsLikedLocal(revert)
				setOptimisticLike(prev => (revert ? prev + 1 : prev - 1))
			})
		}
	})

	return (
		<div className='flex items-center gap-7'>
			<button className='flex items-center gap-1 transition-opacity opacity-80 hover:opacity-100'>
				<ListPlus size={20} />
				Save
			</button>
			<button
				onClick={() => mutate()}
				className='text-primary flex items-center gap-1.5 transition-opacity opacity-80 hover:opacity-100'
			>
				<Heart
					size={20}
					fill={isLikedLocal ? COLORS.primary : 'transparent'}
				/>
				{transformCount(optimisticLike)}
			</button>
		</div>
	)
}
