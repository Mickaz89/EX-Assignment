import { FC, useState } from 'react';
import { Box, Modal, TextField, Button, CircularProgress, Typography, IconButton } from '@mui/material';
import { saveAs } from 'file-saver';
import { AddCircleOutlineOutlined } from '@mui/icons-material';
import { AddIngredientButton, IngredientsBox, ModalBody } from './styles';

interface CocktailFormModalProps {
    open: boolean;
    handleClose: () => void;
}

const styles = {
    mt3: { mt: 3 },
    centerBox: { display: "flex", justifyContent: "center", mt: 3 },
    ingredientsBox: { display: 'flex', flexDirection: 'column', maxHeight: '300px', overflow: 'auto' },
    modalBox: { width: 400, padding: 4, bgcolor: 'background.paper', m: 2, mx: 'auto', mt: 10 }
};

const CocktailFormModal: FC<CocktailFormModalProps> = ({ open, handleClose }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [ingredients, setIngredients] = useState(['']);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleIngredientChange = (index: number, value: string) => {
        const newIngredients = [...ingredients];
        newIngredients[index] = value;
        setIngredients(newIngredients);
    };

    const addIngredient = () => {
        setIngredients([...ingredients, '']);
    };

    const resetForm = () => {
        setName('');
        setDescription('');
        setIngredients(['']);
        setLoading(false);
    };

    const handleModalClose = () => {
        setSuccess(false);
        resetForm();
        handleClose();
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);
        setError('');
        setSuccess(false);

        // Validate form fields
        if (!name || !description || ingredients.some(ingredient => !ingredient)) {
            setError('All fields are required');
            setLoading(false);
            return;
        }

        // Delay the execution of the code by 2 seconds
        setTimeout(() => {
            // Export cocktail data as JSON file
            const cocktailData = { name, description, ingredients };
            const blob = new Blob([JSON.stringify(cocktailData)], { type: 'application/json' });
            saveAs(blob, `${name}.json`);

            setSuccess(true);
            setLoading(false);
            resetForm();
        }, 2000);
    };

    const IngredientFields = ingredients.map((ingredient, index) => (
        <TextField
            key={index}
            sx={styles.mt3}
            fullWidth
            label={`Ingredient ${index + 1}`}
            value={ingredient}
            onChange={(e) => handleIngredientChange(index, e.target.value)}
        />
    ));

    return (
        <Modal open={open} onClose={handleModalClose}>
            <ModalBody>
                <form onSubmit={handleSubmit}>
                    <TextField fullWidth label="Name" value={name} onChange={(e) => setName(e.target.value)} />
                    <TextField sx={styles.mt3} fullWidth label="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
                    <IngredientsBox>
                        {IngredientFields}
                    </IngredientsBox>
                    <AddIngredientButton>
                        <IconButton onClick={addIngredient} size='small'>
                            <AddCircleOutlineOutlined />
                        </IconButton>
                    </AddIngredientButton>
                    <Button sx={styles.mt3} type="submit" disabled={loading}>
                        {loading ? <CircularProgress size={24} /> : 'Submit'}
                    </Button>
                </form>
                {error && <Typography color="error">{error}</Typography>}
                {success && <Typography color="green">Cocktail data exported successfully!</Typography>}
            </ModalBody>
        </Modal>
    );
};

export default CocktailFormModal;