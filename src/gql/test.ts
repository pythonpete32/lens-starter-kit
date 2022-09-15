import { gql } from '@apollo/client';

export const GET_PING = gql`
  query {
    ping
  }
`;