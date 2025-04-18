'use client'

import { Controller } from 'react-hook-form'

import { Button } from '@/ui/button/Button'
import { Field } from '@/ui/field/Field'
import { Textarea } from '@/ui/field/Textarea'
import { UploadField } from '@/ui/upload-field/UploadField'

import { useSettings } from './useSettings'

export function SettingsForm() {
	const {
		formObject: {
			handleSubmit,
			register,
			formState: { errors },
			control
		},
		isLoading,
		onSubmit,
		isProfileLoading
	} = useSettings()

	if (isProfileLoading) return <div>Loading...</div>

	return (
		<div className='w-3/5'>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className='grid grid-cols-2 gap-2'>
					<div className='mr-7'>
						<Field
							label='Email'
							type='email'
							registration={register('email', { required: 'Email is required!' })}
							error={errors.email?.message}
							placeholder='Enter email:'
						/>
						<Field
							label='Password'
							type='password'
							registration={register('password')}
							error={errors.password?.message}
							placeholder='Enter password:'
						/>
						<Field
							label='Name'
							type='text'
							registration={register('name')}
							error={errors.name?.message}
							placeholder='Enter name:'
						/>
						<Field
							label='Slug (alias)'
							type='text'
							registration={register('channel.slug')}
							error={errors.channel?.slug?.message}
							placeholder='Enter slug:'
						/>
						<Textarea
							rows={4}
							label='Description'
							registration={register('channel.description')}
							error={errors.channel?.description?.message}
							placeholder='Enter description:'
						/>
					</div>
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
									aspectRation='16:9'
									overlay='/overlay.png'
								/>
							)}
						/>
					</div>
				</div>

				<div className='text-center mt-10'>
					<Button
						type='submit'
						isLoading={isLoading}
					>
						Update
					</Button>
				</div>
			</form>
		</div>
	)
}
