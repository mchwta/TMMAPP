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
import './LoginPage.css'


  const RegisterPage: React.FC = () => {
  const { loggedIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState({loading:false, error:false, errorMessage: ''});
  const [confirmPassword, setConfirmPassword] = useState('');

const handleRegister = async () => {
  try {
    setStatus({loading:true, error:false, errorMessage: ''});
    if (password !== confirmPassword) {
      throw new Error('Passwords do not match');

    }
    const credential = await auth.createUserWithEmailAndPassword(email,password);
    console.log('credential:', credential)
  }
  catch (error) {
    setStatus({loading:false, error:true, errorMessage: error.message});
    console.log('error: ', error);
  }
}

  console.log(`Login Status: ${loggedIn}`);
  if(loggedIn) {
    return <Redirect to="/my/entries" />;
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Register Page</IonTitle>
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
            <IonItem>
                <IonLabel position="floating">Confirm Password</IonLabel>
                <IonInput type="password" value={confirmPassword}
                  onIonChange={(event) => setConfirmPassword(event.detail.value)}
                 />
            </IonItem>
          </IonList>
          {status.error &&
            <IonText color="danger">{status.errorMessage}</IonText>
          }

          <IonButton expand="block" onClick={handleRegister}>Register</IonButton>
          <IonButton expand="block" fill="clear" routerLink="/login">Already Have an Account?</IonButton>
          <IonLoading isOpen={status.loading} />
      </IonContent>
    </IonPage>
  );
};

export default RegisterPage;
