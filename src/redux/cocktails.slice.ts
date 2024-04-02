import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

interface Cocktail {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
}

interface CocktailsState {
  cocktails: Cocktail[];
  selectedCocktail: Cocktail | null;
  search: string;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null | undefined;
  open: boolean
}

const initialState: CocktailsState = {
  cocktails: [],
  selectedCocktail: null,
  search: '',
  status: 'idle',
  error: null,
  open: false
};

export const fetchCocktails = createAsyncThunk(
  'cocktails/fetchCocktails',
  async (search: string) => {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${search}`);
    const data = await response.json();
    return data.drinks as Cocktail[];
  }
);

const cocktailsSlice = createSlice({
  name: 'cocktails',
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    setSelectedCocktail: (state, action: PayloadAction<Cocktail | null>) => {
      state.selectedCocktail = action.payload;
      state.open = true
    },
    handleOpen: (state) => {
        state.open = true
    },
    handleClose: (state) => {
        state.open = false
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCocktails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCocktails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.cocktails = action.payload;
      })
      .addCase(fetchCocktails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setSearch, setSelectedCocktail, handleClose } = cocktailsSlice.actions;

export default cocktailsSlice.reducer;