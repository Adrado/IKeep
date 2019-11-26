import React, {Fragment, useReducer} from 'react';
import {Functions} from '../../providers/Providers';
import Category from '../../models/Category';
import CategoriesTable from './CategoriesTable';

function reducer(state, action) {
  switch (action.type) {
      case 'SELECT_ROW':
          return {
              selectedRow: action.data
          };
      default:
          return initialState;
  }
}

const initialState = {
  selectedRow: new Category(),
};

const CategoryView = () =>
{
  const [state, dispatch] = useReducer(reducer, initialState);
  return(
    <Fragment>
      <Functions.Provider value={{ state, dispatch }}>
          <CategoriesTable/>  
      </Functions.Provider>
    </Fragment>
  )
}

export default CategoryView;

