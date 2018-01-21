import React, { Component } from 'react';
import './PostList.css';

class PostList extends Component {


  editPost(postId) {
    this.props.editPost(postId);
  }

  previewPost(postId) {
    this.props.previewPost(postId);
  }

  deletePost(postId) {
    this.props.deletePost(postId);
  }

  getAllPosts() {

    return this.props.posts.map((post) => {

      return <div className="post" key={post._id}>
        <div className="title">{ post.title }</div>
        <div className="actions">
          <span onClick={() => this.editPost(post._id)}>Edit</span>
          <span onClick={() => this.previewPost(post._id)}>Preview</span>
          <span onClick={() => this.deletePost(post._id)}>Delete</span>
        </div>
      </div>;

    });

  }

  render() {

    const allPosts = this.getAllPosts();

    return (
      <div id="postList">

        {allPosts.length > 0 ? <h3>All Posts</h3> : <h1>Get started by creating some post!</h1>}

        
        { allPosts }
      </div>
    );
  }
}

export default PostList;
