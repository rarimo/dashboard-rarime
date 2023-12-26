import { OrgsIncludes, OrgsRequestFilters, OrgsStatuses } from './enums'

export type OrgMetadata = {
  name: string
  description: string
}

export type OrgUser = {
  id: string
  type: 'users'
  did: string
  role: {
    name: string
    value: number
  }
  org_id: string
  created_at: string
  updated_at: string
}

export type Organization = {
  id: string
  type: 'organizations'
  did: string
  owner?: OrgUser
  domain: string
  metadata: OrgMetadata
  status: {
    name: string
    value: OrgsStatuses
  }
  verification_code: string
  issued_claims_count: string
  members_count: string
  created_at: string
  updated_at: string
}

export type OrganizationCreate = {
  id: string
  ownerDid: string
  domain: string
  metadata: OrgMetadata
}

export type OrgsRequestFiltersMap = {
  [OrgsRequestFilters.Owner]: string
  [OrgsRequestFilters.UserDid]: string
  [OrgsRequestFilters.Status]: OrgsStatuses
}

export type OrgsRequestQueryParams = {
  include?: OrgsIncludes
  filter?: OrgsRequestFiltersMap
  // TODO: page, limit, sort, ...etc
}

export type OrgVerificationCode = {
  id: string
  type: string
  code: string
}
