import React, {Component} from 'react';
import axios from "axios";
import {Button, Form, Icon, Image, Modal} from "semantic-ui-react";


class NewWolfToPackModal extends Component {
    state = {
        open: false,
        saveApiResponse: null,
        wolvesDropdown: null,
        selectedWolf: null,
    }

    // Get wolf from dropdown
    getWolf = (event, {value}) => {
        this.setState({selectedWolf: value})
    }

    /// TODO: It needs to be updated if the backend logic will be changed - if backend will only allow a wolf to be only in one pack
    getAllWolvesAvailable = () => {
        let promises = [];

        promises.push(axios.get("/api/v1/wolves/", {
            headers: {Authorization: `Bearer 9bAqXRPplyiGfF6n81NVUGpAqeLI1QHw46aqICVL1BLaGI6`}
        }))

        promises.push(axios.get("/api/v1/packs/" + this.props.pack.id, {
            headers: {Authorization: `Bearer 9bAqXRPplyiGfF6n81NVUGpAqeLI1QHw46aqICVL1BLaGI6`}
        }))

        Promise.all(promises).then((results) => {
            //Wolves that are not already in the pack
            const filteredWolves = results[0].data.filter((elem) => !results[1].data.wolves.find(({id}) => elem.id === id));
            const dropdownData = [];
            filteredWolves.forEach(
                e => {
                    dropdownData.push({
                        key: e.id,
                        text: e.name,
                        value: e.id,
                    })
                }
            )
            this.setState({wolvesDropdown: dropdownData})
        })

    }

    addWolfToPack = (wolfId, packId) => {
        if (!this.state.selectedWolf) {
            this.setState({saveApiResponse: "Please select a wolf!"})
        } else {
            axios.post
            ("/api/v1/packs/" + packId + "/wolf/" + wolfId, {}, {headers: {Authorization: `Bearer 9bAqXRPplyiGfF6n81NVUGpAqeLI1QHw46aqICVL1BLaGI6`}})
                .then(response => {
                    if (response.status === 200) {
                        this.setState({open: false})
                        //TODO: !=  PropsDrill
                        this.props.updatePack();
                    } else {
                        this.setState({saveApiResponse: "Wolf has not been added to pack"})
                    }
                }).catch(err => this.setState({saveApiResponse: "Wolf has not been added to pack"}));
        }
    }

    render() {
        return (
            <Modal
                onClose={() => this.setState({open: false})}
                onOpen={() => {
                    this.setState({open: true});
                    this.getAllWolvesAvailable();
                }}
                open={this.state.open}
                trigger={<Button color={"green"}><Icon name="plus"/>New wolf to pack</Button>}
            >
                <Modal.Header>New wolf to pack</Modal.Header>
                <Modal.Content image>
                    <Image size='medium' src='https://image.flaticon.com/icons/svg/235/235427.svg' wrapped/>
                    <Modal.Description>
                        <Form>
                            <Form.Dropdown
                                placeholder='Select wolf'
                                fluid
                                onChange={this.getWolf}
                                selection
                                options={this.state.wolvesDropdown}

                            />
                        </Form>
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button color='black' onClick={() => this.setState({open: false})}>
                        Back
                    </Button>
                    <Button
                        content="Add to pack"
                        labelPosition='right'
                        icon='checkmark'
                        onClick={() => this.addWolfToPack(this.state.selectedWolf, this.props.pack.id)}
                        positive
                    />
                </Modal.Actions>
                {this.state.saveApiResponse}
            </Modal>
        );
    }
}

export default NewWolfToPackModal;