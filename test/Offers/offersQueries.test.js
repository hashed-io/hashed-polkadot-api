const PolkadotApi = require('../../src/model/polkadotApi')
const { MarketplaceApi } = require('../../src/model/polkadot-pallets')
jest.setTimeout(40000)
let polkadotApi
let marketplaceApi
let uniquesApi
/**
 * Parameters necessary
 */
const marketplaceId = '0x9ecd4b35ce747161be432542b9203649cdf20ac09c93a305c82db311e85ad6fd'
const offerId = '0xfcdc0bc4acd7855b200f8c03d796fadb844e76d031f3c85992d80db0d89aa6c7'
const collectionId = 0
const itemId = 0
const chainURI = 'ws://127.0.0.1:9944'

const address = '5DNuoeTbCuV23bLiyVpQTFZ1aSShuEyhSZjHxj5bugRNSu8S'

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
    expect(marketplaceApi).toBeDefined()
  })
})

describe('Request data from Offers methods [Marketplace Pallet]', () => {
  test('Get all offers', async () => {
    const allOffers = await marketplaceApi.getAllOffers()
    expect(allOffers).toBeDefined()
    expect(allOffers.length).toBeGreaterThan(0)
    expect(!!allOffers[0].id[0]).toBeTruthy()
    expect(!!allOffers[0].value).toBeTruthy()
  })
  test('Get specific offer', async () => {
    const offer = await marketplaceApi.getOffer({
      offerId
    })
    expect(offer).toBeDefined()
    expect(typeof offer).toBe('object')
  })
  test('Get Offers by MarketplaceId', async () => {
    const offersWithMarketplaceId = await marketplaceApi.getOffersByMarketplace()
    expect(offersWithMarketplaceId.length).toBeGreaterThan(0)
    expect(!!offersWithMarketplaceId[0].id[0]).toBeTruthy()
    expect(!!offersWithMarketplaceId[0].value[0]).toBeTruthy()
  })
  test('Get Offer by Item', async () => {
    const offer = await marketplaceApi.getOffersByItem({
      collectionId,
      itemId
    })
    expect(offer.length).toBeGreaterThan(0)
  })
  test('Get Offer Id using Address Account', async () => {
    const offerId = await marketplaceApi.getOfferByAccount({
      address
    })
    expect(offerId[0]).toBeDefined()
  })
  test('Get offers & account', async () =>{
    const offersWithAccount = await marketplaceApi.getOffersByAccount()
    expect(offersWithAccount.length).toBeGreaterThan(0)
    expect(!!offersWithAccount[0].id[0]).toBeTruthy()
    expect(!!offersWithAccount[0].value[0]).toBeTruthy()
  })
})

describe('Offer data structure', () => {
  test('Validate the structure of OfferData', async () => {
    const offerDataKeysObject = 
      [
        'marketplaceId', 'collectionId',
        'itemId', 'creator',
        'price', 'status',
        'creationDate', 'expirationDate',
        'offerType', 'buyer'
      ]
    const offer = await marketplaceApi.getOffer({
      offerId
    })
    expect(Object.keys(offer))
      .toEqual(expect.arrayContaining(offerDataKeysObject))
  })
})