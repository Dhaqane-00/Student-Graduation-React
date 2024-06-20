import React, { useState } from 'react';
import { Button, TextField, MenuItem, Box } from '@mui/material';
import { useSinglePredictMutation } from 'store/api/fileApi'; // Adjust the import path accordingly

const PredictSingle = () => {
  const [formData, setFormData] = useState({
    Department: '',
    Sex: '',
    Mode: '',
    T_Att: '',
    Discounts: '',
    NO_Re_exams: '',
    CGPA: '',
  });

  const [singlePredict, { data, error, isLoading }] = useSinglePredictMutation();

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      const response = await singlePredict(formData).unwrap();
      console.log('Prediction response:', response);
    } catch (err) {
      console.error('Failed to predict:', err);
    }
  };

  return (
    <Box>
      <h2>Predict Graduation</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          select
          margin="dense"
          label="Department"
          name="Department"
          value={formData.Department}
          onChange={handleChange}
          fullWidth
          required
        >
          <MenuItem value="Computer-Application">Computer Application</MenuItem>
          <MenuItem value="Pharmacology">Pharmacology</MenuItem>
          <MenuItem value="Computer-Networking-and-Security">Computer Networking and Security</MenuItem>
          <MenuItem value="Medical-Laboratory-Science">Medical Laboratory Science</MenuItem>
          <MenuItem value="Accounting-and-Finance">Accounting and Finance</MenuItem>
          <MenuItem value="Banking-and-Finance">Banking and Finance </MenuItem>
          <MenuItem value="Business-Administration">Business Administration</MenuItem>
          <MenuItem value="Civil-Engineering">Civil Engineering</MenuItem>
          <MenuItem value="Economics">Economics </MenuItem>
          <MenuItem value="Pharmacology"> Pharmacology</MenuItem>
          <MenuItem value="Public-Administration ">Public Administration</MenuItem>
          <MenuItem value="Computer-Multimedia">Computer Multimedia</MenuItem>
          <MenuItem value="Electrical-and-Electronics">Electrical Engineering</MenuItem>
          <MenuItem value="Pharmacology">Pharmacology</MenuItem>
          
        </TextField>

        <TextField
          margin="dense"
          select
          label="Sex"
          name="Sex"
          value={formData.Sex}
          onChange={handleChange}
          fullWidth
          required
        >
          <MenuItem value="Male">Male</MenuItem>
          <MenuItem value="Female">Female</MenuItem>
        </TextField>

        <TextField
          margin="dense"
          select
          label="Mode"
          name="Mode"
          value={formData.Mode}
          onChange={handleChange}
          fullWidth
          required
        >
          <MenuItem value="Fulltime">Fulltime</MenuItem>
          <MenuItem value="Parttime">Parttime</MenuItem>
        </TextField>

        <TextField
          margin="dense"
          label="Total Attendance"
          name="T_Att"
          type="number"
          inputProps={{ step: 0.01, min: 0, max: 100 }}
          value={formData.T_Att}
          onChange={handleChange}
          fullWidth
          required
        />

        <TextField
          margin="dense"
          label="Scholarship"
          name="Discounts"
          type="number"
          inputProps={{ step: 0.01, min: 0, max: 100 }}
          value={formData.Discounts}
          onChange={handleChange}
          fullWidth
          required
        />

        <TextField
          margin="dense"
          label="Number Of Re-exams"
          name="NO_Re_exams"
          inputProps={{ step: 0.01, min: 0, max: 45 }}
          type="number"
          value={formData.NO_Re_exams}
          onChange={handleChange}
          fullWidth
          required
        />

        <TextField
          margin="dense"
          label="CGPA"
          name="CGPA"
          type="number"
          inputProps={{ step: 0.01, min: 0, max: 100 }}
          value={formData.CGPA}
          onChange={handleChange}
          fullWidth
          required
        />

        <Button type="submit" variant="contained" color="primary" disabled={isLoading}>
          {isLoading ? 'Predicting...' : 'Predict'}
        </Button>
      </form>
      {data && (
        <Box mt={2} sx={{ textAlign: 'center' }}>
          <h3>Prediction Result</h3>
          <p>{data.prediction}</p>
        </Box>
      )}
      {error && (
        <Box mt={2} color="red">
          <p>Error: {/*Missing Error Hadling Note It*/}</p>
        </Box>
      )}
    </Box>
  );
};

export default PredictSingle;
