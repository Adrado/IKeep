import { useEffect, useState} from 'react';
const usePreventiveMaintenanceTableData = ({chores, elements}) =>
{
  const [elementsList, setElementList] = useState(null); 
  useEffect(() => 
  {

  },[chores, elements])
}
export default usePreventiveMaintenanceTableData;

/* AreaView.propTypes = {
    treeNode: PropTypes.instanceOf(TreeNode),
  }; */