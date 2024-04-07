import Logo from "../../assets/images/logo.png";
import { useState, Fragment, useEffect } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import UserCircleIcon from "@heroicons/react/24/outline/UserCircleIcon";
import { useNavigate } from "react-router-dom";

const classNames = (...classes: string[]): string => classes.filter(Boolean).join(' ');

const Appbar = () => {
  const navigate = useNavigate();
  const authenticated = !!localStorage.getItem("token");
  const userID = localStorage.getItem("userID"); // Assuming you store the user ID in localStorage
  const userName = localStorage.getItem("userName");

  const [userNavigation, setUserNavigation] = useState(authenticated
    ? [
      { name: 'Profile', href: '#' },
      { name: 'Sign out', href: '/logout' },
    ]
    : [
      { name: 'Sign in', href: '/signin' },
      { name: 'Sign up', href: '/signup' },
    ]);

  const updateUserNavigation = (isAuthenticated: boolean) => {
    const updatedNavigation = isAuthenticated
      ? [
        { name: 'Profile', href: '#' },
        { name: 'Sign out', href: '/logout' },
      ]
      : [
        { name: 'Sign in', href: '/signin' },
        { name: 'Sign up', href: '/signup' },
      ];
    setUserNavigation(updatedNavigation);
  };

  useEffect(() => {
    updateUserNavigation(authenticated);
  }, [authenticated]);

  const handleNewBlogClick = () => {
    if (userID) {
      navigate(`/createBlog`);
    } else {
      // Handle the case where the user ID is not available
      console.error("User ID not available");
    }
  };

  return (
    <>
      <Disclosure as="nav" className="border-b border-slate-200 bg-gradient-to-r from-indigo-400 via-blue-300 to-sky-200 text-black p-4 rounded-lg">
        {() => (
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between">
            {/* Left section */}
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <img
                  className="h-20 w-auto" // Adjusted height and width
                  src={Logo}
                  alt="Collaborative-Blogging"
                />
              </div>
              <div>
                <p className="text-2xl font-bold text-black">{userName}</p>
              </div>
            </div>

            {/* Center section */}
            <div className="flex-grow text-center">
              <h1 className="text-2xl font-bold text-black underline decoration-indigo-500">Welcome to Collaborative Blogging</h1>
            </div>

            {/* Right section */}
            <div className="flex items-center space-x-4">
              {authenticated && (
                <div className="relative">
                  <button
                    onClick={handleNewBlogClick}
                    className="p-2 text-black hover:text-blue-600 rounded-full font-bold focus:outline-none"
                  >
                    + New Blog
                  </button>
                </div>
              )}
              <div className="relative">
                <Menu>
                  <Menu.Button className="p-2 text-black font-bold hover:text-blue-600 rounded-full focus:outline-none">
                    <UserCircleIcon className="h-6 w-6" aria-hidden="true" />
                  </Menu.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 w-48 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {userNavigation.map((item) => (
                        <Menu.Item key={item.name}>
                          {({ active }) => (
                            <a
                              href={item.href}
                              className={classNames(
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm text-pink-700'
                              )}
                            >
                              {item.name}
                            </a>
                          )}
                        </Menu.Item>
                      ))}
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>
        )}
      </Disclosure>
    </>
  );
};

export default Appbar;
