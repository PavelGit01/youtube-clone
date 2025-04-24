'use client'

import { useQuery } from '@tanstack/react-query'
import dynamic from 'next/dynamic'

import { CommentItem } from './CommentItem'
import { commentService } from '@/services/comment.service'
import type { ISingleVideoResponce } from '@/types/video.types'

const DynamicAddCommentsForm = dynamic(
	() => import('./AddCommentsForm').then(mod => mod.AddCommentsForm),
	{
		ssr: false
	}
)

interface Props {
	video: ISingleVideoResponce
}

export function Comments({ video }: Props) {
	const { data, refetch } = useQuery({
		queryKey: ['comments', video.id],
		queryFn: () => commentService.byVideoPublicId(video.publicId),
		placeholderData: video.comments
	})

	return (
		<div className='border-t border-t-border pt-10 mt-7'>
			<DynamicAddCommentsForm
				refetch={refetch}
				videoId={video.id}
			/>
			{!!data &&
				data.map(comment => (
					<CommentItem
						key={comment.id}
						comment={comment}
						refetch={refetch}
					/>
				))}
		</div>
	)
}
