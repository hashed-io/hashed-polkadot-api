const PolkadotApi = require('../src/model/polkadotApi')
const { MarketplaceApi } = require('../src/model/polkadot-pallets')

jest.setTimeout(40000)
let polkadotApi
let marketplaceApi

describe('Connect with hashedChain', () => {
  test('Create PolkadotApi instance', async () => {
    polkadotApi = new PolkadotApi('wss://n1.hashed.systems')
    await polkadotApi.connect()
    expect(polkadotApi !== undefined)
  })
  test('Create MarketplaceApi instance', async () => {
    marketplaceApi = new MarketplaceApi(polkadotApi)
    expect(marketplaceApi).toBeDefined()
  })

})

describe('Request data from marketplace pallet', () => {
    test('Get a marketplace by id', async () => {
        const marketplace = await marketplaceApi.getMarketplaceById({ marketId: '0xa54035afb49b42cdacbe27c830dd1b66078069886e80cdd8bab3d139caa0489e' })
        console.log('marketplace', marketplace)
        expect(marketplace).toBeDefined()
    })
})