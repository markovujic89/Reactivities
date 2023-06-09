import React, { ChangeEvent, useState } from "react";
import { Form, Button, Container } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";


interface ActivityFormProps {
    selectedActivity: Activity | undefined;
    closeForm: () => void;
    createOrEdit: (activity: Activity) => void;
    submitting: boolean;
}

export default function ActivityForm(props: ActivityFormProps) {

    const initialState = props.selectedActivity?? {
        id: '',
        title: '',
        category: '',
        description: '',
        date: '',
        city: '',
        venue: ''
    }

    const [activity, setActivity] = useState(initialState);

    function handleSubmit() {
        props.createOrEdit(activity)
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const {name, value} = event.target;

        setActivity({...activity, [name]: value})
    }

    return(
        <Container>
        <Form onSubmit={handleSubmit} autoComplete='off'>
            <Form.Input placeholder = 'Title'  value={activity.title} name = 'title' onChange={handleInputChange}/>
            <Form.TextArea placeholder ='Description'  value={activity.description} name = 'description' onChange={handleInputChange}/>
            <Form.Input placeholder ='Category' value={activity.category} name = 'category' onChange={handleInputChange}/>
            <Form.Input placeholder ='City' value={activity.city} name = 'city' onChange={handleInputChange}/>
            <Form.Input type="date" placeholder ='Date' value={activity.date} name = 'date' onChange={handleInputChange}/>
            <Form.Input placeholder ='Venue' value={activity.venue} name = 'venue' onChange={handleInputChange}/>
            <Button loading={props.submitting} floated="right" positive type='submit' content='Submit' />
            <Button onClick={() => {props.closeForm()}} floated="right" type='button' content='Cancel' />
        </Form>
    </Container>
    )
}