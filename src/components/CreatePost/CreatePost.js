import React, { Component } from 'react';
import './CreatePost.css';

class CreatePost extends Component {

  constructor() {
    super();

    this.state = {
      'editingMode' : false
    };

    console.log("Received props --> ", this.props);
    

    this.editCommands = [
      {
        'command' : 'bold',
        'text' : 'B'
      },
      {
        'command' : 'italic',
        'text' : 'I'
      },
      {
        'command' : 'underline',
        'text' : 'U'
      },
      {
        'command' : 'createLink',
        'text' : 'Create Link',
        'val' : 'www.zaya.in'
      }
    ];


  }

  focusOnEditor() {
    document.querySelector("#editorContainer .editor").focus();    
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

  setCurrentCommand(command) {

    this.focusOnEditor();        

    console.log("Setting current mode to --> ", command.command);

    let val = (typeof command.val !== "undefined") ? prompt("Value for " +command.command + "?", command.val) : "";

    document.execCommand(command.command, false, val || "");
    
  }

  getActions() {

    return this.editCommands.map((command) => {
      return <div key={command.command} onClick={() => this.setCurrentCommand(command)} className="action non-selectable-action">{command.text}</div>      
    });

  }

  getEditorTemplate() {
    return (
      
      <div id="editorContainer">
        <div className="actions">
          { this.getActions() }
        </div>

        <div className="editor" contentEditable="true"></div>

        <div className="options">
          <div className="option save non-selectable-action" onClick={() => this.savePost()}>Save</div>
          <div className="option cancel non-selectable-action" onClick={() => this.setEditMode(false)}>Cancel</div>
        </div>
      </div>

    );
  }

  getDraggingTemplate() {
    return (
      <div id="dropZone">
        Drop here
      </div>
    );
  }

  createEditor() {

    let editorStateToShow;

    if(this.props.dragging) {
      editorStateToShow = this.getDraggingTemplate();
    } else {
      editorStateToShow = this.getEditorTemplate();
    }

    return editorStateToShow;

  }

  savePost() {

    let htmlContent = "<div>" + document.querySelector("#editorContainer .editor").innerHTML + "</div>";

    let newPost = {
      'title' : 'New Post',
      'content' : htmlContent
    }

    this.props.createNewPost(newPost);

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
