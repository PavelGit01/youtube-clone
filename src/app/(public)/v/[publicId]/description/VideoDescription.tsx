'use client'

import parse from 'html-react-parser'
import { useState } from 'react'

import { processHtmlContent } from '@/utils/process-html-content'

import styles from './VideoDescription.module.scss'

export function VideoDescription({ description }: { description: string }) {
	const [isExpanded, setIsExpanded] = useState(false)

	const { initialContent, isShouldShowToggle } = processHtmlContent(description, 3)
	return (
		<div className='relative mb-4 bg-gray-800 py-1.5 px-3 rounded-lg'>
			<article
				key={isExpanded ? 'expanded' : 'collapsed'}
				className={styles.article}
			>
				{parse(isExpanded ? description : initialContent)}
			</article>

			{isShouldShowToggle && (
				<button
					className='text-gray-400 uppercase transition-colors hover:text-gray-200 mt-2'
					onClick={() => setIsExpanded(prev => !prev)}
				>
					{isExpanded ? 'Hide' : 'Show more'}
				</button>
			)}
		</div>
	)
}
