import styles from './index.module.scss'
import NavItem from '@/components/NavItem'

const NavList = [
  {
    title: 'Init Page',
    minimap: '',
    linkHref: 'init-page',
  },
  {
    title: 'Loading',
    minimap: '',
    linkHref: 'loading',
  },
  {
    title: 'Christmas Card',
    minimap: '',
    linkHref: 'christmas-card',
  },
  {
    title: 'Custom Effect',
    minimap: '',
    linkHref: 'custom-effect',
  },
  {
    title: 'Macbook',
    minimap: '',
    linkHref: 'macbook',
  },
  {
    title: 'Physic Rapier',
    minimap: '',
    linkHref: 'physic-rapier',
  },
  {
    title: 'Text 3D',
    minimap: '',
    linkHref: 'text-3d',
  },
  {
    title: 'Marble Game',
    minimap: '',
    linkHref: 'marble-game',
  },
  {
    title: 'Room In 3D',
    minimap: '',
    linkHref: 'room-in-3d',
  },
]
export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.navList}>
        {NavList.map(item => <NavItem key={item.title} {...item} />)}
      </div>
    </main>
  )
}
