import cn from 'clsx'
import type { ButtonHTMLAttributes, ReactNode } from 'react'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
	isLoading?: boolean
	children: ReactNode
	variant?: 'secondary' | 'primary' | 'simple'
}

export function Button({ children, isLoading, variant = 'primary', ...props }: Props) {
	return (
		<button
			className={cn('py-2 px-10 font-semibold rounded  transition-colors disabled:bg-gray-400', {
				'bg-primary text-white hover:bg-red-400': variant === 'primary',
				'bg-gray-600 text-white hover:bg-gray-500': variant === 'secondary',
				'bg-border hover:bg-border/10 transition-all font-medium rounded h-max py-2.5 px-4':
					variant === 'simple'
			})}
			disabled={isLoading || props.disabled}
			{...props}
		>
			{isLoading ? 'Loading...' : children}
		</button>
	)
}
