import { Timestamp } from 'firebase/firestore';
import React, { useState } from 'react';
import { useAuthContext } from '../../contexts/AuthContext';

const ProjectComments = () => {
  const [newComment, setNewComment] = useState('');

  const { user } = useAuthContext();

  const handleSubmit = e => {
    e.preventDefault();
    const commentToAdd = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      content: newComment,
      createdAt: Timestamp.fromDate(new Date()),
      id: Math.random(),
    };
    console.log(commentToAdd);
  };

  return (
    <div className="project-comments">
      <h4>Project Comments</h4>
      <form onSubmit={handleSubmit} className="add-comment">
        <label>
          <span>Add new comment:</span>
          <textarea
            required
            value={newComment}
            onChange={e => setNewComment(e.target.value)}
          ></textarea>
        </label>
        <button className="btn">Add Comment</button>
      </form>
    </div>
  );
};

export default ProjectComments;
