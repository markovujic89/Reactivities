import React, { SyntheticEvent, useState } from 'react'
import { Activity } from '../../../app/models/activity'
import { Button, Item, Label, Segment } from 'semantic-ui-react';

interface ActivityListProps {
    activities: Activity[];
    selectActivit: (id:string) => void;
    deleteActivity: (id:string) => void;
    submitting: boolean;
}

export default function ActivityList(props: ActivityListProps) {

    const [target, setTaraget] = useState('')

    function handleActivityDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTaraget(e.currentTarget.name);
        props.deleteActivity(id);
    }
    return(
        <Segment>
            <Item.Group divided>
                {props.activities.map(activity => (
                    <Item key={activity.id}>
                        <Item.Content>
                            <Item.Header as ='a'>{activity.title}</Item.Header>
                            <Item.Meta>{activity.date}</Item.Meta>
                            <Item.Description>
                                <div>
                                    {activity.description}
                                </div>
                                <div>
                                    {activity.city}, {activity.venue}
                                </div>
                            </Item.Description>
                            <Item.Extra>
                                <Button onClick={() => { props.selectActivit(activity.id) }} floated='right' content='View' color='blue' />
                                <Button 
                                name={activity.id}
                                loading={props.submitting && target===activity.id} 
                                onClick={(e) => handleActivityDelete(e, activity.id)}
                                floated='right' 
                                content='delete' 
                                color='red' />
                                <Label basic content={activity.category} />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )

}