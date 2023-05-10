import {
  IonApp, IonLoading,
} from '@ionic/react';
import { Redirect, Route, Switch } from 'react-router-dom';
import React from 'react';
import { IonReactRouter } from '@ionic/react-router';
import AppTabs from './AppTabs';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';
import { AuthContext, useAuthInit } from './auth';
import RegisterPage from './pages/RegisterPage';
// import { auth } from './firebase';
import CalendarPage from './pages/CalendarPage';

const App: React.FC = () => {
  const { loading, auth } = useAuthInit();
  // const authState = useAuthInit();
  // const authState = useAuthInit();
  // const [loggedIn, setLoggedIn] = useState(false);
  // const { loading, auth } = useAuthInit();

  if(loading) {
    return<IonLoading isOpen />;
  }
  console.log(`rendering App with authState=`, auth);
  //   if(authState.loading) {
  //     return <IonLoading isOpen />;
  //   }

  return (
    <IonApp>
      <AuthContext.Provider value = { auth }>
          <IonReactRouter>
              <Switch>
                <Route exact path="/login">
                    <LoginPage />
                </Route>
                <Route exact path="/register">
                    <RegisterPage />
                </Route>
                <Route exact path="/calendar">
                    <CalendarPage />
                </Route>
                <Route path="/my" >
                  <AppTabs />
                </Route>
                <Redirect exact path="/" to="/login" />
                <Route>
                  <NotFoundPage />
                </Route>
              </Switch>
        </IonReactRouter>
      </AuthContext.Provider>
    </IonApp>
  );
};

export default App;
