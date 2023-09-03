import Image from 'next/image'
import React from 'react'
import styles from './index.module.scss'
import Link from 'next/link';

interface NavItemProps {
  linkHref: string;
  title: string;
  minimap: string;
}

const NavItem:React.FC<NavItemProps> = (props) => {
  const { linkHref, minimap, title } = props

  return (
    <Link href={linkHref} className={styles.threeJsNavItem}>
      <Image src={minimap} alt={title} className={styles.minimap} />
      <div>{title}</div>
    </Link>
  )
}

export default NavItem