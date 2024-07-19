import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from '../styles/Trends.module.css'
import {useDispatch, useSelector} from 'react-redux'
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

    const hashtagsReducer = useSelector((state)=>state.hashtags.value)

    const hashtagClick = (hashtag)=> {
        fetch('http://localhost:3000/tweet/getByHashtag', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({hashtag: hashtag })
            })
            .then(response=> response.json())
            .then(datas=> {
            dispatch(setHashtags(datas));
            })
    }
    console.log(hashtags)
    //console.log(hashtagsReducer)

    const hashtagView = hashtags.map((hashtag, i) => (
        <li key={i} onClick={()=>hashtagClick('#test')}>{hashtag}</li>
    ));

    //onClick={()=>hashtagClick(hashtag)}

    const handleClickToHashtag = () =>{
        router.push("/hashtag")
    }
    
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