import '@styles/globals.css'
import { AppProps } from 'next/app';
import { useEffect, FC } from 'react';
import { useRouter } from 'next/router';
import * as gtag from '@lib/analytics';
import Script from 'next/script';
import { GA_TRACKING_ID } from '@lib/analytics'


function MyApp({ pageProps, Component } : AppProps) {
  const router = useRouter();

    useEffect(() => {
        const handleRouteChange = (url: URL) => {
            gtag.pageview(url);
        };
        router.events.on(
            'routeChangeComplete',
            handleRouteChange
        );
        return () => {
            router.events.off(
                'routeChangeComplete',
                handleRouteChange
            );
        };
    }, [router.events]);
  return (
    <>
      <Script id="google-analytics-4"  strategy="afterInteractive" src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}` } />
      <Script async id="ga-4" strategy="afterInteractive" dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());

                    gtag('config', '${GA_TRACKING_ID}', {
                        page: window.location.pathname
                    });`
            }} 
      />
      <Script async id="hot-jar" strategy="afterInteractive" dangerouslySetInnerHTML={{
            __html: `(function(h,o,t,j,a,r){ h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)}; h._hjSettings={hjid:2774718,hjsv:6}; a=o.getElementsByTagName('head')[0]; r=o.createElement('script');r.async=1; r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv; a.appendChild(r); })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`
            }} 
      />
      <Script id="popup-maker" strategy="lazyOnload" async src="https://apiv2.popupsmart.com/api/Bundle/377842" />
      <Component {...pageProps} />
    </> 
  )
}

export default MyApp
