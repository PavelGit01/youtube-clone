import toast from 'react-hot-toast'

export const validateFileSize = (file: File, maxFileSize = 2 * 1024 * 1024) => {
	let maxSizeFormatted: string

	if (maxFileSize >= 1024 * 1024 * 1024) {
		maxSizeFormatted = (maxFileSize / (1024 * 1024 * 1024)).toFixed(0) + ' GB'
	} else {
		maxSizeFormatted = (maxFileSize / (1024 * 1024)).toFixed(0) + ' MB'
	}
	if (file.size > maxFileSize) {
		toast.error(`File is too big! (max ${maxSizeFormatted} MB)`)
		return false
	}
	return true
}
