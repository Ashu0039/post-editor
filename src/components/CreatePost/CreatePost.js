import React, { Component } from 'react';
import './CreatePost.css';

class CreatePost extends Component {

  constructor() {
    super();

    this.state = {
      'editingMode' : false
    };

    this.editCommands = [
      {
        'command' : 'bold',
        'text' : 'B',
        'val' : ''
      },
      {
        'command' : 'italic',
        'text' : 'I',
        'val' : ''
      },
      {
        'command' : 'underline',
        'text' : 'U',
        'val' : ''
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

    console.log("Setting current mode to --> ", command.command);

    document.execCommand(command.command, false, command.val || "");

    this.focusOnEditor();    
    
  }

  getActions() {

    return this.editCommands.map((command) => {
      return <div key={command.command} onClick={() => this.setCurrentCommand(command)} className="action non-selectable-action">{command.text}</div>      
    });

  }

  createEditor() {

    return (

      <div id="editorContainer">
        <div className="actions">
          { this.getActions() }
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
