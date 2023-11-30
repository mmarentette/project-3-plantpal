import { useState } from 'react';

import { Segment, Form, Button } from 'semantic-ui-react';

export default function AddPlantForm({ addPlant }) {
    const [commonName, setCommonName ] = useState('');
    const [photo, setPhoto] = useState('');

    function handleChange(e) {
        setCommonName(e.target.value);
    }

    function handleFileInput(e) {
        setPhoto(e.target.files[0])
    }

    function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append('commonName', commonName);
        formData.append('photo', photo);

        addPlant(formData);
        setCommonName('');
        setPhoto('');
    }

    return (
        <Segment>
            <Form onSubmit={handleSubmit}>
                <Form.Input onChange={handleChange} placeholder="Name of your plant" value={commonName} />
                <Form.Input onChange={handleFileInput} type="file" />
                <Button type="submit">Add plant</Button>
            </Form>
        </Segment>
    )
}