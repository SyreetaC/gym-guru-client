import { gql } from "@apollo/client";

export const CREATE_GYM = gql`
  mutation Mutation($createGymInput: CreateGymInput!) {
    createGym(input: $createGymInput) {
      name
      address
      city
      postCode
      contactNumber
      rating
      openingTimes {
        dayIndex
        dayName
        dayShort
        startTime
        endTime
      }
      exerciseFacilities {
        id
        name
      }
      otherFacilities {
        id
        name
      }
    }
  }
`;