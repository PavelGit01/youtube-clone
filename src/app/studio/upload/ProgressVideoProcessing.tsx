import { useQuery } from '@tanstack/react-query'
import { type Dispatch, type SetStateAction, useEffect, useState } from 'react'

import { fileService } from '@/services/studio/file.service'

interface Props {
	fileName: string
	isReadyToPublish: boolean
	setIsReadyToPublish: Dispatch<SetStateAction<boolean>>
}

export function ProgressVideoProcessing({
	fileName,
	setIsReadyToPublish,
	isReadyToPublish
}: Props) {
	const [progress, setProgress] = useState(0)

	const { data: processingData, isSuccess } = useQuery({
		queryKey: ['processing video', fileName],
		queryFn: () => fileService.getProcessingStatus(fileName),
		select(data) {
			return data.data.status
		},
		refetchInterval: query => {
			const queryProgress = query.state.data?.data
			return queryProgress !== undefined && queryProgress.status < 100 ? 3500 : false
		},
		enabled: !!fileName && !isReadyToPublish
	})

	useEffect(() => {
		if (!processingData) return
		setProgress(processingData)
		if (processingData === 100) {
			setIsReadyToPublish(true)
			const run = async () => {
				const { toast } = await import('react-hot-toast')
				toast.success('Video processed successfully!')
			}
			run()
		}
	}, [isSuccess, processingData, setIsReadyToPublish])

	return (
		progress > 0 && (
			<div
				className='mb-3 flex items-center justify-center py-1.5 w-full relative rounded-md overflow-hidden text-sm font-medium'
				style={{
					backgroundColor: 'rgb(196 196 196 / 15%)'
				}}
			>
				<div
					className='absolute inset-0 h-full animate-pulse transition-all bg-gradient-to-r from-gray-500 to-gray-600'
					style={{
						width: progress ? `${progress}%` : 0
					}}
				/>
				<span className='relative'>
					{progress === 100 ? 'Done ' : 'Processing video '}({Math.round(progress)}%)
				</span>
			</div>
		)
	)
}
