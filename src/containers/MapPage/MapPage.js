import React, {Component} from 'react';
import cx from './MapPage.module.css'
import {Button, Popup} from "semantic-ui-react";
import axios from "axios";

class MapPage extends Component {

    state = {
        packs: null,
    }
    mapElement = React.createRef();

    componentDidMount() {
        if (this.mapElement) {
            console.log(this.mapElement.current.height);
        }
        if (this.state.packs === null) {
            this.getPacks();
        }
    }

    getPacks = () => {
        axios.get("/api/v1/packs/", {
            headers: {Authorization: `Bearer 9bAqXRPplyiGfF6n81NVUGpAqeLI1QHw46aqICVL1BLaGI6`}
        }).then(response => {
            this.setState({packs: response.data});
        })
    }

    //TODO: Re-render per window() size change
    //TODO: Make the overall UI more responsive and friendly to mobile/tablet
    //TODO: Check if backend is fixed. It has packs with latitude with values more than (-180 and 180).
    render() {
        return (
            <>
                <div>
                    <h1 className={cx.MapFont}>Island of the Wolf Packs</h1>
                </div>
                <div style={{position: "relative"}}>
                    <img className={cx.MapBody} ref={this.mapElement}
                         src={"https://mk0a2minutetabl7hq7i.kinstacdn.com/wp-content/uploads/2020/02/Arvyre-Continent-Map-23x16-Base-Map.jpg"}
                         alt="Paris"/>
                    {!this.state.packs ? null : this.state.packs.map(pack => {
                        // return <div style={{position: "absolute",height:"50px",width:"50px",backgroundColor:"red",top:pack.lat*10,left:pack.lng*10,zIndex:"2"}}></div>
                        return <div style={{
                            position: "absolute",
                            top: ((pack.lat + 90) * this.mapElement.current.height / 180),
                            left: ((pack.lng + 180) * this.mapElement.current.width / 360),
                            zIndex: "2"
                        }}><Popup content={pack.name} trigger={<Button secondary icon='paw'/>}/></div>
                    })}
                </div>
            </>
        );
    }
}

export default MapPage;