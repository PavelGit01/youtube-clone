import { LogIn } from 'lucide-react'
import React from 'react'

import { LinkButton } from '@/ui/button/LinkButton'

import { PAGE } from '@/config/public-page.config'

import { HeaderAvatar } from './HeaderAvatar'
import { useTypedSelector } from '@/store'

export const HeaderProfile = () => {
	const { isLoggedIn } = useTypedSelector(state => state.auth)

	return isLoggedIn ? (
		<HeaderAvatar />
	) : (
		<LinkButton href={PAGE.AUTH}>
			<LogIn size={20} />
			Auth
		</LinkButton>
	)
}
