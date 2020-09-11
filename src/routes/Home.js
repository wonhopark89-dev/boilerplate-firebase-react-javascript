import React, { useState, useEffect } from 'react';
import { dbService, storageService } from 'fbase';
import Tweet from 'components/Tweet';
import { v4 as uuidv4 } from 'uuid';

const Home = ({ userObj }) => {
  const [tweet, setTweet] = useState('');
  const [tweets, setTweets] = useState([]);
  const [attachment, setAttachment] = useState();

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
    // 스토리지 분기시작을 유저의 ID 로 구별하고, 이름은 랜덤하게
    const fileRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`);
    // onFileChange 에서 DATA_URL 포맷으로 저장하는 걸 맞춰줌
    const response = await fileRef.putString(attachment, 'data_url');
    // await dbService.collection('tweets').add({
    //   text: tweet,
    //   createdAt: Date.now(),
    //   createdId: userObj.uid,
    // });
    // setTweet('');
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
    // 이미지 가져오기
    reader.onloadend = (finishEvent) => {
      const {
        currentTarget: { result },
      } = finishEvent;

      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  };

  const onClearAttachment = () => setAttachment(null);

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input value={tweet} onChange={onChange} type="text" placeholder="What`s on your mind?" maxLength={120}></input>
        <input type="file" accept="image/*" onChange={onFileChange} />
        <input type="submit" value="tweet" />
        {attachment && (
          <div>
            <img src={attachment} width="50px" height="50px" />
            <button onClick={onClearAttachment}>Clear</button>
          </div>
        )}
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
