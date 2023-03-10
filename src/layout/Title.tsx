import Head from 'next/head'
import React from 'react'

function Title({title}:{title:String}) {
  return (
    <Head>
        <title>{title}</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
    </Head>
  )
}

export default Title