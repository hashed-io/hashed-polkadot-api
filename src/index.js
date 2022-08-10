const PolkadotApi = require('../src/model/polkadotApi')
const { NbvStorageApi, MarketplaceApi } = require('../src/model/polkadot-pallets')

function testMethod () {
    console.log('this is a test')
}

testMethod()

module.exports = {
  testMethod
}