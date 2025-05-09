import { useMutation } from '@tanstack/react-query'
import { type ChangeEvent, useCallback } from 'react'

import { validateFileSize } from './validate-file-size'
import { fileService } from '@/services/studio/file.service'
import type { IFileResponse } from '@/types/file.types'

interface Props {
	folder?: string
	onChange?: (...event: any[]) => void
	onSuccess?: (data: IFileResponse[]) => void
	onError?: () => void
	maxFileSize?: number
}

type TUseUpload = (props: Props) => {
	uploadFile: (e: ChangeEvent<HTMLInputElement>) => void
	isLoading: boolean
}

export const useUpload: TUseUpload = ({ onChange, folder, onError, onSuccess, maxFileSize }) => {
	const { mutate, isPending } = useMutation({
		mutationKey: ['upload file'],
		mutationFn: (data: FormData) => fileService.upload(data, folder),
		onSuccess: ({ data }) => {
			onChange && onChange(data[0].url)
			onSuccess && onSuccess(data)
		},
		onError: error => {
			const run = async () => {
				const { toast } = await import('react-hot-toast')
				toast.error(error.message)
				onError && onError()
			}
			run()
		}
	})

	const uploadFile = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			const files = e.target.files

			if (!files?.length) return

			const file = files[0]

			if (!validateFileSize(file, maxFileSize)) return

			const formdata = new FormData()

			formdata.append('file', file)

			mutate(formdata)
		},
		[mutate, maxFileSize]
	)

	return { uploadFile, isLoading: isPending }
}
