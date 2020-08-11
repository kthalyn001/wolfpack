import React, {Component} from 'react';
import {Button, Form, Icon, Image, Modal} from "semantic-ui-react";
import axios from "axios";


const options = [
    {key: 'm', text: 'Male', value: 'male'},
    {key: 'f', text: 'Female', value: 'female'},
]

class NewWolfModal extends Component {
    state = {
        open: false,
        saveApiResponse: null,
        err: {
            name: "Name field is not correct! ",
            birthday: "Birthday field is not correct! ",
            gender: "Gender field needs to be selected! "
        },
    }

    //TODO: Change how validation works - CODE DUPLICATION
    handleChange = (event, {name, value}) => {
        this.setState({[name]: value});

        let err = this.state.err;
        switch (name) {
            case "name":
                let hasNumber = /\d/;
                err.name = !(value.length > 0) || hasNumber.test(value) ? "Name field is not correct! " : ""
                break;
            case "birthday":
                let hasBirthday = /^\d{4}-\d{2}-\d{2}$/;
                err.birthday = !hasBirthday.test(value) ? "Birthday field is not correct! " : ""
                break;
            case "gender":
                err.gender = !(value === 'male' || value === 'female') ? "Gender field needs to be selected! " : ""
                break;
            default:
                break;
        }
    };

    createWolf = () => {
        let notValid = false;
        for (const [key, value] of Object.entries(this.state.err)) {
            if (value !== "") {

                notValid = true;
            }
        }

        if (!notValid) {
            const createWolf = {
                name: this.state.name,
                birthday: this.state.birthday,
                gender: this.state.gender,
            }
            axios.post
            ("/api/v1/wolves", createWolf, {headers: {Authorization: `Bearer 9bAqXRPplyiGfF6n81NVUGpAqeLI1QHw46aqICVL1BLaGI6`}})
                .then(response => {
                    if (response.status === 201) {
                        this.setState({open: false})
                        this.props.updateWolves();
                    } else {
                        this.setState({saveApiResponse: "Wolf has not been created"})
                    }
                }).catch(err => this.setState({saveApiResponse: "Wolf has not been created"}));
        } else {
            let message = "";
            for (const [key, value] of Object.entries(this.state.err)) {
                if (value !== "") {
                    message += value;
                }
            }
            this.setState({saveApiResponse: message})
        }

    }

    render() {
        return (
            <Modal
                onClose={() => this.setState({open: false})}
                onOpen={() => this.setState({open: true, saveApiResponse: ''})}
                open={this.state.open}
                trigger={<Button primary disabled={!this.props.editMode}><Icon name="plus"/>New wolf</Button>}
            >
                <Modal.Header>New wolf</Modal.Header>
                <Modal.Content image>
                    <Image size='medium' src='https://image.flaticon.com/icons/svg/235/235427.svg' wrapped/>
                    <Modal.Description>
                        <Form>
                            <Form.Input name="name" onChange={this.handleChange} label='Name'
                                        placeholder='First and last name'/>
                            <Form.Input name="birthday" onChange={this.handleChange}
                                        label='Birthday' placeholder='YYYY-MM-DD'/>
                            <Form.Select
                                onChange={this.handleChange}
                                name="gender"
                                label='Gender'
                                options={options}
                                placeholder='Gender'
                            />

                        </Form>
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button color='black' onClick={() => this.setState({open: false})}>
                        Back
                    </Button>
                    <Button
                        disabled={this.state.wolfDeleted}
                        content="Create wolf"
                        labelPosition='right'
                        icon='checkmark'
                        onClick={this.createWolf}
                        positive
                    />
                </Modal.Actions>
                {this.state.saveApiResponse}
            </Modal>
        );
    }
}

export default NewWolfModal;