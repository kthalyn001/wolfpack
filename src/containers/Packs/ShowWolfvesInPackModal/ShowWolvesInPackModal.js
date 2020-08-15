import React, {Component} from 'react';
import axios from "axios";
import {Button, Card, Icon, Image, Modal} from "semantic-ui-react";
import maleWolf from "../../../resources/wolfb.svg"
import femaleWolf from "../../../resources/wolfg.svg"

class ShowWolvesInPackModal extends Component {
    state = {
        open: false,
        wolves: null,
    }

    getAllWolvesFromPack = () => {
        axios.get("/api/v1/packs/" + this.props.pack.id, {headers: {Authorization: `Bearer 9bAqXRPplyiGfF6n81NVUGpAqeLI1QHw46aqICVL1BLaGI6`}})
            .then(response => {
                this.setState({wolves: response.data})
            }).catch(err => this.setState({saveApiResponse: "Pack has not been created"}));
    }

    removeWolfFromPack(packId, wolfId) {
        axios.delete("/api/v1/packs/" + packId + "/wolf/" + wolfId, {
            headers: {Authorization: `Bearer 9bAqXRPplyiGfF6n81NVUGpAqeLI1QHw46aqICVL1BLaGI6`}
        }).then(
            response => {
                if (response.status === 200) {
                    this.getAllWolvesFromPack();
                } else {
                    //TODO: Add a better visualisation to this
                    alert("Wolf can't be removed")
                }
            }
        )
            //TODO: Add a better visualisation to this
            .catch(err => alert("Wolf can't be removed"));
    }

    render() {
        return (
            <Modal
                onClose={() => this.setState({open: false})}
                onOpen={() => {
                    this.setState({open: true});
                    this.getAllWolvesFromPack();
                }}
                open={this.state.open}
                trigger={<Button primary><Icon name="paw"/>{this.props.pack.name}</Button>}
            >
                <Modal.Header>All wolves in the pack</Modal.Header>
                <Modal.Content image>
                    <Modal.Description>
                        {
                            this.state.wolves !== null ? <Card.Group
                            >
                                {this.state.wolves.wolves.map((wolf, index) => {
                                    return <Card key={"PackCard" + index}>
                                        <Image src={wolf.gender === "male" ? maleWolf : femaleWolf}
                                               wrapped ui={false}/>
                                        <Card.Content>
                                            <Card.Header>{wolf.name} - <Icon
                                                name={wolf.gender === 'male' ? 'male' : 'female'}/></Card.Header>
                                            <Card.Meta>
                                                <span className='date'>Birthday on {wolf.birthday}</span>
                                            </Card.Meta>

                                        </Card.Content>
                                        <Card.Content hidden={!this.props.edit} extra>
                                            <Button
                                                onClick={() => this.removeWolfFromPack(this.props.pack.id, wolf.id)}
                                                fluid
                                                color={"red"}>Remove</Button>
                                        </Card.Content>
                                    </Card>
                                })}
                            </Card.Group> : null
                        }
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button color='black' onClick={() => {
                        this.setState({open: false});
                    }}>
                        Back
                    </Button>

                </Modal.Actions>
                {this.state.saveApiResponse}
            </Modal>
        );
    }
}

export default ShowWolvesInPackModal;