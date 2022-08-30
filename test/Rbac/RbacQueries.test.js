const PolkadotApi = require('../../src/model/polkadotApi')
const { Rbac } = require('../../src/model/polkadot-pallets')
jest.setTimeout(40000)
let polkadotApi
let rbacApi
/**
 * Parameters necessary
 * Requirements : 
 * 1 marketplace created by any account
 */
const palletId = '0x5d208df71427902157988a56e7527474a7dce921f9d5efa159dcfc849289a53c'
const permissionId = '0xdd2f4fc1f525a38ab2f18b2ef4ff4559ddc344d04aa2ceaec1f5d0c6b4f67674'
const roleId = '0x08aef7203969e2467b33b14965dfab62e11b085610c798b3cac150b1d7ea033b'
const accountId = '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY'
let scopeId
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
  test('Get Scope Id knowning the palletId', async () => {
    let _scopeId = await rbacApi.getPalletScopes({
      palletId
    })
    scopeId = _scopeId[0]

  })
  test('Get all pallet scopes', async () => {
    console.log('scope id: ', scopeId)
    const allScopes = await rbacApi.getAllPalletScopes()
    const { key, id: palletId, value: scopesId}  = allScopes[0]
    expect(palletId).toBeDefined()
    expect(scopesId).toBeDefined() 
  })
  test('Get specific pallet scope', async () => {
    let scopesIdsArray = await rbacApi.getPalletScopes({
      palletId
    })
    expect(scopesIdsArray).toBeDefined()
    expect(scopesIdsArray.length).toBeGreaterThan(0)
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
  /* getRolesById */
  test('Get all roles stored', async () => {
    const allRoles = await rbacApi.getRolesById()
    expect(allRoles).toBeDefined()
    expect(allRoles.length).toBe(5)

  })

  /* getAllRolesIdsInPallet */
  test('Get all role ids linked to Pallet', async () => {
    const palletRoles = await rbacApi.getAllRolesIdsInPallet({
      palletId,
    })
    expect(palletRoles).toBeDefined()
    expect(palletRoles.length).toBeGreaterThan(0)
  })

  /* getAllRolesIdsInAllPallets */
  test('Get all permissions from a pallet', async () => {
    const allPalletPermissions = await rbacApi.getAllRolesIdsInAllPallets()
    const [obj] = allPalletPermissions
    const { key, id: palletId, value: roleIdsArray } = obj
    expect(roleIdsArray).toBeDefined()
    expect(roleIdsArray.length).toBeGreaterThan(0)
    expect(palletId).toBeDefined()
  })
  /* getPermission */
  test('Get a permission by pallet and Id', async () => {
    const permissionStr = 'Enroll'
    const permission = await rbacApi.getPermission({
      palletId,
      permissionId
    })
    expect(permission).toBeDefined()
    expect(permission).toBe(permissionStr)
  })
  /* getAllPermissionsFromPallet */
  test('Get all permissions from a pallet', async () => {
    const allPalletPermissions = await rbacApi.getAllPermissionsFromPallet({
      palletId
    })
    const [obj] = allPalletPermissions
    const { key, id : dataArray, value: permission } = obj
    expect(dataArray.length).toBe(2)
    const [palletID, permissionId] = dataArray
    expect(palletID).toBeDefined()
    expect(permissionId).toBeDefined()
    expect(permission).toBeDefined()
    expect(key).toBeDefined()
  })
  /* getPermissionByRole */
  test('Get permissions linked to a role within a pallet', async () => {
    const permissionsByRole = await rbacApi.getPermissionByRole({
      palletId,
      roleId
    })
    const [permissionId] = permissionsByRole
    expect(permissionsByRole).toBeDefined()
    expect(permissionsByRole.length).toBeGreaterThan(0)
    expect(permissionId).toBeDefined()
  })
  /* getAllRolesFromPallet */
  test('Get all role permission from a pallet', async () => {
    const allPalletPermissionsByRole = await rbacApi.getAllRolesFromPallet({
      palletId
    })
    expect(allPalletPermissionsByRole).toBeDefined()

    const [obj] = allPalletPermissionsByRole
    const { key, id : IdsArray, value: permissionArray } = obj
    expect(IdsArray.length).toBe(2)

    const [palletID, roleID] = IdsArray
    expect(palletID).toBeDefined()
    expect(roleID).toBeDefined()
    expect(permissionArray.length).toBe(6)    
  })
  /* getRolesByUser */
  test('Get which roles the user has in a pallet scope', async () => {
    const rolesByUser = await rbacApi.getRolesByUser({
      accountId,
      palletId,
      scopeId
    })
    expect(rolesByUser).toBeDefined()
  })
  /* getRoleInPalletScope */
  test('Get scope users by role', async () => {
    const scopeUsersByRole = await rbacApi.getRoleInPalletScope({
      palletId,
      scopeId,
      roleId
    })
    expect(scopeUsersByRole.length).toBe(1)
    expect(scopeUsersByRole[0]).toBeDefined()
  })
  /* getScopeUsersByRole */
  test('Get scope users by role', async () => {
    const scopeUsersByRole = await rbacApi.getScopeUsersByRole({
      palletId,
      scopeId
    })
    expect(scopeUsersByRole.length).toBeGreaterThan(0)
    const [obj] = scopeUsersByRole
    const { key, id: idsArray, value: accountId } = obj
    expect(idsArray.length).toBe(3)
    const [palletID, scopeID, roleID] = idsArray
    expect(palletID).toBeDefined()
    expect(scopeID).toBeDefined()
    expect(roleID).toBeDefined()
  })
})