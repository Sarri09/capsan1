import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";

function Dashboard () {
    const [userData, setUserData] = useState(null);
    const cookies = new Cookies();

    useEffect(() => {
        const dotcomUser = cookies.get('dotcom_user');
        if (dotcomUser) {
            setUserData(JSON.parse(dotcomUser));
        }
    }, []);

    return (
        <>
            <h1>Bienvenido/a {userData ? `${userData[0]} ${userData[1]}` : ''}</h1>
        </>
    );
}

export default Dashboard;
