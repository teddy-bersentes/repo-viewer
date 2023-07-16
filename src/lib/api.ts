import { QueryClient } from '@tanstack/react-query'
import type { Commit, GithubResponse, Repository } from './types'

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retryDelay: 1000,
			retry: 1,
			staleTime: 1000 * 60 * 10 // 10 minutes
		}
	}
})

export const getRepositories = async (): Promise<GithubResponse<Repository>> => {
	const response = await fetch('https://api.github.com/search/repositories?q=stars:%3E1&sort=stars&order=desc')
	const data = await response.json()
	return data
}

export const getCommits = async (params: {
	owner: string
	repo: string
}): Promise<Commit[]> => {
	const startTime = Date.now()
	const response = await fetch(`https://api.github.com/repos/${params.owner}/${params.repo}/commits`)
	const data = await response.json() as Commit[]
	const endTime = Date.now()

	// We always wait at least 1 second so that I can show the loading state for a bit
	if (endTime - startTime < 1000) {
		await new Promise(resolve => setTimeout(resolve, 1000 - (endTime - startTime)))
	}

	// We manually filter out commits that are older than 24 hours, because I couldn't 
	// find the API docs for it :\
	const date = new Date();
	date.setDate(date.getDate() - 1);
	const recentCommits = data.filter(commit => new Date(commit.commit.author.date) > date);

	return recentCommits
}