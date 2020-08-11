import React, {Component} from 'react';
import WolfHead from "../../components/WolfHead/WolfHead";
import {Grid} from "semantic-ui-react";
import WelcomeText from "../../components/WelcomeText/WelcomeText";

class MainPage extends Component {
    render() {
        return (
            <div>
                <Grid>
                    <Grid.Row columns={2}>
                        <Grid.Column>
                            <WolfHead/>
                        </Grid.Column>
                        <Grid.Column style={{zIndex: 1}}>
                            <WelcomeText/>
                        </Grid.Column>

                    </Grid.Row>
                </Grid>
            </div>

        );
    }
}

export default MainPage;