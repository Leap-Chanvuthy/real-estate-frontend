import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import axios from 'axios';
import { useEffect } from 'react';

const Review = ({property_id}) => {
    console.log(property_id)
 
useEffect(() => {
    const createReview = async () =>{
        try{
            const response = await axios.post(`http://127.0.0.1:8000/api/properties/${property_id}/reviews`)
        }
        catch(error){
            console.log(error);
        }
    }
    createReview();
},[]);
 


  return (
    <div className='mt-5'>
        <Box
          sx={{
            width: 500,
            maxWidth: '100%',
          }}
        >
          <TextField fullWidth label="Review" id="review" />
          <div className='mt-2'>
              <Button
                variant="outlined"
              
                size="medium"
                type="submit"
              >
                Review
              </Button>
          </div>
        </Box>
    </div>
  );
}

export default Review;