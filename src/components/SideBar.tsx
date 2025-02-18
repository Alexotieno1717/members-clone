import React, { useEffect, useRef } from 'react';
import { ListBulletIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}


const Navigation = [
  {
    name: 'Members List',
    url: '/',
    icon: <ListBulletIcon className="w-6 h-6 transition duration-75 group-hover:text-gray-900" />,
  },
  {
    name: 'Firms',
    url: '/firms',
    icon: <ListBulletIcon className="w-6 h-6 transition duration-75 group-hover:text-gray-900" />,
  },
];
const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  // const location = useLocation();
  //
  // const { pathname } = location;
  const router = useRouter();

  const trigger = useRef(null);
  const sidebar = useRef(null);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
    //   if (!sidebarOpen || sidebar.current.contains(target) || trigger.current.contains(target)) return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-9999 flex h-screen w-56 flex-col overflow-y-hidden bg-[#206A3F] duration-300 ease-linear lg:static lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
        <Link href="/" className="font-semibold text-3xl text-white pt-12">
          <img src="/olivetreelogo-light.svg" alt="logo" />
        </Link>
        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
          <svg
            className="fill-current text-white"
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
              fill=""
            />
          </svg>
        </button>
      </div>
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        {/* <!-- Sidebar Menu --> */}
        <nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">
          {/* <!-- Menu Group --> */}
          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-white">MENU</h3>
            <ul className="mb-6 flex flex-col text-white gap-1.5">
              {Navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.url}
                    className={`flex items-center p-2 font-normal rounded-lg text-white hover:bg-white hover:text-[#0A5F59] duration-300 ease-linear ${
                      router.pathname === item.url ? 'bg-[#206A3F] shadow-lg w-full text-[#0A5F59] border border-white' : ''
                    }`}
                    // className="flex items-center p-2 font-normal rounded-lg text-white hover:bg-white hover:text-[#0A5F59] duration-300 ease-linear"
                  >
                    {item.icon}
                    <span className="ml-3">{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
