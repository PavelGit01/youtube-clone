import { Bell, LayoutGrid, type LucideIcon, PlusSquare } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

import { AnimationIcon } from '@/ui/AnimationIcon'

import { STUDIO_PAGE } from '@/config/studio-page.config'

export const HeaderLinks = () => {
	return (
		<div className='flex items-center gap-4'>
			<Link
				href={STUDIO_PAGE.UPLOAD_VIDEO}
				className='transition-opacity hover:opacity-100 opacity-50'
			>
				<AnimationIcon
					Icon={PlusSquare}
					size={20}
				/>
			</Link>
			<Link
				href={STUDIO_PAGE.HOME}
				className='transition-opacity hover:opacity-100 opacity-50'
			>
				<AnimationIcon
					Icon={LayoutGrid}
					size={20}
				/>
			</Link>
			<Link
				href={STUDIO_PAGE.HOME}
				className='transition-opacity hover:opacity-100 opacity-50'
			>
				<AnimationIcon
					Icon={Bell}
					size={20}
				/>
			</Link>
		</div>
	)
}
