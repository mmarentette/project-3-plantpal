import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';

import tokenService from '../../utils/tokenService';

import PageHeader from "../../components/Header/Header";
import ProfileBio from "../../components/ProfileBio/ProfileBio";
import PlantFeed from '../../components/PlantFeed/PlantFeed';

export default function ProfilePage() {

    const [profileUser, setProfileUser] = useState({});
    const [plants, setPlants] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    // Use useParams to grab username from the browser's URL. The key of username is defined on the client-side routing - i.e. App route ('/:username')
    const {username} = useParams(); // useParams is an object; username is a key on this object. The curly braces indicates destructuring assignment - we are unpacking the value from this object into its own variable... just like when we destructure props (which is also an object).

    useEffect(() => {
        console.log(username);

        async function getProfile() {
            try {
                setLoading(true);
                const response = await fetch(`/api/users/${username}`, {
                method: 'GET',
                headers: {
                    Authorization: "Bearer " + tokenService.getToken()
                }
            })
            // response has a built-in ok property
            // .ok checks to see if status is in the 200s (everything went okay); if not, set an error message
            if(!response.ok) setErrorMessage('Profile does not exist');

            const data = await response.json();
            console.log(data);

            setLoading(false);
            setProfileUser(data.user);
            setPlants(data.data);
                
            } catch (error) {
                console.log(error);
                setErrorMessage('Profile does not exist'); // This is what we tell the client, even though this may not be the issue - could be an error on the server.
            }

        }

        getProfile();
    }, [username]); // Any time params changes, run useEffect

    if (errorMessage) {
        return (
            <>
                <PageHeader />
                <h1>{errorMessage}</h1>
            </>
        )
    }

    if (loading) {
        return (
            <>
                <PageHeader />
                <h1>Loading...</h1>
            </>
        )
    }

    return (
        <Grid centered>
            <Grid.Row>
                <Grid.Column>
                    <PageHeader />
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column style={{ maxWidth: 450 }}>
                    <ProfileBio profileUser={profileUser} />
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column style={{ maxWidth: 900 }}>
                    <PlantFeed plants={plants} isProfile={true} itemsPerRow={3} />
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}