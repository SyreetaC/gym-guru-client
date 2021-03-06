import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 250,
    boxShadow: "0px 0px 20px #00b4d8",
    margin: 15,
    borderRadius: "5px",
    display: "flex",
    flexDirection: "column",
  },
  header: {
    height: 80,
    textAlign: "center",
    background: "linear-gradient(#00c8f0ee, #71c5d6)",
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
  id,
  imageURL,
  name,
  postcode,
  address,
  city,
  contactNumber,
}) => {
  const classes = useStyles();

  const url = `/gyms/${id}`;

  return (
    <Card className={classes.root}>
      <CardHeader
        title={name}
        className={classes.header}
        titleTypographyProps={{ variant: "h6" }}
      />
      {!imageURL ? (
        <CardMedia
          className={classes.media}
          image="https://media.istockphoto.com/vectors/thumbnail-image-vector-graphic-vector-id1147544807?k=6&m=1147544807&s=612x612&w=0&h=8CXEtGfDlt7oFx7UyEZClHojvDjZR91U-mAU8UlFF4Y="
          title={name}
        />
      ) : (
        <CardMedia className={classes.media} image={imageURL} title={name} />
      )}
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
          <div>
            <a href={url} className="view-btn">
              View
            </a>
          </div>
        </div>
      </CardActions>
    </Card>
  );
};

export default GymCard;
