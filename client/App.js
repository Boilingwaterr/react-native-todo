import React, { useState } from 'react';
import AppWithConnect from './src/AppWithConnect';
import store from './src/redux/reduxStore';
import { Provider } from 'react-redux';

export default function App (props) {
  
  return (
    <Provider store = { store }>
      <AppWithConnect />
    </Provider>
  )
}
