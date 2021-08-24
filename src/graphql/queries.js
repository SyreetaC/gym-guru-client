import { gql } from "@apollo/client";

export const GYMS_QUERY = gql`
  query Query(
    $gymsCity: String
    $gymsSortBy: String
    $gymsExerciseFacilities: [ID]
    $gymsOtherFacilities: [ID]
  ) {
    gyms(
      city: $gymsCity
      sortBy: $gymsSortBy
      exerciseFacilities: $gymsExerciseFacilities
      otherFacilities: $gymsOtherFacilities
    ) {
      id
      name
      imageURL
      address
      city
      postCode
      openingTimes {
        dayName
        startTime
        endTime
      }
      contactNumber
      rating
      exerciseFacilities {
        id
        name
      }
      otherFacilities {
        id
        name
      }
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
`;

export const GYM_QUERY = gql`
  query Query($id: ID!) {
    gym(id: $id) {
      id
      name
      address
      city
      postCode
      contactNumber
      imageURL
      openingTimes {
        dayName
        startTime
        endTime
      }
      rating
      exerciseFacilities {
        name
        id
      }
      otherFacilities {
        id
        name
      }
    }
  }
`;

export const USER_QUERY = gql`
  query Query($username: String) {
    findUser(username: $username) {
      id
      username
      firstName
      lastName
      isGymOwner
      ownedGymId
      attendingGymId {
        id
        name
        imageURL
        city
        rating
      }
      profileImageUrl
      city
      bio
      goals
      interests
      facebookUrl
      twitterUrl
      instagramUrl
      buddies
    }
  }
`;

export const USERS_QUERY = gql`
  query Query {
    users {
      username
      lastName
      firstName
      isGymOwner
      ownedGymId
      attendingGymId {
        name
      }
      profileImageUrl
      city
      bio
      goals
      interests
      buddies
    }
  }
`;

export const HOME_QUERY = gql`
  query Query($gymsSortBy: String) {
    gyms(sortBy: $gymsSortBy) {
      imageURL
      id
      rating
      name
    }
  }
`;

export const REVIEWS_QUERY = gql`
  query Query($reviewsGymId: ID!) {
    reviews(gymId: $reviewsGymId) {
      id
      categories {
        category
        rating
      }
      comment
    }
  }
`;

export const BUDDIES_QUERY = gql`
  query Query($recipientId: ID, $requesterId: ID, $status: BuddyStatus) {
    getBuddies(
      recipientId: $recipientId
      requesterId: $requesterId
      status: $status
    ) {
      id
      recipientId {
        id
        username
        city
      }
      status
      requesterId {
        id
        username
        city
      }
    }
  }
`;
