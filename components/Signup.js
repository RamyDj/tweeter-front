import { useState } from "react";
import { useDispatch } from "react-redux";
import styles from "../styles/SignUp.module.css";
import Image from "next/image";
import { useRouter } from "next/router";
import { login } from '../reducers/user';

function SignUp(props) {

    const dispatch = useDispatch();
    const router = useRouter()
    const [signUpUsername, setSignUpUsername] = useState("");
    const [signUpPassword, setSignUpPassword] = useState("");
    const [signUpFirstname, setSignUpFirstName] = useState("");


    const handleRegister = () => {

        fetch('http://localhost:3000/users/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                firstname: signUpFirstname,
                username: signUpUsername,
                password: signUpPassword,
            })
        })
            .then(response => response.json())
            .then(data => {
                if (data.result) {
                    dispatch(login({ firstname: signUpFirstname, username: signUpUsername, token: data.token }))
                    setSignUpFirstName('')
                    setSignUpPassword('')
                    setSignUpUsername('')
                    router.push("/home")
                }
            })

    }


    return (
        <div className={styles.modalSignUp}>
            <button className={styles.SignUpCloseButton} onClick={props.closeModal}>
                X
            </button>
            <div className={styles.modalContent}>
                <Image
                    src="/logoTwitterBlanc.png"
                    alt="Logo Twitter"
                    width={60}
                    height={50}
                />
                <h1>Connect to Hackatweet</h1>

                <div className={styles.modalInputButton}>
                    <input
                        className={styles.modalInput}
                        type="text"
                        placeholder="Firstname"
                        id="signUpFirstname"
                        onChange={(e) => setSignUpFirstName(e.target.value)}
                        value={signUpFirstname}
                    />
                    <input
                        className={styles.modalInput}
                        type="text"
                        placeholder="Username"
                        id="signUpUsername"
                        onChange={(e) => setSignUpUsername(e.target.value)}
                        value={signUpUsername}
                    />
                    <input
                        className={styles.modalInput}
                        type="password"
                        placeholder="Password"
                        id="signUpPassword"
                        onChange={(e) => setSignUpPassword(e.target.value)}
                        value={signUpPassword}
                    />
                    <button className={styles.modalButton} onClick={() => handleRegister()}>Sign Up</button>
                </div>
            </div>
        </div>
    );
}

export default SignUp;