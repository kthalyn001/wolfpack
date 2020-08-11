import React, {Component} from 'react';
import axios from "axios";
import {Button, Form, Icon, Image, Modal} from "semantic-ui-react";

class EditPackModal extends Component {
    state = {
        open: false,
        saveApiResponse: null,
        name: this.props.pack.name,
        lng: this.props.pack.lng,
        lat: this.props.pack.lat,
        err: {
            name: "",
            lat: "",
            lng: ""
        },

    }
    //TODO: Change how validation works - CODE DUPLICATION
    handleChange = (event, {name, value}) => {
        this.setState({[name]: value});

        let err = this.state.err;
        let checkInteger = /^-?[0-9]+$/;
        let checkFloat = /^[-+]?[0-9]+\.[0-9]+$/
        switch (name) {
            case "name":
                let hasNumber = /\d/;
                err.name = !(value.length > 0) || hasNumber.test(value) ? "Name field is not correct! " : ""
                break;
            case "lat":
                err.lat = (checkFloat.test(value) || checkInteger.test(value)) && value <= 90 && value >= -90 ? "" : "Latitude is not correct"
                break;
            case "lng":
                err.lng = (checkFloat.test(value) || checkInteger.test(value)) && value <= 180 && value >= -180 ? "" : "Longitude is not correct"
                break;
            default:
                break;
        }
    };

    updatePack = (packId) => {
        console.log(this.state);
        let notValid = false;
        for (const [key, value] of Object.entries(this.state.err)) {
            if (value !== "") {

                notValid = true;
            }
        }

        if (!notValid) {
            const editPack = {
                name: this.state.name,
                lat: this.state.lat,
                lng: this.state.lng,
            }
            axios.put
            ("/api/v1/packs/" + packId, editPack, {headers: {Authorization: `Bearer 9bAqXRPplyiGfF6n81NVUGpAqeLI1QHw46aqICVL1BLaGI6`}})
                .then(response => {
                    console.log(response.status);
                    if (response.status === 200) {
                        this.setState({open: false})

                        //TODO: Props drill
                        this.props.updatePack();
                    } else {

                        this.setState({saveApiResponse: "Pack has not been edited"})
                    }
                }).catch(err => this.setState({saveApiResponse: "Pack has not been edited"}));
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
                onOpen={() => this.setState({open: true})}
                open={this.state.open}
                trigger={<Button color={"teal"}><Icon name="plus"/>Edit Pack</Button>}
            >
                <Modal.Header>Edit pack</Modal.Header>
                <Modal.Content image>
                    <Image size='medium' src='https://image.flaticon.com/icons/svg/235/235427.svg' wrapped/>
                    <Modal.Description>
                        <Form>
                            <Form.Input defaultValue={this.props.pack.name} name="name" onChange={this.handleChange}
                                        label='Name'
                                        placeholder='Name of the pack'/>
                            <Form.Input defaultValue={this.props.pack.lat} name="lat" onChange={this.handleChange}
                                        label='Latitude' placeholder='Between -90 and 90'/>
                            <Form.Input defaultValue={this.props.pack.lng} name="lng" onChange={this.handleChange}
                                        label='Longitude' placeholder='Between -180 and 180'/>
                        </Form>
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button color='black' onClick={() => this.setState({open: false})}>
                        Back
                    </Button>
                    <Button
                        disabled={this.state.wolfDeleted}
                        content="Update pack"
                        labelPosition='right'
                        icon='checkmark'
                        onClick={() => this.updatePack(this.props.pack.id)}
                        positive
                    />
                </Modal.Actions>
                {this.state.saveApiResponse}
            </Modal>
        );
    }
}

export default EditPackModal;