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
      },
      {
        'command' : 'insertImage',
        'text' : 'Insert Image',
        'val' : 'https://dummyimage.com/240x180/000/fff.png&text=image'
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

  getInnerHTMLOfEditor() {
    return document.querySelector("#editorContainer .editor").innerHTML;
  }

  setInnerHTMLOfEditor(html) {
    document.querySelector("#editorContainer .editor").innerHTML = html;
  }

  savePost() {

    let htmlContent = "<div>" + this.getInnerHTMLOfEditor() + "</div>";

    let newPost = {
      'title' : 'New Post',
      'content' : htmlContent
    }

    this.props.createNewPost(newPost);

    this.setState({
      editingMode : false
    });

  }

  droppedFiles(files) {
    console.log("Dropped files --> ", files);

    if (!this.state.editingMode) {
      this.setState({
        editingMode : true
      });
    }

    // let reader  = new FileReader();

    let file = files[0];

    let url = URL.createObjectURL(file);

    console.log("Created url for file --> ", url);


    setTimeout(() => {
      this.focusOnEditor();
      document.execCommand("insertImage", false, url);            
    }, 1000);



    // reader.addEventListener("load", function () {

    //   // console.log("Got file url --> ", reader.result);

    //   document.execCommand("insertImage", false, reader.result || "");      

    // }, false);

    // if (file && file.type.indexOf("image") > -1) {
    //   reader.readAsDataURL(file);
    // }

  }

  getEditorStateTemplate() {

    return this.state.editingMode ? this.getEditorTemplate() : this.createNewPostButton();

  }

  render() {

    // const templateToRender = this.state.editingMode ? this.createEditor() : this.createNewPostButton();

    const templateToRender = this.props.dragging ? this.getDraggingTemplate() : this.getEditorStateTemplate();

    return (
      <div id="createPost">
        
        {templateToRender}

      </div>
    );
  }
}

export default CreatePost;
