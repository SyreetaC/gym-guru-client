import { useState } from "react";
import StarRatings from "react-star-ratings";
import { useMutation } from "@apollo/client";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { Box, Button, Container } from "@material-ui/core";

import {
  UPDATE_GYM_RATING,
  UPDATE_ATTENDING_GYM,
  DELETE_GYM,
} from "../../../graphql/mutations";

import { GYM_QUERY } from "../../../graphql/queries";
import CustomizedAccordions from "../Accordian/Accordian";
import Reviews from "../Reviews";
import GymForm from "../../GymForm";
import { useHistory } from "react-router-dom";
import { useUserContext } from "../../../context/UserContext";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: "75%",
    maxHeight: "75%",
    overflowY: "auto",
  },
}));

const GymPageContent = ({ gym, reviews, user }) => {
  const classes = useStyles();
  const history = useHistory();
  const [open, setOpen] = useState(false);

  const [deleteGym] = useMutation(DELETE_GYM, {
    variables: {
      deleteGymId: gym.id,
    },
    onCompleted: (data) => {
      history.push(`/profile/${user.username}`);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleDelete = async () => {
    await deleteGym();
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  let { id, name, rating, imageURL, ...rest } = gym;

  const { dispatch } = useUserContext();

  const [updateGymRating] = useMutation(UPDATE_GYM_RATING, {
    refetchQueries: [GYM_QUERY, "getGym"],
    onError: (error) => {
      console.log(error);
    },
  });

  const [
    updateAttendingGym,
    { data: updateData, error: updateError, loading: updateLoading },
  ] = useMutation(UPDATE_ATTENDING_GYM, {
    onError: (e) => {
      console.log(e);
    },
  });

  const averageRating = () => {
    const allRatings = reviews
      .map((review) => {
        return review.categories.map((category) => {
          return category.rating;
        });
      })
      .flat();

    if (allRatings.length !== 0) {
      const totalRating = allRatings.reduce((acc, current) => {
        return acc + current;
      });

      const average = totalRating / allRatings.length;

      const rating = Math.round(average * 10) / 10;

      return rating;
    }
  };

  const checkRating = async () => {
    if (rating === 0) {
      rating = averageRating();

      await updateGymRating({
        variables: {
          updateGymRatingInput: {
            id,
            rating,
          },
        },
      });
    }
  };

  const updateRating = async () => {
    const updatedRating = averageRating();

    await updateGymRating({
      variables: {
        updateGymRatingInput: {
          id,
          rating: updatedRating,
        },
      },
    });
  };

  const onClickAttend = async () => {
    try {
      await updateAttendingGym({
        variables: {
          updateAttendingGymInput: {
            id: user.id,
            attendingGymId: gym.id,
          },
        },
      });

      const payload = {
        attendingGymId: gym.id,
      };

      dispatch({
        type: "UPDATE_ATTENDING_GYM",
        payload,
      });
    } catch (err) {
      console.log(err);
    }
  };

  checkRating();

  return (
    <>
      <Container maxWidth="lg">
        {user && user.ownedGymId === id && (
          <Box m={1} display="flex" justifyContent="flex-end">
            <Button
              variant="contained"
              disableElevation
              type="button"
              onClick={handleOpen}
              style={{ maxWidth: "170px", minWidth: "170px", margin: "1rem" }}
            >
              EDIT
            </Button>
            <Button
              variant="contained"
              disableElevation
              type="button"
              onClick={handleDelete}
              color="secondary"
              style={{ maxWidth: "170px", minWidth: "170px", margin: "1rem" }}
            >
              DELETE
            </Button>

            <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              className={classes.modal}
              open={open}
              onClose={handleClose}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
              }}
            >
              <Fade in={open}>
                <div className={classes.paper}>
                  <GymForm gym={gym} />
                </div>
              </Fade>
            </Modal>
          </Box>
        )}
      </Container>
      <div className="gym-container">
        <div className="image-container">
          {!imageURL ? (
            <img
              src="https://media.istockphoto.com/vectors/thumbnail-image-vector-graphic-vector-id1147544807?k=6&m=1147544807&s=612x612&w=0&h=8CXEtGfDlt7oFx7UyEZClHojvDjZR91U-mAU8UlFF4Y="
              alt={name}
              height="350"
              className="image"
            />
          ) : (
            <img src={imageURL} alt={name} height="350" className="image" />
          )}
          {user && user.attendingGymId === gym.id ? (
            <h2>You are attending this gym!</h2>
          ) : (
            [
              user && user.attendingGymId !== gym.id && (
                <button
                  className="attendGymBtn view-btn"
                  onClick={onClickAttend}
                >
                  + Attend this gym
                </button>
              ),
            ]
          )}
        </div>
        <div className="about-container">
          <h1 className="title">{name}</h1>
          <div className="info-container">
            <StarRatings
              rating={rating}
              numberOfStars={5}
              starRatedColor="#00b4d8"
              starDimension="20px"
              starSpacing="3px"
            />
            <div className="accordian">
              <CustomizedAccordions gym={rest} />
            </div>
          </div>
        </div>
        <div className="review-container">
          <Reviews
            reviews={reviews}
            rating={rating}
            updateRating={updateRating}
            gymId={gym.id}
          />
        </div>
      </div>
    </>
  );
};

export default GymPageContent;
