import React, {Fragment, useReducer} from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

import useFetchCategory from './useFetchCategory';
import CategoryForm from './CategoryForm';
import DataTable from '../../components/DataTable';
import { makeStyles } from '@material-ui/core/styles';
import {Functions} from '../../providers/Providers'
import Category from '../../models/Category';

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
    const classes = useStyles();
    const {fetchedCategory, error, onModify} = useFetchCategory();
    const columns = [
      { title: 'Nombre', field: 'Name' }
    ] 
    const title = "Tipos de Elementos"
    const [state, dispatch] = useReducer(reducer, initialState);

    return(
      <Fragment>
        <Functions.Provider value={{ state, dispatch }}>
          <CategoryForm
            //elementTypeData = {selectedRow}
            onModify = {onModify}/>
          
          { fetchedCategory === null &&
            <CircularProgress className={classes.progress}/>
          }
          { error === true &&
            <h1>Error...</h1>
          }
          { fetchedCategory !== null &&
            <DataTable
              Title = {title}
              Data = {fetchedCategory}
              Columns = {columns}
              />  
          }
        </Functions.Provider>
      </Fragment>
    )
}

export default CategoryView;

const useStyles = makeStyles(theme => ({
    progress: {
      margin: theme.spacing(2),
    },
  }));