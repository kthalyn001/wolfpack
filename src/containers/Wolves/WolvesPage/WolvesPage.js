import React, {Component} from 'react';
import axios from 'axios';
import {Button, Icon, Input} from "semantic-ui-react";
import cx from './WolvesPage.module.css'
import WolvesList from "../../../components/WolvesList/WolvesList";
import NewWolfModal from "../NewWolfModal/NewWolfModal";
import WolvesContext from "../../../context/WolvesContext";

class WolvesPage extends Component {
    static contextType = WolvesContext
    state = {
        editMode: false,
    }

    onSearchChange = (event) => {
        this.context.updateSearchField(event.target.value);

    }

    toggleEditMode = () => {
        this.setState({editMode: !this.state.editMode})
    }

    render() {
        console.log(this.context);
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
                <WolvesList editMode={this.state.editMode} />
            </>
        );
    }
}

export default WolvesPage;