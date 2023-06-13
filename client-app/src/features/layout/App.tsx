import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { Container } from 'semantic-ui-react';
import { Activity } from '../../app/models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../activities/dashboard/ActivityDashboard';
import {v4 as uuid} from 'uuid';
import agent from '../../app/api/agent';

function App() {

  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity,setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    agent.Activities.list().then(response => {
      let activites: Activity[] = [];
      
      response.forEach(activity => {
        activity.date = activity.date.split('T')[0];
        activites.push(activity);
      })
      setActivities(response);
    })
  }, [])

  function handleSelectActivity(id: string) {
    setSelectedActivity(activities.find(x => x.id === id))
  }

  function handleCancleSelectActivity() {
    setSelectedActivity(undefined);
  }

  function handleFormOpen(id?: string) {
    id? handleSelectActivity(id):handleCancleSelectActivity();
    setEditMode(true);
  }

  function handleFormClose() {
    setEditMode(false);
  }

  function handleCreateOrEditActivity(activity: Activity) {
    activity.id
    ? setActivities([...activities.filter(x=>x.id !== activity.id, activity)])
    :setActivities([...activities, {...activity, id:uuid() }]);

    setEditMode(false);
    setSelectedActivity(activity);
  }

  function handleDeleteActivity(id: string) {

    setActivities([...activities.filter(x=>x.id !== id)])

  }

  return (
    <Fragment>
        <NavBar openForm = {handleFormOpen}/>
        <Container style={{ marginTop: '7rem'}}>
            <ActivityDashboard 
              activities={activities}
              selectedActivity={selectedActivity} 
              selectActivity={handleSelectActivity}
              cancleSelectActivity={handleCancleSelectActivity}
              editMode = {editMode}
              openForm={handleFormOpen}
              closeForm={handleFormClose}
              createOrEdit={handleCreateOrEditActivity}
              deleteActivity = {handleDeleteActivity}
              />
          </Container>
      </Fragment> 
  );
}

export default App;
