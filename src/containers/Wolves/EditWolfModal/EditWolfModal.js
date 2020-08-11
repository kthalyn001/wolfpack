import React, {Component} from 'react';
import {Button, Form, Image, Modal} from "semantic-ui-react";
import axios from "axios";


const options = [
    {key: 'm', text: 'Male', value: 'male'},
    {key: 'f', text: 'Female', value: 'female'},
]

class EditWolfModal extends Component {
    state = {
        wolfDeleted: false,
        //Modal status
        open: false,

        // Response from endpoints
        saveApiResponse: null,

        // Wolf information
        name: this.props.wolf.name,
        gender: this.props.wolf.gender,
        birthday: this.props.wolf.birthday,

        err: {
            name: "",
            birthday: "",
            gender: ""
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

    updateWolf = () => {
        let notValid = false;
        for (const [key, value] of Object.entries(this.state.err)) {
            if (value !== "") {

                notValid = true;
            }
        }
        if (!notValid) {
            const updateWolf = {
                name: this.state.name,
                gender: this.state.gender,
                birthday: this.state.birthday
            }

            axios.put
            ("/api/v1/wolves/" + this.props.wolf.id, updateWolf, {headers: {Authorization: `Bearer 9bAqXRPplyiGfF6n81NVUGpAqeLI1QHw46aqICVL1BLaGI6`}})
                .then(response => {
                    console.log(response.headers)
                    if (response.status === 200) {
                        this.setState({open: false})
                    } else {
                        this.setState({saveApiResponse: "Wolf has not been updated"})
                    }
                }).catch(err => this.setState({saveApiResponse: "Wolf has not been updated"}));
            this.props.updateC();
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


    deleteWolf = () => {
        axios.delete
        ("/api/v1/wolves/" + this.props.wolf.id, {headers: {Authorization: `Bearer 9bAqXRPplyiGfF6n81NVUGpAqeLI1QHw46aqICVL1BLaGI6`}})
            .then(response => {
                if (response.status === 200) {
                    this.setState({saveApiResponse: "Wolf has been successfully deleted", wolfDeleted: true})
                    this.props.updateC();
                } else {
                    this.setState({saveApiResponse: "Wolf has not been deleted"})
                }
            }).catch(err => this.setState({saveApiResponse: "Wolf has not been deleted"}));
    }

    render() {
        let {name, birthday, gender} = this.props.wolf

        return (
            <Modal
                onClose={() => this.setState({open: false})}
                onOpen={() => {
                    this.setState({open: true, saveApiResponse: ''});
                }}
                open={this.state.open}
                trigger={<Button color={"red"} fluid>Edit wolf</Button>}
            >
                <Modal.Header>Edit wolf</Modal.Header>
                <Modal.Content image>
                    <Image size='medium' src='https://image.flaticon.com/icons/svg/235/235427.svg' wrapped/>
                    <Modal.Description>
                        <Form>
                            <Form.Input defaultValue={name} name="name" onChange={this.handleChange} label='Name'
                                        placeholder='First and last name'/>
                            <Form.Input defaultValue={birthday} name="birthday" onChange={this.handleChange}
                                        label='Birthday' placeholder='Birthday'/>
                            <Form.Select
                                onChange={this.handleChange}
                                defaultValue={gender}
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
                    <Button color='red' disabled={this.state.wolfDeleted} onClick={this.deleteWolf}>
                        Delete
                    </Button>
                    <Button
                        disabled={this.state.wolfDeleted}
                        content="Yep, let's save!"
                        labelPosition='right'
                        icon='checkmark'
                        onClick={this.updateWolf}
                        positive
                    />
                </Modal.Actions>
                {this.state.saveApiResponse}
            </Modal>
        );
    }
}

export default EditWolfModal;