import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";

import { BsPeopleFill } from "react-icons/bs";
import { RiAddCircleFill } from "react-icons/ri";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 250,
    height: 430,
    boxShadow: "0px 0px 20px #00b4d8",
    margin: 15,
  },
  header: {
    height: 80,
    textAlign: "center",
  },
  content: {
    color: "grey",
    fontSize: 12,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
}));

const GymCard = ({
  imageURL,
  name,
  postcode,
  address,
  city,
  contactNumber,
}) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader
        title={name}
        className={classes.header}
        titleTypographyProps={{ variant: "h6" }}
      />
      <CardMedia className={classes.media} image={imageURL} title={name} />
      <CardContent className={classes.content}>
        <div className="address">
          <div>{address}</div>
          <div>{city} </div>
          <div>{postcode}</div>
        </div>
        <div>{contactNumber}</div>
      </CardContent>
      <CardActions disableSpacing>
        <div className="card-icons">
          <div className="view-btn">
            <a href="/gyms/new">View</a>
          </div>
          <span className="card-icon">
            <a href="/">
              <BsPeopleFill />
            </a>
          </span>
          <span className="card-icon">
            <a href="/">
              <RiAddCircleFill />
            </a>
          </span>
        </div>
      </CardActions>
    </Card>
  );
};

export default GymCard;
