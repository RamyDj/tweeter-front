import styles from '../styles/Hashtag.module.css'
import Image from 'next/image'
import Tweet from './Tweet'
import LastTweets from './LastTweets'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Trends from './Trends';
import { useRouter } from 'next/router';


function Hashtag (){
    let tweetToDisplay = useSelector((state)=>state.hashtags.value.datas.data)
    console.log(tweetToDisplay)
    let tweetsMapped = tweetToDisplay.map((e,i)=>{
        return <LastTweets {...e} key={i}/>
    })
let currentHashtag = useSelector((state)=>state.hashtags.value.hashtag)

const [tweets, setTweets] = useState([])

useEffect(()=>{
    const fetchTweets = () => {
        fetch('http://localhost:3000/tweet')
            .then(response => response.json())
            .then(data => {
                setTweets(data.allTweet);
            })
           
    }
}, [])

return(    
<div className={styles.body}>
    <div className={styles.leftContainer}>
        <div className={styles.tweeterLogoContainer}>
            <Image src='/logo.png' alt='Logo Twitter' layout='fill'/>
        </div>
        <div className={styles.userInfosContainer}>
            <div className={styles.userLogoContainer}>
                <Image src='/egg.jpg' alt='User logo' layout='fill' className={styles.userLogo}/>
            </div>
        </div>
        
    </div>
    <div className={styles.centralContainer}>
        <div className={styles.tweetContainer}>
            <h2 className={styles.title}>Hashtag</h2>
            <div className={styles.inputContainer}>
                <input type="text" className={styles.input} placeholder={currentHashtag}/>
            </div>
        </div>
        <div className={styles.lastTweetsContainer}>
            {tweetsMapped}
        </div>
    </div>
    <div className={styles.rightContainer}>
        <h2 className={styles.title}>Trends</h2>
        <div className={styles.TrendsContainer}>
        <Trends tweets={tweets} /> 
          
        </div>
    </div>

</div>
)
}

export default Hashtag