import React, { Component } from 'react';
import './App.css';

// Import Components
import CreatePost from './components/CreatePost/CreatePost';
import PostList from './components/PostList/PostList';

class App extends Component {

  createNewPost(content) {
    console.log("Create new post with content --> ", content);
  }

  render() {
    return (
      <div className="App">
        <CreatePost createNewPost={this.createNewPost} />
        <PostList />
      </div>
    );
  }
}

export default App;
