import { useState, useCallback } from 'react';

const useInstallationManager = () =>
{
    const[modify, setModify] = useState(null)
    const onModified = useCallback(() =>
    {
        let x = Math.floor(Math.random() * (1000 - 1)) + 1;
        setModify(x);
    }, []);

    return{
        modify,
        onModified
    }
}

export default useInstallationManager;