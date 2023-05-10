import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonBackButton,
    IonButtons,
    IonButton,
    IonInput,
    IonLabel,
    IonTextarea,
    IonItem,
    IonDatetime
  } from '@ionic/react';
  import React, { useEffect, useState } from 'react';
  import { useHistory, useLocation, useParams } from 'react-router';
  import { useAuth } from '../auth';
  import { firestore } from '../firebase';
  import { Entry, toEntry } from '../models';
  import { formatDate } from '../date';
  import { refresh } from 'ionicons/icons';
  
  interface RouteParams {
    id: string;
  }
  
  const EditEntryPage: React.FC = () => {
    const { id } = useParams<RouteParams>();
    const { userId } = useAuth();
    const history = useHistory();
    const location = useLocation<{ entry: Entry }>();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState(formatDate(new Date())); // format initial date value
    const [pictureUrl, setPictureUrl] = useState('');
    const [link, setLink] = useState('');
    const [shouldRefresh, setShouldRefresh] = useState(false); // state variable to trigger refresh
  
    useEffect(() => {
      if (location.state?.entry) {
        const { title, description, date, pictureUrl, link } = location.state.entry;
        setTitle(title);
        setDescription(description);
        setDate(formatDate(new Date(date))); // format retrieved date value as string and convert to date object
        setPictureUrl(pictureUrl);
        setLink(link);
      } else {
        const entryRef = firestore.collection('users').doc(userId)
          .collection('entries').doc(id);
        entryRef.get().then((doc) => {
          const { title, description, date, pictureUrl, link } = toEntry(doc);
          setTitle(title);
          setDescription(description);
          setDate(formatDate(new Date(date))); // format retrieved date value as string and convert to date object
          setPictureUrl(pictureUrl);
          setLink(link);
        });
      }
    }, [id, location.state?.entry, userId, shouldRefresh]); // include shouldRefresh in dependencies array
  
    const handleSave = async () => {
      const entryRef = firestore.collection('users').doc(userId)
        .collection('entries').doc(id);
      const updatedEntry = {
        title,
        description,
        date: formatDate(new Date(date)), // convert date string back to date object and format as string
        pictureUrl,
        link
      };
      await entryRef.set(updatedEntry, { merge: true });
      setShouldRefresh(true); // update state to trigger refresh
      history.push(`/my/entries`);
    };
      
  
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton />
            </IonButtons>
            <IonTitle>{location.state?.entry ? 'Edit Entry' : 'Edit Entry'}</IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={handleSave}>
                Save
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonItem>
            <IonLabel   position="floating">Title</IonLabel>
            <IonInput
              value={title}
              onIonChange={(e) => setTitle(e.detail.value!)}
            />
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Description</IonLabel>
            <IonTextarea
              value={description}
              onIonChange={(e) => setDescription(e.detail.value!)}
            />
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Link</IonLabel>
            <IonTextarea
              value={link}
              onIonChange={(e) => setLink(e.detail.value!)}
            />
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Date</IonLabel>
            <IonDatetime
              display-format="MMM DD, YYYY HH:mm"
              picker-format="MMM DD YYYY HH:mm"
              value={date}
              onIonChange={(e) => setDate(e.detail.value!)}
            />
          </IonItem>
            <IonItem>
                <IonLabel position="floating">Picture </IonLabel>
                <IonButton slot="end" fill="clear" onClick={() => setPictureUrl('')}>
                    Clear
                </IonButton>
            <IonButton slot="end" fill="clear" onClick={() => document.getElementById('picture-input')?.click()}>
                Upload
            </IonButton>
            <input type="file" id="picture-input" style={{ display: 'none' }} onChange={(e) => setPictureUrl(URL.createObjectURL(e.target.files[0]))} accept="image/*" />
            </IonItem>
            

      </IonContent>
    </IonPage>
  );
};

export default EditEntryPage;
