import { FC } from 'react';
import { Box, Modal, Typography } from '@mui/material';
import { ModalBody } from './styles';

interface CocktailModalProps {
  open: boolean;
  handleClose: () => void;
  selectedCocktail: any;
}

const CocktailModal: FC<CocktailModalProps> = ({ open, handleClose, selectedCocktail }) => (
  <Modal
    open={open}
    onClose={handleClose}
    aria-labelledby="simple-modal-title"
    aria-describedby="simple-modal-description"
  >
    <ModalBody >
      {selectedCocktail && (
        <>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {selectedCocktail.strDrink}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {selectedCocktail.strInstructions}
          </Typography>
          <Typography id="modal-modal-ingredients" sx={{ mt: 2 }}>
            <strong>Ingredients:</strong>
            {Object.keys(selectedCocktail).map((key, index) => {
              if (key.startsWith('strIngredient') && selectedCocktail[key]) {
                return (
                  <div key={index}>
                    {selectedCocktail[key]} - {selectedCocktail[`strMeasure${key.slice(13)}`]}
                  </div>
                );
              }
              return null;
            })}
          </Typography>
        </>
      )}
    </ModalBody>
  </Modal>
);

export default CocktailModal;