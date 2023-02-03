import Head from 'next/head'

const HomePage = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>Next Shop</title>
      </Head>
      <main>
        <div className="flex justify-center items-center h-screen">
          <h1 className="text-9xl uppercase font-black">Next Shop</h1>
        </div>
      </main>
    </>
  )
}

export default HomePage;
