import Footer from "@/components/footer/Footer";
import UserHeader from "@/components/header/UserHeader";
import InjectCSS from "@/components/lib-loader/InjectCSS";
import MenuHeader from "@/components/menu-header/MenuHeader";
import PopupSignin from "@/components/popup/PopupSignin";
import PopupSignup from "@/components/popup/PopupSignup";
import { Geist, Geist_Mono } from "next/font/google";
import Head from "next/head";
import Script from "next/script";
import "./globals.css";
import Chatbot from "@/components/chatbot/Chatbot";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Lové - Nền tảng đặt workshop chất lượng",
  description: "Love, nơi tụ họp của những workshop chất lượng và đặt vé siêu đơn giản",
  charset: "UTF-8",
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <meta charSet="UTF-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <meta name="msapplication-TileColor" content="#0E0E0E" />
        <meta name="template-color" content="#0E0E0E" />
        <meta name="description" content="Index page" />
        <meta name="keywords" content="index, page" />
        <meta name="author" content="" />
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />

      </Head>

      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <MenuHeader />
        <UserHeader />
        {children}
        <Footer />

        <PopupSignin />
        <PopupSignup />
        <Chatbot />

        <InjectCSS url="/assets/lib/user/css/style.css?v=1.0.0" />

        <Script
          src="/assets/lib/user/js/vendor/jquery-3.7.1.min.js"
          strategy="beforeInteractive"
        />
        <Script
          src="/assets/lib/user/js/vendor/jquery-migrate-3.3.0.min.js"
          strategy="beforeInteractive"
        />
        <Script
          src="/assets/lib/user/js/vendor/bootstrap.bundle.min.js"
          strategy="beforeInteractive"
        />

        <Script
          src="/assets/lib/user/js/plugins/magnific-popup.js"
          strategy="afterInteractive"
        />
        <Script
          src="/assets/lib/user/js/plugins/perfect-scrollbar.min.js"
          strategy="afterInteractive"
        />
        <Script
          src="/assets/lib/user/js/plugins/swiper-bundle.min.js"
          strategy="afterInteractive"
        />
        <Script
          src="/assets/lib/user/js/plugins/slick.js"
          strategy="afterInteractive"
        />
        <Script
          src="/assets/lib/user/js/plugins/jquery.carouselTicker.js"
          strategy="afterInteractive"
        />
        <Script
          src="/assets/lib/user/js/plugins/masonry.min.js"
          strategy="afterInteractive"
        />
        <Script
          src="/assets/lib/user/js/plugins/scrollup.js"
          strategy="afterInteractive"
        />
        <Script
          src="/assets/lib/user/js/plugins/wow.js"
          strategy="afterInteractive"
        />
        <Script
          src="/assets/lib/user/js/plugins/waypoints.js"
          strategy="afterInteractive"
        />
        <Script
          src="/assets/lib/user/js/plugins/counterup.js"
          strategy="afterInteractive"
        />
        <Script
          src="/assets/lib/user/js/plugins/bootstrap-datepicker.js"
          strategy="afterInteractive"
        />
        <Script
          src="/assets/lib/user/js/plugins/dark.js"
          strategy="afterInteractive"
        />

        <Script
          src="/assets/lib/user/js/vendor/jquery.countdown.min.js"
          strategy="afterInteractive"
        />
        <Script
          src="/assets/lib/user/js/plugins/noUISlider.js"
          strategy="afterInteractive"
        />
        <Script
          src="/assets/lib/user/js/plugins/slider.js"
          strategy="afterInteractive"
        />

        <Script
          src="/assets/lib/user/js/main.js?v=1.0.0"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
