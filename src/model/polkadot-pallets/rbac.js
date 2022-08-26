const BasePolkadotApi = require('../basePolkadotApi')

class Rbac extends BasePolkadotApi {
  constructor (polkadotApi, notify) {
    super(polkadotApi, 'rbac', notify)
  }

  /**
   *  Get the scope Id given palletId
   * @param {String} palletId
   * @return {Array} Array of scope Ids
   * Structure returned
   * {
   *  "scopes" : [
   *      "0x112a94197eb935a48b13ac5e6d37d316a143dd3dcf725c9d9d27d64dbba62890"
   *    ]
   * }
   */
  async getPalletScopes ({ palletId }, subTrigger) {
    return this.exQuery('scopes', [palletId], subTrigger)
  }

  /**
   * Get all al the scopes
   * @param {*} subTrigger 
   * @return {Array} Array of objects containing the id and the value
   */
  async getAllPalletScopes(subTrigger){
    let allScopes = await this.exEntriesQuery('scopes', [], subTrigger)
    return this.mapEntries(allScopes)
  }

  /**
   * Get the role given a role Id
   * @param {String} roleId 
   * @returns {Object} Object with property "roles"
   */
  async getRoleById ({ roleId }, subTrigger) {
    return this.exQuery('roles', [roleId], subTrigger)
  }
  /**
   * Get all the Roles associated with the pallet
   * This function return the pallet id and the roles id
   * @param {String} palletId 
   * @param {*} subTrigger 
   * @returns {Array} Array of Object where each object contain the pallet Id and the roles ids
   */
  async getAllRolesIdInPallet(subTrigger) {
    const rolesId = await this.exEntriesQuery('palletRoles', [], subTrigger)
    return this.mapEntries(rolesId)
  }
  /**
   * Get all the roles ids linked to a pallet
   * @param {String} palletId 
   * @returns {Object}
   * Expected output
   * {
   *     "palletRoles": [
   *      "0x08aef7203969e2467b33b14965dfab62e11b085610c798b3cac150b1d7ea033b",
   *      "0xc1237f9841c265fb722178da01a1e088c25fb892d6b7cd9634a20ac84bb3ee01",
   *      "0xae9e025522f868c39b41b8a5ba513335a2a229690bd44c71c998d5a9ad38162b"
   *    ]
   *  }
   */
  async getAllRolesIdsInPallet({ palletId }, subTrigger) {
    return this.exQuery('palletRoles', [palletId], subTrigger)
  }
  /**
   * Get all the roles ids linked to all pallets
   * @param {*} subTrigger 
   * @returns {Array} Array of Object containing pallet Id & Roles ids
   */
  async getAllRolesIdsInAllPallets(subTrigger){
    const allPalletRoles = this.exEntriesQuery('palletRoles', [], subTrigger)
    return this.mapEntries(allPalletRoles)
  }
  /**
   * Get a permission by pallet Id and Permission Id
   * @param {String} palletId 
   * @param {String} permissionId [Optional]
   * return {String} permission
   */
  async getPermission({palletId, permissionId}, subTrigger) {
    return this.exQuery('permissions', [palletId, permissionId], subTrigger)
  }
  /**
   * Get all the permsissions from pallet
   * @param {String} palletId 
   * @returns {Array} Array of objects containing the 
   */
  async getAllPermissionsFromPallet({ palletId }, subTrigger) {
    const allPalletPermissions = this.exEntriesQuery('permissions', [palletId], subTrigger)
    return this.mapEntries(allPalletPermissions)
  }
  /**
   * Get permissions lined to a role within a pallet
   * @param {*} param0 
   */
  async getPermissionByRole({ palletId, roleId }, subTrigger) {
    return this.exQuery('permissionsByRole', [palletId, roleId], subTrigger)
  }

/**
 * Get all role permission from a specific pallet
 * @param {String} palletId 
 * @param {*} subTrigger 
 * @returns 
 */
  async getAllRolesFromPallet({ palletId }, subTrigger){
    const allPalletPermissionsByRole = this.exEntriesQuery('permissionsByRole', [palletId], subTrigger)
    return this.mapEntries(allPalletPermissionsByRole)
  }
  /**
   * Get which roles the user has in a pallet scope
   * @param {String} accountId Address of the account
   * @param {String} palletId
   * @param {String} scopeId
   * @param {*} subTrigger 
   * @return {Array} Role id is returned
   */
  async getRolesByUser({ accountId, palletId, scopeId }, subTrigger){
    return this.exQuery('rolesByUser', [accountId, palletId, scopeId], subTrigger)
  }
  /**
   * Get which users have the role in a pallet scope
   * @param {String} palletId
   * @param {String} scopeId
   * @param {String} scopeId
   * @param {*} subTrigger 
   * @returns {Array} Address of the account
   */
  async getRoleInPalletScope({ palletId, scopeId, roleId }, subTrigger) {
    const usersByScope = this.exQuery('usersByScope', [palletId, scopeId, roleId], subTrigger)
    return usersByScope.toHuman()
  }
  /**** Get scope users by role
   * @param {String} palletId
   * @param {String} roleId
   * @param {*} param0 
   */
  async getScopeUsersByRole({ palletId, scopeId}){
    const scopeUsersByRole = this.exEntriesQuery('usersByScope', [palletId, scopeId], subTrigger )
    return this.mapEntries(scopeUsersByRole)
  }
}
module.exports = Rbac