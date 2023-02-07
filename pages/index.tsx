import { GetStaticProps } from 'next';
import ProductCard from '../components/ProductCard';
import { getProducts, Product } from '../lib/products';
import Page from '../components/Page';

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
    <Page title="Indoor Plants">
      <h1 className="text-4xl my-5 ml-5 font-bold">Indoor Plants</h1>
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
    </Page>
  )
}

export default HomePage;
