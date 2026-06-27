import Script from "next/script";

/**
 * Google Analytics 4. Só é carregado se a variável NEXT_PUBLIC_GA_ID estiver
 * definida (ex.: G-XXXXXXXXXX) no .env.local ou nas variáveis da Vercel.
 * Enquanto não houver ID, nada é carregado — sem erros.
 */
export function Analytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  if (!gaId) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}', { anonymize_ip: true });
        `}
      </Script>
    </>
  );
}
