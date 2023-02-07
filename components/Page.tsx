import Head from 'next/head';
import { PropsWithChildren } from 'react';
import NavBar from './NavBar';

interface PageProps extends PropsWithChildren {
	title: string;
}

const Page = ({ title, children }: PageProps): JSX.Element => {
	return (
		<>
			<Head>
				<title>{`${title} - Next Shop`}</title>
			</Head>
			<main>
				<NavBar />
				{children}
			</main>
		</>
	);
}

export default Page;