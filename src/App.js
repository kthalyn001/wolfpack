import React, {Component} from 'react';
import './App.css';
import SplashScreen from "./components/SplashScreen/SplashScreen";
import MainPage from "./containers/MainPage/MainPage";
import 'semantic-ui-css/semantic.min.css'
import {HashRouter, Route, Switch} from "react-router-dom";
import NavigationBar from "./containers/NavigationBar/NavigationBar";
import WolvesPage from "./containers/Wolves/WolvesPage/WolvesPage";
import PacksPage from "./containers/Packs/PacksPage/PacksPage";
import UnderConstruction from "./components/UnderContruction/UnderContruction";
import MapPage from "./containers/MapPage/MapPage";


class App extends Component {
    state = {
        isLoading: true,
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({isLoading: false})
        }, 10)
    }

    render() {
        return (
            this.state.isLoading ? <SplashScreen/>    :
                <HashRouter>
                    <NavigationBar/>
                    <Switch>
                        <Route exact path="/" component={MainPage}/>
                        <Route path="/wolves" component={WolvesPage}/>
                        <Route path="/packs" component={PacksPage}/>
                        <Route path="/map" component={MapPage}/>
                        <Route path="/contact" component={UnderConstruction}/>
                    </Switch>

                </HashRouter>
        );
    }
}

export default App;