import styles from '../styles/Login.module.css';
import { useState, useEffect } from "react";
import { useRouter } from 'next/router';

function Login() {
  const [SignInModal, setSignInModal] = useState(false);
  const [SignUpModal, setSignUpModal] = useState(false);

  const router = useRouter();

  const opensignUpModal = () => {
    setSignUpModal(true);
    setSignInModal(false)
  };

  const closesignUpModal = () => {
    setSignUpModal(false);
  };

  const opensignInModal = () => {
    setSignUpModal(false);
    setSignInModal(true)
  };

  const closesignInModal = () => {
    setSignInModal(false)
  };
  return (
    <div>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>
      </main>
    </div>
  );
}

export default Login;
