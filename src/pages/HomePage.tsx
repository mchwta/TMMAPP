import {
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonItem,
  IonPage,
  IonTitle,
  IonToolbar,
  IonLabel,
  IonThumbnail,
  IonImg,
  IonList,
  IonItemSliding,
  IonText,
  IonItemOptions,
  IonItemOption,
  IonCard,
  IonCheckbox,
  IonToggle,
} from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../auth';
import { firestore } from '../firebase';
import { Entry, toEntry } from '../models';
import { add as addIcon, checkmarkCircleOutline, checkmarkCircleSharp, checkmarkDoneCircleOutline, checkmarkDoneCircleSharp, handLeft } from 'ionicons/icons';
import { formatDate } from '../date';
import { useRouteMatch } from 'react-router';


interface RouteParams {
  id: string;
}

const HomePage: React.FC = () => {
  const match = useRouteMatch<RouteParams>();
  const { id } = match.params;
  const { userId } = useAuth();
  const [entries, setEntries] = useState<Entry[]>([]);
  const [showCompleted, setShowCompleted] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  useEffect(() => {
    const entriesRef = firestore
      .collection('users')
      .doc(userId)
      .collection('entries')
      .orderBy('date', 'desc');


    return entriesRef.onSnapshot(({ docs }) => setEntries(docs.map(toEntry)));
  }, [userId]);
  
  const handleDelete = async () => {
    setShowConfirmDelete(false);
    const entryRef = firestore.collection('users').doc(userId)
      .collection('entries').doc(id);
    await entryRef.delete();
  };
  const handleComplete = (entry: Entry) => {
    const entryRef = firestore
      .collection('users')
      .doc(userId)
      .collection('entries')
      .doc(entry.id);
  
    entryRef
      .update({
        completed: !entry.completed,
      })
      .then(() => {
        console.log('Entry updated successfully!');
      })
      .catch((error) => {
        console.error('Error updating entry: ', error);
      });
  };
  

  // filter entries based on showCompleted state
// filter entries based on showCompleted state
      const filteredEntries = entries.filter((entry) => {
        if (showCompleted) {
          return entry.completed; // show all entries
        } else {
          return !entry.completed; // only show incomplete entries
        }
      });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Homepage</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonItem>
            <IonLabel>Completed</IonLabel>
            <IonToggle checked={showCompleted} onIonChange={(e) => setShowCompleted(e.detail.checked)} />
          </IonItem>
        </IonList>
        {filteredEntries.map((entry) => (
          <IonItemSliding key={entry.id}>
            <IonItem routerLink={`/my/entries/view/${entry.id}`}>
              <IonText>
                <h2>{entry.title}</h2>
                <h6>{formatDate(entry.date)}</h6>
              </IonText>
              {entry.completed ? (
                <IonIcon slot="start" icon={checkmarkDoneCircleSharp} color="light" />
              ) : (
                <IonIcon slot="start" icon={checkmarkCircleOutline} color="light" />
              )}
            </IonItem>
            {!entry.completed && (
              <IonItemOptions side="end">
                <IonItemOption color="success" onClick={() => handleComplete(entry)}>
                  <IonIcon slot="icon-only" icon={checkmarkDoneCircleSharp} />
                </IonItemOption>
              </IonItemOptions>
            )}
            {entry.completed && (
              <IonItemOptions side="end">
                <IonItemOption color="danger" onClick={() => handleComplete(entry)}>
                  <IonIcon slot="icon-only" icon={checkmarkCircleOutline} />
                </IonItemOption>
              </IonItemOptions>
            )}
          </IonItemSliding>
        ))}




        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton routerLink="/my/entries/add">
            <IonIcon icon={addIcon} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
