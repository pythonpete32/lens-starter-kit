import { gql } from '@apollo/client';

const CLAIM_HANDLE = gql`
    mutation($request: CreateProfileRequest!) { 
      createProfile(request: $request) {
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

const CLAIMED_HANDLES = gql`
  query {
    claimedHandles {
      id
      handle
      source
      claimedAt
  	}
  }
`;

const CLAIMABLE_HANDLES = gql`
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