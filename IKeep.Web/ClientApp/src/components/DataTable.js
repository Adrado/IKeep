import React, {useState} from 'react';
import MaterialTable from 'material-table';

const DataTable = (props) =>
{
    const {Title, Data, OnEdit, OnDelete, OnAdd, Columns} = props;

    const [state] = useState({
        columns: Columns,
        data: Data
      });
    
    return (
        <MaterialTable
          title={Title}
          columns={state.columns}
          data={state.data}
          editable={{
            isEditable: rowData => rowData.name === "a", // only name(a) rows would be editable
            isDeletable: rowData => rowData.name === "b", // only name(a) rows would be deletable
            onRowAdd: newData =>
                new Promise((resolve, reject) => {
                    setTimeout(() => {
                        {
                            OnAdd(newData);  
                          /* const data = this.state.data;
                            data.push(newData);
                            this.setState({ data }, () => resolve()); */
                        }
                        resolve();
                    }, 1000);
                }),
            onRowUpdate: (newData, oldData) =>
                new Promise((resolve, reject) => {
                    setTimeout(() => {
                        {
                            /* const data = this.state.data;
                            const index = data.indexOf(oldData);
                            data[index] = newData;                
                            this.setState({ data }, () => resolve()); */
                        }
                        resolve();
                    }, 1000);
                }),
            onRowDelete: oldData =>
                new Promise((resolve, reject) => {
                    setTimeout(() => {
                        {
                            /* let data = this.state.data;
                            const index = data.indexOf(oldData);
                            data.splice(index, 1);
                            this.setState({ data }, () => resolve()); */
                        }
                        resolve();
                    }, 1000);
                })
        }}
          options={{
            actionsColumnIndex: -1
          }}
        />
      );
}

export default DataTable;