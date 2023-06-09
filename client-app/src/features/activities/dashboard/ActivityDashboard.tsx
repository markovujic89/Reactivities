import React  from "react";
import { Grid, List } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import ActivityList from "./ActivityList";
import ActivityDetails from "../details/ActivityDetails";

interface ActivityDashboardProps {
    activities: Activity[];
}

export default function ActivityDashboard(props: ActivityDashboardProps) {


    return(
        <Grid>
            <Grid.Column width='10'>
            <ActivityList activities = {props.activities}/>
            </Grid.Column> 
            <Grid.Column width='6'>
                {props.activities[0] &&
                <ActivityDetails activity={props.activities[0]} />
                }               
            </Grid.Column>
        </Grid>
    )
}