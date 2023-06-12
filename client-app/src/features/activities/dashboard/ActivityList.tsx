import React from 'react'
import { Activity } from '../../../app/models/activity'
import { Button, Item, Label, Segment } from 'semantic-ui-react';

interface ActivityListProps {
    activities: Activity[];
    selectActivit: (id:string) => void;
}

export default function ActivityList(props: ActivityListProps) {

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
                                <Label basic content={activity.category} />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )

}