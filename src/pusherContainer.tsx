import Pusher from 'pusher-js';
import React from 'react';
import { useAppDispatch, useAppSelector } from './commonHooks';
import { selectToken } from './redux/auth';
import { Call, updateCall } from './redux/calls';

const PusherContainer = ({children}: {children: React.ReactNode}) => {
    const token = useAppSelector(selectToken);
    const dispatch = useAppDispatch();

    React.useEffect(() => {
        const pusher = new Pusher('d44e3d910d38a928e0be', {
          cluster: 'eu',
          authEndpoint: 'https://frontend-test-api.aircall.io/pusher/auth',
          auth: {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        });
      
        const channel = pusher.subscribe("private-aircall");
        channel.bind("update-call", (call: Call) => dispatch(updateCall(call)));

        return () => {
            channel.unsubscribe();
        }

    }, [token, dispatch])



    return <>
    {children}
    </>
}

export default PusherContainer;