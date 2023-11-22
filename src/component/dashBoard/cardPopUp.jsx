import React, { useState, useEffect } from "react";
import axios from "axios";
import "./cardPopUp.css";
import { useAuth } from "../utils/authContext";

export default function PopOutCard(props) {
  const [description, setDescription] = useState(props.card.description);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [updateModes, setUpdateModes] = useState({});
  const [checklist, setChecklist] = useState("");
  const { authToken, setAuthToken } = useAuth();

  const handleUpdateComment = async (commentId, newText) => {
    try {
      const response = await axios.put(
        `https://pro-go.onrender.com/api/comment/${commentId}/update`,
        {
          text: newText,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": authToken,
          },
        }
      );

      console.log("Comment updated successfully:", response.data.message);
      fetchComments();
      setUpdateModes((prevModes) => ({ ...prevModes, [commentId]: false }));
    } catch (error) {
      console.error("Error updating comment:", error.message);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await axios.get(
        `https://pro-go.onrender.com/api/comment/${props.card._id}`,
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": authToken,
          },
        }
      );

      console.log("Comments fetched successfully:", response.data.message);
      setComments(response.data.comments || []);
      console.log(response.data.comments);
    } catch (error) {
      console.error("Error fetching comments:", error.message);
    }
  };

  const handleAddDescription = async () => {
    try {
      const response = await axios.put(
        `https://pro-go.onrender.com/api/card/${props.card._id}/update`,
        {
          description: description,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": authToken,
          },
        }
      );

      console.log("Description added successfully:", response.data.message);
    } catch (error) {
      console.error("Error adding description:", error.message);
    }
  };

  const handleAddComment = async () => {
    try {
      const response = await axios.post(
        "https://pro-go.onrender.com/api/comment/add",
        {
          cardId: props.card._id,
          text: commentText,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": authToken,
          },
        }
      );

      console.log("Comment added successfully:", response.data.message);
      fetchComments();
      setComments([...comments, response.data.comment]);
    } catch (error) {
      console.error("Error adding comment:", error.message);
    }
  };
  const handleDeleteComment = async (commentId) => {
    try {
      const response = await axios.delete(
        `https://pro-go.onrender.com/api/comment/${commentId}/delete`,
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": authToken,
          },
        }
      );

      console.log("Comment deleted successfully:", response.data.message);
      fetchComments(); // Refresh comments after deletion
    } catch (error) {
      console.error("Error deleting comment:", error.message);
    }
  };
  const handleAddChecklist = async () => {
    // Implement logic to add checklist using Axios
  };

  const handleDeleteCard = async () => {
    // Implement logic to delete the card using Axios
  };

  useEffect(() => {
    fetchComments();
  }, []); // Fetch comments when the component mounts

  return (
    <div className="cardPopUpContainer">
      <div className="cardPopUpMain">
        <div className="cardPopContain">
          <h1>{props.card.name}</h1>
          <div className="description">
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <button className="add" onClick={handleAddDescription}>
              Add
            </button>
          </div>
          <div className="comment">
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
            <button className="add" onClick={handleAddComment}>
              Add
            </button>
            <ul>
              {comments.map((commentItem, index) => (
                <li key={index}>
                  {commentItem && commentItem.text}{" "}
                  {updateModes[commentItem?._id] ? (
                    <div>
                      <input
                        type="text"
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                      />
                      <button
                        onClick={() => handleDeleteComment(commentItem?._id)}
                      >
                        Delete
                      </button>
                      <button
                        onClick={() =>
                          handleUpdateComment(commentItem?._id, commentText)
                        }
                      >
                        Update
                      </button>
                    </div>
                  ) : (
                    <>
                      {commentItem && commentItem.text}
                      <button
                        onClick={() =>
                          setUpdateModes((prevModes) => ({
                            ...prevModes,
                            [commentItem?._id]: true,
                          }))
                        }
                      >
                        Update
                      </button>
                      <button
                        onClick={() => handleDeleteComment(commentItem?._id)}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div className="Checklist">
            <input
              type="text"
              value={checklist}
              onChange={(e) => setChecklist(e.target.value)}
            />
            <button className="add" onClick={handleAddChecklist}>
              Add
            </button>
          </div>
        </div>
        <div className="cardPopSidebar">
          <p onClick={handleAddChecklist}>Add Checklist</p>
          <p onClick={handleDeleteCard}>Delete Card</p>
          <p>Close</p>
        </div>
      </div>
    </div>
  );
}
