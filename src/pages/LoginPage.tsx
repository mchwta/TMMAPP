import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonItem,
  IonLabel,
  IonInput,
  IonList,
  IonText,
  IonLoading
} from '@ionic/react';
import React, { useState } from 'react';
import { Redirect } from 'react-router';
import { useAuth } from '../auth';
import { auth } from '../firebase';

const LoginPage: React.FC = () => {
  const { loggedIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState({loading:false, error:false});

  const handleLogin = async () => {
    try {
      setStatus({loading:true, error:false});
      const credential = await auth.signInWithEmailAndPassword(email,password);
      console.log('credential:', credential);
    }
    catch (error) {
      setStatus({loading:false, error:true});
      console.log('error: ', error);
    }
  };

  const handleForgotPassword = async () => {
    try {
      setStatus({loading:true, error:false});
      await auth.sendPasswordResetEmail(email);
      setStatus({loading:false, error:false});
      console.log('Password reset email sent successfully');
    }
    catch (error) {
      setStatus({loading:false, error:true});
      console.log('error: ', error);
    }
  };

  if(loggedIn) {
    return <Redirect to="/my/entries" />;
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login Page</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
          <IonList>
            <IonItem>
                <IonLabel position="floating">Email</IonLabel>
                <IonInput type="email" value={email}
                  onIonChange={(event) => setEmail(event.detail.value)}
                />
            </IonItem>
            <IonItem>
                <IonLabel position="floating">Password</IonLabel>
                <IonInput type="password" value={password}
                  onIonChange={(event) => setPassword(event.detail.value)}
                 />
            </IonItem>
          </IonList>
          {status.error &&
            <IonText color="danger">Invalid Credentials</IonText>
          }
          <IonButton expand="block" onClick={handleLogin}>Login</IonButton>
          <IonButton expand="block" onClick={handleForgotPassword}>Forgot Password?</IonButton>
          <IonButton expand="block" fill="clear" routerLink="/register">Don't Have an Account?</IonButton>
          <IonLoading isOpen={status.loading} />
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;
