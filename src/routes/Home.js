import React, { useState, useEffect } from 'react';
import { dbService } from 'fbase';

const Home = () => {
  const [tweet, setTweet] = useState('');
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    getTweets();
  }, []);

  const getTweets = async () => {
    const dbTweets = await dbService.collection('tweets').get(); // tweets 이름의 컬렉션을 가지고옴
    dbTweets.forEach((document) => {
      const tweetObject = {
        ...document.data(),
        id: document.id,
      };
      setTweets((prev) => [tweetObject, ...prev]);
    });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.collection('tweets').add({
      tweet,
      createdAt: Date.now(),
    });
    setTweet('');
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setTweet(value);
  };

  console.log(tweets);

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={tweet}
          onChange={onChange}
          type="text"
          placeholder="What`s on your mind?"
          maxLength={120}
        ></input>
        <input type="submit" value="tweet" />
      </form>
      <div>
        {tweets.map((tomato) => (
          <div key={tomato.id}>
            <h4>{tomato.tweet}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Home;
