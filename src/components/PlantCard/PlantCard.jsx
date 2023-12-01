import { Link } from 'react-router-dom';
import { Card, Icon, Image } from 'semantic-ui-react';

import { useUserContext } from '../../contexts/UserContext';

export default function PlantCard({ plant, isProfile, deletePlant }) {
    const { loggedUser } = useUserContext();
    const isOwner = loggedUser._id === plant.user._id

    function handleClick() {
        deletePlant(plant._id);
    }

    return (
        <Card>
            {isOwner && <Link to="" onClick={handleClick}>
                <Card.Content>
                    <Icon name="delete" size="small" color="grey" />
                    Delete
                </Card.Content>
            </Link>}

            {isProfile ? null : (
                <Card.Content textAlign="left">
                    <Link to={`/${plant.user.username}`}>
                        <Image
                            size="large"
                            floated="right"
                            avatar
                            src={plant.user.photoUrl ? plant.user.photoUrl : "https://react.semantic-ui.com/images/wireframe/square-image.png"}
                        />
                    </Link>
                    <Card.Header floated="left">{plant.user.username}</Card.Header>
                </Card.Content>
            )}
            <Link to={`/plants/${plant._id}`}>
                <Image
                    src={`${plant.photoUrl}`}
                />
            </Link>
            <Link to={`/plants/${plant._id}`}>
                <Card.Content>
                    <Card.Description>{plant.commonName}</Card.Description>
                </Card.Content>
            </Link>
            {/* <Card.Content>
                <Icon name="heart" size="mid" color="red" />
                {plant.likes.length} likes
            </Card.Content> */}
        </Card>
    )
}
