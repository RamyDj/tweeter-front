import styles from '../styles/Tweets.module.css'
import {useState} from 'react'

function Tweet () {

    const [tweetTypped, setTweetTyped] = useState('')
    

    return (
        <div className={styles.body}>
            <input type='texte' placeholder="What's up?" className={styles.tweetInput} onChange={e=>setTweetTyped(e.target.value)} value={tweetTypped}></input>
            <div className={styles.postInfosContainer}>
                <span className={styles.characterCount}>{tweetTypped.length}/280</span>
                <button className={styles.tweetButton}>Tweet</button>

            </div>
           
        </div>
    )
}

export default Tweet