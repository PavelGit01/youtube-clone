import { type NextRequest, NextResponse } from 'next/server'

import { getTokensFromRequest } from './utils/get-tokens-from-request'
import { jwtVerifyServer } from './utils/jwt-verify'
import { redirectToLogin } from './utils/redirect-to-login'

export const protectStudio = async (request: NextRequest) => {
	const tokens = await getTokensFromRequest(request)

	if (!tokens) return redirectToLogin(request)

	const verifiedData = jwtVerifyServer(tokens.accessToken)

	if (!verifiedData) return redirectToLogin(request)

	return NextResponse.next()
}
