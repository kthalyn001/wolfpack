import React, {Component} from 'react';
import PacksList from "../PacksList/PacksList";
import axios from "axios";
import cx from "../../Wolves/WolvesPage/WolvesPage.module.css";
import {Button, Icon, Input} from "semantic-ui-react";
import NewPackModal from "../NewPackModal/NewPackModal";

class PacksPage extends Component {
    state = {
        packs: null,
        editMode: false,
        searchField: '',
    }

    getPacks = () => {
        axios.get("/api/v1/packs/", {
            headers: {Authorization: `Bearer 9bAqXRPplyiGfF6n81NVUGpAqeLI1QHw46aqICVL1BLaGI6`}
        }).then(response => {
            this.setState({packs: response.data});
        })
    }

    toggleEditMode = () => {
        this.setState({editMode: !this.state.editMode})
    }
    onSearchChange = (event) => {
        this.setState({searchField: event.target.value})
    }

    componentDidMount() {
        if (this.state.packs === null) {
            this.getPacks();
        }
    }

    render() {
        let filteredPacks;
        if (this.state.packs) {
            filteredPacks = this.state.packs.filter(pack => {
                return pack.name.toLowerCase().includes(this.state.searchField.toLowerCase());
            })
        }
        return (
            <>
                <div className={cx.WolfMenu}>
                    <Input icon='search' className={cx.WolfMenuItem} onChange={this.onSearchChange}
                           placeholder='Search pack...'/>
                    <Button className={cx.WolfMenuItem} color={this.state.editMode ? "red" : "green"}
                            onClick={this.toggleEditMode}>
                        <Icon name="edit"/>
                        Edit mode: {this.state.editMode ? "ON" : "OFF"}
                    </Button>
                    <NewPackModal updatePack={() => this.getPacks()} editMode={this.state.editMode}/>
                </div>
                {!filteredPacks ? "LOADING" : <PacksList
                    packs={filteredPacks}
                    editMode={this.state.editMode}
                    updatePack={() => this.getPacks()}
                />
                }
            </>
        );
    }
}

export default PacksPage;