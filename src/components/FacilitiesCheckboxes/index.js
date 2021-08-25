import Box from "@material-ui/core/Box";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import { Controller } from "react-hook-form";
import { Checkbox } from "@material-ui/core";

const FacilitiesCheckboxes = ({
  control,
  classes,
  facilities,
  selectedFacilities,
  label,
}) => {
  const facilityIds = facilities.map((each) => each.id);
  const selectedFacilityIds = selectedFacilities.map((each) => each.id);
  console.log(facilityIds);
  console.log(selectedFacilityIds);

  return (
    <Box component="div">
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">{label}</FormLabel>
        <FormGroup className={classes.checkboxesContainer}>
          {facilities.map((facility) => {
            console.log(selectedFacilityIds.includes(facility.id));
            return (
              <FormControlLabel
                control={
                  <Controller
                    name={`exercise_facility_${facility.id}`}
                    control={control}
                    defaultValue={selectedFacilityIds.includes(facility.id)}
                    render={({ field: { onChange, value } }) => {
                      return (
                        <Checkbox
                          checked={value}
                          onChange={onChange}
                          defaultValue={selectedFacilityIds.includes(
                            facility.id
                          )}
                        />
                      );
                    }}
                  />
                }
                label={facility.name}
                key={facility.id}
              />
            );
          })}
        </FormGroup>
      </FormControl>
    </Box>
  );
};

export default FacilitiesCheckboxes;
