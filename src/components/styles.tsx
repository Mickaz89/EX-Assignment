import { styled } from '@mui/system';
import { Box } from '@mui/material';

const styles = {
    mt3: { mt: 3 },
    centerBox: { display: "flex", justifyContent: "center", mt: 3 },
    ingredientsBox: { display: 'flex', flexDirection: 'column', maxHeight: '300px', overflow: 'auto' },
    modalBox: { width: 400, padding: 4, bgcolor: 'background.paper', m: 2, mx: 'auto', mt: 10 }
};

export const ModalBody = styled(Box)({
  width: 400,
  padding: 20,
  backgroundColor: 'white',
  margin: 2,
  marginLeft: 'auto',
  marginRight: 'auto',
  marginTop: 100,
  borderRadius: 5,
});

export const Row = styled(Box)({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  });

  export const AddIngredientButton = styled(Box)({
    display: 'flex',
    justifyContent: 'center',
    mt: 3,
  });

  export const IngredientsBox = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    maxHeight: '300px',
    overflow: 'auto',
  });

  export const mt3 = { mt: 3 };