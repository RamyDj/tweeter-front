import styles from '../styles/Login.module.css';
import { useState } from "react";
import { useRouter } from 'next/router';
import Image from "next/image";
import SignUp from "./Signup";
import SignIn from "./SignIn";

function Login() {
  const [SignInModal, setSignInModal] = useState(false);
  const [SignUpModal, setSignUpModal] = useState(false);

  

  const openSignUpModal = () => {
    setSignUpModal(true);
    setSignInModal(false)
  };

  const closeSignUpModal = () => {
    setSignUpModal(false);
  };

  const openSignInModal = () => {
    setSignUpModal(false);
    setSignInModal(true)
  };

  const closeSignInModal = () => {
    setSignInModal(false)
  };
  return (
    <div className={styles.mainLoginPage}>

      <div className={styles.leftContent}>
        <div className={styles.logoContainer}>
          <Image src="/logoTwitterBlanc.png" alt="Logo Twitter" width={400} height={300} />
        </div>
      </div>

      <div className={styles.rightContent}>
        <div className={styles.rightLogo}>
          <Image src="/logoTwitterBlanc.png" alt="Logo Twitter" width={60} height={50} />
        </div>
        <div className={styles.rightTittle}>
          <h1>See what's <br />
            happening</h1>
          <h3>Join Hackatweet today.</h3>
        </div>
        <div className={styles.rightBtn}>
          <button className={styles.BtnUp} onClick={openSignUpModal}>Sign Up</button>
          {SignUpModal && (
            <SignUp closeModal={closeSignUpModal} />
          )}
          <p>Already have an account?</p>
          <button className={styles.BtnIn} onClick={openSignInModal}>Sign In</button>
          {SignInModal && (
            <div className={styles.modal}>
              <SignIn closeModal={closeSignInModal} />
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default Login;
