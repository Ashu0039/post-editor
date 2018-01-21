import React, { Component } from 'react';
import './CreatePost.css';

class CreatePost extends Component {

  constructor(props) {
    super(props);

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
      this.props.setEditMode(flag);
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
        <div className="post-title">
          <input placeholder="Title for your post.." />
        </div>
        <div className="actions">
          { this.getActions() }
        </div>

        <div className="editor" contentEditable="true"></div>

        <div className="options">
          <div className="option save non-selectable-action" onClick={() => this.savePost()}>Save</div>
          <div className="option cancel non-selectable-action" onClick={() => this.discardPost()}>Cancel</div>
        </div>
      </div>

    );
  }

  getDraggingTemplate() {
    return (
      <div id="dropZone">
        Drop Images here
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
    let postTitle = document.querySelector("#editorContainer .post-title input").value;

    let newPost = {
      'title' : postTitle ? postTitle : 'New Post - ' + new Date().getTime(),
      'content' : htmlContent
    }

    let postInEdit = this.props.editingPost;    

    if(postInEdit) {

      postInEdit.title = newPost.title;
      postInEdit.content =  newPost.content;
      this.props.updatePost(postInEdit);

    } else {
      this.props.createNewPost(newPost);      
    }


    this.setEditMode(false);

  }

  discardPost() {

    this.setEditMode(false);

  }

  droppedFiles(files) {
    console.log("Dropped files --> ", files);

    if (!this.state.editingMode) {
      this.setEditMode(true);
    }

    let filesArray = Array.from(files);

    let urls = filesArray.map((file) => URL.createObjectURL(file));

    setTimeout(() => {
      this.focusOnEditor();

      urls.forEach((url) => document.execCommand("insertImage", false, url));

    }, 1000);

  }

  getEditorStateTemplate() {

    return this.props.showEditor ? this.getEditorTemplate() : this.createNewPostButton();

  }

  componentWillReceiveProps(nextProps) {
    // console.log("Received props for editor --> ", nextProps);

    // let postToEdit = nextProps.editingPost;    

    // if(postToEdit || nextProps.) {
    //   this.setState({
    //     editingMode : true
    //   });

    // }
    


  }

  componentDidUpdate() {

    console.log("Editing mode --> ", this.props.showEditor, " editing post --> ", this.props.editingPost);

    if(this.props.showEditor && this.props.editingPost) {
      
      let postToEdit = this.props.editingPost;

      let title = postToEdit.title;
      let content = postToEdit.content;

      document.querySelector("#editorContainer .post-title input").value = title;
      this.setInnerHTMLOfEditor(content);

    }

  }

  render() {

    // const templateToRender = this.state.editingMode ? this.createEditor() : this.createNewPostButton();

    const templateToRender = this.getEditorStateTemplate();

    return (
      <div id="createPost" className={this.props.dragging ? 'drag-zone' : ''}>
        
        {templateToRender}
        {this.props.dragging ? this.getDraggingTemplate() : ''}

      </div>
    );
  }
}

export default CreatePost;
