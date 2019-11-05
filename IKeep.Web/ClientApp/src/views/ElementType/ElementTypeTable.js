import React, {useState} from 'react';
import useElementTypeViewModel from './useElementTypeViewModel';
import DataTable from '../../components/DataTable';

const ElementTypeTable = ({elementTypeData}) => 
{
  const [Add, Save, Delete] = useElementTypeViewModel();
  const [data, setData] = useState(elementTypeData)
  const ColumnsTable = [
      {title: "Ref", field: 'Ref'},
      {title: 'Nombre', field: 'Name'}
    ]

    return(
        <DataTable
            Title = "Tipos de Elementos"
            Data = {data}
            SetData = {setData}
            OnEdit = {Save}
            OnDelete = {Delete}
            OnAdd = {Add}
            Columns = {ColumnsTable}
        />
    )
}

export default ElementTypeTable