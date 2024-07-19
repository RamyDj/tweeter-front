import styles from '../styles/Tweets.module.css';
import { useState } from 'react';

function Tweet({ onTweetPosted, username, firstname }) {
    const [tweetTyped, setTweetTyped] = useState('');

    const tweetClick = () => {
        fetch('http://localhost:3000/tweet/newTweet', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: tweetTyped, username, firstname })
        })
        .then(response => response.json())
        .then(() => {
            setTweetTyped('');
            if (onTweetPosted) onTweetPosted(); 
        })
        .catch(error => console.error('Erreur:', error));
    };

    return (
        <div className={styles.body}>
            <input
                type='text'
                placeholder="What's up?"
                className={styles.tweetInput}
                onChange={e => e.target.value.length < 281 && setTweetTyped(e.target.value)}
                value={tweetTyped}
            />
            <div className={styles.postInfosContainer}>
                <span className={styles.characterCount}>{tweetTyped.length}/280</span>
                <button type='button' className={styles.tweetButton} onClick={tweetClick}>Tweet</button>
            </div>
        </div>
    );
}

export default Tweet;
