import { useState } from 'react';

import PageHeader from '../../components/Header/Header';
import AddPlantForm from '../../components/AddPlantForm/AddPlantForm';
import PlantFeed from '../../components/PlantFeed/PlantFeed';

import tokenService from '../../utils/tokenService';

import { Grid } from 'semantic-ui-react';

export default function FeedPage() {
    const [plants, setPlants] = useState([]);

    async function addPlant(formData) {
        try {
            const response = await fetch('/api/plants', {
                method: 'POST',
                body: formData,
                headers: {
                    Authorization: "Bearer " + tokenService.getToken()
                }
            })

            const data = await response.json();
            console.log(data, "<- response data from the server")

            // Now, update state!
            setPlants( [
                data.plant,
                ...plants
            ])
            
        } catch (error) {
            console.log(error);  
        }
    }

    return (
        <Grid centered>
            <Grid.Row>
                <Grid.Column>
                    <PageHeader />
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column style={{maxWidth: 450}}>
                    <AddPlantForm addPlant={addPlant} />
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column style={{maxWidth: 450}}>
                    <PlantFeed />
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}