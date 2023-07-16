import type { Repository } from "~/lib/types";
import { abbreviate } from "~/utils/abbreviate";
import { Star } from "./icons";
import { CODING_LANG_MAP } from "~/utils/languages";
import { Title } from "./Title";
import clsx from "clsx";

type Props = {
	repo: Repository
} & React.HTMLAttributes<HTMLDivElement>

export function Card({ repo, className, ...props }: Props) {
	return (
		<div className={clsx('flex flex-col justify-between transition-colors bg-white border rounded-lg cursor-pointer border-slate-200 hover:border-slate-400', className)} {...props}>
			<header className='px-6 pt-6 pb-4'>
				<Title
					left={{ text: repo.owner.login, url: repo.owner.html_url }}
					right={{ text: repo.name, url: repo.html_url }}
				/>
			</header>

			<footer className='pb-6 px-6 flex flex-row items-center gap-3.5 text-sm'>
				<div className='flex flex-row items-center gap-1.5 text-gray-500'>
					<Star width='16' height='16' className='w-4 h-4' />
					<span>
						{abbreviate(repo.stargazers_count)}
					</span>
				</div>

				{repo.language && (
					<div className='flex flex-row items-center'>
						<div
							style={{ backgroundColor: CODING_LANG_MAP[repo.language] || '#000' }}
							className='w-2.5 h-2.5 rounded-full'
						/>

						<span className='ml-1.5 text-gray-500'>
							{repo.language}
						</span>
					</div>
				)}
			</footer>
		</div>
	)
}