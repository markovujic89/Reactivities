import React  from "react";
import { Grid } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import ActivityList from "./ActivityList";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";

interface ActivityDashboardProps {
    activities: Activity[];
    selectedActivity: Activity | undefined;
    selectActivity: (id:string) => void;
    cancleSelectActivity: () => void;
    editMode: boolean;
    openForm: (id: string) => void;
    closeForm: () => void;
    createOrEdit: (activity: Activity) => void;
    deleteActivity: (id:string) => void;
}

export default function ActivityDashboard(props: ActivityDashboardProps) {


    return(
        <Grid>
            <Grid.Column width='10'>
            <ActivityList activities = {props.activities} selectActivit={props.selectActivity} deleteActivity = {props.deleteActivity}/>
            </Grid.Column> 
            <Grid.Column width='6'>
                {props.selectedActivity && !props.editMode &&
                <ActivityDetails activity={props.selectedActivity} 
                cancleSelectActivity = {props.cancleSelectActivity}
                openForm ={props.openForm}
                />
                }
                {props.editMode &&
                <ActivityForm closeForm ={props.closeForm} selectedActivity = {props.selectedActivity} createOrEdit={props.createOrEdit} />   
                }           
            </Grid.Column>
        </Grid>
    )
}