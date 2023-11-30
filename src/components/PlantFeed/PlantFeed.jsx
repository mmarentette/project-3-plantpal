import PlantCard from "../PlantCard/PlantCard"

import { Card } from 'semantic-ui-react';

export default function PlantFeed({ plants }) {
    
    const plantCards = plants.map((plant) => {
        return <PlantCard plant={plant} key={plant._id} />
    })

    return (
        <Card.Group itemsPerRow={3}>
            {plantCards}
        </Card.Group>
    )
}