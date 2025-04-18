import dynamic from 'next/dynamic'
import React from 'react'

import { SidebarHeader } from './header/SidebarHeader'
import { SidebarSubscription } from './menus/subscriptions/SidebarSubscriptions'
import { MORE_SIDEBAR_DATA, SIDEBAR_DATA } from './sidebar.data'

const DynamicSidebarMenu = dynamic(
	() => import('./menus/SidebarMenu').then(mod => mod.SidebarMenu),
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
	return (
		<aside className='p-layout border-r border-border whitespace-nowrap overflow-hidden'>
			<SidebarHeader toggleSidebar={toggleSidebar} />
			<DynamicSidebarMenu
				isShowedSidebar={isShowedSidebar}
				menu={SIDEBAR_DATA}
			/>
			<SidebarSubscription />
			<DynamicSidebarMenu
				isShowedSidebar={isShowedSidebar}
				title='More from youtube'
				menu={MORE_SIDEBAR_DATA}
			/>
			<DynamicLogout />
		</aside>
	)
}
