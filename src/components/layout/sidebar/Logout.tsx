import { useMutation } from '@tanstack/react-query'
import { LogOut } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'

import { PAGE } from '@/config/public-page.config'
import { STUDIO_PAGE } from '@/config/studio-page.config'

import { authService } from '@/services/auth.service'
import { useTypedSelector } from '@/store'

export const Logout = () => {
	const router = useRouter()
	const pathname = usePathname()

	const { mutate, isPending } = useMutation({
		mutationKey: ['logout'],
		mutationFn: () => authService.logout(),
		onSuccess: () => {
			if (pathname.includes(STUDIO_PAGE.HOME) || pathname.includes(STUDIO_PAGE.SETTINGS)) {
				router.push(PAGE.HOME)
			}
		}
	})

	const { isLoggedIn } = useTypedSelector(state => state.auth)

	if (!isLoggedIn) return null

	return (
		<button
			onClick={() => mutate()}
			className={'group py-3 flex items-center gap-5'}
			title='Logout'
		>
			<LogOut className={'min-w-6 group-hover:text-primary transition group-hover:rotate-3'} />
			<span>{isPending ? 'Please wait... ' : 'Logout'}</span>
		</button>
	)
}
