import { useState } from 'react'
import { Card } from '~/components/Card'
import { useQuery } from '@tanstack/react-query'
import { getRepositories } from '~/lib/api'
import { CommitPopup } from '~/components/CommitPopup'
import type { Repository } from '~/lib/types'

export default function Home() {
	const [isOpen, setIsOpen] = useState(false)
	const [focusedRepo, setFocusedRepo] = useState<Repository | null>(null)

	const repoQuery = useQuery({
		queryKey: ['repos'],
		queryFn: getRepositories,
		select: data => data.items,
		refetchInterval: false
	})

	return (
		<div className='grid grid-cols-1 gap-8 p-8 sm:grid-cols-2 md:grid-cols-3'>
			{repoQuery.isSuccess && repoQuery.data.map(repo => (
				<Card
					key={repo.id}
					repo={repo}
					onClick={() => {
						setFocusedRepo(repo)
						setIsOpen(true)
					}}
				/>
			))}

			<CommitPopup
				isOpen={isOpen}
				repo={focusedRepo}
				onClose={() => setIsOpen(false)}
			/>
		</div>
	)
}
