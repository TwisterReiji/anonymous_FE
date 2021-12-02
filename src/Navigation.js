import React, { useState, useEffect } from 'react'
import LoginModal from './components/userSignUp/loginModal';
import SignUp from './components/userSignUp/signUp'
import Editor from './components/richTextEditor/editor';
import CrudNews from './components/newsDashBoards/crudNews';
import EditorNews from './components/richTextEditor/editNews';
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";


export default function Navigation() {
    const [token, setToken] = useState('')

    const login = token => {
        setToken(token)
        localStorage.setItem('TOKEN_STORAGE', token)
    }

    useEffect(() => {
        let token = localStorage.getItem('TOKEN_STORAGE')
        setToken(token)
    }, [])
    
    return (
        <BrowserRouter>
            <Routes>
                <Route exact={true} path="/" element={<LoginModal setToken={login}/>} />
                <Route exact={true} path="/signup" element={<SignUp />} />
                <Route exact={true} path="/editor" element={<Editor/>}/>
                <Route exact={true} path="/editor/:userId" element={<EditorNews/>}/>
                <Route exact={true} path="/newsdashboards" element={<CrudNews/>}/>
                {/* <Route exact={true} path="/editor1/:userId" element={<Editor1/>}/> */}
                {/* <Route exact={true} path="/newEditor" element={<NewEditor/>}/> */}
            </Routes>
        </BrowserRouter>
    )
}