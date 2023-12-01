import React from 'react';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
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

export default function LoginPage({ handleSignupOrLogin }) {

  const navigate = useNavigate();
  const [state, setState] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  function handleChange(e) {
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
  }

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
          <Image src="https://i.imgur.com/oRhZ6QH.png" /> Log In
        </Header>
        <Form autoComplete="off" onSubmit={handleSubmit}>
          <Segment stacked>
            <Form.Input
              type="email"
              name="email"
              placeholder="Email"
              value={state.email}
              onChange={handleChange}
              required
            />
            <Form.Input
              name="password"
              type="password"
              placeholder="Password"
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
        <Message>
          Don't have an account? <Link to="/signup"><strong>Sign up</strong></Link> instead
        </Message>
      </Grid.Column>
    </Grid>
  );
}
