import React, { useContext, useEffect, useState } from 'react';
import { auth as firebaseAuth } from './firebase'; 

// most components will use this,
// if user is logged in and what is the userId
interface Auth {
  loggedIn: boolean;
  userId?: string; // ? is optional
}

// Only used by App to initialize the firebase authentication
interface AuthInit {
  loading: boolean;
  auth?: Auth;
}

export const AuthContext = React.createContext<Auth>({loggedIn:false});

export function useAuth(): Auth {
    return useContext(AuthContext);
}

export function useAuthInit(): AuthInit {
  const [authInit, setAuthInit] = useState<AuthInit>({loading: true});
  useEffect(() => {
    return firebaseAuth.onAuthStateChanged((firebaseUser) => {
        // setAuthInit({loading: false, auth: {loggedIn: Boolean(user)}});
        const auth = firebaseUser ?
          { loggedIn:  true, userId: firebaseUser.uid} :
          { loggedIn: false };
        setAuthInit({ loading: false, auth});
      });
    },[]);

  // const [authState, setAuthInit] = useState<AuthInit>({loading: true});
  // useEffect(() => {
  //   return firebaseAuth.onAuthStateChanged((firebaseUser) => {
  //         const auth = firebaseUser ?
  //             {loggedIn: true, userId: firebaseUser.uid } :
  //             {loggedIn: false};
  //         setAuthInit({loading: false, auth});
  //   });
  // }, []);
  return authInit;
}

// export function useAuthInit(): AuthInit {
//   const [authInit, setAuthInit] = useState<AuthInit>({ loading: true, loggedIn: false });
//     useEffect(() => {
//       firebaseAuth.onAuthStateChanged((user) => {
//           setAuthInit({loading: false, loggedIn: Boolean(user)});
//         });
//       },[]);
//   return authInit;
// }

