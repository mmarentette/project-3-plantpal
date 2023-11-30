import { useState, useEffect } from 'react';

import PageHeader from '../../components/Header/Header';
import AddPlantForm from '../../components/AddPlantForm/AddPlantForm';
import PlantFeed from '../../components/PlantFeed/PlantFeed';

import tokenService from '../../utils/tokenService';

import { Grid } from 'semantic-ui-react';

export default function FeedPage() {
    const [plants, setPlants] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        async function getPlants() {
            try {
                setLoading(true);
                const response = await fetch('/api/plants', {
                    method: 'GET',
                    headers: {
                        Authorization: "Bearer " + tokenService.getToken()
                    }
                })

                if(!response.ok) setErrorMessage('Could not retrieve plants');
                const data = await response.json();
                console.log(data, '<--- data from index fetch');

                setLoading(false);
                setPlants(data.plants);
            } catch (error) {
                console.log(error);
                setErrorMessage('Could not retrieve plants');
            }
        }

        getPlants();
    }, [])

    async function addPlant(formData) {
        try {
            setLoading(true);
            const response = await fetch('/api/plants', {
                method: 'POST',
                headers: {
                    Authorization: "Bearer " + tokenService.getToken()
                },
                body: formData,
            })

            if(!response.ok) setErrorMessage('Could not add plant');
            const data = await response.json();
            console.log(data, "<- response data from the server")

            // Now, update state!
            setLoading(false);
            setPlants([
                data.plant,
                ...plants
            ])

        } catch (error) {
            console.log(error);
            setErrorMessage('Could not add plant');
        }
    }

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
                    <AddPlantForm addPlant={addPlant} />
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column style={{ maxWidth: 450 }}>
                    <PlantFeed plants={plants} isProfile={false} itemsPerRow={1} />
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}