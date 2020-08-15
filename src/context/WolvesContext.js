import React, { Component } from 'react'
import axios from "axios";

const WolvesContext = React.createContext();

class WolvesProvider extends Component {
    // Context state
    state = {
        wolves: null,
        searchField: '',
    }


    getWolves = () => {
        axios.get("/api/v1/wolves/", {
            headers: {Authorization: `Bearer 9bAqXRPplyiGfF6n81NVUGpAqeLI1QHw46aqICVL1BLaGI6`}
        }).then(response => {
            this.setState({wolves: response.data});
        })
    }

    getFilteredWolves = () => {
        if(this.state.wolves !== null && this.state.searchField !== '') {
            return this.state.wolves.filter(wolf => {
                return wolf.name.toLowerCase().includes(this.state.searchField.toLowerCase());
            });
        } else {
            return this.state.wolves;
        }
    }

    updateSearchField = (wolfName) => {
        this.setState({searchField: wolfName});
    }

    componentDidMount() {
        if(this.state.wolves === null) {
            this.getWolves();
        }
    }

    render() {
        const { children } = this.props
        const { wolves } = this.state
        const { getFilteredWolves } = this
        const { updateSearchField } = this
        const { getWolves } = this

        return (
            <WolvesContext.Provider
                value={{
                    wolves,
                    getFilteredWolves,
                    updateSearchField,
                    getWolves,
                }}
            >
                {children}
            </WolvesContext.Provider>
        )
    }
}

export default WolvesContext

export { WolvesProvider }