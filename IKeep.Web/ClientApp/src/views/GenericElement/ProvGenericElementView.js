import React from 'react';
import GenericElementView from './GenericElementView';

import {Services, ElementTypeService , CRUD} from '../../providers/Providers';

const ProvGenericElementView = () =>
{
    return(
        <Services.Provider value={CRUD.GenericElement}>
            <ElementTypeService.Provider value={CRUD.ElementType}>
                <GenericElementView/>
            </ElementTypeService.Provider>
        </Services.Provider>
    )
}
export default ProvGenericElementView;