import { useQuery } from '@tanstack/react-query'

import { userService } from '@/services/user.service'

export const useProfile = () => {
	const { data, isLoading, isSuccess, refetch } = useQuery({
		queryKey: ['profile'],
		queryFn: () => userService.getProfile(),
		refetchInterval: 1800000
	})

	return {
		profile: data?.data,
		isLoading,
		isSuccess,
		refetch
	}
}
