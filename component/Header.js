'use client';

import { useState } from 'react';
import Link from "next/link"
import Logo from "@/assets/k2logo.png"
import classes from "@/component/header/header.module.css"
import Image from "next/image"
import HeaderBackground from "./HeaderBackground"
import Navlink from "./nav/NavLink"
import { Menu, X } from 'lucide-react';

export default function Header(){
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return(
    <>
      <HeaderBackground/>
      <header className={classes.header}>
        <Link href="/" className={classes.logo}>
          <Image src={Logo} alt="logo" priority width={70}/>
          FirePup
        </Link>

        <button 
          className={classes.mobileMenuBtn}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        <nav className={`${classes.nav} ${mobileMenuOpen ? classes.navOpen : ''}`}>
          <ul>
            <li>
              <Navlink href="/meals" onClick={() => setMobileMenuOpen(false)}>
                Browse Meals
              </Navlink>
            </li>
            <li>
              <Navlink href="/community" onClick={() => setMobileMenuOpen(false)}>
                Foodies Community
              </Navlink>
            </li>
            <li>
              <Navlink href="/buyFood" onClick={() => setMobileMenuOpen(false)}>
                Order Food
              </Navlink>
            </li>
          </ul>
        </nav>
      </header>
    </>
  )
}