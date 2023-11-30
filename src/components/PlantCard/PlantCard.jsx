import { Card, Icon, Image } from 'semantic-ui-react';

export default function PlantCard({ plant }) {
    return (
        <Card>
            <Card.Content textAlign="left">
                <Image 
                    size="mid"
                    floated="right"
                    avatar
                    src={plant.user.photoUrl}
                />
                <Card.Header floated="left">{plant.user.username}</Card.Header>
            </Card.Content>
            <Image
                src={`${plant.photoUrl}`} 
            />
            <Card.Content>
                <Card.Description>{plant.commonName}</Card.Description>
            </Card.Content>
            <Card.Content>
                <Icon name="heart" size="mid" color="red" />
                {/* {plant.likes.length} likes */}
            </Card.Content>
        </Card>
    )
}