const PolkadotApi = require('../../src/model/polkadotApi')
const { MarketplaceApi } = require('../../src/model/polkadot-pallets')
jest.setTimeout(40000)
let polkadotApi
let marketplaceApi
const chainURI = 'ws://127.0.0.1:9944'
describe('Connect with hashedChain', () => {
  test('Create PolkadotApi instance', async () => {
    polkadotApi = new PolkadotApi(
      { 
        chainURI,
        appName: 'Hashed test',
      }
    )
    await polkadotApi.connect()
    expect(polkadotApi !== undefined)
  })
  test('Create MarketplaceApi instance', async () => {
    marketplaceApi = new MarketplaceApi(polkadotApi)
    console.log(marketplaceApi)
    expect(marketplaceApi).toBeDefined()
  })

})

describe('Request all offers ', () => {
  test('Retrieve all offers', async () => {
    const allOffers = await marketplaceApi.getAllOffers()
    expect(allOffers).toBeDefined()
  })
})
