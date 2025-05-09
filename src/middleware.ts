import type { NextRequest, NextResponse } from 'next/server'

import { PAGE } from './config/public-page.config'
import { STUDIO_PAGE } from './config/studio-page.config'
import { protectLoginPages } from './server-actions/middlewares/protect-login.middleware'
import { protectStudio } from './server-actions/middlewares/protect-studio.middleware'

export async function middleware(request: NextRequest, response: NextResponse) {
	const pathName = request.nextUrl.pathname // /studio

	if (pathName.includes(STUDIO_PAGE.HOME) || pathName.includes('/my')) {
		return protectStudio(request)
	}

	if (pathName.includes(PAGE.AUTH)) {
		return protectLoginPages(request)
	}
}

export const config = {
	matcher: ['/studio/:path*', '/auth/:path*', '/my/:path*']
}
