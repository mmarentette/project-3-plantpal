import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Grid, Segment, Image } from 'semantic-ui-react';

import tokenService from '../../utils/tokenService';
import PageHeader from '../../components/Header/Header';

export default function PlantShowPage() {
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [plant, setPlant] = useState({});

    const { plantId } = useParams();
    console.log(plantId);

    useEffect(() => {
        getPlant();
    }, [plantId]) // Re-render component every time the plantId (from req.params.plantId) changes

    async function getPlant() {
        try {
            setLoading(true);
            const response = await fetch(`/api/plants/${plantId}`, {
                method: 'GET',
                headers: {
                    Authorization: "Bearer " + tokenService.getToken()
                }
            })

            if (!response.ok) setErrorMessage('Could not retrieve plant');
            const data = await response.json();
            console.log(data, '<--- data from show fetch');

            setLoading(false);
            setPlant(data.plant);
        } catch (error) {
            console.log(error);
            setErrorMessage('Could not retrieve plant');
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
                <Grid.Column style={{ width: 450 }}>
                    <Grid.Row><Image
                        size="large"
                        src={plant.photoUrl ? plant.photoUrl : "https://react.semantic-ui.com/images/wireframe/square-image.png"}
                    />
                    </Grid.Row>
                    <Segment>
                        <Grid.Row>
                            <h2>{plant.commonName}</h2>
                        </Grid.Row>
                    </Segment>

                </Grid.Column>
                <Grid.Column style={{ width: 450 }}>
                    <Segment as="h3">
                        Additional plant details will go here:
                    </Segment>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}