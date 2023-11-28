import React from 'react';
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

import './LoginPage.css';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import userService from '../../utils/userService';


export default function LoginPage({ handleSignupOrLogin }) {
  const [state, setState] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const navigate = useNavigate();

  function handleChange(e) {
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
  }
  // Question for Jim/Megan: Why was user-entered text able to be updated on form before I added code in this function, and when state was initialized to empty string instead of object with keys and empty string?

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await userService.login(state);
      handleSignupOrLogin();
      navigate('/');
    } catch (error) {
      console.log(error);
      setError('Check terminal and console')
    }

  }

  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
        <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h2" color="green" textAlign="center">
            <Image src="https://i.imgur.com/CPGiTkJ.jpg" /> Log In
            </Header>
            <Form autoComplete="off" onSubmit={handleSubmit}>
            <Segment stacked>
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
                <Button type="submit" className="btn">
                Log In
                </Button>
            </Segment>
            {error ? <ErrorMessage error={error} /> : null}
            </Form>
        </Grid.Column>
        </Grid>
  );
}
