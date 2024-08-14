// src/App.js
import React, { useState } from 'react';
import { Container, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Checkbox, TextField, Button, FormGroup } from '@mui/material';

function App() {
  const [formData, setFormData] = useState({
    gender: '',
    ageGroup: '',
    sports: [],
    blogVisit: ''
  });

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    if (type === 'checkbox') {
      setFormData((prevData) => ({
        ...prevData,
        sports: checked
          ? [...prevData.sports, value]
          : prevData.sports.filter((sport) => sport !== value)
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <FormControl component="fieldset">
          <FormLabel component="legend">Gender</FormLabel>
          <RadioGroup name="gender" value={formData.gender} onChange={handleChange}>
            <FormControlLabel value="male" control={<Radio />} label="Male" />
            <FormControlLabel value="female" control={<Radio />} label="Female" />
            <FormControlLabel value="other" control={<Radio />} label="Other" />
          </RadioGroup>
        </FormControl>

        <FormControl component="fieldset">
          <FormLabel component="legend">Age Group</FormLabel>
          <RadioGroup name="ageGroup" value={formData.ageGroup} onChange={handleChange}>
            <FormControlLabel value="under18" control={<Radio />} label="Under 18" />
            <FormControlLabel value="18-24" control={<Radio />} label="18-24" />
            <FormControlLabel value="25-34" control={<Radio />} label="25-34" />
            <FormControlLabel value="35-44" control={<Radio />} label="35-44" />
            <FormControlLabel value="45-54" control={<Radio />} label="45-54" />
            <FormControlLabel value="55+" control={<Radio />} label="55+" />
          </RadioGroup>
        </FormControl>

        <FormControl component="fieldset">
          <FormLabel component="legend">Sports Interests</FormLabel>
          <FormGroup>
            <FormControlLabel control={<Checkbox name="sports" value="Tennis" onChange={handleChange} />} label="Tennis" />
            <FormControlLabel control={<Checkbox name="sports" value="Ice Hockey" onChange={handleChange} />} label="Ice Hockey" />
            <FormControlLabel control={<Checkbox name="sports" value="Soccer" onChange={handleChange} />} label="Soccer" />
            <FormControlLabel control={<Checkbox name="sports" value="Basketball" onChange={handleChange} />} label="Basketball" />
          </FormGroup>
        </FormControl>

        <TextField
          label="Why do you visit sports blogs?"
          name="blogVisit"
          value={formData.blogVisit}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />

        <Button type="submit" variant="contained" color="primary">Submit</Button>
      </form>
    </Container>
  );
}

export default App;
