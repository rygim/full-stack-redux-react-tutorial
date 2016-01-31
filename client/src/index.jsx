import React from 'react';
import ReactDOM from 'react-dom';
import {VotingContainer} from './components/Voting';
import Router, {Route} from 'react-router';
import App from './components/App';
import {ResultsContainer} from './components/Results';
import reducer from './reducer';
import {createStore, applyMiddleware} from 'redux';
import io from 'socket.io-client';
import {Provider} from 'react-redux';
import {setState} from './action_creators';
import remoteActionMiddleware from './remote_action_middleware';

const socket = io(`${location.protocol}//${location.hostname}:8090`);
socket.on('state', state => store.dispatch(setState(state)));

const createStoreWithMiddleware = applyMiddleware(remoteActionMiddleware(socket))(createStore);

const store = createStoreWithMiddleware(reducer);
//store.dispatch({
//  type: 'SET_STATE',
//  state: {
//    vote: {
//      pair: ['Sunshine', '28 Days later'],
//      tally: {Sunshine: 2}
//    }
//  }
//});


const pair = ['Trainspotting', '28 Days Later'];

const routes = 
  <Route component={App}>
    <Route path="/results" component={ResultsContainer} />
    <Route path="/" component={VotingContainer} />
  </Route>;

ReactDOM.render(<Provider store={store}><Router>{routes}</Router></Provider>,  document.getElementById('app'));
