export interface IPaggination {
	page:number
	limit:number
	totalCount:number
	totalPages: number
}

export interface IPaginationParams { 
	searchTerm?: string
	page?: number
	limit?: number
}