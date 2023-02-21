import Link from 'next/link';
import { useSignOut, useUser } from '../hooks/user';

const toggleNavbar = () => {
	const nav = document.getElementsByClassName('nav')[0];
	if (nav.className === 'nav hidden w-full flex-grow lg:flex lg:items-center lg:w-auto') {
		nav.className = 'nav block w-full flex-grow lg:flex lg:items-center lg:w-auto';
	} else {
		nav.className = 'nav hidden w-full flex-grow lg:flex lg:items-center lg:w-auto';
	}
}


const NavBar = (): JSX.Element => {
	const user = useUser();
	const signOut = useSignOut();

	return (
		<nav className="flex items-center justify-between flex-wrap bg-teal-500 p-6">
			<div className="flex items-center flex-shrink-0 text-white mr-6">
				<Link className="font-semibold text-xl tracking-tight" href='/'>Next Shop</Link>
			</div>
			<div className="block lg:hidden">
				<button
					className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white"
					onClick={toggleNavbar}
				>
					<svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
						<title>Menu</title>
						<path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
					</svg>
				</button>
			</div>
			<div className="nav hidden w-full flex-grow lg:flex lg:items-center lg:w-auto">
				<div className="text-sm lg:flex-grow">
					<Link href="/" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
						Home
					</Link>
					<Link href="/" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
						About
					</Link>
					<Link href="/" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white">
						Products
					</Link>
				</div>
				{user ? (
					<>
						<Link
							href="/user"
							className="inline-block text-sm px-4 py-2 mr-3 leading-none rounded text-white border border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0">
							{user.name}
						</Link>
						<Link
							href="/cart"
							className="inline-block text-sm px-4 py-2 mr-3 leading-none rounded text-white border border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0">
							Cart
						</Link>
						<button
							className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
							onClick={signOut}>
							<svg
								className="fill-current h-3 w-4"
								viewBox="0 0 20 20"
								xmlns="http://www.w3.org/2000/svg"
								color='darkred'
							>
								<title>Sign Out</title>
								<path d="M17.172 11H6v-2h11.172l-3.586-3.586 1.414-1.414L20 10l-5.828 5.828-1.414-1.414L17.172 11zM2 5h2v10H2V5z" />
							</svg>
						</button>

					</>) :
					(
						<Link
							href="/sign-in"
							className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0">
							Sign In
						</Link>
					)
				}

			</div>
		</nav>
	)
}

export default NavBar;