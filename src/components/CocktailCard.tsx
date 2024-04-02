import { Card, CardActionArea, CardMedia } from '@mui/material';

interface CocktailCardProps {
  cocktail: {
    strDrinkThumb: string;
  };
  handleOpen: (cocktail: any) => void;
}

const CocktailCard: React.FC<CocktailCardProps> = ({ cocktail, handleOpen }) => {
  return (
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
  );
};

export default CocktailCard;