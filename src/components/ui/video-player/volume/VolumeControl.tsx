import { Volume1, Volume2, VolumeX } from 'lucide-react'

interface Props {
	value: number
	isMuted: boolean
	changeVolume: (value: number) => void
	toggleMute: () => void
}

export const VolumeControl = ({ changeVolume, isMuted, toggleMute, value }: Props) => {
	return (
		<div className='flex items-center gap-2'>
			<button
				className='transition-colors hover:text-primary'
				onClick={toggleMute}
			>
				{isMuted ? <VolumeX /> : value < 0.4 ? <Volume1 /> : <Volume2 />}
			</button>
			<input
				type='range'
				min='0'
				max='1'
				step='0.05'
				value={value}
				onChange={e => changeVolume(parseFloat(e.target.value))}
				className='opacity-90 hover:opacity-100 volume-slider w-12 h-[0.2rem] appearance-none bg-white rounded-lg cursor-pointer transition-all'
				style={{
					background: `linear-gradient(to right, white ${value * 100}%, rgba(255,255,255,0.2) ${value * 100}%)`
				}}
			/>
		</div>
	)
}
