"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useAutoAnimate } from '@formkit/auto-animate/react';

interface NavItemChild {
  label: string;
  link: string;
}

interface NavItemType {
  label: string;
  link: string;
  children?: NavItemChild[];
}

const navItems: NavItemType[] = [
  {label: "Overview", link: "/overview" },
  {
    label: "Support",
    link: "#",
    children: [
      { label: "Installation Manual", link: "/support/installation-manual" },
      { label: "FAQ", link: "/support/faq" }
    ]
  },
  {
    label: "Company",
    link: "#",
    children: [
      { label: "About Us", link: "/company/about-us" },
      { label: "Contact Us", link: "/company/contact-us" },
      { label: "Privacy Policy", link: "/company/privacy-policy" },
      { label: "License Agreement", link: "/company/license-agreement" }
    ]
  }
];

const Navbar: React.FC = () => {
  const [isSideMenuOpen, setSideMenu] = useState(false);
  const [animationParent] = useAutoAnimate();

  const toggleSideMenu = () => setSideMenu(!isSideMenuOpen);

  return (
    <nav className="mx-auto flex w-full max-w-7xl justify-between px-4 py-5 text-sm bg-white" ref={animationParent}>
      <div className="flex items-center gap-10">
        <span className="font-bold">Logo</span>
        <div className="hidden md:flex items-center gap-4">
          {navItems.map((item, index) => (
            <NavItem key={index} {...item} />
          ))}
        </div>
      </div>

      <button onClick={toggleSideMenu} className="md:hidden text-neutral-600 hover:text-blue-600 transition-colors">
        {isSideMenuOpen ? 'Close' : 'Menu'}
      </button>

      {isSideMenuOpen && <MobileNav items={navItems} onClose={toggleSideMenu} />}
    </nav>
  );
};

const NavItem: React.FC<NavItemType> = ({ label, link, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [animationParent] = useAutoAnimate();

  return (
    <div 
      className="relative group" 
      onMouseEnter={() => setIsOpen(true)} 
      onMouseLeave={() => setIsOpen(false)}
      ref={animationParent}
    >
      <Link href={link} className="px-2 py-3 text-neutral-600 hover:text-blue-600 transition-colors">
        <span>{label} {children && (isOpen ? '▲' : '▼')}</span>
      </Link>
      {children && (
        <div className={`absolute left-0 top-full bg-white shadow-md rounded-lg py-3 ${isOpen ? 'block' : 'hidden'}`}>
          {children.map((child, index) => (
            <Link key={index} href={child.link} className="block py-1 px-4 text-neutral-600 hover:text-blue-600 hover:bg-gray-100 transition-colors whitespace-nowrap">
              {child.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

interface MobileNavProps {
  items: NavItemType[];
  onClose: () => void;
}

const MobileNav: React.FC<MobileNavProps> = ({ items, onClose }) => {
  const [animationParent] = useAutoAnimate();

  return (
    <div className="fixed inset-0 bg-black/60 z-50 md:hidden">
      <div className="bg-white h-full w-full max-w-sm float-right p-4" ref={animationParent}>
        <button onClick={onClose} className="float-right text-neutral-600 hover:text-blue-600 transition-colors">Close</button>
        <div className="clear-both pt-8">
          {items.map((item, index) => (
            <MobileNavItem key={index} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
};

const MobileNavItem: React.FC<NavItemType> = ({ label, link, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [animationParent] = useAutoAnimate();

  return (
    <div ref={animationParent}>
      <div 
        className="py-2 px-4 text-neutral-600 hover:text-blue-600 transition-colors cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        {label} {children && (isOpen ? '▲' : '▼')}
      </div>
      {children && isOpen && (
        <div className="pl-6">
          {children.map((child, index) => (
            <Link 
              key={index} 
              href={child.link} 
              className="block py-2 px-4 text-neutral-600 hover:text-blue-600 transition-colors"
            >
              {child.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Navbar;