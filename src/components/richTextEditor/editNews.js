import React, { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import ReactHtmlParser from 'react-html-parser';
import { storage } from './uploadFireBase';
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { Link } from "react-router-dom";

export default function EditorNews() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [value, setValue] = useState("");

  const custom_config = {
    extraPlugins: [MyCustomUploadAdapterPlugin],
    toolbar: {
      items: [
        'heading',
        '|',
        'bold',
        'italic',
        'link',
        'bulletedList',
        'numberedList',
        '|',
        'blockQuote',
        'insertTable',
        '|',
        'imageUpload',
        'undo',
        'redo'
      ]
    },
    table: {
      contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells']
    }
  }

  const handle1 = (e) => {
    const data = e.target.value;
    setName(data)
    console.log(data);
  };
  const handle2 = (e) => {
    const data = e.target.value;
    setEmail(data)
    console.log(data);
  };



  return (
    <div className="App">
      <div className="container">
        <div className="wrapper">
          <form className="form-group">
            <h1>Edit News</h1>
            <div className="form-group">
              <label>User</label>
              <input type="text" name="name" onChange={handle1} placeholder="UserName" className="form-control" />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="text" name="email" onChange={handle2} placeholder="Email" className="form-control" />
            </div>
            <div className="form-group">
              <label>Message</label>
              <CKEditor
                editor={ClassicEditor}
                data={value}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setValue(data)
                }}
                config={custom_config}
                onBlur={(event, editor) => {
                  console.log('Blur.', editor);
                }}
                onFocus={(event, editor) => {
                  console.log('Focus.', editor);
                }}
              />
            </div> 
              <button className="postNews">Update</button>
            <div>
              {name}
              {email}
              {ReactHtmlParser(value)}
            </div>
          </form>
        </div>
      </div>

    </div>
  );
}






class MyUploadAdapter {
  constructor(loader) {
    console.log(loader);
    this.loader = loader;
  }
  // Starts the upload process.
  upload() {
    return this.loader.file.then(
      file =>
        new Promise((resolve, reject) => {
          let storageRef = ref(storage, `files/${file.name}`);
          let uploadTask = uploadBytesResumable(storageRef, file);
          uploadTask.on(
            (error) => console.log(error),
            () => {
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                resolve({
                  default: downloadURL
                });
              });
            }
          );
        })
    );
  }
}










function MyCustomUploadAdapterPlugin(editor) {
  editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
    return new MyUploadAdapter(loader)
  }
}