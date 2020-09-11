import React, { useState } from 'react';
import { dbService } from 'fbase';

const Tweet = ({ tweetObj, isOwner }) => {
  // tweet 내용 삭제 및 변경
  const [editing, setEditing] = useState(false);
  const [newTweet, setNewTweet] = useState(tweetObj.text);

  const onDeleteClick = async () => {
    const isOk = window.confirm('Are you sure you want to delete this tweet ?');
    if (isOk) {
      // https://firebase.google.com/docs/firestore/manage-data/delete-data#top_of_page
      // console.log(tweetObj);
      await dbService.doc(`tweets/${tweetObj.id}`).delete(); // collection id, 앞에서 넣어줬기 때문
    }
  };

  const toggleEditing = () => setEditing((prev) => !prev);
  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.doc(`tweets/${tweetObj.id}`).update({
      text: newTweet,
    });
    setEditing(false);
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event; // same as event.target.value
    setNewTweet(value);
  };

  return (
    <div>
      {editing ? (
        <>
          <form onSubmit={onSubmit}>
            <input type="text" placeholder="Edit your tweet" value={newTweet} required onChange={onChange} />
            <input type="submit" value="Update Nweet"></input>
            <button onClick={toggleEditing}>Cancel</button>
          </form>
        </>
      ) : (
        <>
          <h4>{tweetObj.text}</h4>
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>Delete Tweet</button>
              <button onClick={toggleEditing}>Edit Tweet</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Tweet;
