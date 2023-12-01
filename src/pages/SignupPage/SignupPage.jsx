import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Button,
    Form,
    Grid,
    Header,
    Image,
    Message,
    Segment,
} from "semantic-ui-react";

import userService from '../../utils/userService';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

export default function SignupPage({ handleSignupOrLogin }) {

    const navigate = useNavigate();
    const [state, setState] = useState({
        username: '',
        email: '',
        password: '',
        passwordConf: '',
        bio: ''
    });
    const [photo, setPhoto] = useState('');
    const [error, setError] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append('photo', photo);

        for (let key in state) {
            formData.append(key, state[key]);
        }

        try {
            await userService.signup(formData);
            handleSignupOrLogin();
            navigate('/');
        } catch (error) {
            console.log(error);
            setError(error.message);
        }

    }

    function handleChange(e) {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })

    }

    function handleFileInput(e) {
        console.log(e.target.files);
        setPhoto(e.target.files[0]);
    }

    return (
        <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
            <Grid.Column style={{ maxWidth: 450 }}>
                <Header as="h2" color="green" textAlign="center">
                    <Image src="https://i.imgur.com/CPGiTkJ.jpg" /> Sign Up
                </Header>
                <Form autoComplete="off" onSubmit={handleSubmit}>
                    <Segment stacked>
                        <Form.Input
                            name="username"
                            placeholder="username"
                            value={state.username}
                            onChange={handleChange}
                            required
                        />
                        <Form.Input
                            type="email"
                            name="email"
                            placeholder="email"
                            value={state.email}
                            onChange={handleChange}
                            required
                        />
                        <Form.Input
                            name="password"
                            type="password"
                            placeholder="password"
                            value={state.password}
                            onChange={handleChange}
                            required
                        />
                        <Form.Input
                            name="passwordConf"
                            type="password"
                            placeholder="Confirm Password"
                            value={state.passwordConf}
                            onChange={handleChange}
                            required
                        />
                        <Form.TextArea
                            label="bio"
                            name="bio"
                            placeholder="Tell us more about your plants..."
                            onChange={handleChange}
                        />
                        <Form.Field>
                            <Form.Input
                                type="file"
                                name="photo"
                                placeholder="upload image"
                                onChange={handleFileInput}
                            />
                        </Form.Field>
                        <Button type="submit" className="btn">
                            Sign Up
                        </Button>
                    </Segment>
                    {error ? <ErrorMessage error={error} /> : null}
                </Form>
            </Grid.Column>
        </Grid>
    );
}
