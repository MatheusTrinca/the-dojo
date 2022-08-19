import { Timestamp } from 'firebase/firestore';
import React, { useState } from 'react';
import Avatar from '../../components/avatar/Avatar';
import { useAuthContext } from '../../contexts/AuthContext';
import { useFirebase } from '../../hooks/useFirebase';
import { formatDistanceToNow } from 'date-fns';

const ProjectComments = ({ project }) => {
  const [newComment, setNewComment] = useState('');
  const { updateDocument, response } = useFirebase('projects');
  const { user } = useAuthContext();

  const handleSubmit = async e => {
    e.preventDefault();
    const commentToAdd = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      content: newComment,
      createdAt: Timestamp.fromDate(new Date()),
      id: Math.random(),
    };
    await updateDocument(project.id, {
      comments: [...project.comments, commentToAdd],
    });
    if (!response.error) {
      setNewComment('');
    }
  };

  return (
    <div className="project-comments">
      <h4>Project Comments</h4>
      <ul>
        {project.comments.length > 0 &&
          project.comments.map(comment => (
            <li key={comment.id}>
              <div className="comment-author">
                <Avatar src={comment.photoURL} />
                <p>{comment.displayName}</p>
              </div>
              <div className="comment-date">
                <p>
                  {formatDistanceToNow(comment.createdAt.toDate(), {
                    addSuffix: true,
                  })}
                </p>
              </div>
              <div className="comment-content">
                <p>{comment.content}</p>
              </div>
            </li>
          ))}
      </ul>
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
