import { useState, useCallback } from 'react';

const useInstallationManager = () =>
{
    const[modify, setModify] = useState(null)

    const onModified = useCallback((e) =>
    {
        setModify(e);
    }, []);

    return{
        modify,
        onModified
    }
}

export default useInstallationManager