import { gql } from '@apollo/client';

const CHALLENGE_QUERY = gql`
  query($request: ChallengeRequest!) {
    challenge(request: $request) { text }
  }
`;

const AUTHENTICATE_MUTATION = gql`
  mutation($request: SignedAuthChallenge!) { 
    authenticate(request: $request) {
      accessToken
      refreshToken
    }
 }
`;

const REFRESH_AUTHENTICATION = gql`
  mutation($request: RefreshRequest!) { 
    refresh(request: $request) {
      accessToken
      refreshToken
    }
 }
`;

const VERIFY = gql`
  query($request: VerifyRequest!) {
    verify(request: $request)
  }
`;

export { AUTHENTICATE_MUTATION, CHALLENGE_QUERY, REFRESH_AUTHENTICATION, VERIFY };