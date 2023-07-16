export type GithubResponse<T> = {
	incomplete_results: boolean
	total_count: number
	items: T[]
}

export type Owner = {
	login: string
	id: number
	avatar_url: string
	html_url: string
	url: string
}

export type Repository = {
	id: number
	name: string
	description: string
	stargazers_count: number
	url: string
	html_url: string
	topics: string[]
	owner: Owner
	language: string
	// There are way more fields, but we only need these
}

export type Commit = {
	sha: string
	node_id: string
	commit: {
		message: string
		author: {
			name: string
			email: string
			date: string
		}
	}
	url: string
	html_url: string
	author?: {
		login: string
		id: number
		avatar_url: string
		html_url: string
	}

}