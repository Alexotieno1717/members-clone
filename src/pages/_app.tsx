import type { AppProps } from 'next/app';
import '../styles/globals.css';
import Sidebar from '@/components/SideBar';
import Header from '../components/Header';
import { useState } from 'react';
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
});

export default function App({ Component, pageProps }: AppProps) {
  // return <Component {...pageProps} />
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className={inter.className}>
      {/*  Page wrapper start  */}
      <div className="flex h-screen">
        {/*  Sidebar start  */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        {/* <!-- ===== Sidebar End ===== --> */}

        {/* Content Area Start   */}
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          {/*  Navbar start  */}
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          {/*  Navbar end  */}
          <div className=''>
           <Component {...pageProps} />
          </div>
        </div>
      </div>
    </div>
  );
}
