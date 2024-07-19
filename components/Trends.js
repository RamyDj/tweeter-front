import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from '../styles/Trends.module.css'

function Trends(props) {
    const [hashtags, setHashtags] = useState([]);
    const router = useRouter()

    useEffect(() => {
        if (props.tweets.length > 0) {
            const allHashtags = props.tweets.map(tweet => tweet.hashtag);

            let flatHashtags = [];
            for (const hashtagsArray of allHashtags) {
                flatHashtags = flatHashtags.concat(hashtagsArray);
            }
            const uniqueHashtags = [...new Set(flatHashtags)];
            const filteredHashtags = uniqueHashtags.filter(hashtag => hashtag !== null);

            setHashtags(filteredHashtags);
        }
    }, [props.tweets]);


    console.log(props.tweets)

    const hashtagView = hashtags.map((hashtag, i) => (
        <li key={i} >{hashtag}</li>
    ));


    const handleClickToHashtag = () =>{
        router.push("/hashtag")
    }
    
//A faire => nombre de tweet par hashtag

    return (
        <div onClick={() => handleClickToHashtag()}>
            <div className={styles.hashtags}>{hashtagView}
                <span>Nb Tweets</span> 
            </div>
        </div>
    );
}

export default Trends;