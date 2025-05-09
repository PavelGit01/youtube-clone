import { type Control, Controller } from 'react-hook-form'

import { UploadField } from '@/ui/upload-field/UploadField'

import type { ISettingsData } from './settings.types'

interface Props {
	control: Control<ISettingsData>
}

export function SettingsMediaFields({ control }: Props) {
	return (
		<div>
			<Controller
				name='channel.avatarUrl'
				control={control}
				render={({ field: { onChange, value }, fieldState: { error } }) => (
					<UploadField
						label='Avatar:'
						onChange={onChange}
						value={value}
						error={error}
						folder='avatars'
						className='mb-5'
					/>
				)}
			/>
			<Controller
				name='channel.bannerUrl'
				control={control}
				render={({ field: { onChange, value }, fieldState: { error } }) => (
					<UploadField
						label='Banner:'
						onChange={onChange}
						value={value}
						error={error}
						folder='banners'
						sizePreview={[446, 250]}
						overlay='/images/overlay.png'
					/>
				)}
			/>
		</div>
	)
}
