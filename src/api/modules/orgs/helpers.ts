import {
  api,
  type Organization,
  type OrganizationCreate,
  type OrgsRequestQueryParams,
  OrgsStatuses,
  type OrgUser,
  type OrgVerificationCode,
} from '@/api'

export const DUMMY_ORG: Organization = {
  id: '3a798290-caf1-496a-a7e5-4db32551b13d',
  type: 'organizations',
  did: 'did:iden3:readonly:tUDjWxnVJNi7t3FudukqrUcNwF5KVGoWgim5pp2jV',
  domain: 'https://organization-domain.com',
  metadata: {
    logoUrl: 'https://organization-domain.com/logo.png',
    name: 'Organization Name',
    description: 'Organization Description',
  },
  status: {
    name: 'unverified',
    value: OrgsStatuses.Unverified,
  },
  verification_code: '6A4GSfUNKwM9hHuZVg4aUw==',
  issued_claims_count: '0',
  members_count: '1',
  created_at: '2021-08-12T12:00:00Z',
  updated_at: '2021-08-12T13:00:00Z',
  owner: {
    id: '81c32ef4-2878-4f86-9277-4c3c82913b87',
    type: 'users',
    did: 'did:iden3:tP2Yx51N98d7E5M84SGnyzmaGWqRz4oUcHQSGAgyg',
    role: {
      name: 'undefined',
      value: 0,
    },
    org_id: '3a798290-caf1-496a-a7e5-4db32551b13d',
    created_at: '2021-08-12T12:00:00Z',
    updated_at: '2021-08-12T13:00:00Z',
  },
}

export const loadOrgs = async (query: OrgsRequestQueryParams) => {
  return api.get<Organization[]>('/v1/orgs', {
    query,
  })
}

export const loadOrgsAmount = async () => {
  return api.get<number>('/v1/orgs/amount')
}

export const loadOrgById = async (id: string, query: OrgsRequestQueryParams) => {
  return api.get<Organization>(`/v1/orgs/${id}`, {
    query,
  })
}

export const createOrg = async (body: OrganizationCreate) => {
  // return api.post<Organization>('/v1/orgs', {
  //   body: {
  //     data: {
  //       id: body.id,
  //       type: 'organizations-create',
  //       attributes: {
  //         owner_did: body.ownerDid,
  //         domain: body.domain,
  //         metadata: body.metadata,
  //       },
  //     },
  //   },
  // })
  // TODO: remove after BE is ready
  // eslint-disable-next-line no-console
  console.log('createOrg', body)
  return DUMMY_ORG
}

export const verifyOrg = async (id: string) => {
  return api.post<Organization>(`/v1/orgs/${id}`)
}

export const loadOrgUsers = async (id: string, query: OrgsRequestQueryParams) => {
  return api.get<OrgUser[]>(`/v1/orgs/${id}/users`, {
    query,
  })
}

export const getOrgVerificationCode = async (id: string) => {
  return api.get<OrgVerificationCode>(`/v1/orgs/${id}/verification-code`)
}
