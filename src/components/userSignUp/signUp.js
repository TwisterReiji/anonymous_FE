import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form } from 'react-bootstrap';
import { Register } from '../../axios'
import '../userSignUp/newEditor.css'
export default function SignUp() {
  const navigate = useNavigate()
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [hash, setHash] = useState('');
  const [repeatHash, setRepeatHash] = useState('');
  const [HashShown, setHashShown] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const changeName = e => setUserName(e.target.value)
  const changeEmail = e => setEmail(e.target.value)
  const changeHash = e => setHash(e.target.value)
  const changeRepeatHash = e => setRepeatHash(e.target.value)
  const toggleHashVisibility = () => setHashShown(!HashShown ? true : false)

  const redirectSignIn = () => navigate('/');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newAccount = { username, email, hash }
    console.log(newAccount)
    if (checkInput()) {
      Register(newAccount)
      .then(res => redirectSignIn())
      .catch(error => setAlertMessage("Something happens!"))
    }
  }

  const checkInput = () => {
    if (!checkName()) {
      setAlertMessage('Your name should be 3-50 characters.');
      return false;
    }
    if (!checkEmail()) {
      setAlertMessage('Your email should be at most 50 characters.');
      return false;
    }
    if (!checkHash()) {
      setAlertMessage('Your password should be at least 6 characters.');
      return false;
    }
    if (!checkRepeatHash()) {
      setAlertMessage('Wrong Repeat password');
      return false;
    }
    return true;
  }

  const checkName = () => username.length >= 3 && username.length <= 50
  const checkEmail = () => email.length <= 50
  const checkHash = () => hash.length >= 6
  const checkRepeatHash = () => hash === repeatHash ? true : false
  return (
    <div className="newUser">
    <h1 className="newUserTitle">Sign Up</h1>
    <form className="newUserForm">
        <div className="newUserItem">
            <label>Username</label>
            <input type="text" placeholder="john" onChange={changeName} />
        </div>
        <div className="newUserItem">
            <label>Email</label>
            <input type="email" placeholder="john@gmail.com"  onChange={changeEmail}/>
        </div>
        <div className="newUserItem">
            <label>Password</label>
            <input type="password" placeholder="Password" type={HashShown ? 'text' : 'password'} onChange={changeHash}/>
        </div>
        <div className="newUserItem">
            <label>Password</label>
            <input type="password" placeholder="Repeat Password" type={HashShown ? 'text' : 'password'} onChange={changeRepeatHash}/>
        </div>

        <div className="newUserItem">
        <Form.Check type="checkbox" label="Show password" onChange={toggleHashVisibility} />
            <button className="newUserButton" variant="primary" type="submit" onClick={handleSubmit}>Create</button>
        </div>
    </form>
</div>
  );
}