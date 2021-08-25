import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";

import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Divider from "@material-ui/core/Divider";

import { GYMS_QUERY } from "../../graphql/queries";
import { CREATE_GYM } from "../../graphql/mutations";

import ImageUploader from "../ImageUploader";
import CityAutocomplete from "../CityAutocomplete";
import FacilitiesCheckboxes from "../FacilitiesCheckboxes";
import FormInput from "../FormInput";
import ReactHookFormSelect from "../ReactHookFormSelect";
import { useUserContext } from "../../context/UserContext";
import days from "./days";
import times from "./times";
import Loader from "react-loader-spinner";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));

const GymForm = ({ gym }) => {
  console.log(gym);
  const classes = useStyles();

  const history = useHistory();

  const { state } = useUserContext();

  const { handleSubmit, control } = useForm();

  const [expanded, setExpanded] = useState(false);

  const [images, setImages] = useState([]);
  const [imageUrl, setImageUrl] = useState(gym?.imageURL);

  const { data, loading, error } = useQuery(GYMS_QUERY);

  const [createGym] = useMutation(CREATE_GYM, {
    onCompleted: (data) => {
      history.push(`${data.createGym.id}`);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <Loader
          type="Circles"
          color="#00BFFF"
          height={100}
          width={100}
          timeout={3000} //3 secs
        />
      </Box>
    );
  }

  if (error) {
    return <h1>error</h1>;
  }

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const getFacilities = (formData, prefix) => {
    return Object.entries(formData).reduce((acc, [key, value]) => {
      if (key.includes(prefix) && value) {
        return [...acc, key.replace(prefix, "")];
      }
      return acc;
    }, []);
  };

  const getOpeningTimes = (formData, prefix) => {
    return Object.entries(formData).reduce((acc, [key, value]) => {
      if (key.includes(prefix) && value) {
        return { ...acc, value };
      }
      return acc;
    }, {});
  };

  const onSubmit = async (formData) => {
    const openingTimes = days.map((day, dayIndex) => {
      const openTime = getOpeningTimes(formData, `openTime_${day.value}`);
      const closeTime = getOpeningTimes(formData, `closeTime_${day.value}`);
      const isClosed = getOpeningTimes(formData, `isClosed_${day.value}`);
      return {
        dayIndex,
        dayName: day.label,
        dayShort: day.short,
        startTime: openTime.value || "",
        endTime: closeTime.value || "",
      };
    });

    const exerciseFacilities = getFacilities(formData, "exercise_facility_");
    const otherFacilities = getFacilities(formData, "other_facility_");

    const { name, address, city, postCode, contactNumber } = formData;

    const { data } = await createGym({
      variables: {
        createGymInput: {
          name,
          imageURL: imageUrl,
          address,
          city,
          postCode,
          contactNumber,
          openingTimes,
          otherFacilities,
          exerciseFacilities,
        },
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={classes.root}>
        <Accordion
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography className={classes.heading}>Gym Details</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <FormInput
              name="name"
              placeholder="Name"
              control={control}
              required={true}
              defaultValue={gym?.name}
            />
            <FormInput
              name="address"
              placeholder="Address"
              control={control}
              required={true}
              defaultValue={gym?.address}
            />
            <CityAutocomplete control={control} city={gym?.city} />
            <FormInput
              name="postCode"
              placeholder="Postcode"
              control={control}
              required={true}
              defaultValue={gym?.postCode}
            />
            <FormInput
              name="contactNumber"
              placeholder="Contact Number"
              control={control}
              required={true}
              defaultValue={gym?.contactNumber}
            />
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel2"}
          onChange={handleChange("panel2")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2bh-content"
            id="panel2bh-header"
          >
            <Typography className={classes.heading}>Opening Hours</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {days.map(({ label, value }) => {
              return (
                <Box>
                  <Typography>{label}</Typography>
                  <FormControlLabel
                    control={
                      <Controller
                        name={`isClosed_${value}`}
                        control={control}
                        defaultValue={false}
                        render={({ field: { onChange, value } }) => {
                          return (
                            <Checkbox checked={value} onChange={onChange} />
                          );
                        }}
                      />
                    }
                    label="Closed"
                    key={value}
                  />
                  <Box component="div" m={1}>
                    <ReactHookFormSelect
                      name={`openTime_${value}`}
                      label="Open"
                      control={control}
                      rules={{ required: false }}
                    >
                      {times.map(({ label, value }) => {
                        return (
                          <MenuItem name={value} value={value} key={value}>
                            {label}
                          </MenuItem>
                        );
                      })}
                    </ReactHookFormSelect>
                  </Box>
                  <Box component="div" m={1}>
                    <ReactHookFormSelect
                      name={`closeTime_${value}`}
                      label="Close"
                      control={control}
                      rules={{ required: false }}
                    >
                      {times.map(({ label, value }) => {
                        return (
                          <MenuItem name={value} value={value} key={value}>
                            {label}
                          </MenuItem>
                        );
                      })}
                    </ReactHookFormSelect>
                  </Box>
                </Box>
              );
            })}
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel3"}
          onChange={handleChange("panel3")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3bh-content"
            id="panel3bh-header"
          >
            <Typography className={classes.heading}>Facilities</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <FacilitiesCheckboxes
              control={control}
              classes={classes}
              facilities={data.exerciseFacilities}
              selectedFacilities={gym?.exerciseFacilities || []}
              label="Exercise Facilities"
            />
            <Divider />
            <FacilitiesCheckboxes
              control={control}
              classes={classes}
              facilities={data.otherFacilities}
              selectedFacilities={gym?.otherFacilities || []}
              label="Other Facilities"
            />
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel4"}
          onChange={handleChange("panel4")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel4bh-content"
            id="panel4bh-header"
          >
            <Typography className={classes.heading}>Upload an image</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box component="div" m={1}>
              <ImageUploader
                images={images}
                setImages={setImages}
                imageUrl={imageUrl}
                setImageUrl={setImageUrl}
                prefix={`${state.user.username}/gyms/images/`}
              />
            </Box>
          </AccordionDetails>
        </Accordion>
        <Box component="div" className={classes.center}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disableElevation
          >
            Submit
          </Button>
        </Box>
      </div>
    </form>
  );
};

export default GymForm;
