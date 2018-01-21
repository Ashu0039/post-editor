import React, { Component } from 'react';
import './App.css';

// Import Components
import CreatePost from './components/CreatePost/CreatePost';
import PostList from './components/PostList/PostList';
import PostPreview from './components/PostPreview/PostPreview';

class App extends Component {

  constructor() {
    super();

    this.state = {
      'posts' : [],
      'dragging' : false,
      'previewing' : false,
      'postInPreview' : null,
      'editingPost' : null,
      'editingMode' : false
    };
  }

  setEditMode(flag) {
    this.setState({
      editingMode : flag
    });

    if(!flag) {
      this.setState({
        editingPost : null
      });
    }
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

  updatePost(postToUpdate) {

    const posts = this.state.posts;
    
    const pos = posts.findIndex((post) => post.id === postToUpdate.id);

    if(pos > -1) {
      let newPosts = [...posts.slice(0, pos), postToUpdate, ...posts.slice(pos+1)];

      this.setState({
        posts : newPosts,
        editingPost : null
      });

    } else {
      this.addNewPost(postToUpdate);
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

  findPost(postId) {

    const posts = this.state.posts;

    const pos = posts.findIndex((post) => post.id === postId);

    if (pos > -1) {
      return posts[pos];
    } else {
      return null;
    }

  }

  editPost(postId) {

    console.log("Edit post with id --> ", postId);

    let postToEdit = this.findPost(postId);

    if(postToEdit) {
      this.setState({
        editingPost : postToEdit,
        editingMode : true
      });
    }

  }

  previewPost(postId) {

    console.log("Preview post with id --> ", postId, this);

    let postToPreview = this.findPost(postId);

    if (postToPreview) {
      this.setState({
        previewing : true,
        postInPreview : postToPreview
      });
    }

  }

  deletePost(postId) {

    const posts = this.state.posts;
    
    const pos = posts.findIndex((post) => post.id === postId);

    if (pos > -1) {
      
      let newPosts = [...posts.slice(0, pos), ...posts.slice(pos+1)];

      this.setState({
        posts : newPosts
      });

    }

  }

  closePreview() {
    this.setState({
      previewing : false,
      postInPreview : null
    });
  }

  render() {
    return (
      <div className="App" onDrop={(e) => this.handleDrop(e)} onDragOver={(e) => this.dragOver(e)} onDragEnd={(e) => this.dragEnd(e)}>
        <CreatePost ref={instance => { this.createPost = instance; }} showEditor={this.state.editingMode} setEditMode={this.setEditMode.bind(this)} editingPost={this.state.editingPost} updatePost={this.updatePost.bind(this)} dragging={this.state.dragging} createNewPost={this.createNewPost.bind(this)} />
        <PostList editPost={this.editPost.bind(this)} previewPost={this.previewPost.bind(this)} deletePost={this.deletePost.bind(this)} posts={this.state.posts} />
        <PostPreview previewing={this.state.previewing} post={this.state.postInPreview} closePreview={this.closePreview.bind(this)} />
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
