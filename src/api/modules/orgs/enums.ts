export enum OrgsStatuses {
  Unverified = '0',
  Verified = '1',
}

export enum OrgsRequestFilters {
  Owner = 'owner',
  UserDid = 'user_did',
  Status = 'status',
}

export enum OrgsIncludes {
  organization = 'organization',
  owner = 'owner',
}
