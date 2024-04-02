import { Grid } from '@mui/material';
import { FC } from 'react';
import { Cocktail } from '../interfaces';
import CocktailCard from './CocktailCard';

interface CocktailGridProps {
  cocktails: Cocktail[];
  handleOpen: (cocktail: any) => void;
}

const CocktailsGrid: FC<CocktailGridProps> = ({ cocktails, handleOpen }) => (
  <Grid mt={1} container spacing={3}>
    {cocktails.map((cocktail: Cocktail, index) => (
      <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
        <CocktailCard cocktail={cocktail} handleOpen={handleOpen} />
      </Grid>
    ))}
  </Grid>
);

export default CocktailsGrid;