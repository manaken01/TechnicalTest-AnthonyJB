import { ImageList, ImageListItem } from '@mui/material';

interface DogBreed {
    url: string;
  }
  
  interface DogImageListProps {
    dogBreeds: DogBreed[];
  }

function DogImageList({ dogBreeds }: DogImageListProps) {
    return (
        <ImageList sx={{ width: 900, height: 450, marginTop: '0.5%', justifyContent: 'center', marginBottom:'3%' }} cols={3} gap={10}>
            {dogBreeds.map((item) => (
                <ImageListItem key={item.url}>
                    <img
                        srcSet={`${item.url}?w=161&fit=crop&auto=format&dpr=2 2x`}
                        src={`${item.url}?w=161&fit=crop&auto=format`}
                        loading="lazy"
                    />
                </ImageListItem>
            ))}
        </ImageList>
    );
}

export default DogImageList;
