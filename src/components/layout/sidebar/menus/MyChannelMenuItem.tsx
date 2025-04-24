import { TvMinimalPlay } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { match } from 'path-to-regexp'
import React from 'react'

import { PAGE } from '@/config/public-page.config'

import { useProfile } from '@/hooks/useProfile'

import { MenuItem } from './MenuItem'
import { useTypedSelector } from '@/store'

export const MyChannelMenuItem = ({ isShowedSidebar }: { isShowedSidebar: boolean }) => {
	const { profile } = useProfile()

	const { isLoggedIn } = useTypedSelector(state => state.auth)

	const pathname = usePathname()

	const isActive = profile?.channel?.slug
		? !!match(PAGE.CHANNEL(profile.channel.slug))(pathname)
		: !!match(PAGE.MY_CHANNEL)(pathname)

	const myChannelLink = profile?.channel?.slug
		? PAGE.CHANNEL(profile.channel.slug)
		: PAGE.MY_CHANNEL

	const item = {
		icon: TvMinimalPlay,
		label: 'My channel',
		link: myChannelLink
	}

	if (!isLoggedIn) return null

	return (
		<MenuItem
			item={item}
			isActive={isActive}
			isShowedSidebar={isShowedSidebar}
		/>
	)
}
