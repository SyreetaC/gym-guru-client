import { gql } from "@apollo/client";

export const GYMS = gql`
  query Query {
    gyms {
      name
      address
      city
      postCode
      contactNumber
      rating
      imageURL
      exerciseFacilities {
        name
      }
      otherFacilities {
        name
      }
    }
  }
`;
