import React, { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import ReactHtmlParser from 'react-html-parser';
import { storage } from './uploadFireBase';
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { Link } from "react-router-dom";

export default function Editor() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [value, setValue] = useState("");
  const [Show, setShow] = useState('')

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
            <h1>Set up News</h1>
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
            <Link to={"/news/"}>
              <button className="postNews">Submit</button>
            </Link>
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

// class MyUploadAdapter {
//     constructor(props) {
//         // CKEditor 5's FileLoader instance.
//       this.loader = props;
//       // URL where to send files.
//       this.url = getDownloadURL()
//     }

//     // Starts the upload process.
//     upload() {
//         return new Promise((resolve, reject) => {
//             this._initRequest();
//             this._initListeners(resolve, reject);
//             this._sendRequest();
//         } );
//     }

//     // Aborts the upload process.
//     abort() {
//         if ( this.xhr ) {
//             this.xhr.abort();
//         }
//     }

//     // Example implementation using XMLHttpRequest.
//     _initRequest() {
//         const xhr = this.xhr = new XMLHttpRequest();

//         xhr.open('POST', this.url, true);
//         xhr.responseType = 'json';
//         xhr.setRequestHeader('Access-Control-Allow-Origin', '*')
//         // xhr.setRequestHeader('Authorization', getToken())
//     }

//     // Initializes XMLHttpRequest listeners.
//     _initListeners( resolve, reject ) {
//         const xhr = this.xhr;
//         const loader = this.loader;
//         const genericErrorText = 'Couldn\'t upload file:' + ` ${ loader.file.name }.`;

//         xhr.addEventListener( 'error', () => reject( genericErrorText ) );
//         xhr.addEventListener( 'abort', () => reject() );
//         xhr.addEventListener( 'load', () => {
//             const response = xhr.response;
//             if ( !response || response.error ) {
//                 return reject( response && response.error ? response.error.message : genericErrorText );
//             }

//             // If the upload is successful, resolve the upload promise with an object containing
//             // at least the "default" URL, pointing to the image on the server.
//             resolve({
//                 default: response.s3Url
//             });
//         } );

//         if ( xhr.upload ) {
//             xhr.upload.addEventListener( 'progress', evt => {
//                 if ( evt.lengthComputable ) {
//                     loader.uploadTotal = evt.total;
//                     loader.uploaded = evt.loaded;
//                 }
//             } );
//         }
//     }

//     // Prepares the data and sends the request.
//     _sendRequest() {
//         const data = new FormData();

//         this.loader.file.then(result => {
//           data.append('file', result);
//           this.xhr.send(data);
//           }
//         )
//     }

// }


