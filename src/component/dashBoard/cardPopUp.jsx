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
  const [selectedCommentId, setselectedCommentId] = useState("");
  const { authToken, setAuthToken } = useAuth();

  const [isupdateComment, setIsUpdatingComment] = useState(false);
  const handleUpdateComment = async (commentId) => {
    try {
      console.log("commentId", commentId);
      const response = await axios.put(
        `https://pro-go.onrender.com/api/comment/${commentId}/update`,
        {
          text: commentText,
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
      setIsUpdatingComment(false);
      setCommentText("");
      setUpdateModes((prevModes) => ({
        ...prevModes,
        [selectedCommentId]: false,
      }));
    } catch (error) {
      console.error("Error updating comment:", error);
      setIsUpdatingComment(false);
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
      setCommentText("");
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
      setComments(response.data.comments || []);
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
      fetchComments();
    } catch (error) {
      console.error("Error deleting comment:", error.message);
    }
  };
  const handleAddChecklist = async () => {
    // Implement logic to add checklist using Axios
  };

  const handleDeleteCard = async () => {
    try {
      const response = await axios.delete(
        `https://pro-go.onrender.com/api/card/${props.card._id}/delete`,
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": authToken,
          },
        }
      );

      console.log("Card deleted successfully:", response.data.message);
      props.onCardDelete(props.card._id);
      props.handleClose();
    } catch (error) {
      console.error("Error deleting card:", error.message);
    }
  };
  // const handleClose = () => {
  //   // Add logic to handle closing the PopOutCard
  //   // For example, you can set selectedCard to null or use a state variable to control visibility.
  //   setSelectedCard(null);
  // };

  useEffect(() => {
    fetchComments();
  }, []);
  function updateing(commentId) {
    setselectedCommentId(commentId);
    setIsUpdatingComment(true);
  }
  return (
    <div className="cardPopUpContainer">
      <div className="cardPopUpMain">
        <div className="cardPopContain">
          <h1>{props.card.name}</h1>

          <div className="heading">
            <h2>Description</h2>
            <button className="add" onClick={handleAddDescription}>
              Add
            </button>
          </div>
          <div className="description">
            <textarea
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="comment">
            <ul>
              {comments.map((commentItem, index) => (
                <li key={index}>
                  {console.log(commentItem)}
                  {commentItem && commentItem.text}{" "}
                  {isupdateComment ? (
                    <>
                      <div>
                        <button
                          onClick={() => handleDeleteComment(commentItem?._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <button onClick={() => updateing(commentItem._id)}>
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
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />

            {!isupdateComment ? (
              <button onClick={() => handleAddComment()}>add</button>
            ) : (
              <button onClick={() => handleUpdateComment(selectedCommentId)}>
                save
              </button>
            )}
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
          <p onClick={props.handleClose}>Close</p>
        </div>
      </div>
    </div>
  );
}
