**Hashed Polkadot API**

This client api is used to interact with gatedMarketplace pallet, this allow do quickly connection, queries and calls to TX to this pallet.

To install the hashed polkadot api api run the following command:

`npm i --save @jmgayosso/hashed-polkadot-api`
or
`yarn add --save @jmgayosso/hashed-polkadot-api`

To connect to hashed chain we can use an instanfe of [PolkadotApi](https://github.com/hashed-io/hashed-polkadot-api/blob/master/src/model/polkadotApi.js) that handles the conection and provide methods to sign tx, requestUsers from polkadotJS and sign and verify messages.
```
import { PolkadotApi } from '@jmgayosso/hashed-polkadot-api'

const polkadotApi = new PolkadotApi({
  chainURL: 'wss://n1.hashed.systems',
  appName: 'Hashed portal'
})
await polkadotApi.connect()
```


PolkadotApi is requeried to create an instace of [MarketplaceApi](https://github.com/hashed-io/hashed-polkadot-api/blob/master/src/model/polkadot-pallets/marketplaceApi.js), this class provide all methods to interact with gatedMarketplace pallet.
```
import { PolkadotApi, MarketplaceApi } from '@jmgayosso/hashed-polkadot-api'

const polkadotApi = new PolkadotApi('wss://n1.hashed.systems')
await polkadotApi.connect()

const marketplaceApi = new MarketplaceApi(polkadotApi)
```

Once created an instance of MarketplaceApi the followings methods can be accessed.

**MarketplaceApi**

* [getMarketplaceById](https://github.com/hashed-io/hashed-polkadot-api/blob/master/src/model/polkadot-pallets/marketplaceApi.js#L16): Get matkeplace general details by marketplaceId
```
await marketplaceApi.getMarketplaceById({
  marketId: '0xa54035afb49b42cdacbe27c830dd1b66078069886e80cdd8bab3d139caa0489e'
})
```

* [getAuthoritiesByMarketplace](https://github.com/hashed-io/hashed-polkadot-api/blob/master/src/model/polkadot-pallets/marketplaceApi.js#L27): Get authorities by marketplace
```
await marketplaceApi.getAuthoritiesByMarketplace({
  marketId: '0xa54035afb49b42cdacbe27c830dd1b66078069886e80cdd8bab3d139caa0489e'
})
```

* [getAllMarketplaces](https://github.com/hashed-io/hashed-polkadot-api/blob/master/src/model/polkadot-pallets/marketplaceApi.js#L52): Get all marketplaces
```
await marketplaceApi.getAllMarketplaces({
  startKey,
  pageSize
})
```

* [getMyMarketplaces](https://github.com/hashed-io/hashed-polkadot-api/blob/master/src/model/polkadot-pallets/marketplaceApi.js#L81): Get marketplace's participants by market id
```
await marketplaceApi.getMyMarketplaces({
   accountId
})
```

* [getParticipantsByMarket](https://github.com/hashed-io/hashed-polkadot-api/blob/master/src/model/polkadot-pallets/marketplaceApi.js#L156): Get matkeplace's participants by marketplace
```
await marketplaceApi.getParticipantsByMarket({
  marketId: '0xa54035afb49b42cdacbe27c830dd1b66078069886e80cdd8bab3d139caa0489e'
})
```

* [applyFor](https://github.com/hashed-io/hashed-polkadot-api/blob/master/src/model/polkadot-pallets/marketplaceApi.js#L220): This function call apply extrinsic
```
await marketplaceApi.applyFor({
  marketId,
  user,
  fields,
  custodianFields
})
```

* [reapplyFor](https://github.com/hashed-io/hashed-polkadot-api/blob/master/src/model/polkadot-pallets/marketplaceApi.js#L229): This function call reapply extrinsic
```
await marketplaceApi.reapplyFor({
    marketId,
    user,
    fields,
    custodianFields
})
```

* [createMarketplace](https://github.com/hashed-io/hashed-polkadot-api/blob/master/src/model/polkadot-pallets/marketplaceApi.js#L234): This function call createMarketplace extrinsic
```
await marketplaceApi.createMarketplace({
  admin,
  user,
  label
})
```

* [enrollApplicant](https://github.com/hashed-io/hashed-polkadot-api/blob/master/src/model/polkadot-pallets/marketplaceApi.js#L250): This function call enrollApplicant extrinsic
```
await marketplaceApi.enrollApplicant({
  marketId,
  user,
  accountOrApplication,
  approved,
  feedback
})
```

* [getApplicationStatusByAccount](https://github.com/hashed-io/hashed-polkadot-api/blob/master/src/model/polkadot-pallets/marketplaceApi.js#L262): Get application information by account
```
await marketplaceApi.getApplicationStatusByAccount({
  marketId,
  account
})
```

* [getMarketplacesByAuthority](https://github.com/hashed-io/hashed-polkadot-api/blob/master/src/model/polkadot-pallets/marketplaceApi.js#L272): Get marketplaces by authority
```
await marketplaceApi.getMarketplacesByAuthority({
  accountId,
  marketplaceId
})
```
