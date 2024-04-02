/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useCallback, useState } from 'react';
import { TextField, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { AddCircleOutlineOutlined } from '@mui/icons-material';
import { debounce } from 'lodash';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { fetchCocktails, handleClose, setSearch, setSelectedCocktail } from '../redux/cocktails.slice';
import CocktailModal from '../components/CocktailModal';
import { Row } from '../components/styles';
import CocktailFormModal from '../components/CocktailFormModal';
import CocktailsGrid from '../components/CocktailsGrid';


const Home = () => {
  const dispatch = useAppDispatch();
  const cocktails = useAppSelector((state) => state.cocktails.cocktails);
  const open = useAppSelector((state) => state.cocktails.open);
  const error = useAppSelector((state) => state.cocktails.error);
  const search = useAppSelector((state) => state.cocktails.search);
  const selectedCocktail: any = useAppSelector((state) => state.cocktails.selectedCocktail);

  const [formModalOpen, setFormModalOpen] = useState(false);


  const fetchCocktailsDebounced = debounce((searchValue: string) => {
    dispatch(fetchCocktails(searchValue));
  }, 1000);

  const debouncedFetchCocktails = useCallback((searchValue: string) => {
    fetchCocktailsDebounced(searchValue);
  }, [fetchCocktailsDebounced]);

  useEffect(() => {
    debouncedFetchCocktails(search);
    return () => fetchCocktailsDebounced.cancel();
  }, [search]);


  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearch(event.target.value));
  };

  const handleOpen = (cocktail: any) => {
    dispatch(setSelectedCocktail(cocktail));
  };


  return (
    <React.Fragment>
      <Row>
        <TextField sx={{marginRight: 5}} fullWidth label="Search" variant="outlined" value={search} onChange={handleSearchChange} />
        <IconButton onClick={() => setFormModalOpen(true)} size='large'>
          <AddCircleOutlineOutlined />
        </IconButton>
      </Row>
      {error && <Typography variant="body1" color="error">{error}</Typography>}
      <CocktailsGrid cocktails={cocktails} handleOpen={handleOpen} />
      <CocktailModal open={open} handleClose={() => dispatch(handleClose())} selectedCocktail={selectedCocktail} />
      <CocktailFormModal open={formModalOpen} handleClose={() => setFormModalOpen(false)} />
    </React.Fragment>
  );
};

export default Home;