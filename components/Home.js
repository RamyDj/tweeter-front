import styles from '../styles/Home.module.css'
import Image from 'next/image'
import Tweet from './Tweet'
import LastTweets from './LastTweets'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Trends from './Trends';

function Home (){
    const [tweets, setTweets] = useState([]);
    const user = useSelector((state) => state.user.value);
    console.log(user);
    useEffect(() => {
        fetch('http://localhost:3000/tweet')
            .then(response => response.json())
            .then(data => {
                setTweets(data.allTweet); 
                
            })
    }, []);

return(    
<div className={styles.body}>
    <div className={styles.leftContainer}>
        <div className={styles.tweeterLogoContainer}>
            <Image src='/logo.png' alt='Logo Twitter' layout='fill'/>
        </div>
        <div className={styles.userInfosContainer}>
            <div className={styles.userLogoContainer}>
                <Image src='/egg.jpg' alt='User logo' layout='fill' className={styles.userLogo}/>
            </div>
            <div className={styles.userDetails}>
                        <p>{user.firstname}</p>
                        <p>@{user.username}</p>
                    </div>
        </div>
        
    </div>
    <div className={styles.centralContainer}>
        <div className={styles.tweetContainer}>
            <h2 className={styles.title}>Home</h2>
            <Tweet />
        </div>
        <div className={styles.lastTweetsContainer}>
        <ul>
                {tweets.map(tweet => (
                     <LastTweets 
                     key={tweet._id}
                     firstname={user.firstname}
                     username={user.username}
                     message={tweet.message}
                     createdAt={new Date(tweet.createdAt).toLocaleString()}
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