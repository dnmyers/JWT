import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const navigate = useNavigate();

    const [userName, setUserName] = useState("dn8326");
    const [password, setPassword] = useState("Mypass1*");

    const handleSubmit = (e) => {
        e.preventDefault();

        const loginPayload = {
            userName,
            password,
        };

        axios
            .post("https://localhost:7171/authorization/token", loginPayload)
            .then((response) => {
                const token = response.data.authorizationToken;

                localStorage.setItem("token", token);

                if (token) {
                    axios.defaults.headers.common[
                        "Authorization"
                    ] = `Bearer ${token}`;
                }

                navigate("/");
            })
            .catch((err) => console.log(err));
    };

    const handleUserNameChange = (e) => {
        setUserName({ value: e.target.value });
    };

    const handlePasswordChange = (e) => {
        setPassword({ value: e.target.value });
    };

    return (
        <div>
            Login Page
            <form onSubmit={handleSubmit}>
                <label htmlFor='userName'>
                    UserName:
                    <input
                        type='text'
                        name='userName'
                        value={userName}
                        onChange={handleUserNameChange}
                    />
                </label>
                <label htmlFor='password'>
                    Password:
                    <input
                        type='password'
                        name='password'
                        value={password}
                        onChange={handlePasswordChange}
                    />
                </label>
                <input type='submit' value='Submit' />
            </form>
        </div>
    );
};

export default LoginPage;
