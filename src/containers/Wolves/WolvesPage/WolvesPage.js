import React, {Component} from 'react';
import axios from 'axios';
import {Button, Icon, Input} from "semantic-ui-react";
import cx from './WolvesPage.module.css'
import WolvesList from "../../../components/WolvesList/WolvesList";
import NewWolfModal from "../NewWolfModal/NewWolfModal";

class WolvesPage extends Component {
    state = {
        wolves: null,
        searchField: '',
        editMode: false,
    }

    // TODO: Maybe avoid props drilling for this method - use Context API, Redux JS , etc...
    getWolves = () => {
        axios.get("/api/v1/wolves/", {
            headers: {Authorization: `Bearer 9bAqXRPplyiGfF6n81NVUGpAqeLI1QHw46aqICVL1BLaGI6`}
        }).then(response => {
            this.setState({wolves: response.data});
        })
    }

    componentDidMount() {
        if (this.state.wolves === null) {
            this.getWolves();
        }
    }

    onSearchChange = (event) => {
        this.setState({searchField: event.target.value})
    }

    toggleEditMode = () => {
        this.setState({editMode: !this.state.editMode})
    }

    render() {
        let filteredWolves;
        if (this.state.wolves) {
            filteredWolves = this.state.wolves.filter(wolf => {
                return wolf.name.toLowerCase().includes(this.state.searchField.toLowerCase());
            })
        }
        return (
            <>
                <div className={cx.WolfMenu}>
                    <Input icon='search' className={cx.WolfMenuItem} onChange={this.onSearchChange}
                           placeholder='Search wolf...'/>
                    <Button className={cx.WolfMenuItem} color={this.state.editMode ? "red" : "green"}
                            onClick={this.toggleEditMode}><Icon name="edit"/>Edit
                        mode: {this.state.editMode ? "ON" : "OFF"}</Button>
                    <NewWolfModal editMode={this.state.editMode} updateWolves={() => this.getWolves()}/>
                </div>
                {!filteredWolves ? "LOADING" : <WolvesList wolves={filteredWolves}
                                                           updateWolves={() => this.getWolves()}
                                                           editMode={this.state.editMode}
                />}
            </>
        );
    }
}

export default WolvesPage;