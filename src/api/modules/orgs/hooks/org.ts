import { useCallback, useMemo } from 'react'

import { loadOrgById, OrgsIncludes } from '@/api/modules/orgs'
import { useLoading } from '@/hooks'
import { useZkpSnapState } from '@/store'

export const useOrg = (id: string) => {
  const { userDid } = useZkpSnapState()

  const loadOrg = useCallback(async () => {
    if (!id) return undefined

    return loadOrgById(id, {
      include: OrgsIncludes.Owner,
    })
  }, [id])

  const {
    data: org,
    isLoading,
    isLoadingError,
    isEmpty,
  } = useLoading(undefined, loadOrg, {
    loadOnMount: !!id,
    loadArgs: [id],
  })

  const isOrgOwner = useMemo(() => {
    return org?.owner?.did === userDid
  }, [org?.owner?.did, userDid])

  return {
    org,
    isLoading,
    isLoadingError,
    isEmpty,
    isOrgOwner,
  }
}
