import { usePathname } from 'next/navigation'
import { match } from 'path-to-regexp'

import type { ISidebarItem } from '../sidebar.types'

import { MenuItem } from './MenuItem'

interface Props {
	menu: ISidebarItem[]
	title?: string
	isShowedSidebar: boolean
}

export const SidebarMenu = ({ menu, title, isShowedSidebar }: Props) => {
	const pathName = usePathname()

	return (
		<nav>
			{title && <div className='opacity-40 uppercase font-medium text-xs mb-3'>{title}</div>}
			<ul>
				{menu.map(menuItem => (
					<MenuItem
						key={menuItem.label}
						isActive={!!match(menuItem.link)(pathName)}
						item={menuItem}
						isShowedSidebar={isShowedSidebar}
					/>
				))}
			</ul>
		</nav>
	)
}
