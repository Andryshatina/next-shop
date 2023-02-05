import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import ProductCard from '../components/ProductCard';
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
        <h1 className="text-4xl my-5 font-bold">Next Shop</h1>

        {/* <h1 className="text-4xl text-center my-5 font-bold">Featured Products</h1>

        <ul className="flex flex-wrap justify-center">
          {products.slice(0, 3).map((product) => (
            <li
              key={product.id}
              className="max-w-sm rounded overflow-hidden shadow-lg m-5"
            >
              <ProductCard product={product} />
            </li>
          ))}
        </ul>

        <h1 className="text-4xl text-center my-5 font-bold">All Products</h1> */}
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <li
              key={product.id}
              className="max-w-sm rounded overflow-hidden shadow-lg m-5 hover:shadow-xl"
            >
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      </main>
    </>
  )
}

export default HomePage;
