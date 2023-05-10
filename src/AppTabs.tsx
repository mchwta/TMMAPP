import {
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonLabel,
  IonIcon,
  IonTabs,
} from '@ionic/react';
import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { home as homeIcon, settings as settingsIcon, calendar as calendarIcon } from 'ionicons/icons';
import HomePage from './pages/HomePage';
import EntryPage from './pages/EntryPage';
import SettingsPage from './pages/SettingsPage';
import { useAuth } from './auth';
import AddEntryPage from './pages/AddEntryPage';
import CalendarPage from './pages/CalendarPage';
import EditEntryPage from './pages/EditEntryPage';

const AppTabs: React.FC = () => {
  const { loggedIn} = useAuth();
  if(!loggedIn) {
    return <Redirect to="/login" />
  }

  return (
        <IonTabs>
          <IonRouterOutlet>
            <Route exact path="/my/entries">
              <HomePage />
            </Route>

            <Route exact path="/my/entries/view/:id" >
              <EntryPage />
            </Route>

            <Route exact path="/my/settings" >
              <SettingsPage />
            </Route>

            <Route exact path="/my/entries/add" >
              <AddEntryPage />
            </Route>

            <Route exact path="/my/calendar" >
              <CalendarPage />
            </Route>
            
            <Route exact path="/my/edit-entry/:id" >
              <EditEntryPage />
            </Route>
            

          </IonRouterOutlet>

            <IonTabBar slot="bottom" >
              <IonTabButton tab="home" href="/my/entries" >
                <IonIcon icon={homeIcon} />
                <IonLabel >Home</IonLabel>
              </IonTabButton>
              <IonTabButton tab="calendar" href="/my/calendar" >
                <IonIcon icon={calendarIcon} />
                <IonLabel>Calendar View</IonLabel>
              </IonTabButton>
              <IonTabButton tab="settings" href="/my/settings" >
                <IonIcon icon={settingsIcon} />
                <IonLabel>Settings</IonLabel>
              </IonTabButton>
            </IonTabBar>
        </IonTabs>
  );
};

export default AppTabs;
