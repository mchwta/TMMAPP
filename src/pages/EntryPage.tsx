import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonBackButton,
  IonButtons,
  IonButton,
  IonIcon,
  IonAlert
} from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { useHistory, useRouteMatch } from 'react-router';
import { useAuth } from '../auth';
import { firestore } from '../firebase';
import { Entry, toEntry } from '../models';
import { trash as trashIcon, pencil as pencilIcon, checkmarkCircle, closeCircle } from 'ionicons/icons';
import { formatDate } from '../date';
import './EntryPage.css';

interface RouteParams {
  id: string;
}

const EntryPage: React.FC = () => {
  const match = useRouteMatch<RouteParams>();
  const { id } = match.params;
  const { userId } = useAuth();
  const [entry, setEntry] = useState<Entry>();
  const history = useHistory();
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  useEffect(() => {
    const entryRef = firestore.collection('users').doc(userId)
      .collection('entries').doc(id);
    const unsubscribe = entryRef.onSnapshot((doc) => {
      setEntry(toEntry(doc));
    });
    return unsubscribe;
  }, [userId, id]);
  

  const handleDelete = async () => {
    setShowConfirmDelete(false);
    const entryRef = firestore.collection('users').doc(userId)
      .collection('entries').doc(id);
    await entryRef.delete();
    history.goBack();
  };

  const handleEdit = () => {
    history.push(`/my/edit-entry/${id}`);
  };

  

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>
            {entry?.title}
          </IonTitle>
          <IonButtons slot="end">
          <IonButton onClick={handleEdit}>
              <IonIcon icon={pencilIcon} slot="icon-only" />
            </IonButton>
            <IonButton onClick={() => setShowConfirmDelete(true)}>
              <IonIcon icon={trashIcon} slot="icon-only" />
            </IonButton>

          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
      <div className="entry-content">
        <h2>{entry?.title}</h2>
        <p>{formatDate(entry?.date)}</p>
        <p>{entry?.description}</p>
        <p>
            {entry?.completed ? 
              <>
                <IonIcon icon={checkmarkCircle} color="success" /> Completed
              </>
              :
              <>
                <IonIcon icon={closeCircle} color="danger" /> Not completed
              </>
            }
          </p>        {entry?.link && <p><a href={entry?.link}>{entry?.link}</a></p>}
        {entry?.pictureUrl && <img className="entry-image" src={entry?.pictureUrl} alt={entry?.title} />}
      </div>



        <IonAlert
          isOpen={showConfirmDelete}
          onDidDismiss={() => setShowConfirmDelete(false)}
          header={'Delete Entry'}
          message={'Are you sure you want to delete this entry?'}
          buttons={[
            {
              text: 'Cancel',
              role: 'cancel',
              cssClass: 'secondary',
              handler: () => {
                setShowConfirmDelete(false);
              }
            },
            {
              text: 'Delete',
              handler: () => {
                handleDelete();
              }
            }
          ]}
        />
      </IonContent>
    </IonPage>
  );
};

export default EntryPage;
