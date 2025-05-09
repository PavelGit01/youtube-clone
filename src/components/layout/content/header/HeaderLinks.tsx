import { Bell, LayoutGrid, type LucideIcon, PlusSquare } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

import { AnimationIcon } from '@/ui/AnimationIcon'

import { STUDIO_PAGE } from '@/config/studio-page.config'

export const HeaderLinks = () => {
	return (
		<div className='flex items-center gap-1'>
			<Link
				href={STUDIO_PAGE.UPLOAD_VIDEO}
				className='transition-opacity hover:opacity-100 opacity-50 p-2'
				aria-label='Upload video'
			>
				<AnimationIcon
					Icon={PlusSquare}
					size={20}
				/>
			</Link>
			<Link
				href={STUDIO_PAGE.HOME}
				className='transition-opacity hover:opacity-100 opacity-50 p-2'
				aria-label='Studio page'
			>
				<AnimationIcon
					Icon={LayoutGrid}
					size={20}
				/>
			</Link>
			<Link
				href={STUDIO_PAGE.HOME}
				className='transition-opacity hover:opacity-100 opacity-50 p-2'
				aria-label='Notification'
			>
				<AnimationIcon
					Icon={Bell}
					size={20}
				/>
			</Link>
		</div>
	)
}
