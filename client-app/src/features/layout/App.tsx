import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { Container } from 'semantic-ui-react';
import { Activity } from '../../app/models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../activities/dashboard/ActivityDashboard';
import {v4 as uuid} from 'uuid';
import agent from '../../app/api/agent';
import LoadingComponent from './LoadingComponent';

function App() {

  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity,setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const [loading,setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    agent.Activities.list().then(response => {
      let activites: Activity[] = [];
      
      response.forEach(activity => {
        activity.date = activity.date.split('T')[0];
        activites.push(activity);
      })
      setActivities(response);
      setLoading(false);
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
    setSubmitting(true);

    if(activity.id) {
      agent.Activities.update(activity).then(() => {
        setActivities([...activities.filter(x=>x.id !== activity.id, activity)])
        setSelectedActivity(activity);
        setEditMode(false);
        setSubmitting(false);
      })
    }
    else{
      activity.id = uuid()
      agent.Activities.create(activity).then(() => {
        setActivities([...activities, {...activity, id: activity.id}]);
      })
      setSelectedActivity(activity);
        setEditMode(false);
        setSubmitting(false);
    }
  }

  function handleDeleteActivity(id: string) {
    setSubmitting(true);
    agent.Activities.delete(id).then(() => {
      setActivities([...activities.filter(x=>x.id !== id)])
    })
    setActivities([...activities.filter(x=>x.id !== id)])

  }

  if(loading){
    return <LoadingComponent inverted={false} content={''} />
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
              submitting = {submitting}
              />
          </Container>
      </Fragment> 
  );
}

export default App;
