import React, { useState, useEffect } from 'react';
import { dbService } from 'fbase';
import Tweet from 'components/Tweet';

const Home = ({ userObj }) => {
  const [tweet, setTweet] = useState('');
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    dbService.collection('tweets').onSnapshot((snapshot) => {
      const tweetArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setTweets(tweetArray);
    });
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.collection('tweets').add({
      text: tweet,
      createdAt: Date.now(),
      createdId: userObj.uid,
    });
    setTweet('');
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setTweet(value);
  };

  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;

    const theFile = files[0];
    // https://developer.mozilla.org/ko/docs/Web/API/FileReader
    const reader = new FileReader();
    reader.onloadstart = (finishEvent) => {
      console.log(finishEvent);
    };
    reader.readAsDataURL(theFile);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input value={tweet} onChange={onChange} type="text" placeholder="What`s on your mind?" maxLength={120}></input>
        <input type="file" accept="image/*" onChange={onFileChange} />
        <input type="submit" value="tweet" />
      </form>
      <div>
        {tweets.map((tomato) => (
          <Tweet key={tomato.id} tweetObj={tomato} isOwner={tomato.createdId === userObj.uid} />
        ))}
      </div>
    </div>
  );
};
export default Home;
