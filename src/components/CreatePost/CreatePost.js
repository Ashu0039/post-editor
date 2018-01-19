import React, { Component } from 'react';
import './CreatePost.css';

class CreatePost extends Component {

  constructor() {
    super();

    this.state = {
      'editingMode' : false
    };


  }

  setEditMode(flag) {

    if (typeof flag === "boolean") {
      this.setState({
        'editingMode' : flag
      });
    }

  }

  createNewPostButton() {
    return (
      <div onClick={() => this.setEditMode(true)} className="create-post-btn non-selectable-action">Create New Post</div>
    );
  }

  setCurrentCommand(mode) {

    console.log("Setting current mode to --> ", mode);

    document.execCommand(mode, false, "www.google.com");
    document.querySelector("#editorContainer .editor").focus();
    
  }

  createEditor() {

    return (

      <div id="editorContainer">
        <div className="actions">
          <div onClick={() => this.setCurrentCommand('bold')} className="action non-selectable-action">B</div>
          <div onClick={() => this.setCurrentCommand('italic')} className="action non-selectable-action">I</div>
          <div onClick={() => this.setCurrentCommand('underline')} className="action non-selectable-action">U</div>
          <div onClick={() => this.setCurrentCommand('createLink')} className="action non-selectable-action">Link</div>          
        </div>

        <div className="editor" contentEditable="true"></div>

        <div className="options">
          <div className="option save non-selectable-action">Save</div>
          <div className="option cancel non-selectable-action" onClick={() => this.setEditMode(false)}>Cancel</div>
        </div>
      </div>

    );

  }

  render() {

    const templateToRender = this.state.editingMode ? this.createEditor() : this.createNewPostButton();

    return (
      <div id="createPost">
        
        {templateToRender}

      </div>
    );
  }
}

export default CreatePost;
