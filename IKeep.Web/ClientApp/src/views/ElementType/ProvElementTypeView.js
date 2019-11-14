import React from 'react';
import ElementTypeView from "./ElementTypeView"
import {ElementTypeService , CRUD} from '../../providers/Providers';

const ProvElementTypeView = () =>
{
    return(
        <ElementTypeService.Provider value={CRUD.ElementType}>
            <ElementTypeView/>
        </ElementTypeService.Provider>
    )
}
export default ProvElementTypeView;