const CLAIM_HANDLE = `
  mutation($request: ClaimHandleRequest!) { 
    claim(request: $request) {
      ... on RelayerResult {
        txHash
      }
      ... on RelayError {
        reason
      }
      __typename
    }
 }
`;

const CLAIMED_HANDLES = `
  query {
    claimedHandles {
      id
      handle
      source
      claimedAt
  	}
  }
`;

const CLAIMABLE_HANDLES = `
  query {
    claimableHandles {
      id
      handle
      source
      expiry
    }
  }
`;

export { CLAIM_HANDLE, CLAIMED_HANDLES, CLAIMABLE_HANDLES };