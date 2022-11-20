import { useEffect } from 'react'
import Link from 'next/link'
import Layout from '../components/Layout'
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'
import Image from 'next/image'
import TestImage from '../assets/test.jpg'

const IndexPage = () => {
  useEffect(() => {
    const handleMessage = (_event, args) => alert(args)

    // add a listener to 'message' channel
    global.ipcRenderer.addListener('message', handleMessage)

    return () => {
      global.ipcRenderer.removeListener('message', handleMessage)
    }
  }, [])

  const onSayHiClick = () => {
    global.ipcRenderer.send('message', 'hi from next')
  }

  return (
    <Layout title="Home | Next.js + TypeScript + Electron Example">
      <TransformWrapper>
        <TransformComponent>
          <Image src={TestImage} width={640} height={427} alt="test image" />
        </TransformComponent>
      </TransformWrapper>
      <h1>Hello Next.js 👋</h1>
      <button onClick={onSayHiClick}>Say hi to electron</button>
      <p>
        <Link href="/about">About</Link>
      </p>
    </Layout>
  )
}

export default IndexPage
