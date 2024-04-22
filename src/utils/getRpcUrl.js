import random from 'lodash/random'

// Array of available nodes to connect to
const nodes = ['https://bsc-dataseed.binance.org/', 'https://bsc-dataseed1.defibit.io', 'https://bsc-dataseed.binance.org']
// const nodes = ['https://data-seed-prebsc-1-s1.binance.org:8545']

const getNodeUrl = () => {
  const randomIndex = random(0, nodes.length - 1)
  return nodes[randomIndex]
}

export default getNodeUrl
