//Core
import React, {Fragment, useState, useReducer, useContext} from 'react';

//Hooks
import useFetchCurrentChoresForToday from './useFetchCurrentChoresForToday';
import useFetchInstallationElements from './useFetchInstallationElements';

//Components
import PreventiveMaintenanceTable from './PreventiveMaintenanceTable';


function reducer(state, action) {
    switch (action.type) {
        case 'ADD_CHORES':
            return {
                selectedChores: action.data,
                selectedPeriods: state.selectedPeriods,
                selectedChoreTypes: state.selectedChoreTypes
            };
        case 'ADD_PERIODS':
            return{
                selectedChores: state.selectedChores,
                selectedPeriods: action.data,
                selectedChoreTypes: state.selectedChoreTypes
            };
        case 'ADD_CHORETYPES':
            return{
                selectedChores: state.selectedChores,
                selectedPeriods: state.selectedPeriods,
                selectedChoreTypes: action.data
            };
        default:
            return initialState;
    }
  }
  
  const initialState = {
    selectedChores: [],
    selectedPeriods: [],
    selectedChoreTypes: []
  };

export const PreventiveMaintenanceContext = React.createContext();

const PreventiveMaintenanceView = () =>
{
    const [state, dispatch] = useReducer(reducer, initialState);   
    //Trabajo IKA9
    let id = "d27f7e6f-964e-4e4f-8b46-730037c0104e"; //Asus
    const {Chores} = useFetchCurrentChoresForToday(id);
    const {Elements} = useFetchInstallationElements(id);
    
    return(
        <Fragment>
            <PreventiveMaintenanceContext.Provider value={{ state, dispatch }}>
                {(Chores !== null && Elements !== null) &&
                    <PreventiveMaintenanceTable
                        chores = {Chores}
                        elements = {Elements}
                    />
                }
            </PreventiveMaintenanceContext.Provider>
        </Fragment>
    )
}

export default PreventiveMaintenanceView;