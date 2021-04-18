import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import './App.css';
import axios from 'axios';

function App() {
  const [addr, setAddr] = useState('')
  const [balance, setBalance] = useState(0)
  const [usdBalance, setUsdBalance] = useState(0)
  const [USD, setUSD] = useState('')

  const connectEthAccount = async () => {
    const ethereum = window.ethereum
    if (ethereum) {
      window.web3 = new Web3(ethereum)
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
      if (accounts) {
        setAddr(accounts[0])
      }
    }
    else {
      console.log("no ethereum")
    }
  }

  const getAccountBalance = async () => {
    const web3 = window.web3

    const balance = await web3.eth.getBalance(addr)
    const eth = await web3.utils.fromWei(balance, 'ether')
    setBalance(eth)
    console.log('eth = ', eth)

    const res = await fetch("https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD&api_key=ecf9e67ca35e3d751204ad264b00c3c1fac944b825def62bc5bd578cd50d0249")
    const json = await res.json()
    console.log(json.USD)
    setUSD(json.USD)
    setUsdBalance(json.USD * eth)
  }

  const fetchETHUSD = () => {
    setInterval(async () => {
      const res = await fetch("https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD&api_key=ecf9e67ca35e3d751204ad264b00c3c1fac944b825def62bc5bd578cd50d0249")
      const json = await res.json()
      console.log(json.USD)
      setUSD(json.USD)
    }, 30000)

  }

  // const getUSDBalance = async (eth) => {
  //   if (eth > 0) {
  //     const response = await axios.get(`http://localhost:8000/api/GetExchangeRate?amount=${eth}`)
  //     console.log('usd = ', response.data.USD)
  //     setUsdBalance(USD * balance)
  //   }
  //   else {
  //     setUsdBalance(0)
  //   }
  // }

  // useEffect(() => {
  //   getUSDBalance(balance)
  // }, [balance, addr])

  useEffect(() => {
    fetchETHUSD()
  })

  return (
    <div className='container'>
      <div className="header">React Eth</div>
      <div className='dynamic-card'>  <div className="dcard-head">ETH to USD:</div> <div className="dcard-text">{USD}</div></div>
      <button className='btn' onClick={connectEthAccount}>Connect Account</button>
      <div className="card">
        {/* <div className='card-header'>Connected ethereum adderss: </div> */}
        <div className='card-header'>{addr}</div>
        <div className="card-text">
          <button className='btn' onClick={getAccountBalance}>Get Balance</button>
          <div>
            <p> <span>ETH:</span> {balance}</p>
            <p> <span>USD:</span> {usdBalance}</p>
          </div>
        </div>

      </div>

    </div>
  );
}

export default App;
