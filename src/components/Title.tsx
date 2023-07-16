import Link from "next/link"
import { Book } from "./icons"
import clsx from "clsx"

type Props = {
	left: {
		text: string
		url: string
	}
	right: {
		text: string
		url: string
	}
} & React.HTMLAttributes<HTMLDivElement>

export function Title({ left, right, className, ...props }: Props) {
	return (
		<div className={clsx('flex flex-1', className)} {...props}>
			<span className='mr-2 mt-1'>
				<Book width='16' height='16' className='w-4 h-4 text-gray-500' />
			</span>
			<h1 className='tracking-wide text-gray-400 whitespace-pre-line truncate line-clamp-1'>
				<Link href={left.url} target='_blank' className='text-black pr-1 hover:underline outline-none'>
					{left.text}
				</Link>

				/

				<Link href={right.url} target='_blank' className='text-black font-medium pl-1 hover:underline'>
					{right.text}
				</Link>
			</h1>
		</div>
	)
}