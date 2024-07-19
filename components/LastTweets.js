import Image from 'next/image';
import styles from '../styles/LastTweets.module.css';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faTrash } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';

function LastTweets({ _id, firstname, username, message, createdAt, likedBy, onTweetDeleted }) {
    const userId = useSelector((state) => state.user.value.userId);
    const [liked, setLiked] = useState(likedBy.includes(userId));
    const formattedDate = moment(createdAt).fromNow();

    // Mettre les hashtags en bleu dans le tweet
    const words = message.split(' ');
    const coloredMessage = words.map((word, index) => (
        <span key={index} style={{ color: word.startsWith('#') ? '#2F9BF0' : 'inherit' }}>
            {word}{' '}
        </span>
    ));

    const handleLike = () => {
        fetch('http://localhost:3000/tweet/addLiker', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ tweetId: _id, userId })
        })
        .then(() => setLiked(true))
        .catch(error => console.error('Erreur:', error));
    };

    const handleUnlike = () => {
        fetch('http://localhost:3000/tweet/removeLiker', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ tweetId: _id, userId })
        })
        .then(() => setLiked(false))
        .catch(error => console.error('Erreur:', error));
    };

    const handleDelete = () => {
        fetch(`http://localhost:3000/tweet/deleteTweet/${_id}`, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(result => {
            
                if (onTweetDeleted) onTweetDeleted();
                alert('Tweet deleted successfully');
            
        })
        
    };

    return (
        <div className={styles.tweet}>
            <div className={styles.tweetHeader}>
                <Image src="/egg.jpg" alt="twitterEgg" width={50} height={50} className={styles.avatar} />
                <span className={styles.userDetails}>{firstname}</span>@{username} . {formattedDate}
            </div>
            <div className={styles.message}>{coloredMessage}</div>
            <div className={styles.tweetIcons}>
                <FontAwesomeIcon
                    icon={faHeart}
                    className={styles.like}
                    onClick={liked ? handleUnlike : handleLike}
                    style={{ cursor: 'pointer', color: liked ? 'red' : 'white' }}
                />
                <FontAwesomeIcon
                    icon={faTrash}
                    className={styles.delete}
                    onClick={handleDelete}
                    style={{ cursor: 'pointer' }}
                />
            </div>
        </div>
    );
}

export default LastTweets;
