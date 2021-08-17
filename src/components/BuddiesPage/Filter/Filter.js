import React from "react";
import { useState, useContext } from "react";

import { BuddiesFilterContext } from "../../../context/BuddiesFilterContext";

import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Box from "@material-ui/core/Box";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { listCities } from "cclist";

import "./Filter.css";

const Filter = ({ filterStatus, setFilterStatus }) => {
  // const [countries] = useState(Country.getAllCountries());
  const [selectedGym, setSelectedGym] = useState("");

  const { filterParams, setFilterParams } = useContext(BuddiesFilterContext);

  const onSubmit = (event) => {
    event.preventDefault();

    console.log({
      filterParams,
      selectedGym,
    });
  };

  const handleChangeCity = (event) => {
    setFilterParams({ ...filterParams, city: event.target.value });
  };

  const handleChangeGym = (event) => {
    setFilterParams({ ...filterParams, gym: event.target.value });
  };

  const cities = listCities("GB").sort();
  console.log(cities);

  return (
    <div className={`filter ${filterStatus ? "active-filter" : ""}`}>
      <h2>Filter</h2>
      <div className="filterOptions">
        <form onSubmit={onSubmit}>
          <Box component="div" m={1}>
            <FormControl style={{ minWidth: "200px" }}>
              <InputLabel>City</InputLabel>
              <Select value={filterParams} onChange={handleChangeCity}>
                {cities.map((city) => {
                  return (
                    <MenuItem name={city} value={city} key={city}>
                      {city}
                    </MenuItem>
                  );
                })}
                <MenuItem name="Birmingham" value="Birmingham" key="Birmingham">
                  Birmingham
                </MenuItem>
                <MenuItem name="Manchester" value="Manchester" key="Manchester">
                  Manchester
                </MenuItem>
              </Select>
            </FormControl>
          </Box>
          {filterParams && (
            <Box component="div" m={1}>
              <FormControl style={{ minWidth: "200px" }}>
                <InputLabel>Gym</InputLabel>
                <Select value={selectedGym} onChange={handleChangeGym}>
                  <MenuItem value="PureGym" key="PureGym">
                    PureGym
                  </MenuItem>
                </Select>
              </FormControl>
            </Box>
          )}
          <Box component="div" m={1}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              onClick={() => setFilterStatus(!filterStatus)}
              className="closeFilterButton"
            >
              Save & Close
            </Button>
          </Box>
        </form>
      </div>
    </div>
  );
};

export default Filter;
