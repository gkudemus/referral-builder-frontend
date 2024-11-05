import { gql } from "@apollo/client";

// Query to get all referrals
export const GET_REFERRALS = gql`
  query GetReferrals {
    referrals {
      id
      givenName
      surname
      email
      phone
      address {
        homeNameOrNumber
        street
        suburb
        state
        postcode
        country
      }
    }
  }
`;

// Mutation to create a new referral
export const CREATE_REFERRAL = gql`
  mutation CreateReferral($input: ReferralInput!) {
    createReferral(input: $input) {
      id
      givenName
      surname
      email
      phone
      address {
        homeNameOrNumber
        street
        suburb
        state
        postcode
        country
      }
    }
  }
`;

// Mutation to update an existing referral
export const UPDATE_REFERRAL = gql`
  mutation UpdateReferral($id: ID!, $input: ReferralInput!) {
    updateReferral(id: $id, input: $input) {
      id
      givenName
      surname
      email
      phone
      address {
        homeNameOrNumber
        street
        suburb
        state
        postcode
        country
      }
    }
  }
`;

// Mutation to delete a referral
export const DELETE_REFERRAL = gql`
  mutation DeleteReferral($id: ID!) {
    deleteReferral(id: $id)
  }
`;
