import Link from 'next/link';
import Image from 'next/legacy/image';

const Footer = (): JSX.Element => {
	return (
		<footer className="flex flex-col items-center justify-center w-full h-24 border-t">
			<div className="flex flex-row items-center justify-center w-1/2">
				<p className="text-sm text-gray-500 mr-2">Follow us on:</p>
				<Link href="https://www.instagram.com/" className='mr-2'>
					<Image
						src="/images/instagram-icon.svg"
						alt="Instagram"
						width={30}
						height={30}
					/>
				</Link>
				<Link href="https://twitter.com/" className='mr-2'>
					<Image
						src="/images/twitter-icon.svg"
						alt="Twitter"
						width={30}
						height={30}
					/>
				</Link>
				<Link href="https://www.facebook.com/">
					<Image
						src="/images/facebook-icon.svg"
						alt="Facebook"
						width={30}
						height={30}
					/>
				</Link>
			</div>
			<div className="flex flex-row items-center justify-center w-full">
				<p className="text-sm text-gray-500">© 2023 Next Shop. All rights reserved.</p>
			</div>




		</footer>

	);
}

export default Footer;
