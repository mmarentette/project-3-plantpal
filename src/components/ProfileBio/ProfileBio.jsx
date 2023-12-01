import { Grid, Segment, Image } from 'semantic-ui-react';

export default function ProfileBio({ profileUser }) {
    return (
        <Grid textAlign="left" columns={2}>
            <Grid.Row>
                <Grid.Column>
                    <Image src={profileUser.photoUrl ? profileUser.photoUrl : "https://react.semantic-ui.com/images/wireframe/square-image.png"} avatar size="large" />
                </Grid.Column>
                <Grid.Column>
                    <Segment vertical>
                        <h3>{profileUser.username}</h3>
                    </Segment>
                    <Segment vertical>
                        <span>{profileUser.bio}</span>
                    </Segment>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}
