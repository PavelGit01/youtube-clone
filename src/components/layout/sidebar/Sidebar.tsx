import dynamic from 'next/dynamic'
import { usePathname } from 'next/navigation'
import React from 'react'

import { STUDIO_PAGE } from '@/config/studio-page.config'

import { SidebarHeader } from './header/SidebarHeader'
import { SidebarMenu } from './menus/SidebarMenu'
import { SidebarSubscription } from './menus/subscriptions/SidebarSubscriptions'
import {
	MAIN_SIDEBAR_DATA,
	MORE_SIDEBAR_DATA,
	PERSONAL_SIDEBAR_DATA,
	STUDIO_SIDEBAR_DATA
} from './sidebar.data'

const DynamicMyChannelMenuItem = dynamic(
	() => import('./menus/MyChannelMenuItem').then(mod => mod.MyChannelMenuItem),
	{ ssr: false }
)

const DynamicLogout = dynamic(() => import('./Logout').then(mod => mod.Logout), { ssr: false })

export const Sidebar = ({
	toggleSidebar,
	isShowedSidebar
}: {
	isShowedSidebar: boolean
	toggleSidebar: () => void
}) => {
	const pathname = usePathname()

	return (
		<aside className='p-layout border-r border-border whitespace-nowrap overflow-hidden'>
			<SidebarHeader toggleSidebar={toggleSidebar} />

			<SidebarMenu
				isShowedSidebar={isShowedSidebar}
				menu={MAIN_SIDEBAR_DATA}
			/>
			<DynamicMyChannelMenuItem isShowedSidebar={isShowedSidebar} />
			<SidebarMenu
				isShowedSidebar={isShowedSidebar}
				menu={PERSONAL_SIDEBAR_DATA}
			/>
			<SidebarSubscription />
			{!!pathname.includes(STUDIO_PAGE.HOME) && (
				<SidebarMenu
					title='Studio'
					menu={STUDIO_SIDEBAR_DATA}
					isShowedSidebar={isShowedSidebar}
				/>
			)}
			<SidebarMenu
				isShowedSidebar={isShowedSidebar}
				title='More from youtube'
				menu={MORE_SIDEBAR_DATA}
			/>
			<DynamicLogout />
		</aside>
	)
}
