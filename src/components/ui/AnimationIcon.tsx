import { m } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'

interface Props {
	Icon: LucideIcon
	size?: number
}

export const AnimationIcon = ({ Icon, size = 20 }: Props) => {
	const MotionIcon = m(Icon)

	return (
		<MotionIcon
			size={size}
			className='opacity-50'
			whileHover={{
				scale: 1.1,
				opacity: 1
			}}
			transition={{
				type: 'spring',
				stiffness: 500,
				damping: 30
			}}
		/>
	)
}
