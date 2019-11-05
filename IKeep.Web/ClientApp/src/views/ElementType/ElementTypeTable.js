import React from 'react';
import useElementTypeViewModel from './useElementTypeViewModel';
import DataTable from '../../components/DataTable';

const ElementTypeTable = ({elementTypeData = []}) => 
{
  const [Add, Save, Delete] = useElementTypeViewModel();
  const ColumnsTable = [
      {title: "Ref", field: 'Ref'},
      {title: 'Nombre', field: 'Name'}
    ]

    return(
        <DataTable
            Title = "Roles"
            Data = {elementTypeData}
            OnEdit = {Save}
            OnDelete = {Delete}
            OnAdd = {Add}
            Columns = {ColumnsTable}
        />
    )
}

export default ElementTypeTable