import type { NextPage } from 'next';
import Head from 'next/head';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>shiftrr.</title>

        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div className="h-screen grid place-items-center">
        <div className="">
          <h1 className="text-5xl font-semibold">
            shiftrr<span className="text-accent-100">.</span>
          </h1>
          <h4 className="text-2xl text-gray-400">Coming Soon!</h4>
        </div>
      </div>
    </>
  );
};

export default Home;
