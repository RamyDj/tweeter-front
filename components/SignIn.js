import { useState } from "react";
import { useDispatch } from "react-redux";
import styles from "../styles/SignIn.module.css";
import Image from "next/image";
import { login } from "../reducers/user";
import { useRouter } from "next/router";

function SignIn(props) {
    const dispatch = useDispatch();
    const router = useRouter()
    const [signInUsername, setSignInUsername] = useState("");
    const [signInPassword, setSignInPassword] = useState("");
//connection avec recuperation de token et firstname
    const handleConnection = () => {
        fetch('http://localhost:3000/users/signin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: signInUsername,
                password: signInPassword
            })
        })
            .then(response => response.json())
            .then(data => {
                if (data.result) {
                    dispatch(login({ username: signInUsername, token: data.token, firstname: data.firstname }))
                    setSignInUsername('');
                    setSignInPassword('');
                    router.push("/home")
                }
            })
    }

    return (
        <div className={styles.modalSignIn}>
            <button className={styles.SignInCloseButton} onClick={props.closeModal}>
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
                        placeholder="Username"
                        id="signInUsername"
                        onChange={(e) => setSignInUsername(e.target.value)}
                        value={signInUsername}
                    />
                    <input
                        className={styles.modalInput}
                        type="password"
                        placeholder="Password"
                        id="signInPassword"
                        onChange={(e) => setSignInPassword(e.target.value)}
                        value={signInPassword}
                    />
                    <button className={styles.modalButton} onClick={() => handleConnection()}>Sign in</button>
                </div>
            </div>
        </div>
    );
}

export default SignIn;