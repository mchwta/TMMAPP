import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonInput,
  IonButton,
  IonList,
  IonItem,
  IonTextarea,
  IonDatetime,
  IonLabel,
  IonAlert,
  IonCheckbox,
  IonSelect,
  IonSelectOption
} from '@ionic/react';
import { Plugins } from '@capacitor/core';
import React, { useEffect, useRef, useState } from 'react';
import { useAuth } from '../auth';
import { firestore, store } from '../firebase';
import { isPlatform, getPlatforms  } from '@ionic/react';
import { useHistory } from 'react-router';
import { addDays, addWeeks, addMonths, format } from 'date-fns';
console.log(isPlatform('ios')); // returns true when running on a iOS device
console.log(getPlatforms()); // returns ["iphone", "ios", "mobile", "mobileweb"] from an iPhone


const AddEntryPage: React.FC = () => {
  const [date, setDate] = useState<string>('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [link, setLink] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [completed, setCompleted] = useState(false); // new state variable
  const [recurrencePattern, setRecurrencePattern] = useState('daily');

  const { userId } = useAuth();
  const [pictureUrl, setPictureUrl] = useState('');
  const fileInputRef = useRef<HTMLInputElement>();
  const history = useHistory();

  async function savePicture(blobUrl, userId){
    const pictureRef = store.ref(`/users/${userId}/pictures/${Date.now()}`);
    const response = await fetch(blobUrl);
    const blob = await response.blob();
    const snapshot = await pictureRef.put(blob);
    const url = await snapshot.ref.getDownloadURL();
    //console.log("Saved:", url);
    return url;
  }

  useEffect(() => () => {
    if(pictureUrl.startsWith('blob')) {
      URL.revokeObjectURL(pictureUrl);
      console.log('Revoked', pictureUrl); 
    }
  }, [pictureUrl]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('Files:', event.target.files);
    if(event.target.files.length > 0) {
      const file = event.target.files.item(0);// get the file
      const pictureUrl = URL.createObjectURL(file); // URL object extracted from the file
      // console.log('created: ', pictureUrl);
      setPictureUrl(pictureUrl);
    }
  };

  const handleSave = async () => {
    if (!title) {
      setShowAlert(true);
      return;
    }
  
    const entriesRef = firestore.collection('users').doc(userId).collection('entries');
    const entryData = { date, title, pictureUrl, description, link, completed: false, recurrencePattern };
  
    if (pictureUrl.startsWith('blob')) {
      entryData.pictureUrl = await savePicture(pictureUrl, userId);
    }
  
    // Save the first entry
    const entryRef = await entriesRef.add(entryData);
    console.log('saved', entryRef.id);
  
    // Create the next 3 recurring entries
    if (recurrencePattern === 'daily') {
      for (let i = 1; i <= 2; i++) {
        const nextDate = format(addDays(new Date(date), i), 'yyyy-MM-dd HH:mm'); // Generate the next date
        const nextEntryData = { ...entryData, date: nextDate };
        const nextEntryRef = await entriesRef.add(nextEntryData);
        console.log('saved', nextEntryRef.id);
      }
    } else if (recurrencePattern === 'weekly') {
      for (let i = 1; i <= 2; i++) {
        const nextDate = format(addWeeks(new Date(date), i), 'yyyy-MM-dd HH:mm'); // Generate the next date
        const nextEntryData = { ...entryData, date: nextDate };
        const nextEntryRef = await entriesRef.add(nextEntryData);
        console.log('saved', nextEntryRef.id);
      }
    } else if (recurrencePattern === 'monthly') {
      for (let i = 1; i <= 2; i++) {
        const nextDate = format(addMonths(new Date(date), i), 'yyyy-MM-dd HH:mm'); // Generate the next date
        const nextEntryData = { ...entryData, date: nextDate };
        const nextEntryRef = await entriesRef.add(nextEntryData);
        console.log('saved', nextEntryRef.id);
      }
    }

    history.push('/my/entries')
  };
  
  
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle> Add Entry </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonList>
        <IonItem>
            <IonLabel position="floating">Date and Time</IonLabel>
            <IonDatetime
              display-format="MMM DD, YYYY HH:mm"
              picker-format="MMM DD YYYY HH:mm"
              value={date}
              onIonChange={(e) => setDate(e.detail.value)}
              style={{ '--padding-start': '12px', '--padding-end': '12px', '--background': '#f5f5f5', '--border-radius': '8px', '--box-shadow': 'none' }}
            />
        </IonItem>


          <IonItem>
            <IonLabel position="floating">Title </IonLabel>
            <IonInput type="text" value={title} onIonChange={(e) => setTitle(e.detail.value)} />
          </IonItem>

          <IonItem>
            <IonLabel position="floating">Description </IonLabel>
            <IonTextarea value={description} onIonChange={(e) => setDescription(e.detail.value)} />
          </IonItem>

          <IonItem>
            <IonLabel position="floating">Link</IonLabel>
            <IonInput type="url" value={link} onIonChange={(e) => setLink(e.detail.value)} />
          </IonItem>

          <IonItem>
            <IonLabel position="stacked">Recurrence</IonLabel>
            <IonSelect
              value={recurrencePattern}
              onIonChange={(e) => setRecurrencePattern(e.detail.value)}
            >
              <IonSelectOption value="none">None</IonSelectOption>
              <IonSelectOption value="daily">Daily</IonSelectOption>
              <IonSelectOption value="weekly">Weekly</IonSelectOption>
              <IonSelectOption value="monthly">Monthly</IonSelectOption>
            </IonSelect>
          </IonItem>

          <IonItem>
            <input type="file" accept="image/*" hidden ref={fileInputRef} onChange={handleFileChange} />
            <IonButton expand="block" onClick={() => fileInputRef.current.click()}>Upload Image</IonButton>
            </IonItem>
         </IonList>



          {/* <IonItem>
            <IonLabel position="stacked">Completed</IonLabel>
            <IonCheckbox
              checked={completed}
              onIonChange={(e) => setCompleted(e.detail.checked)}
            />
          </IonItem> */}


        <IonButton expand="block" type="submit" onClick={handleSave}> Submit </IonButton>
        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header="Title is required"
          message="Please enter a title for your entry."
          buttons={['OK']}
        />
      </IonContent>
    </IonPage >
  );
};

export default AddEntryPage;

