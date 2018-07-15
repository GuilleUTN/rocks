import React from 'react';
import VideoScreen from './components/videoScreen';
import { Provider } from 'react-redux';
import store from './store/index';

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <VideoScreen />
      </Provider>
    );
  }
}
