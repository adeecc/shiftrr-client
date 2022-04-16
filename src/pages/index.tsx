import type { NextPage } from 'next';
import NextLink from 'next/link';
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
        <div className="flex flex-col gap-y-3">
          <h1 className="text-5xl font-semibold">
            shiftrr<span className="text-accent-100">.</span>
          </h1>
          <NextLink
            href={`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/google`}
          >
            <a className="text-accent-100 border-2 border-accent-100 px-3 py-2 rounded-md">
              Login
            </a>
          </NextLink>
        </div>
      </div>
    </>
  );
};

export default Home;
