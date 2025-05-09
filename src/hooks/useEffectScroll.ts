import { useEffect, useRef } from 'react'

interface Props {
	hasNextPage: boolean
	isFetchingNextPage: boolean
	fetchNextPage: () => void
}

export function useEffectScroll({ fetchNextPage, hasNextPage, isFetchingNextPage }: Props) {
	const autoLoadCount = useRef(0)
	const MAX_AUTO_LOADS = 3 // ← максимум автоподгрузок при отсутствии скролла

	useEffect(() => {
		const handleScroll = () => {
			if (
				window.innerHeight + document.documentElement.scrollTop >=
					document.documentElement.offsetHeight * 0.99 &&
				hasNextPage &&
				!isFetchingNextPage
			) {
				fetchNextPage()
			}
		}

		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	}, [hasNextPage, isFetchingNextPage, fetchNextPage])

	useEffect(() => {
		const tryLoadIfNotScrollable = () => {
			const isScrollable = document.documentElement.scrollHeight > window.innerHeight

			if (
				!isScrollable &&
				hasNextPage &&
				!isFetchingNextPage &&
				autoLoadCount.current < MAX_AUTO_LOADS
			) {
				autoLoadCount.current += 1
				fetchNextPage()
			}
		}

		tryLoadIfNotScrollable()
	}, [hasNextPage, isFetchingNextPage, fetchNextPage])
}
