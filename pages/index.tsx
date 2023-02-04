import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { getProducts, Product } from '../lib/products';

interface HomePageProps {
  products: Product[];
}

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  const products = await getProducts();

  return {
    props: {
      products,
    },
    revalidate: parseInt(process.env.REVALIDATE_SECONDS),
  }
}

const HomePage: React.FC<HomePageProps> = ({ products }): JSX.Element => {
  //console.log(products)

  return (
    <>
      <Head>
        <title>Next Shop</title>
      </Head>
      <main>
        <div className="flex justify-center items-center h-screen">
          <h1 className="text-9xl uppercase font-black">Next Shop</h1>
        </div>
        <div className="flex flex-wrap justify-center">
          {products.map((product) => (
            <div
              key={product.id}
              className="max-w-sm rounded overflow-hidden shadow-lg m-5"
            >
              <div className="px-6 py-4">
                <Link href={`/products/${product.id}`}>
                  <div className="font-bold text-xl mb-2">{product.title}</div>
                </Link>
                <p className="text-gray-700 text-base">{product.description}</p>
              </div>
              <div className="px-6 py-4">
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                  {product.price}$
                </span>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  )
}

export default HomePage;
