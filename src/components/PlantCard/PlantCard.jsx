import { Card, Icon, Image } from 'semantic-ui-react';

export default function PlantCard({ plant, isProfile }) {
    return (
        <Card>
            {isProfile ? null : (
                <Card.Content textAlign="left">
                    <Image
                        size="large"
                        floated="right"
                        avatar
                        src={plant.user.photoUrl}
                    />
                    <Card.Header floated="left">{plant.user.username}</Card.Header>
                </Card.Content>
            )}

            <Image
                src={`${plant.photoUrl}`}
            />
            <Card.Content>
                <Card.Description>{plant.commonName}</Card.Description>
            </Card.Content>
            {/* <Card.Content>
                <Icon name="heart" size="mid" color="red" />
                {plant.likes.length} likes
            </Card.Content> */}
        </Card>
    )
}