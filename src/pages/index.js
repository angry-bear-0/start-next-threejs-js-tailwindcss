import Image from 'next/image'
import { Inter } from 'next/font/google'
import Scene from '@/Component/Three/Scene'
import { Vector3 } from 'three'
import GizmoHelperComponent from '@/Component/Three/GizmoHelper'
import DxfViewer from '@/Component/Three/DxfViewer'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@/Component/Three/OrbitControls'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between ${inter.className}`}
    >

      <div className='w-screen h-screen'>
        <div className='w-full h-full grid grid-cols-2'>
          <div className='w-full h-full border-2 border-black'>
            <div className='absolute top-[20px] left-[20px] flex items-center justify-center'>
              My Email address is "zgmr07213@gmail.com". Please hire me.
            </div>
            <Scene controls={false} cameraPosition={new Vector3(5, 5, 5)}>
              <GizmoHelperComponent />
            </Scene>
          </div>
          <div className='w-full h-full border-2 border-black'>
            <Scene className='w-full h-full' controls={false} cameraPosition={new Vector3(0, 0, 200)}>
              <DxfViewer />
              <OrbitControls makeDefault />
            </Scene>
          </div>
        </div>
      </div>
    </main>
  )
}