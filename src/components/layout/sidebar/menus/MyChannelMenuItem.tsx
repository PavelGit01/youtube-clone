'use client'

import React from 'react'

import { PAGE } from '@/config/public-page.config'

import { useProfile } from '@/hooks/useProfile'

import { MenuItem } from './MenuItem'
import type { IMenuItemProps } from './menu.types'

export const MyChannelMenuItem = ({ item, ...props }: IMenuItemProps) => {
	const { profile } = useProfile()

	const myChannelLink = profile?.channel?.slug
		? PAGE.CHANNEL(profile.channel.slug)
		: PAGE.MY_CHANNEL

	return (
		<MenuItem
			item={{ ...item, link: myChannelLink }}
			{...props}
		/>
	)
}
