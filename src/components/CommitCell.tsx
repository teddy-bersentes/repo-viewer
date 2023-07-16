import Link from "next/link"
import Image from "next/image"
import clsx from "clsx"
import type { Commit } from "~/lib/types"
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

type Props = {
	commit: Commit
} & React.HTMLAttributes<HTMLDivElement>

export function CommitCell({ commit, className, ...props }: Props) {
	return (
		<div key={commit.sha} className={clsx('flex flex-col px-6 py-3 transition-colors hover:bg-gray-50', className)} {...props}>
			<Link
				href={commit.html_url}
				target='_blank'
				className='truncate hover:underline hover:text-blue-600'
			>
				{commit.commit.message}
			</Link>

			<div className='flex flex-row items-center mt-1.5 text-sm'>
				<Link
					href={commit.author?.html_url || '/'}
					target='_blank'
					className='flex flex-row items-center font-medium hover:underline'
				>
					{commit.author && (
						<Image
							alt='avatar'
							src={commit.author.avatar_url}
							className='mr-1 rounded-full'
							width={20}
							height={20}
						/>
					)}
					<span>
						{commit.commit.author.name}
					</span>
				</Link>

				<span className='ml-1 text-gray-500'>
					committed {dayjs(commit.commit.author.date).fromNow()}
				</span>
			</div>
		</div>
	)
}

export function CommitCellSkeleton() {
	return (
		<div className='flex flex-col px-6 py-3'>
			<div className='w-3/4 h-4 bg-gray-200 rounded-full animate-pulse' />
			<div className='flex flex-row items-center mt-1.5'>
				<div className='w-5 h-5 bg-gray-200 rounded-full animate-pulse' />
				<div className='w-24 h-3 ml-1 bg-gray-200 rounded-full animate-pulse' />
			</div>
		</div>
	)
}