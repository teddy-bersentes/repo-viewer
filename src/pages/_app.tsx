import '~/styles/globals.css'
import type { AppProps } from 'next/app'
import { Inter } from 'next/font/google'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '~/lib/api'
import clsx from 'clsx'

const inter = Inter({ subsets: ['latin'] })

export default function App({ Component, pageProps }: AppProps) {
	return (
		<QueryClientProvider client={queryClient}>
			<main className={clsx(inter.className)}>
				<Component {...pageProps} />
			</main>
		</QueryClientProvider>
	)
}
