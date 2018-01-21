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
      ],
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

    console.log("Files dropped using datatransfer --> ", dt.files);
    for (let i=0; i < dt.files.length; i++) {
      console.log("... file[" + i + "].name = " + dt.files[i].name);
    } 


    // if (dt.items) {
    //   // Use DataTransferItemList interface to access the file(s)
    //   for (let i=0; i < dt.items.length; i++) {
    //     if (dt.items[i].kind === "file") {
    //       var f = dt.items[i].getAsFile();
    //       console.log("... file[" + i + "].name = " + f.name);
    //     }
    //   }
    // } else {
    //   // Use DataTransfer interface to access the file(s)
    //   console.log("Files dropped using datatransfer --> ", dt.files);
    //   for (let i=0; i < dt.files.length; i++) {
    //     console.log("... file[" + i + "].name = " + dt.files[i].name);
    //   }  
    // }
  }

  dragOver(e) {
    // console.log("Drag over event --> ", e);
    e.preventDefault();    
    console.log("Dragging.. --> ");

    if (!this.state.dragging) {

      clearTimeout(this.draggingTimeout);

      this.setState({
        dragging : true
      });

      this.draggingTimeout = setTimeout(() => {
        this.setState({
          dragging : false
        });
      }, 500);
    }

  }

  dragEnd(e) {
    // console.log("Drag end event --> ", e);
    e.preventDefault(); 
    console.log("Drag ENDED.. --> ");    
  }

  render() {
    return (
      <div className="App" onDrop={(e) => this.handleDrop(e)} onDragOver={(e) => this.dragOver(e)} onDragEnd={(e) => this.dragEnd(e)}>
        <CreatePost dragging={this.state.dragging} createNewPost={this.createNewPost.bind(this)} />
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
