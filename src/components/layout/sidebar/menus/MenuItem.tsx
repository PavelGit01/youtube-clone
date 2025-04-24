import cn from 'clsx'
import Link from 'next/link'
import React from 'react'

import type { IMenuItemProps } from './menu.types'

export const MenuItem = ({ item, isActive, isShowedSidebar }: IMenuItemProps) => {
	return (
		<li className='list-none'>
			<Link
				href={item.link}
				className={'group py-3 flex items-center gap-5'}
				title={item.label}
			>
				<item.icon
					className={cn('min-w-6 transition-color', {
						'group-hover:text-primary transition group-hover:rotate-3': !isActive,
						'text-red-400': isActive && !isShowedSidebar
					})}
				/>
				<span
					className={cn('border-b', {
						'border-white': isActive,
						'border-transparent': !isActive
					})}
				>
					{item.label}
				</span>
			</Link>
			{item.isBottomBorder && <span className='h-[1px] w-full block bg-border my-5' />}
		</li>
	)
}
