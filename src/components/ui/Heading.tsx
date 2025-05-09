import type { LucideIcon } from 'lucide-react'
import React, { type ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

interface Props {
	children: ReactNode
	Icon?: LucideIcon
	isH1?: boolean
	isPageHeading?: boolean
	className?: string
	clasNameHeading?: string
}
export const Heading = ({
	children,
	Icon,
	isH1 = false,
	isPageHeading = false,
	className,
	clasNameHeading
}: Props) => {
	return (
		<div
			className={twMerge(
				'flex items-center opacity-90',
				isPageHeading ? 'gap-2.5 mb-6' : 'gap-1.5  mb-4',
				className
			)}
		>
			{Icon && (
				<Icon
					className='text-primary'
					size={isPageHeading ? '30' : '24'}
				/>
			)}
			{isH1 || isPageHeading ? (
				<h1
					className={twMerge(
						'font-semibold',
						isPageHeading ? 'text-[2rem]' : 'text-lg',
						clasNameHeading
					)}
				>
					{children}
				</h1>
			) : (
				<h2 className={twMerge('font-semibold text-lg', clasNameHeading)}>{children}</h2>
			)}
		</div>
	)
}
