import { type PayloadAction, createSlice } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'

import { EnumTokens } from '@/types/auth.types'
import type { IUser } from '@/types/user.types'

interface IAuthState {
	user: IUser | null
	isLoggedIn: boolean
	accessToken: string | null
}

const initialState: IAuthState = {
	user: null,
	isLoggedIn: !!Cookies.get(EnumTokens.ACCESS_TOKEN),
	accessToken: Cookies.get(EnumTokens.ACCESS_TOKEN) || null
}

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setAuthData: (state, action: PayloadAction<{ user: IUser; accessToken: string }>) => {
			const { user, accessToken } = action.payload

			state.user = user
			state.isLoggedIn = true
			state.accessToken = accessToken
		},
		clearAuthData: state => {
			state.user = null
			state.isLoggedIn = false
			state.accessToken = null
		}
	}
})

export const { clearAuthData, setAuthData } = authSlice.actions
