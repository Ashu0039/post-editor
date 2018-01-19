import React, { Component } from 'react';
import './App.css';

// Import Components
import CreatePost from './components/CreatePost/CreatePost';
import PostList from './components/PostList/PostList';

class App extends Component {
  render() {
    return (
      <div className="App">
        <CreatePost />
        <PostList />
      </div>
    );
  }
}

export default App;
