import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap';
import { Login } from "../../axios";
export default function LoginModal(props) {
    const navigate = useNavigate();

    const [show, setShow] = useState(false);
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [err, seterr] = useState('')
    const [choose, setchoose] = useState(false)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const login = () => {
        if (email && password) {
            let obj = {
                email,
                password
            }
            Login(obj).then(res => {
                seterr(null)
                props.setToken(res.data.accessToken)
                navigate('/home');
            }).catch(err => seterr('wrong email or password'))
        }
        else seterr('wrong email or password')
    }

    const goToRegister = () => {
        navigate('/signup')
    }

    return (
        <div>
            <Button variant="primary" onClick={handleShow}>Get Started</Button>

            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Đăng nhập</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-group" style={{ marginBottom: '2vh' }}>
                        <input className="form-control" name="name" id="name" title='Email' placeholder="Email" onChange={e => { setemail(e.target.value) }} />
                    </div>
                    <div className="form-group">
                        <input className="form-control" type="password" name="pass" id="name" title='Password' placeholder="Password" onChange={e => { setpassword(e.target.value) }} />
                    </div>
                    <label style={{ color: 'red', marginBottom: '1vh' }}>
                        {err}
                    </label>
                    <div class="form-check">
                        <input class="form-check-input" id="flexCheckDefault" type='checkbox' value={choose} onChange={e => setchoose(e.target.value)} />
                        <label class="form-check-label" for="flexCheckDefault">Remember me</label>
                    </div>
                    <div>
                        <div className='answer' onClick={goToRegister} ><label>Don't have an account?</label></div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                    <Button variant="primary" onClick={login}>Login</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}