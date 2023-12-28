import { AuthProvider, RequireAuth } from 'react-auth-kit';
import './App.css';
import { Auth } from './elements/Auth';
import { Test } from './elements/exam/Test';
import TestEditor from './elements/ticketsEditor/TestEditor';
import TicketEditor from './elements/ticketsEditor/TicketEditor';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import React, { Dispatch } from 'react';

export const TypeContext = React.createContext<[boolean, Dispatch<boolean>]>({} as [boolean, Dispatch<boolean>]);


function Dummy() {
    const navigate = useNavigate();

    React.useEffect(() => {
        navigate("/auth");
    }, []);
}


function App() {
    const [type, setType] = React.useState<[boolean, Dispatch<boolean>]>(null)



    return (
        <AuthProvider cookieSecure={window.location.protocol == "https"} cookieDomain={window.location.hostname} authType={'cookie'} authName={'_auth'} >
            <BrowserRouter>
                <Routes>
                    <Route path={"/teacher"} element={
                        <RequireAuth loginPath="/auth">
                            <TypeContext.Provider value={[type, setType]}>
                                <TicketEditor />
                            </TypeContext.Provider>
                        </RequireAuth>}>
                    </Route>
                    <Route path={"/student"} element={
                        <RequireAuth loginPath="/auth">
                            <TypeContext.Provider value={[type, setType]}>
                                <Test idx="d31e87f7-eba0-4b2e-bfab-4688cdbb4573" />
                            </TypeContext.Provider>
                        </RequireAuth>}>
                    </Route>
                    <Route path={"/auth"} element={
                        <TypeContext.Provider value={[type, setType]}>
                            <Auth />
                        </TypeContext.Provider>
                    }>
                    </Route>
                    <Route path={""} element={
                            <Dummy />
                    }>
                    </Route>
                </Routes>
            </BrowserRouter>
        </AuthProvider >
        //<Test idx="d31e87f7-eba0-4b2e-bfab-4688cdbb4573" />
        //<TicketEditor />
        //<Auth />

    )
}

export default App;