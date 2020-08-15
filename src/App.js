import React, {Component} from 'react';
import './App.css';
import SplashScreen from "./components/SplashScreen/SplashScreen";
import MainPage from "./containers/MainPage/MainPage";
import 'semantic-ui-css/semantic.min.css'
import {BrowserRouter, Route, Switch} from "react-router-dom";
import NavigationBar from "./containers/NavigationBar/NavigationBar";
import WolvesPage from "./containers/Wolves/WolvesPage/WolvesPage";
import PacksPage from "./containers/Packs/PacksPage/PacksPage";
import UnderConstruction from "./components/UnderContruction/UnderContruction";
import MapPage from "./containers/MapPage/MapPage";
import {WolvesProvider} from "./context/WolvesContext";


// TODO: Create a splash screen component
// TODO: Create a loading component when data from the APIs are being loaded
// TODO: Remove unnecessary console.log()
class App extends Component {
    state = {
        isLoading: true,
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({isLoading: false})
        }, 3000)
    }

    render() {
        return (
            this.state.isLoading ? <SplashScreen/> :
                <WolvesProvider>
                    <BrowserRouter>
                        <NavigationBar/>
                        <Switch>
                            <Route exact path="/" component={MainPage}/>
                            <Route path="/wolves" component={WolvesPage}/>
                            <Route path="/packs" component={PacksPage}/>
                            <Route path="/map" component={MapPage}/>
                            <Route path="/contact" component={UnderConstruction}/>
                        </Switch>
                    </BrowserRouter>
                </WolvesProvider>
        );
    }
}

export default App;