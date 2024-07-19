import styles from '../styles/Home.module.css'
import Image from 'next/image'
import Tweet from './Tweet'
import LastTweets from './LastTweets'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Trends from './Trends';
import { useRouter } from "next/router";
import { logout } from "../reducers/user";

function Home (){

    
    const dispatch = useDispatch();
    const router = useRouter()
    const [tweets, setTweets] = useState([]);
    const user = useSelector((state) => state.user.value);
    console.log(user);
// affichage des tweet de la bdd et une restriction si pas token renvoi a login
    useEffect(() => {
        if (!user.token) {
            router.push("/");
        }
    
        fetch('http://localhost:3000/tweet')
            .then(response => response.json())
            .then(data => {
                setTweets(data.allTweet); 
                
            })
    }, [router]);

    const handleLogout = () => {
        dispatch(logout());
        router.push("/");
    };

return(    
<div className={styles.body}>
    <div className={styles.leftContainer}>
        <div className={styles.tweeterLogoContainer}>
            <Image src='/logo.png' alt='Logo Twitter' layout='fill'/>
        </div>
        <div className={styles.userContainer}>
        <div className={styles.userInfosContainer}>
            <div className={styles.userLogoContainer}>
                <Image src='/egg.jpg' alt='User logo' layout='fill' className={styles.userLogo}/>
            </div>
            <div className={styles.userDetails}>
                        <p className={styles.firstname}>{user.firstname}</p>
                        <p className={styles.username}>@{user.username}</p>
                    </div>
                    </div>
                    <div className={styles.logout}>
        <button className={styles.logButton} onClick={()=>handleLogout()}>Logout</button>
        </div>
        
        </div>
       
        
    </div>
    <div className={styles.centralContainer}>
        <div className={styles.tweetContainer}>
            <h2 className={styles.title}>Home</h2>
            <Tweet 
            username={user.username}
            firstname={user.firstname} />
        </div>
        <div className={styles.lastTweetsContainer}>
        <ul>
                {tweets.map(tweet => (
                     <LastTweets 
                     key={tweet._id}
                     firstname={tweet.firstname}
                     username={tweet.username}
                     message={tweet.message}
                     createdAt={tweet.createdAt}
                 />
                ))}
            </ul>
        </div>
    </div>
    <div className={styles.rightContainer}>
        <h2 className={styles.title}>Trends</h2>
       <div TrendsContainer>
       <Trends tweets={tweets} /> 
        </div>
    </div>

</div>
)
}

export default Home