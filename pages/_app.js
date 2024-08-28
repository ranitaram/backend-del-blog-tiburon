import Aside from "@/components/Aside";
import Header from "@/components/Header";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react"
import { useState, useEffect } from 'react';
import { useRouter } from "next/router";
import Loading from "@/components/Loading";
import Aos from "@/components/Aos";

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  const [loading, setLoading] = useState(true);
  const router = useRouter(); // Use useRouter hook

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    // Check if the route is already complete when the component mounts
    if (router.isReady) {
      setLoading(false);
    }

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [router.isReady]); // Add router.events as dependency

  return <>
    <SessionProvider session={session}>
      {loading ? (
        // loading while load
        <div className='flex flex-col flex-center wh_100'>
          <Loading/>
          <h1 className='mt-1'>Loading...</h1>
        </div>
      ) : (
        <>
          <Header />
          <Aside />
          <main>
            <Aos>            
            <Component {...pageProps} />
            </Aos>
          </main>
        </>
      )}
    </SessionProvider>
  </>
}
