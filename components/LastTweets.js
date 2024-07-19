import Image from 'next/image'
import styles from '../styles/LastTweets.module.css';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faTrash } from '@fortawesome/free-solid-svg-icons';

function LastTweets(props) {


    return (
        <div className={styles.tweet} >
            <div className={styles.tweetHeader} >
            <Image src="/egg.jpg" alt="twitterEgg" width={50} height={50} className={styles.avatar}/>
            <span className={styles.userDetails}>{props.firstname}</span>@{props.username} . {props.createdAt}
            </div>
            <div className={styles.message}>
        <p> {props.message} </p>
      </div>
      <div className={styles.tweetIcons}>
        <FontAwesomeIcon icon={faHeart} className={styles.like} />
        <FontAwesomeIcon icon={faTrash} className={styles.delete}/>
      </div>
        </div>
    );
}

export default LastTweets;