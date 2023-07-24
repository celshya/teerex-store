import React, { useState, useEffect } from "react";
import {
  Typography,
  Divider,
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Slider,
} from "@mui/material";

const TShirtFilter = ({ onFilterChange }) => {
  const [gender, setGender] = useState([]);
  const [colour, setColour] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [type, setType] = useState([]);
  const [availableTypes, setAvailableTypes] = useState([]);

  useEffect(() => {
    // Fetch available T-shirt types from your data (you can set manually for testing purposes)
    const types = ["Hoodie", "Basic", "Polo"];
    setAvailableTypes(types);
  }, []);

  const handleGenderChange = (event) => {
    const selectedGender = event.target.value;
    setGender((prevGender) => {
      if (prevGender.includes(selectedGender)) {
        return prevGender.filter((item) => item !== selectedGender);
      } else {
        return [...prevGender, selectedGender];
      }
    });
  };

  const handleColourChange = (event) => {
    const selectedColour = event.target.value;
    setColour((prevColour) => {
      if (prevColour.includes(selectedColour)) {
        return prevColour.filter((item) => item !== selectedColour);
      } else {
        return [...prevColour, selectedColour];
      }
    });
  };

  const handleTypeChange = (event) => {
    const selectedType = event.target.value;
    setType((prevType) => {
      if (prevType.includes(selectedType)) {
        return prevType.filter((item) => item !== selectedType);
      } else {
        return [...prevType, selectedType];
      }
    });
  };

  useEffect(() => {
    // Pass the selected filter options to the parent component (Products) through onFilterChange prop
    const filterOptions = { gender, colour, priceRange, type };
    onFilterChange(filterOptions);
  }, [gender, colour, priceRange, type, onFilterChange]);

  return (
    <div>
      <Typography variant="h6">Filter by:</Typography>
      <Divider />
      <Typography variant="subtitle1">Gender</Typography>
      <FormControl component="fieldset">
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={gender.includes("Men")}
                onChange={handleGenderChange}
                value="Men"
              />
            }
            label="Men"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={gender.includes("Women")}
                onChange={handleGenderChange}
                value="Women"
              />
            }
            label="Women"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={gender.includes("Unisex")}
                onChange={handleGenderChange}
                value="Unisex"
              />
            }
            label="Unisex"
          />
        </FormGroup>
      </FormControl>
      <Typography variant="subtitle1">Colour</Typography>
      <FormControl fullWidth>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={colour.includes("Green")}
                onChange={handleColourChange}
                value="Green"
              />
            }
            label="Green"
          />
           <FormControlLabel
            control={
              <Checkbox
                checked={colour.includes("Black")}
                onChange={handleColourChange}
                value="Black"
              />
            }
            label="Black"
          />
           <FormControlLabel
            control={
              <Checkbox
                checked={colour.includes("Pink")}
                onChange={handleColourChange}
                value="Pink"
              />
            }
            label="Pink"
          />
           <FormControlLabel
            control={
              <Checkbox
                checked={colour.includes("Grey")}
                onChange={handleColourChange}
                value="Grey"
              />
            }
            label="Grey"
          />
           <FormControlLabel
            control={
              <Checkbox
                checked={colour.includes("White")}
                onChange={handleColourChange}
                value="White"
              />
            }
            label="White"
          />
           <FormControlLabel
            control={
              <Checkbox
                checked={colour.includes("Yellow")}
                onChange={handleColourChange}
                value="Yellow"
              />
            }
            label="Yellow"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={colour.includes("Blue")}
                onChange={handleColourChange}
                value="Blue"
              />
            }
            label="Blue"
          />
          {/* Add more colour options as needed */}
        </FormGroup>
      </FormControl>

      <Typography variant="subtitle1">Type</Typography>
      <FormControl fullWidth>
        <FormGroup>
          {availableTypes.map((item) => (
            <FormControlLabel
              key={item}
              control={
                <Checkbox
                  checked={type.includes(item)}
                  onChange={handleTypeChange}
                  value={item}
                />
              }
              label={item}
            />
          ))}
        </FormGroup>
      </FormControl>

      <Typography variant="body1">Price Range</Typography>
      <Slider
        value={priceRange}
        onChange={(event, newValue) => setPriceRange(newValue)}
        valueLabelDisplay="auto"
        min={0}
        max={500}
      />
    </div>
  );
};

export default TShirtFilter;
