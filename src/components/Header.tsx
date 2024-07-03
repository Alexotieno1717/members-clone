import Link from 'next/link';
import React from 'react';

const Header = (props: { sidebarOpen: string | boolean | undefined; setSidebarOpen: (arg0: boolean) => void }) => {
  return (
    <header className="sticky top-0 z-10 flex w-full bg-white shadow-md">
      <div className="flex flex-grow items-center justify-between py-2 px-2 shadow-2 md:px-6 2xl:px-11">
        <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
          {/* <!-- Hamburger Toggle BTN --> */}
          <button
            aria-controls="sidebar"
            onClick={(e) => {
              e.stopPropagation();
              props.setSidebarOpen(!props.sidebarOpen);
            }}
            className="z-99999 block rounded-sm border border-stroke bg-blue-600 p-1.5 shadow-sm lg:hidden"
          >
            Menu
          </button>
          {/* <!-- Hamburger Toggle BTN --> */}
          <Link className="block text-white flex-shrink-0 lg:hidden" href="/">
            <h4 className="text-black text-3xl">Olive Tree</h4>
          </Link>
        </div>
      </div>
      <div className="flex items-end py-4 px-4 shadow-2 md:px-6 2xl:px-11">
        {/* <!-- User Area --> */}
        <h4 className="hidden lg:block bg-[#0A5F59] p-2 rounded-full text-white text-xl font-bold">OT</h4>
      </div>
    </header>
  );
};

export default Header;
