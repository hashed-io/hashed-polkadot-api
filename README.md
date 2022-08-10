**Hashed Polkadot API**

This client api is used to interact with gatedMarketplace pallet, this allow do quickly connection, queries and calls to TX to this pallet.

To install the hashed polkadot api api run the following command:

`npm i --save @jmgayosso/hashed-polkadot-api`
or
`yarn add --save @jmgayosso/hashed-polkadot-api`

To connect to hashed chain we can use an instanfe of [PolkadotApi](https://github.com/hashed-io/hashed-polkadot-api/blob/master/src/model/polkadotApi.js) that handles the conection and provide methods to sign tx, requestUsers from polkadotJS and sign and verify messages.
```
import PolkadotApi from '@jmgayosso/hashed-polkadot-api'

const polkadotApi = new PolkadotApi('wss://n1.hashed.systems')
await polkadotApi.connect()
```


PolkadotApi is requeried to create an instace of [MarketplaceApi](https://github.com/hashed-io/hashed-polkadot-api/blob/master/src/model/polkadot-pallets/marketplaceApi.js), this class provide all methods to interact with gatedMarketplace pallet.
```
import { MarketplaceApi } from '@jmgayosso/hashed-polkadot-api'
import PolkadotApi from '@jmgayosso/hashed-polkadot-api'

const polkadotApi = new PolkadotApi('wss://n1.hashed.systems')
await polkadotApi.connect()

const marketplaceApi = new MarketplaceApi(polkadotApi)
```
