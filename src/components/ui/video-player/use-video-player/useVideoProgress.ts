import { type RefObject, useEffect, useState } from 'react'

import { type HTMLCustomVideoElement } from '../video-player.types'
import { getVideoInfo } from '../video-player.util'

export function useVideoProgress(playerRef: RefObject<HTMLCustomVideoElement>) {
	const [currentTime, setCurrentTime] = useState(0)
	const [videoTime, setVideoTime] = useState(0)
	const [progress, setProgress] = useState(0)

	useEffect(() => {
		const player = playerRef.current
		if (!player) return

		const handleLoadedMetadata = () => {
			const { currentTime, progress, originalTime } = getVideoInfo(playerRef.current)

			setVideoTime(originalTime)
			setCurrentTime(currentTime)
			setProgress(progress)
		}

		player.addEventListener('loadedmetadata', handleLoadedMetadata)

		if (player.readyState >= 1) {
			handleLoadedMetadata()
		}

		return () => {
			player.addEventListener('loadedmetadata', handleLoadedMetadata)
		}
	}, [playerRef])

	useEffect(() => {
		const player = playerRef?.current

		const updateProgress = () => {
			if (!player) return

			const { currentTime, progress } = getVideoInfo(player)

			setCurrentTime(currentTime)
			setProgress(progress)
		}

		player?.addEventListener('timeupdate', updateProgress)

		return () => {
			player?.removeEventListener('timeupdate', updateProgress)
		}
	}, [playerRef])

	return { currentTime, progress, videoTime, setCurrentTime }
}
