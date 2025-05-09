import * as m from 'framer-motion/m'
import Image from 'next/image'
import Link from 'next/link'

import { PAGE } from '@/config/public-page.config'

import type { IPlaylist } from '@/types/playlist.types'

interface Props {
	playlist: IPlaylist
}

export function PlaylistItem({ playlist }: Props) {
	return (
		<m.div
			whileHover={{
				scale: 1.01,
				y: -5
			}}
			transition={{
				type: 'spring',
				stiffness: 500,
				damping: 30
			}}
		>
			<div className='mb-6'>
				<Link
					href={PAGE.PLAYLIST(playlist.id)}
					className='relative '
				>
					<div className='rounded-lg absolute shadow-lg w-10/12 h-full left-[8.5%] -top-3  bg-gray-500' />
					<div className='rounded-lg absolute shadow-lg w-11/12 h-full  left-[4.1%] -top-1.5 bg-gray-400' />
					{playlist.videos[0]?.thumbnailUrl ? (
						<Image
							src={playlist.videos[0]?.thumbnailUrl}
							width={280}
							height={152}
							alt={playlist.title}
							quality={100}
							className='relative rounded-lg shadow-lg'
						/>
					) : (
						<div className='relative rounded-lg shadow-lg w-[280px] h-[152px]' />
					)}

					<div className='absolute bottom-1.5 right-1.5 text-xs font-medium py-0.5 px-1.5 bg-black/40 rounded'>
						{playlist.videos.length} videos
					</div>
				</Link>
				<div className='mt-2 font-medium'>
					<Link
						href={PAGE.PLAYLIST(playlist.id)}
						className='line-clamp-2 leading-[1.3]'
					>
						{playlist.title}
					</Link>
				</div>
			</div>
		</m.div>
	)
}
