import React, { Component } from 'react';
import './App.css';

// Import Components
import CreatePost from './components/CreatePost/CreatePost';
import PostList from './components/PostList/PostList';

class App extends Component {

  constructor() {
    super();

    this.state = {
      'posts' : [ 
        {
          '_id' : 1,
          'title' : 'Hello',
          'content' : 'wow'
        },
        {
          '_id' : 2,
          'title' : 'something',
          'content' : 'sdfsf'
        }
      ]
    };
  }

  createNewPost({title, content}) {
    console.log("Create new post with content --> ", title, content);
    let newPost = new Post({title, content});
    console.log("Created new post --> ", newPost);
    this.addNewPost(newPost);
  }

  addNewPost(newPost) {

    if (newPost && newPost.id) {
      let existingPosts = this.state.posts;

      let afterAddingNewPost = [...existingPosts, newPost];

      this.setState({
        'posts' : afterAddingNewPost
      });

    }

  }

  render() {
    return (
      <div className="App">
        <CreatePost createNewPost={this.createNewPost.bind(this)} />
        <PostList posts={this.state.posts} />
      </div>
    );
  }
}

class Post {

  constructor({title, content}) {

    const newDate = new Date();

    this._id = newDate / 1000 * 1000;

    this.setContent(content);

    this.setTitle(title);

  }

  get id () {
    return this._id;
  }

  getContent() {
    return this.content;
  }

  setContent(newContent) {

    if (newContent && newContent.length) {
      this.content = newContent;
    }

  }

  getTitle() {
    return this.title;
  }

  setTitle(newTitle) {

    if (newTitle && newTitle.length) {
      this.title = newTitle;
    } else {
      this.title = "Unnamed-" + this.id;
    }

  }

}

export default App;
