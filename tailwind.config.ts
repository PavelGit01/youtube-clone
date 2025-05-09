import scrollbar from 'tailwind-scrollbar'
import type { Config } from 'tailwindcss'
import plugin from 'tailwindcss'

import { COLORS } from './src/constants/colors.constants'

const config: Config = {
	content: ['./src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
	theme: {
		extend: {
			colors: COLORS,
			padding: {
				layout: '1.5rem'
			},
			transitionDuration: {
				DEFAULT: '333ms'
			},
			transitionTimingFunction: {
				DEFAULT: 'ease-in-out'
			}
		}
	},
	plugins: [scrollbar]
}
export default config
