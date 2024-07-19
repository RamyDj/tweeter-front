import styles from '../styles/Home.module.css'
import Image from 'next/image'
import Tweet from './Tweet'
import LastTweets from './LastTweets'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Trends from './Trends';
import { useRouter } from 'next/router';


function Hashtag (){
    const [tweets, setTweets] = useState([]);
    
    useEffect(() => {
        fetch('http://localhost:3000/tweet') //a modifier avec route hasfrjffnjerfneir
            .then(response => response.json())
            .then(data => {console.log(data);
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
        </div>
        
    </div>
    <div className={styles.centralContainer}>
        <div className={styles.tweetContainer}>
            <h2 className={styles.title}>#hashtag</h2>
            <Tweet />
        </div>
        <div className={styles.lastTweetsContainer}>
        <ul>
                {tweets.map(tweet => (
                    <li key={tweet._id}>
                        <strong>{tweet.username}</strong>: {tweet.message}
                    </li>
                ))}
            </ul>
        </div>
    </div>
    <div className={styles.rightContainer}>
        <h2 className={styles.title}>Trends</h2>
        <div className={styles.TrendsContainer}>
            <Trends tweets={tweets} />
        </div>
    </div>

</div>
)
}

export default Hashtag