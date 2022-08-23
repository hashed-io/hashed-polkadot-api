const express = require('express')
const app = express()
const port = 3006

// e.g. https://md5.network/assets/42/17
app.get('/assets/:collection/:item', function (req, res) {

    item = {}
    item.collection_id = req.params.collection;
    item.id = req.params.item;
    item.metadata = 'stored on uniques pallet, queried from Substrate';
    item.ipfs_unencrypted = 'anchored to the unique, stored in IPFS';
    item.ipfs_encrypted = 'anchored to the unique, stored in IPFS';
    item.offers = 'stored on marketplaces pallet, queried from Substrate';
    item.children = 'items that were spawned directly from this one'

    res.send({
        item
    });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})