```jsx
import React, { useState, useEffect } from 'react';
import * as api from '../utils/api';
import { Box, Button, TextField, Typography, Grid, List, ListItem, ListItemText, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';


const MatchingCriteriaConfiguration = ({ criteria, setCriteria }) => {
    const [newCriterion, setNewCriterion] = useState('');

    const handleAddCriterion = async () => {
        if (newCriterion.trim() !== '') {
            try {
                const updatedCriteria = await api.addMatchingCriterion(newCriterion);
                setCriteria(updatedCriteria);
                setNewCriterion('');
            } catch (error) {
                console.error("Error adding criterion:", error);
                // Handle error, e.g., display error message
            }
        }
    };


    const handleRemoveCriterion = async (criterionToRemove) => {
        try {
          const updatedCriteria = await api.removeMatchingCriterion(criterionToRemove);
          setCriteria(updatedCriteria);
        } catch (error) {
          console.error("Error removing criterion:", error);
          // Handle error, e.g., display an error message
        }
      };


    return (
        <Box mt={4}>
            <Typography variant="h4" gutterBottom>
                Matching Criteria
            </Typography>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="New Criterion"
                        value={newCriterion}
                        onChange={(e) => setNewCriterion(e.target.value)}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={handleAddCriterion}>
                        Add Criterion
                    </Button>
                </Grid>
            </Grid>



            <List>
              {criteria.map((criterion) => (
                  <ListItem
                      key={criterion}
                      secondaryAction={
                          <IconButton edge="end" aria-label="delete" onClick={() => handleRemoveCriterion(criterion)}>
                              <RemoveIcon />
                          </IconButton>
                      }
                  >
                    <ListItemText primary={criterion} />
                  </ListItem>
              ))}
            </List>

        </Box>
    );

};

export default MatchingCriteriaConfiguration;
```