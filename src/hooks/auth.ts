import { PROVIDERS } from '@distributedlab/w3p'
import { useCallback, useMemo } from 'react'

import { authorizeUser } from '@/api/modules/auth'
import { buildAuthorizeRequest, getClaimOffer } from '@/api/modules/zkp/helpers'
import { useMetamaskZkpSnapContext } from '@/hooks/metamask-zkp-snap'
import { useWeb3Context } from '@/hooks/web3'

// TODO: add jwt validations for specific org
export const useAuth = () => {
  const { init, provider } = useWeb3Context()
  const {
    userDid,
    isSnapInstalled,

    getVerifiableCredentials,
    createProof,

    connectOrInstallSnap,
    checkSnapStatus,
    createIdentity,
  } = useMetamaskZkpSnapContext()

  const isAuthorized = useMemo(
    () => Boolean(provider?.isConnected && isSnapInstalled),
    [isSnapInstalled, provider?.isConnected],
  )

  const logout = useCallback(async () => {
    await provider?.disconnect()
    await checkSnapStatus()
  }, [checkSnapStatus, provider])

  const connectProviders = useCallback(async () => {
    await init(PROVIDERS.Metamask)
    const connector = await connectOrInstallSnap()

    await checkSnapStatus()

    return createIdentity(connector)
  }, [checkSnapStatus, connectOrInstallSnap, createIdentity, init])

  const authorize = useCallback(
    async ({ claimId, orgId, groupId }: { claimId: string; orgId: string; groupId: string }) => {
      const claimOffer = await getClaimOffer(userDid, claimId)

      const vc = await getVerifiableCredentials(claimOffer)

      if (!vc?.[0]?.issuer) throw new TypeError('VC issuer is undefined')

      if (!provider?.address) throw new TypeError('Provider address is undefined')

      // FIXME: define in zkp module
      const proofResponse = await createProof(
        buildAuthorizeRequest({
          providerAddress: provider?.address,
          isAdmin: false, // TODO: add check for admin role from VC
        }),
      )

      if (!proofResponse?.zkpProof) throw new TypeError('Proof is undefined')

      return authorizeUser({
        orgDid: orgId,
        groupId: groupId,
        userDid: userDid,
        zkProof: proofResponse.zkpProof,
      })
    },
    [createProof, getVerifiableCredentials, provider?.address, userDid],
  )

  return {
    isAuthorized,

    connectProviders,
    logout,

    authorize,
  }
}
