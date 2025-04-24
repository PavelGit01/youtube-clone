'use client'

import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

import { PAGE } from '@/config/public-page.config'

import { useProfile } from '@/hooks/useProfile'

import { Button } from '../ui/button/Button'

import { channelService } from '@/services/channel.service'

export const SubscribeButton = ({ slug }: { slug: string }) => {
	const [loading, setLoading] = useState(false)
	const { profile, refetch } = useProfile()

	const { mutate } = useMutation({
		mutationKey: ['subscribe'],
		mutationFn: () => channelService.toggleSubscribe(slug),
		onMutate: () => setLoading(true),
		onSuccess: async () => {
			await refetch()
			setLoading(false)
		},
		onError: () => {
			setLoading(false)
		}
	})

	const router = useRouter()

	const clickHandler = () => {
		if (profile) {
			mutate()
		} else {
			router.push(PAGE.AUTH)
		}
	}

	const isSubscribed = profile?.subscriptions.some(sub => sub.slug === slug)

	return (
		<Button
			onClick={clickHandler}
			isLoading={loading}
			variant={isSubscribed ? 'secondary' : 'primary'}
		>
			{isSubscribed ? 'Subscribed' : 'Subscribe'}
		</Button>
	)
}
