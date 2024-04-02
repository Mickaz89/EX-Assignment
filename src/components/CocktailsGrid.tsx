// CocktailGrid.tsx
import { Card, CardActionArea, CardMedia, Grid } from '@mui/material';
import { FC } from 'react';

interface CocktailGridProps {
  cocktails: any[];
  handleOpen: (cocktail: any) => void;
}

const CocktailsGrid: FC<CocktailGridProps> = ({ cocktails, handleOpen }) => (
  <Grid mt={1} container spacing={3}>
    {cocktails.map((cocktail: any, index) => (
      <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
        <CardActionArea onClick={() => handleOpen(cocktail)}>
          <Card>
            <CardMedia
              component="img"
              alt="Cocktail image"
              height="140"
              image={`${cocktail.strDrinkThumb}`}
            />
          </Card>
        </CardActionArea>
      </Grid>
    ))}
  </Grid>
);

export default CocktailsGrid;