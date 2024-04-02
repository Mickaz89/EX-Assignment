/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useCallback, useState } from 'react';
import { Button, TextField } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { debounce } from 'lodash';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { fetchCocktails, handleClose, setSearch, setSelectedCocktail } from '../redux/cocktails.slice';
import CocktailModal from '../components/CocktailModal';
import CocktailGrid from '../components/CocktailsGrid';
import { Row } from '../components/styles';
import { AddCircleOutline, AddCircleOutlineOutlined } from '@mui/icons-material';
import CocktailFormModal from '../components/CocktailFormModal';


const Home = () => {
  const dispatch = useAppDispatch();
  const cocktails = useAppSelector((state) => state.cocktails.cocktails);
  const open = useAppSelector((state) => state.cocktails.open);
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
      <CocktailGrid cocktails={cocktails} handleOpen={handleOpen} />
      <CocktailModal open={open} handleClose={() => dispatch(handleClose())} selectedCocktail={selectedCocktail} />
      <CocktailFormModal open={formModalOpen} handleClose={() => setFormModalOpen(false)} />
    </React.Fragment>
  );
};

export default Home;