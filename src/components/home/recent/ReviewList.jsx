import { Snackbar, Rating } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import { BiDotsVerticalRounded } from "react-icons/bi"; // Import the three-dot icon
import { TextField, Collapse, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from "@mui/material"; // Import Collapse, IconButton, and Dialog components
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../../../constants/const";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { fetchPropertiesStart, fetchPropertiesSuccess, fetchPropertiesFailure } from "../../../redux/slice/propertiesSlice";

const ReviewList = ({ review }) => {
  const { currentUser } = useSelector((state) => state.auth);
  const userId = currentUser.user.id;
  const token = currentUser.authorisation.token;
  const { id } = useParams();
  const dispatch = useDispatch();
  const [open, setOpen] = useState({});
  const [editMode, setEditMode] = useState({});
  const [editText, setEditText] = useState({});
  const [editRating, setEditRating] = useState({}); // State for edited rating
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [reviewToDelete, setReviewToDelete] = useState(null);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastSeverity, setToastSeverity] = useState("success");

  const propertiesLoading = useSelector((state) => state.properties.loading);

  const handleToggle = (reviewId) => {
    setOpen((prev) => ({ ...prev, [reviewId]: !prev[reviewId] }));
  };

  const toggleEditMode = (reviewId, initialText, initialRating) => {
    setEditMode((prev) => ({ ...prev, [reviewId]: !prev[reviewId] }));
    if (!editMode[reviewId]) {
      setEditText((prev) => ({ ...prev, [reviewId]: initialText }));
      setEditRating((prev) => ({ ...prev, [reviewId]: initialRating }));
    }
  };

  const handleEditTextChange = (event, reviewId) => {
    setEditText((prev) => ({ ...prev, [reviewId]: event.target.value }));
  };

  const handleRatingChange = (value, reviewId) => {
    setEditRating((prev) => ({ ...prev, [reviewId]: value }));
  };

  const handleUpdate = async (reviewId) => {
    try {
      const response = await axios.patch(
        `${BASE_URL}/properties/${id}/reviews/${reviewId}`,
        { review: editText[reviewId], rating: editRating[reviewId] }, // Include rating in the request body
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(response);
      dispatch(fetchPropertiesStart()); // Start loading state
      const updatedResponse = await axios.get(`${BASE_URL}/properties/${id}`);
      if (updatedResponse.status === 200) {
        dispatch(fetchPropertiesSuccess(updatedResponse.data)); // Update properties state
        setToastSeverity("success");
        setToastMessage("Review updated successfully.");
        setToastOpen(true);
      } else {
        throw new Error("Failed to fetch updated properties");
      }
      setEditMode((prev) => ({ ...prev, [reviewId]: false }));
    } catch (error) {
      console.error("Error updating review:", error);
      dispatch(fetchPropertiesFailure(error.message));
      setToastSeverity("error");
      setToastMessage("Failed to update review.");
      setToastOpen(true);
    }
  };

  const handleDeleteClick = (reviewId) => {
    setReviewToDelete(reviewId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      const response = await axios.delete(`${BASE_URL}/properties/${id}/reviews/${reviewToDelete}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response);
      dispatch(fetchPropertiesStart()); // Start loading state
      const updatedResponse = await axios.get(`${BASE_URL}/properties/${id}`);
      if (updatedResponse.status === 200) {
        dispatch(fetchPropertiesSuccess(updatedResponse.data)); // Update properties state
        setToastSeverity("success");
        setToastMessage("Review deleted successfully.");
        setToastOpen(true);
      } else {
        throw new Error("Failed to fetch updated properties");
      }
    } catch (error) {
      console.error("Error deleting review:", error);
      dispatch(fetchPropertiesFailure(error.message));
      setToastSeverity("error");
      setToastMessage("Failed to delete review.");
      setToastOpen(true);
    }
    setDeleteDialogOpen(false);
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
  };

  const handleCancelEdit = (reviewId) => {
    setEditMode((prev) => ({ ...prev, [reviewId]: false }));
  };

  const handleCloseToast = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setToastOpen(false);
  };
  return (
    <div>
      {review &&
        review.map((rev) => (
          <div key={rev.id} className="my-5 border-2 p-2 rounded-md">
            <div>
              <div className="flex justify-between my-2">
                <h5 className="font-semibold text-gray-600">{rev.reviewer.name}</h5>
                {rev.reviewer.id === userId && (
                  <div className="relative">
                    <IconButton onClick={() => handleToggle(rev.id)} className="text-lg">
                      <BiDotsVerticalRounded />
                    </IconButton>
                    <Collapse in={open[rev.id]} className="absolute right-0 bg-white border rounded shadow-lg">
                      <div className="flex flex-col gap-2 p-2">
                        {!editMode[rev.id] ? (
                          <FaRegEdit
                            className="font-bold cursor-pointer"
                            onClick={() => toggleEditMode(rev.id, rev.review)}
                          />
                        ) : (
                          <>
                            <Button onClick={() => handleCancelEdit(rev.id)} color="secondary">
                              Cancel
                            </Button>
                            <Button onClick={() => handleUpdate(rev.id)} color="primary">
                              Update
                            </Button>
                          </>
                        )}
                        <RiDeleteBin5Line
                          className="text-red-500 font-bold cursor-pointer"
                          onClick={() => handleDeleteClick(rev.id)}
                        />
                      </div>
                    </Collapse>
                  </div>
                )}
              </div>
              {!editMode[rev.id] ? (
                <>
                  <Rating name={`rating-${rev.id}`} value={rev.rating} readOnly />
                  <p className="text-justify font-light">{rev.review}</p>
                </>
              ) : (
                <div className="flex gap-3">
                  <TextField
                    required
                    id={`edit-review-${rev.id}`}
                    label="Edit Review"
                    className="w-full"
                    value={editText[rev.id] || ""}
                    onChange={(event) => handleEditTextChange(event, rev.id)}
                  />
                <TextField
                  required
                  label="Rating"
                  value={editRating[rev.id] || ""}
                  type="number"
                  onChange={(e) => handleRatingChange(e.target.value, rev.id)}
                />
                </div>  
              )}
            </div>
          </div>
        ))}
      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={handleDeleteCancel}>
        <DialogTitle>Delete Review</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this review?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Toast Notification */}
      <Snackbar open={toastOpen && !propertiesLoading} autoHideDuration={3000} onClose={handleCloseToast} anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
        <MuiAlert elevation={6} variant="filled" severity={toastSeverity} onClose={handleCloseToast}>
          {toastMessage}
        </MuiAlert>
      </Snackbar>
    </div>
  );
};

export default ReviewList;
