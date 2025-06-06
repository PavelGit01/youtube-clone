import { configureStore } from '@reduxjs/toolkit'
import { type TypedUseSelectorHook, useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'

import { authSlice } from './auth.slice'

export const store = configureStore({
	reducer: {
		auth: authSlice.reducer
	}
})

export type TRootState = ReturnType<typeof store.getState>
export type TAppDispatch = typeof store.dispatch

export const useAppDispatch: () => TAppDispatch = useDispatch
export const useTypedSelector: TypedUseSelectorHook<TRootState> = useSelector
