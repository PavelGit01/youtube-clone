import { useMutation } from '@tanstack/react-query'
import { type SubmitHandler, useForm } from 'react-hook-form'

import { Button } from '@/ui/button/Button'
import { Textarea } from '@/ui/field/Textarea'

import { useAuth } from '@/hooks/useAuth'
import { useProfile } from '@/hooks/useProfile'

import { commentService } from '@/services/comment.service'
import { useTypedSelector } from '@/store'
import type { ICommentData } from '@/types/comment.types'

interface Props {
	refetch: () => void
	videoId: string
}

export function AddCommentsForm({ refetch, videoId }: Props) {
	const { isLoggedIn } = useAuth()

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset
	} = useForm<ICommentData>({
		mode: 'onChange'
	})

	const { mutate, isPending } = useMutation({
		mutationKey: ['create comment'],
		mutationFn: (data: ICommentData) => commentService.create(data),
		onSuccess: () => {
			refetch()
			reset()
		}
	})

	const onSubmit: SubmitHandler<ICommentData> = ({ text }) => {
		mutate({ text, videoId })
	}

	if (!isLoggedIn) return null

	return (
		<div className='mb-4'>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className='grid grid-cols-[7fr_1fr] gap-20'
			>
				<Textarea
					registration={register('text', { required: true })}
					placeholder='Enter comment:'
					rows={1}
					wrapperClassName='mb-0'
					error={errors.text?.message}
				/>
				<Button
					disabled={isPending}
					type='submit'
					variant='simple'
				>
					{isPending ? 'Commenting...' : 'Comment'}
				</Button>
			</form>
		</div>
	)
}
