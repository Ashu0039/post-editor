import React, { Component } from 'react';
import './App.css';

// Import Components
import CreatePost from './components/CreatePost/CreatePost';
import PostList from './components/PostList/PostList';

class App extends Component {

  constructor() {
    super();

    this.state = {
      'posts' : [],
      'dragging' : false
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

  handleDrop(e) {
    console.log("Something droppped --> ", e);
    e.preventDefault();
    var dt = e.dataTransfer;

    this.createPost.droppedFiles(dt.files);

  }

  dragOver(e) {
    // console.log("Drag over event --> ", e);
    e.preventDefault();    
    console.log("Dragging.. --> ");

    clearTimeout(this.draggingTimeout);    

    if (!this.state.dragging) {

      this.setState({
        dragging : true
      });

    }

    this.draggingTimeout = setTimeout(() => {

      if (this.state.dragging) {
        
        this.setState({
          dragging : false
        });

      }

      
    }, 500);

  }

  dragEnd(e) {
    // console.log("Drag end event --> ", e);
    e.preventDefault(); 
    console.log("Drag ENDED.. --> ");    
  }

  render() {
    return (
      <div className="App" onDrop={(e) => this.handleDrop(e)} onDragOver={(e) => this.dragOver(e)} onDragEnd={(e) => this.dragEnd(e)}>
        <CreatePost ref={instance => { this.createPost = instance; }} dragging={this.state.dragging} createNewPost={this.createNewPost.bind(this)} />
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
