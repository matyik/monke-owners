import { useState } from 'react'
import Head from 'next/head'
import axios from 'axios'

const Discord = () => {
  const [wallet, setWallet] = useState()
  const [discord, setDiscord] = useState()
  const [status, setStatus] = useState('')

  const connectWallet = async () => {
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
    setWallet(accounts[0])
  }

  const sendWallet = async () => {
    if (discord.search('#') === -1) {
      setStatus('Please format your discord like this: Username#1234')
      return
    }
    const res = await axios.post(
      `/api/sendwallet?discord=${discord}&wallet=${wallet}`
    )
    setStatus(res.data.msg)
  }

  return (
    <>
      <Head>
        <title>Discord Verification - Crypto Monke Owners</title>
        <meta
          name='description'
          content='Verify you own a Monke and get the @Monke Owner role.'
        />
      </Head>
      <h1>Discord Verification</h1>
      <input
        type='text'
        placeholder='Discord Username#Tag'
        onChange={(e) => setDiscord(e.target.value)}
      />
      <button disabled={wallet} onClick={connectWallet}>
        {wallet ? wallet : 'Connect Wallet'}
      </button>
      <button disabled={!wallet | !discord} onClick={sendWallet}>
        Connect to Discord
      </button>
      <br />
      <span>{status}</span>
    </>
  )
}

export default Discord
