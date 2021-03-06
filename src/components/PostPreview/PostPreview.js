import React, { Component } from 'react';
import './PostPreview.css';

class PostPreview extends Component {

    componentDidUpdate() {

        if (!this.props.post) {
            return;
        }

        console.log("Previewing post --> ", this.props.post);

        const previewDiv = document.querySelector("#postPreview .preview-section");

        previewDiv.innerHTML = this.props.post.content;

    }

    render() {

        // const post = this.props.post;
        const previewing = this.props.previewing;

        let previewTitle = this.props.post ? this.props.post.title : '';

        return (

            <div id="postPreview" className={previewing ? 'show' : 'hide'}>
                <span onClick={() => this.props.closePreview()}>Close</span>
                <div className="title">{previewTitle}</div>
                <div className="preview-section"></div>
                <div onClick={() => this.props.exportPost(this.props.post)} className="export">Export</div>
            </div>

        );

    }

}

export default PostPreview;
