import { usePathname } from 'next/navigation'
import { match } from 'path-to-regexp'

import { PAGE } from '@/config/public-page.config'

import type { ISidebarItem } from '../sidebar.types'

import { MenuItem } from './MenuItem'
import { MyChannelMenuItem } from './MyChannelMenuItem'
import { useTypedSelector } from '@/store'

interface Props {
	menu: ISidebarItem[]
	title?: string
	isShowedSidebar: boolean
}

export const SidebarMenu = ({ menu, title, isShowedSidebar }: Props) => {
	const pathName = usePathname()

	const { isLoggedIn } = useTypedSelector(state => state.auth)

	return (
		<nav>
			{title && <div className='opacity-40 uppercase font-medium text-xs mb-3'>{title}</div>}
			<ul>
				{menu.map(menuItem => {
					const props = {
						isShowedSidebar,
						item: menuItem,
						isActive: !!match(menuItem.link)(pathName)
					}
					const isMyChannel = menuItem.link === PAGE.MY_CHANNEL
					const isMyChannelItem = isMyChannel && isLoggedIn

					return isMyChannelItem ? (
						<MyChannelMenuItem
							key={menuItem.label}
							{...props}
						/>
					) : menuItem.link === PAGE.MY_CHANNEL ? null : (
						<MenuItem
							key={menuItem.label}
							{...props}
						/>
					)
				})}
			</ul>
		</nav>
	)
}
