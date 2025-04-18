import Image from 'next/image'
import React from 'react'

import { SkeletonLoader } from '../SkeletonLoader'

interface Props {
	isLoading: boolean
	value?: string
	overlay?: string
	aspectRation?: '16:9' | '1:1'
}

export const ImagePreview = ({ isLoading, overlay, value, aspectRation }: Props) => {
	const isWidescreenRation = aspectRation === '16:9'

	const width = isWidescreenRation ? 446 : 100

	const height = isWidescreenRation ? 250 : 100

	return (
		<div className='mt-3'>
			{isLoading ? (
				<SkeletonLoader style={{ width, height }} />
			) : (
				!!value && (
					<div className='relative'>
						{overlay && (
							<Image
								alt='overlay'
								className='rounded-md absolute top-0 left-0 w-full h-full'
								src={overlay}
								width={width}
								height={height}
								priority
							/>
						)}
						<Image
							alt='uploaded file'
							className='rounded-md'
							src={value}
							width={width}
							height={height}
							priority
						/>
					</div>
				)
			)}
		</div>
	)
}
