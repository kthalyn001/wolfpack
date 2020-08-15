import React, {useContext} from 'react';
import {Card, Icon, Image} from "semantic-ui-react";
import EditWolfModal from "../../containers/Wolves/EditWolfModal/EditWolfModal";
import maleWolf from "../../resources/wolfb.svg"
import femaleWolf from "../../resources/wolfg.svg"
import WolvesContext from "../../context/WolvesContext";


const WolvesList = ({editMode}) => {
    const allWolves = useContext(WolvesContext)

    return (
        <Card.Group itemsPerRow={4}>
            {
                allWolves.getFilteredWolves() !== null ? allWolves.getFilteredWolves().map((e, index) => {
                    return <Card color={editMode ? "red" : "green"} key={"WolfCard" + index}>
                        <Image src={e.gender === "male" ? maleWolf : femaleWolf} wrapped ui={false}/>
                        <Card.Content>
                            <Card.Header>{e.name} - <Icon name={e.gender === 'male' ? 'male' : 'female'}/></Card.Header>
                            <Card.Meta>
                                <span className='date'>Birthday on {e.birthday}</span>
                            </Card.Meta>

                        </Card.Content>
                        {editMode ? <Card.Content extra>
                            <EditWolfModal wolf={e}/>
                        </Card.Content> : null}
                    </Card>
                }) : <p>Loading</p>
            }
        </Card.Group>
    );
};

export default WolvesList;
