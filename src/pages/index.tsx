import Head from "next/head";
import { Geist, Geist_Mono } from "next/font/google";
import { SwiperGallery } from "@/widgets/SwiperGallery/ui";
import NoSSRWrapper from "@/shared/ui/NoSSRWrapper/NoSSRWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <section>
      <Head>
        <title>Dynamic slides</title>
        <meta name="description" content="Dynamic slides with swiper" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={`${geistSans.variable} ${geistMono.variable}`}>
        <NoSSRWrapper>
          <SwiperGallery />
        </NoSSRWrapper>
      </div>
    </section>
  );
}
