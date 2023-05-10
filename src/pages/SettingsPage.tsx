import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardContent,
  IonItem,
  IonLabel,
  IonIcon,
  IonAlert,
  IonInput,
} from '@ionic/react';
import React, { useState, useEffect } from 'react';
import { auth, firestore } from '../firebase';
import { mailOutline, trashOutline } from 'ionicons/icons';
import firebase from 'firebase';

const SettingsPage: React.FC = () => {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [newEmail, setNewEmail] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  useEffect(() => {
    // Get the currently logged in user's email
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserEmail(user.email);
        setIsVerified(user.emailVerified);

      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  
  const handleSendEmailVerification = () => {
    const user = auth.currentUser;
    if (user) {
      user.sendEmailVerification()
        .then(() => {
          // Show success message
          window.alert('Verification email sent successfully!');
        })
        .catch((error) => {
          console.log(error);
          // Show error message
          window.alert('Error sending verification email.');
        });
    }
  };

  const handleDeleteAccount = async () => {
    const user = auth.currentUser;
    if (user) {
      const currentPassword = prompt('Please enter your current password to confirm account deletion:');
      const credential = firebase.auth.EmailAuthProvider.credential(user.email, currentPassword);
      try {
        await user.reauthenticateWithCredential(credential);
        // Delete user data in Firestore if it exists
        const userDocRef = firestore.collection('users').doc(user.uid);
        const userDoc = await userDocRef.get();
        if (userDoc.exists) {
          await userDocRef.delete();
        }
        // Delete user's documents
        const batch = firestore.batch();
        const userEntriesRef = firestore.collection('users').doc(user.uid).collection('entries');
        const userEntriesSnapshot = await userEntriesRef.get();
        userEntriesSnapshot.forEach((doc) => {
          batch.delete(doc.ref);
        });
        await batch.commit();
        // Delete user account
        await user.delete();
        // Log out user
        await auth.signOut();
      } catch (error) {
        console.log(error);
        // Show error message
        window.alert('Error deleting account.');
      }
    }
  };
  
  const handleUpdateCredentials = async (newEmail: string, newPassword: string, confirmPassword: string) => {
    const user = auth.currentUser;
    if (user) {
      try {
        const credential = firebase.auth.EmailAuthProvider.credential(user.email, currentPassword);
        await user.reauthenticateWithCredential(credential);
        
        if (newEmail) {
          await user.updateEmail(newEmail);
          setUserEmail(newEmail);
          setNewEmail('');
        }
        if (newPassword && newPassword === confirmPassword) {
          await user.updatePassword(newPassword);
          setCurrentPassword('');
          setNewPassword('');
          setConfirmPassword('');
          
          // Show success message
          window.alert('Account credentials updated successfully!');
        } else {
          // Show error message
          window.alert('Passwords do not match.');
        }
      } catch (error) {
        console.log(error);
        // Show error message
        window.alert('Error updating account credentials.');
      }
    }
  };
  


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Settings</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {userEmail && (
          <IonCard>
            <IonCardContent>
              <IonItem>
                <IonLabel>Email:</IonLabel>
                <IonLabel>{userEmail}</IonLabel>
              </IonItem>

              {isVerified ? (
                <IonItem>
                  <IonLabel>Status:</IonLabel>
                  <IonLabel>Verified</IonLabel>
                </IonItem>
              ) : (
                <IonItem button onClick={handleSendEmailVerification}>
                  <IonLabel>Verification Status:</IonLabel>
                  <IonLabel color="danger">Not Verified</IonLabel>
                  <IonLabel slot="end">Send Verification Email</IonLabel>
                </IonItem>
              )}

            </IonCardContent>
          </IonCard>
        )}
        <IonCard>
          <IonCardContent>
            <IonItem button href="mailto:hninwintthuaung@gmail.com">
              <IonIcon icon={mailOutline} slot="start" />
              <IonLabel>Contact Developer</IonLabel>
            </IonItem>
          </IonCardContent>
        </IonCard>
        <IonCard>
          <IonCardContent>
            <IonItem button onClick={() => setShowDeleteAlert(true)}>
              <IonIcon icon={trashOutline} slot="start" />
              <IonLabel>Delete Account</IonLabel>
            </IonItem>
          </IonCardContent>
        </IonCard>
        <IonCard>
      <IonCardContent>
        {/* <IonItem>
          <IonLabel>Email:</IonLabel>
          <IonInput
            type="email"
            value={newEmail}
            placeholder="New email"
            onIonChange={(e) => setNewEmail(e.detail.value!)}
          />
        </IonItem> */}
          <IonItem>
          <IonLabel>Current Password:</IonLabel>
          <IonInput
            type="password"
            value={currentPassword}
            placeholder="Current password"
            onIonChange={(e) => setCurrentPassword(e.detail.value!)}
          />
        </IonItem>
        <IonItem>
          <IonLabel>New Password:</IonLabel>
          <IonInput
            type="password"
            value={newPassword}
            placeholder="New password"
            onIonChange={(e) => setNewPassword(e.detail.value!)}
          />
        </IonItem>

        <IonItem>
          <IonLabel>Confirm Password:</IonLabel>
          <IonInput
            type="password"
            value={confirmPassword}
            placeholder="Confirm password"
            onIonChange={(e) => setConfirmPassword(e.detail.value!)}
          />
        </IonItem>

        <IonButton expand="block" onClick={() => handleUpdateCredentials(newEmail, newPassword, confirmPassword)}>
          Update Credentials
        </IonButton>
      </IonCardContent>
    </IonCard>
        <IonButton expand="block" onClick={() => auth.signOut()}>
          Logout
        </IonButton>
        <IonAlert
          isOpen={showDeleteAlert}
          header="Delete Account"
          message="Are you sure you want to delete your account? This action is irreversible and all your data will be lost."
          buttons={[
            {
              text: 'Cancel',
              role: 'cancel',
              handler: () => setShowDeleteAlert(false),
            },
            {
              text: 'Delete',
              handler: handleDeleteAccount,
            },
          ]}
        />
      </IonContent>
    </IonPage>
  );
};

export default SettingsPage;
