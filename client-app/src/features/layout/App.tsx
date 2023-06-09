import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { Container } from 'semantic-ui-react';
import { Activity } from '../../app/models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../activities/dashboard/ActivityDashboard';

function App() {

  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    axios.get<Activity[]>('https://localhost:7292/api/Activities')
    .then(response => {
      setActivities(response.data);
    })
  }, [])

  return (
    <Fragment>
        <NavBar />
        <Container style={{ marginTop: '7rem'}}>
            <ActivityDashboard activities={activities}/>
          </Container>
      </Fragment> 
  );
}

export default App;
