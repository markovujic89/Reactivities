import React from 'react'
import { Button, Container, Menu } from 'semantic-ui-react'

interface NvaBarProps{
    openForm: () => void;
}

export default function NavBar(props: NvaBarProps) {


    return (
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item header>
                    <img src='/assets/logo.png' alt='logo' style={{
                        marginRight: '10px'
                    }} />
                    Reactivits
                </Menu.Item>
                <Menu.Item name='Activities' />
                <Menu.Item>
                    <Button onClick={() => {props.openForm()}} positive content='Create Activity' />
                </Menu.Item>
            </Container>
        </Menu>
    )
}