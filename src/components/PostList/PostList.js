import React, { Component } from 'react';
import './PostList.css';

class PostList extends Component {


  getAllPosts() {

    return this.props.posts.map((post) => {

      return <div key={post._id}><p>{ post.title }</p></div>;

    });

  }

  render() {

    const allPosts = this.getAllPosts();

    return (
      <div id="postList">
        <h1>Here a list of all posts will come</h1>
        { allPosts }
      </div>
    );
  }
}

export default PostList;
