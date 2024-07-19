import styles from '../styles/Tweets.module.css'
import {useState} from 'react'

function Tweet (props) {

    const [tweetTypped, setTweetTyped] = useState('')

    const tweetClick = () => {
       
        fetch('http://localhost:3000/tweet/newTweet',{
            method : 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({message : tweetTypped, username : props.username, firstname : props.firstname})
        })
        .then(response=>response.json())
        .then(data => console.log(data))
    }
    

    return (
        <div className={styles.body}>
            <input type='texte' placeholder="What's up?" className={styles.tweetInput} onChange={e=>e.target.value.length<281 && setTweetTyped(e.target.value)} value={tweetTypped}></input>
            <div className={styles.postInfosContainer}>
                <span className={styles.characterCount}>{tweetTypped.length}/280</span>
                <button type='button'className={styles.tweetButton} onClick={()=>tweetClick()}>Tweet</button>

            </div>
           
        </div>
    )
}

export default Tweet