'use client'

import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

import { Heading } from '@/ui/Heading'
import { VerifiedBadge } from '@/ui/VerifiedBadge'

import { PAGE } from '@/config/public-page.config'

import { transformDate } from '@/utils/transform-date'

import { getInitials } from './get-initials'
import type { IComment } from '@/types/comment.types'

const DynamicCommentActions = dynamic(
	() => import('./CommentActions').then(mod => mod.CommentActions),
	{ ssr: false }
)

interface Props {
	comment: IComment
	refetch: () => void
}

export function CommentItem({ comment, refetch }: Props) {
	const [text, setText] = useState(comment.text)

	return (
		<div className='flex gap-3.5 items-start mb-8 border-b border-b-border/5 pb-5 last:border-none'>
			{comment.user?.channel ? (
				<Link href={PAGE.CHANNEL(comment.user.channel?.slug || '')}>
					<Image
						alt={comment.user.name || ''}
						src={comment.user.channel?.avatarUrl || ''}
						width={40}
						height={40}
						className='rounded-lg flex-shrink-0 shadow'
					/>
				</Link>
			) : (
				<div
					className='w-10 h-10 text-xl font-medium bg-gray-200 text-gray-800 flex 
                items-center justify-center rounded flex-shrink-0 shadow'
				>
					{getInitials(comment.user.name || 'Anonim')}
				</div>
			)}

			<div>
				<div className='flex items-center gap-3 mb-2'>
					<Heading
						className='mb-0'
						clasNameHeading='text-base'
					>
						<span className='flex items-center gap-2'>
							{comment.user.name}
							{comment.user.channel?.isVerified && <VerifiedBadge size={14} />}
						</span>
					</Heading>

					<div className=' text-gray-500 text-xs'>{transformDate(comment.createdAt)}</div>
				</div>
				<div className='w-80'>
					<textarea
						className='w-full overflow-auto scrollbar-none outline-none  border border-transparent focus:border-border text-gray-300 text-sm leading-snug bg-transparent resize-none'
						value={text}
						onChange={e => setText(e.target.value)}
					/>
				</div>
				<DynamicCommentActions
					newText={text}
					comment={comment}
					refetch={refetch}
				/>
			</div>
		</div>
	)
}
