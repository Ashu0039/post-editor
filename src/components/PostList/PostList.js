import React, { Component } from 'react';
import './PostList.css';

class PostList extends Component {


  getAllPosts() {

    return this.props.posts.map((post) => {

      return <div className="post" key={post._id}><p>{ post.title }</p></div>;

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
