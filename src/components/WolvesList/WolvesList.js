import React from 'react';
import {Card, Icon, Image} from "semantic-ui-react";
import EditWolfModal from "../../containers/Wolves/EditWolfModal/EditWolfModal";
import maleWolf from "../../resources/wolfb.svg"
import femaleWolf from "../../resources/wolfg.svg"

const WolvesList = ({wolves, editMode, updateWolves}) => {

    ///Prop drilling from WolvesPage.js for getWolves method
    let updateP = () => {
        updateWolves();
    }
    return (
        <Card.Group itemsPerRow={4}>
            {
                wolves.map((e, index) => {
                    return <Card color={editMode ? "red" : "green"} key={"WolfCard" + index}>
                        <Image src={e.gender === "male" ? maleWolf : femaleWolf} wrapped ui={false}/>
                        <Card.Content>
                            <Card.Header>{e.name} - <Icon name={e.gender === 'male' ? 'male' : 'female'}/></Card.Header>
                            <Card.Meta>
                                <span className='date'>Birthday on {e.birthday}</span>
                            </Card.Meta>

                        </Card.Content>
                        {editMode ? <Card.Content extra>
                            <EditWolfModal wolf={e} updateC={() => updateP()}/>
                        </Card.Content> : null}
                    </Card>
                })
            }
        </Card.Group>
    );
};

export default WolvesList;
