import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import DogImageList from '@/components/dogImageList';
import PetsIcon from '@mui/icons-material/Pets';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';

/**
 * 
 * @returns the main page
 */
export default function Home() {

  const [dogBreeds, setDogBreeds] = useState<any[]>([])
  const [selectedDog, setSelectedDog] = useState<string | null>(null);

  const fetchDogBreeds = async () => {
    try {
      const response = await axios.get('https://api.thedogapi.com/v1/images/search?limit=10', {
        headers: {
          'x-api-key': 'live_p5CC4himAdbSUr8La8wY1VHawKyQxIZ5s1GJN9StVWRDpBqsUkrO8OyYeBfZruxs', 
        },
      });

      setDogBreeds(response.data);
    } catch (error) {
      console.error('Error getting the dogs:',error);
    }
  };

  const fetchDogBreedsById = async () => {
    console.log(selectedDog)
    try {
      const response = await axios.get(`https://api.thedogapi.com/v1/images/search?limit=10&breed_ids=${selectedDog}`, {
        headers: {
          'x-api-key': 'live_p5CC4himAdbSUr8La8wY1VHawKyQxIZ5s1GJN9StVWRDpBqsUkrO8OyYeBfZruxs',
        },
      });
      console.log(response.data)
      setDogBreeds(response.data);
    } catch (error) {
      console.error('error getting the dogs:',error);
    }
   
  };

  useEffect(() => {
    fetchDogBreeds();
  }, []);

  const handleRandomDogsClick = () => {
    fetchDogBreeds();
  };

  return (
  
    <Container maxWidth="lg" 
    sx={{
      backgroundColor: '#FFFFFF',
      maxHeight: '1%',
    }}
    >
      <Box
      sx={{
        my: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '10%'
      }}>

        <Stack direction="row" spacing={2} sx={{ marginTop: '8%', marginBottom: '4%' }}>
          <PetsIcon sx={{color: '#FD9B10', marginTop: '4%', fontSize: 65}}/>
          <Typography variant='h2' sx={{color: '#FD9B10'}}>DOGS</Typography>
          <Typography variant='h2' sx={{color: 'black'}}>PAGE</Typography>
        </Stack>
        
        <DogImageList dogBreeds={dogBreeds} />

        <Stack direction="row" spacing={3} sx={{marginBottom:'5%'}} >
          <Select 
          value={selectedDog} 
          onChange={(e, newValue) => setSelectedDog(newValue)}
          placeholder='Choose one...' 
          variant='outlined' 
          style={{ backgroundColor: 'black', color: 'white' }}>
            <Option value="1">Affenpinscher</Option>
            <Option value="2">Afghan Hound</Option>
            <Option value="5">Akbash Dog</Option>
            <Option value="6">Akita</Option>
            <Option value="7">Alapaha Blue Blood Bulldog</Option>
            <Option value="4">Airedale Terrier</Option>
          </Select>
          <Button onClick={fetchDogBreedsById} variant="contained" style={{ backgroundColor: 'black', color: 'white'}}>
            Search
          </Button>
          <Button onClick={handleRandomDogsClick} variant="contained" style={{ backgroundColor: 'black', color: 'white'}}>
            Random dogs
          </Button>
        </Stack>
      </Box>
    </Container>

  )
}
