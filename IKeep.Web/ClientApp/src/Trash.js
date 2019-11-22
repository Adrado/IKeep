const [Add, Save, Delete] = useGenericElementViewModel(onModify, SelectRow);
  const {values, handleOnChange, onAdd, onSave, onDelete, handleSelectorChange, renderOptions, selected} = useForm(
    GenericElementState, 
    state.selectedRow, 
    Add, 
    Save, 
    Delete, 
    selectorData, 
    state.selectedRow.ElementTypeId);



    <Select
                        className="width50" value={selected} onChange={handleSelectorChange}>
                        {renderOptions()}
                      </Select>