import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Main from './components/Main'
import {render} from "@testing-library/react"

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

it('renders login', ()=> {
  const {queryByTitle} = render(<Main />);
  const btn = queryByTitle("loginButton");
  expect(btn).toBeTruthy
});