import { Fragment, useState } from 'react'
import { Card } from '~/components/Card'
import { useQuery } from '@tanstack/react-query'
import { getRepositories } from '~/lib/api'
import { CommitPopup } from '~/components/CommitPopup'
import type { Repository } from '~/lib/types'
import { Transition } from '@headlessui/react'
import { Spinner } from '~/components/icons'

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
			<Transition
				enter="transform transition duration-[400ms]"
				enterFrom="opacity-0"
				enterTo="opacity-100"
				leave="transform duration-300 transition ease-in-out"
				leaveFrom="opacity-100"
				leaveTo="opacity-0"
				as={Fragment}
				show={repoQuery.isLoading}
			>
				<div className='absolute flex flex-row items-center justify-center w-screen h-screen gap-3 bg-white'>
					<Spinner className='w-5 h-5 text-gray-500 animate-spin' />
					<p className='font-medium text-gray-500'>
						Loading...
					</p>
				</div>
			</Transition>

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
