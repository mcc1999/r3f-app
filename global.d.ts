import type { GLTF } from 'three-stdlib'

export interface GLTFResult extends GLTF {
  nodes: any,
  materials: any
} 

type NextPageWithLayout<P = {}, IP = P> = import('next').NextPage<P, IP> & {
  getLayout?: (page: import('react').ReactElement) => import('react').ReactNode
}