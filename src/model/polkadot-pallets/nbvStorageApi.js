const BasePolkadotApi = require('../basePolkadotApi')

class NbvStorageApi extends BasePolkadotApi {
  constructor (polkadotApi, notify) {
    super(polkadotApi, 'nbvStorage', notify)
  }

  /**
   * @name getXpubByUser
   * @description Get Xpub by user
   * @param {String} user User address
   * @param {Function} subTrigger Function to trigger when subscription detect changes
   * @returns {Object}
   * { id, xpub }
   */
  getXpubByUser (user, subTrigger) {
    // return this.polkadotApi.api.query.nbvStorage.xpubsByOwner(user, subTrigger)
    return this.exQuery('xpubsByOwner', [user], subTrigger)
  }

  /**
   * @name getXpubByUser
   * @description Get Xpub by user
   * @param {String} xpubId Xpub id
   * @param {Function} subTrigger Function to trigger when subscription detect changes
   * @returns {Object}
   * { id, xpub }
   */
  getXpubById (xpubId, subTrigger) {
    // return this.polkadotApi.api.query.nbvStorage.xpubs(xpubId, subTrigger)
    return this.exQuery('xpubs', [xpubId], subTrigger)
  }

  /**
   * @name getVaultsByUser
   * @description Get all vaults where user is owner or cosigner
   * @param {String} user User address
   * @returns {Array} array of vaults Id
   * [{ id }]
   */
  getVaultsByUser ({ user, subTrigger }) {
    return this.exQuery('vaultsBySigner', [user], subTrigger)
    // return this.polkadotApi.api.derive.nbvStorage.vaults(user)
  }

  /**
   * @name getVaultsById
   * @description Get an array of vaults details
   * @param {String} Ids Array of vaults id
   * @param {Function} subTrigger Function to trigger when subscription detect changes
   * @returns {Array} list vaults array
   * [{ id, description, descriptor, owner, cosigners }]
   */
  getVaultsById ({ Ids, subTrigger }) {
    // return this.exQuery('vaults', Ids, subTrigger)
    return this.exMultiQuery('vaults', Ids, subTrigger)
    // return this.polkadotApi.api.derive.nbvStorage.vaults(user)
  }

  /**
   * @name createVault
   * @description Create a new vault
   * @param {String} user user address
   * @returns undefined
   */
  async createVault ({ threshold, description, cosigners, includeOwnerAsCosigner, user }) {
    // Call Extrinsic
    return this.callTx('createVault', user, [threshold, description, includeOwnerAsCosigner, cosigners])
  }

  /**
  * @name removeVault
  * @description Remove a vault
  * @param {String} id Vault id
  * @returns undefined
  */
  async removeVault ({ id, user }) {
    // Call Extrinsic
    return this.callTx('removeVault', user, [id])
  }

  /**
   * @name submitXPUB
   * @description Set XPUB for a user
   * @param {String} user user address
   * @returns undefined
   */
  async submitXPUB ({ user, XPUB }) {
    // Call Extrinsic
    return this.callTx('setXpub', user, [XPUB])
  }

  /**
   * @name removeXpub
   * @description Remove XPUB for a user
   * @param {String} user user address
   * @returns undefined
   */
  async removeXpub ({ user }) {
    // Call Extrinsic
    return this.callTx('removeXpub', user)
  }

  /**
   * @name createProposal
   * @description Create new proposal for a vault
   * @param {String} signer user address to sign
   * @param {String} vaultId vault Id
   * @param {String} recipientAddress user address to receive BTC
   * @param {String} satoshiAmount Satoshi amount
   * @returns undefined
   */
  async createProposal ({ vaultId, recipientAddress, satoshiAmount, description, signer }) {
    // Call Extrinsic
    const params = [vaultId, recipientAddress, satoshiAmount, description]
    return this.callTx('propose', signer, params)
  }

  /**
   * @name getProposalsByVault
   * @description Get all proposals for a vault
   * @param {String} vaultId Vault Id
   * @param {Function} subTrigger Function to trigger when subscription detect changes
   * @returns {Array} array of vaults Id
   * [{ id }]
   */
  getProposalsByVault ({ vaultId, subTrigger }) {
    return this.exQuery('proposalsByVault', [vaultId], subTrigger)
  }

  /**
   * @name getProposalsById
   * @description Get an array of proposals details
   * @param {String} Ids Array of proposals id
   * @param {Function} subTrigger Function to trigger when subscription detect changes
   * @returns {Array} list vaults array
   * [{ id, description, descriptor, owner, cosigners }]
   */
  getProposalsById ({ Ids, subTrigger }) {
    return this.exMultiQuery('proposals', Ids, subTrigger)
  }

  /**
   * @name removeProposal
   * @description Remove a proposal
   * @param {String} proposalId Proposal Id
   * @param {String} signer User address to sign
   * @returns
   */
  removeProposal ({ proposalId, signer }) {
    return this.callTx('removeProposal', signer, [proposalId])
  }

  /**
   * @description Save signed PSBT for a user
   * @param {String} proposalId Proposal Id
   * @param {String} psbt Payload PSBT
   * @param {String} signer User address to sign
   * @returns
   */
  savePsbt ({ proposalId, psbt, signer }) {
    return this.callTx('savePsbt', signer, [proposalId, psbt])
  }

  /**
   * @description Finalize PSBT
   * @param {String} proposalId Proposal Id
   * @param {String} broadcast Boolean
   * @param {String} signer User address to sign
   * @returns
   */
  finalizePsbt ({ proposalId, broadcast = false, signer }) {
    return this.callTx('finalizePsbt', signer, [proposalId, broadcast])
  }

  /**
   * @description Broadcast PSBT
   * @param {String} proposalId Proposal Id
   * @param {String} signer User address to sign
   * @returns
   */
  broadcastPsbt ({ proposalId, signer }) {
    return this.callTx('broadcastPsbt', signer, [proposalId])
  }
}

// export default NbvStorageApi
module.exports = NbvStorageApi
