import PlantCard from "../PlantCard/PlantCard"

import { Card } from 'semantic-ui-react';

export default function PlantFeed({ plants, isProfile, itemsPerRow, deletePlant }) {
    
    const plantCards = plants.map((plant) => {
        return <PlantCard plant={plant} key={plant._id} isProfile={isProfile} deletePlant={deletePlant} />
    })

    return (
        <Card.Group itemsPerRow={itemsPerRow}>
            {plantCards}
        </Card.Group>
    )
}