'use client'

import { Lightbulb, LightbulbOff, Maximize, Pause, Play, RectangleHorizontal } from 'lucide-react'

import { PlayerProgressBar } from './progress-bar/PlayerProgressBar'
import { SelectQuality } from './quality/SelectQuality'
import { useVideoPlayer } from './use-video-player/useVideoPlayer'
import { EnumVideoPlayerQuality } from './video-player.types'
import { getTime } from './video-player.util'
import { VolumeControl } from './volume/VolumeControl'

interface Props {
	fileName: string
	toggleTheaterMode: () => void
	maxResolution: EnumVideoPlayerQuality
}

export function VideoPlayer({ fileName, toggleTheaterMode, maxResolution }: Props) {
	const { fn, state, playerRef, bgRef } = useVideoPlayer({ fileName, toggleTheaterMode })

	return (
		<div className='relative rounded-2xl mb-5'>
			{state.isLightningMode && (
				<video
					ref={bgRef}
					className='rounded-xl absolute top-0 left-0 w-full h-full object-cover filter blur-3xl brightness-90 contrast-125 saturate-150 mix-blend-lighten'
					controls={false}
					src={`/uploads/videos/${EnumVideoPlayerQuality['720p']}/${fileName}`}
					preload='metadata'
					muted
				></video>
			)}

			<video
				ref={playerRef}
				className='w-full aspect-video relative z-[1] rounded-xl'
				controls={false}
				src={`/uploads/videos/${EnumVideoPlayerQuality['720p']}/${fileName}`}
				preload='metadata'
			></video>
			<div className='grid grid-cols-[7fr_1fr] gap-7 absolute bottom-5 left-5 right-5 z-[1]'>
				<div className='flex items-center gap-6'>
					<button
						onClick={fn.togglePlayPause}
						className='transition-colors hover:text-primary'
					>
						{state.isPlaying ? <Pause /> : <Play />}
					</button>
					<PlayerProgressBar
						currentTime={state.currentTime}
						duration={state.videoTime}
						onSeek={fn.onSeek}
						progress={state.progress}
					/>
					<div>
						<span>{getTime(state.videoTime)}</span>
					</div>
				</div>
				<div className='flex items-center gap-5'>
					<VolumeControl
						changeVolume={fn.changeVolume}
						isMuted={state.isMuted}
						toggleMute={fn.toggleMute}
						value={state.volume}
					/>
					<SelectQuality
						currentValue={state.quality}
						onChange={fn.changeQuality}
						maxResolution={maxResolution}
					/>
					<button
						className='transition-colors hover:text-primary'
						onClick={fn.setIsLightningMode}
					>
						{!state.isLightningMode ? <LightbulbOff /> : <Lightbulb />}
					</button>
					<button
						className='transition-colors hover:text-primary'
						onClick={toggleTheaterMode}
					>
						<RectangleHorizontal />
					</button>
					<button
						onClick={fn.toggleFullScreen}
						className='transition-colors hover:text-primary'
					>
						<Maximize />
					</button>
				</div>
			</div>
		</div>
	)
}
