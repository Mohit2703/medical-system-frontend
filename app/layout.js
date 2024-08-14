'use client';
import { Inter } from "next/font/google";
import "./globals.css";
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { Providers } from "./GlobalRedux/provider";
import customTheme from './theme'; // adjust the import path if necessary
import Navbar from "./Components/Navbar/Navbar";
import {store} from "./GlobalRedux/store";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ChakraProvider theme={customTheme}>
          <Providers store={store}>
            <ColorModeScript initialColorMode={customTheme.config.initialColorMode} />
            <Navbar />
            <main id="main_content">
              {children}
            </main>
          </Providers>
        </ChakraProvider>
      </body>
    </html>
  );
}
