import React, {Component} from 'react';
import {Button, Grid, Menu, Segment} from "semantic-ui-react";
import axios from "axios";
import EditPackModal from "../EditPackModal/EditPackModal";
import NewWolfToPackModal from "../NewWolfToPackModal/NewWolfToPackModal";
import ShowWolvesInPackModal from "../ShowWolfvesInPackModal/ShowWolvesInPackModal";

class PacksList extends Component {
    state = {
        // has detailed information like name, wolves in the pack, etc...
        packsWithWolves: null,

    }

    updatePacks = () => {
        this.props.updatePack();
        this.getPacks();
    }

    getPacks = () => {
        let promises = [];

        this.props.packs.forEach(pack => {
            promises.push(axios.get("/api/v1/packs/" + pack.id, {
                headers: {Authorization: `Bearer 9bAqXRPplyiGfF6n81NVUGpAqeLI1QHw46aqICVL1BLaGI6`}
            }))
        })

        Promise.all(promises).then((results) => {
            let packs = [];
            results.forEach(p => {
                packs.push(p.data)
            })
            this.setState({packsWithWolves: packs})
        })
    }

    componentDidMount() {
        if (this.props.packs) {
            this.getPacks();
        }
    }

    deletePack(packId) {
        axios.delete("/api/v1/packs/" + packId, {
            headers: {Authorization: `Bearer 9bAqXRPplyiGfF6n81NVUGpAqeLI1QHw46aqICVL1BLaGI6`}
        }).then(
            response => {
                if (response.status === 200) {
                    this.updatePacks();
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
            <Grid>
                {!this.state.packsWithWolves ? null :
                    this.props.packs.map((pack, indexOfPack) => {
                        return <Grid.Row key={"PacksList" + indexOfPack}>
                            <Grid.Column>
                                <Segment color={this.props.editMode ? "red" : "green"} raised>
                                    <Menu>
                                        <Menu.Item name='name'>
                                            <ShowWolvesInPackModal edit={this.props.editMode} pack={pack}/>
                                        </Menu.Item>
                                        {this.props.editMode ? <Menu.Menu position={"right"}>
                                            <Menu.Item name='add'>
                                                <strong style={{color: "green"}}>
                                                    <NewWolfToPackModal updatePack={() => this.updatePacks()}
                                                                        pack={pack}/>
                                                </strong>
                                            </Menu.Item>

                                            <Menu.Item name='add'>
                                                <strong style={{color: "teal"}}>
                                                    <EditPackModal updatePack={() => this.updatePacks()} pack={pack}/>
                                                </strong>
                                            </Menu.Item>

                                            <Menu.Item name='delete'>
                                                <strong><Button color={"red"} onClick={() => this.deletePack(pack.id)}>
                                                    Delete pack
                                                </Button></strong>
                                            </Menu.Item>

                                        </Menu.Menu> : null}
                                    </Menu>
                                </Segment>
                            </Grid.Column>
                        </Grid.Row>
                    })
                }
            </Grid>
        );
    }
}

export default PacksList;


