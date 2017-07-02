/* global Web3 globalState render */

// Setup

const Connect = window.uportconnect.Connect
const appName = 'FriendWallet'
const connect = new Connect(appName, {'network': {
        id: '0x4',
        registry: '0x2cc31912b2b0f3075a87b3640923d45a26cef3ee',
        rpcUrl: 'https://rinkeby.infura.io'
      }})
//const connect = new Connect(appName)
const web3 = connect.getWeb3()

// uPort connect

const uportConnect = () => {
  connect.requestCredentials().then((credentials) => {
    console.log(credentials)
    globalState.uportId = credentials.address
    globalState.name = credentials.name
    console.log('address:' + window.uportconnect.MNID.decode(globalState.uportId).address)
    render()
  }, console.err)
}

// Send ether
const sendEther = () => {
  const value = parseFloat(globalState.sendToVal) * 1.0e18
  const gasPrice = 100000000000
  const gas = 500000

  web3.eth.sendTransaction(
    {
      from: window.uportconnect.MNID.decode(globalState.uportId).address,
      to: globalState.sendToAddr,
      value: value,
      gasPrice: gasPrice,
      gas: gas
    },
    (error, txHash) => {
      if (error) { throw error }
      globalState.txHash = txHash
      render()
    }
  )
}
