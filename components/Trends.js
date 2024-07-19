import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from '../styles/Trends.module.css'
import {useDispatch } from 'react-redux'
import {setHashtagList} from '../reducers/hashtags'

function Trends(props) {
    const [hashtags, setHashtags] = useState([]);
    const router = useRouter()
    const dispatch = useDispatch()

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


    const hashtagClick = (hashtag)=> {
        console.log(hashtag)
        fetch('http://localhost:3000/tweet/getByHashtag', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({hashtag: hashtag })
            })
            .then(response=> response.json())
            .then(datas=> {
            dispatch(setHashtagList(datas));
            router.push("/hashtag");
            })
    }
    //console.log(hashtags)

    const hashtagView = hashtags.map((hashtag, i) => (
        <li key={i} onClick={()=>hashtagClick(hashtag)}>{hashtag}</li>
    ));
    
//A faire => nombre de tweet par hashtag

    return (
        <div>
            <div className={styles.hashtags}>{hashtagView}
                <span>Nb Tweets</span> 
            </div>
        </div>
    );
}

export default Trends;