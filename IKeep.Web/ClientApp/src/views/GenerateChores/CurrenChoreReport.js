import React, { useState, useEffect } from 'react';
import useChoreViewModel from './useChoreViewModel';

const CurrentChoreResponse = () => {
  const [seconds, setSeconds] = useState(0);
  const [,,,GetResponse] = useChoreViewModel();

  useEffect(() => {
    let isSuscribed = true;

    const GetCurrentStatus = async () =>
    {
        try
        {
            
            const response = await GetResponse();
            if (isSuscribed)
                console.log(response);
        }
        catch(error)
        {
            console.log(error);
        }
    }

    const interval = setInterval(() => {
      setSeconds(seconds => seconds + 5);
        GetCurrentStatus();
        console.log("Llamando")

    }, 5000);
    return () => {
        clearInterval(interval);
        isSuscribed = false;
    };
  }, [GetResponse]);

  return (
    <div className="App">
      <header className="App-header">
        {seconds} seconds have elapsed since mounting.
      </header>
    </div>
  );
};

export default CurrentChoreResponse;