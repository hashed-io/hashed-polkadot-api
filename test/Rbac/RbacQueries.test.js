const PolkadotApi = require('../../src/model/polkadotApi')
const { Rbac } = require('../../src/model/polkadot-pallets')
jest.setTimeout(40000)
let polkadotApi
let rbacApi
/**
 * Parameters necessary
 */
const palletId = '0x5d208df71427902157988a56e7527474a7dce921f9d5efa159dcfc849289a53c'
let permissionId
const roleId = '0x08aef7203969e2467b33b14965dfab62e11b085610c798b3cac150b1d7ea033b'
let address
const chainURI = 'ws://127.0.0.1:9944'
beforeEach(() => {
  jest.spyOn(console, 'warn').mockImplementation(() => {});
});
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
  test('Create Rbac instance', async () => {
    rbacApi = new Rbac(polkadotApi)
    expect(rbacApi).toBeDefined()
  })
})

describe('Get information from RBAC', () => {
  test('Get all pallet scopes', async () => {
    const allScopes = await rbacApi.getAllPalletScopes()
    const { key, id: palletId, value: scopesId}  = allScopes[0]
    expect(palletId).toBeDefined()
    expect(scopesId).toBeDefined()
  })
  test('Get specific pallet scope', async () => {
    let scopesIdsArray = await rbacApi.getPalletScopes({
      palletId
    })
    scopesIdsArray = scopesIdsArray.toHuman()
    expect(scopesIdsArray).toBeDefined()
    expect(scopesIdsArray.length).toBeGreaterThan(1)
  })

  test('Retrieve Roles Ids in the pallet', async () => {
    const responseArray = await rbacApi.getAllRolesIdInPallet()
    const {key, id: palletId, value: rolesIdArray } = responseArray[0]
    expect(palletId[0]).toBeDefined()
    expect(rolesIdArray.length).toBeGreaterThan(0)
  })

  test('Retrieve Role value given role id', async () => {
    const roleValue = await rbacApi.getRoleById({
      roleId,
    })
    expect(roleValue).toBeDefined()
  })
  /* getRolesIdsInPallet */
  /* getPermissions */
  /* getAllRolesIdsInPallet */
  /* getAllRolesIdsInAllPallets */
  /* getPermission */
  /* getAllPermissionsFromPallet */
  /* getPermissionByRole */
  /* getAllRolesFromPallet */
  /* getRolesByUser */
  /* getRoleInPalletScope */
  /* getScopeUsersByRole */

})