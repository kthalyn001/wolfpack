import React, {Component} from 'react';
import cx from './Navigation.module.css'
import {NavLink} from "react-router-dom";
import {Menu} from "semantic-ui-react";

class NavigationBar extends Component {
    render() {
        return (
            <div className={cx.Bar}>
                <Menu>
                    <Menu.Menu position={"right"}>
                        <Menu.Item as={NavLink} exact to="/" children="Home"/>
                        <Menu.Item as={NavLink} exact to="/wolves" children="Wolves"/>
                        <Menu.Item as={NavLink} exact to="/packs" children="Packs"/>
                        <Menu.Item as={NavLink} exact to="/map" children="Map"/>
                        <Menu.Item as={NavLink} exact to="/contact" children="Contact"/>
                    </Menu.Menu>

                </Menu>

            </div>
        );
    }
}

export default NavigationBar;