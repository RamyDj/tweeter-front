import styles from '../styles/Home.module.css';
import Image from 'next/image';
import Tweet from './Tweet';
import LastTweets from './LastTweets';
import Trends from './Trends';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { logout } from '../reducers/user';

function Home() {
    const dispatch = useDispatch();
    const router = useRouter();
    const [tweets, setTweets] = useState([]);
    const user = useSelector((state) => state.user.value);

    useEffect(() => {
        if (!user.token) {
            router.push('/');
        } else {
            fetchTweets();
        }
    }, [router, user.token]);

    const fetchTweets = () => {
        fetch('http://localhost:3000/tweet')
            .then(response => response.json())
            .then(data => {
                setTweets(data.allTweet);
            })
           
    };

    const handleLogout = () => {
        dispatch(logout());
        router.push('/');
    };

    return (
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
                        <button className={styles.logButton} onClick={handleLogout}>Logout</button>
                    </div>
                </div>
            </div>
            <div className={styles.centralContainer}>
                <div className={styles.tweetContainer}>
                    <h2 className={styles.title}>Home</h2>
                    <Tweet onTweetPosted={fetchTweets} username={user.username} firstname={user.firstname} />
                </div>
                <div className={styles.lastTweetsContainer}>
                    <ul>
                        {tweets.map(tweet => (
                            <LastTweets
                                key={tweet._id}
                                _id={tweet._id}
                                firstname={tweet.firstname}
                                username={tweet.username}
                                message={tweet.message}
                                createdAt={tweet.createdAt}
                                likedBy={tweet.likedBy}
                                onTweetDeleted={fetchTweets}
                            />
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
    );
}

export default Home;
