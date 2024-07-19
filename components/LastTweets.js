import Image from 'next/image'
import styles from '../styles/LastTweets.module.css';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faTrash } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';


function LastTweets(props) {
    const formattedDate = moment(props.createdAt).fromNow();
    // Mettre les hashtag ne bleu dans le tweet
    const words = props.message.split(' ');
    const coloredMessage = [];
    for (let i = 0; i < words.length; i++) {
        let wordStyle = {};
        if (words[i][0] === '#') {
            wordStyle = { 'color': '#2F9BF0' }
        }
        coloredMessage.push(<span key={i} style={wordStyle}>{words[i]} </span>)
    }

    return (
        <div className={styles.tweet} >
            <div className={styles.tweetHeader} >
                <Image src="/egg.jpg" alt="twitterEgg" width={50} height={50} className={styles.avatar} />
                <span className={styles.userDetails}>{props.firstname}</span>@{props.username} . {formattedDate}
            </div>
            <div className={styles.message}>
                {coloredMessage}
            </div>
            <div className={styles.tweetIcons}>
                <FontAwesomeIcon icon={faHeart} className={styles.like} />
                <FontAwesomeIcon icon={faTrash} className={styles.delete} />
            </div>
        </div>
    );
}

export default LastTweets;