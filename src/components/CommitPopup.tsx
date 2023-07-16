import { Dialog } from '@headlessui/react'
import { useQuery } from '@tanstack/react-query'
import { filler } from '~/utils/filler'
import type { Repository } from '~/lib/types'
import { getCommits } from '~/lib/api'
import { XMark } from './icons'
import { Title } from './Title'
import { PopupBase } from './PopupBase'
import { CommitCell, CommitCellSkeleton } from './CommitCell'

type Props = {
	isOpen: boolean
	repo: Repository | null
	onClose: () => void
}

export function CommitPopup({ isOpen, onClose, repo }: Props) {
	const commitQuery = useQuery({
		queryKey: ['commits', repo?.id],
		enabled: isOpen && repo !== null,
		queryFn: () => repo && getCommits({
			owner: repo.owner.login,
			repo: repo.name,
		})
	})

	return (
		<PopupBase isOpen={isOpen} onClose={onClose}>
			{repo && (
				<Dialog.Panel className='w-full max-w-xl py-6 overflow-hidden overflow-y-scroll text-left transition-all bg-white shadow-xl rounded-2xl max-h-[42rem] no-scrollbar'>
					<Dialog.Title as='div' className='flex flex-row justify-between px-6'>
						<Title
							left={{ text: repo.owner.login, url: repo.owner.html_url }}
							right={{ text: repo.name, url: repo.html_url }}
						/>

						<button onClick={onClose} className='p-1 transition-colors bg-white rounded-full hover:bg-gray-50'>
							<XMark className='w-4 h-4 text-gray-500' />
						</button>
					</Dialog.Title>

					<p className='px-6 my-4 text-sm text-gray-500'>
						{repo.description}
					</p>

					<div className='flex flex-col w-full divide-y divide-gray-200'>
						{commitQuery.isLoading && filler(3).map(i => (
							<CommitCellSkeleton key={i} />
						))}

						{commitQuery.isSuccess && commitQuery.data && commitQuery.data.map(commit => (
							<CommitCell key={commit.sha} commit={commit} />
						))}

						{commitQuery.isSuccess && commitQuery.data?.length === 0 && (
							<div className='flex flex-col items-center justify-center px-6 py-3 text-sm text-center text-black'>
								No commits found for today.
							</div>
						)}

						{commitQuery.isError && (
							<div className='flex flex-col items-center justify-center px-6 py-3 text-sm text-center text-red-500'>
								Something went wrong
								<br />
								It might be a rate limit issue 🤔
							</div>
						)}
					</div>
				</Dialog.Panel>
			)}
		</PopupBase>
	)
}

