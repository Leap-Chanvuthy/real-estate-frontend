import { RiDeleteBin5Line } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import { BiDotsVerticalRounded } from "react-icons/bi"; // Import the three-dot icon
import { TextField, Collapse, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from "@mui/material"; // Import Collapse, IconButton, and Dialog components
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../../../constants/const";
import { useParams } from "react-router-dom";
import { useState } from "react";

const ReviewList = ({ review }) => {
  const { currentUser } = useSelector((state) => state.auth);
  const username = currentUser.user.name;
  const token = currentUser.authorisation.token;
  const { id } = useParams();
  const [open, setOpen] = useState({}); // State to manage the open state of each collapsible menu
  const [editMode, setEditMode] = useState({}); // State to manage which review is in edit mode
  const [editText, setEditText] = useState({}); // State to manage the edited text
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false); // State to manage delete confirmation dialog
  const [reviewToDelete, setReviewToDelete] = useState(null); // State to store the review ID to delete

  const handleToggle = (reviewId) => {
    setOpen((prev) => ({ ...prev, [reviewId]: !prev[reviewId] }));
  };

  const toggleEditMode = (reviewId, initialText) => {
    setEditMode((prev) => ({ ...prev, [reviewId]: !prev[reviewId] }));
    if (!editMode[reviewId]) {
      // Enter edit mode, initialize with existing text
      setEditText((prev) => ({ ...prev, [reviewId]: initialText }));
    }
  };

  const handleEditTextChange = (event, reviewId) => {
    setEditText((prev) => ({ ...prev, [reviewId]: event.target.value }));
  };


  const handleUpdate = async (reviewId) => {
    try {
      const response = await axios.patch(
        `${BASE_URL}/properties/${id}/reviews/${reviewId}`,
        { review: editText[reviewId] },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(response);
      // Optionally: Handle success or fetch updated data
      setEditMode((prev) => ({ ...prev, [reviewId]: false }));
    } catch (error) {
      console.error("Error updating review:", error);
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
      // Optionally: Update state or fetch updated data after deletion
    } catch (error) {
      console.error("Error deleting review:", error);
    }
    setDeleteDialogOpen(false);
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
  };

  const handleCancelEdit = (reviewId) => {
    setEditMode((prev) => ({ ...prev, [reviewId]: false }));
  };

  return (
    <div>
      {review &&
        review.map((rev) => (
          <div key={rev.id} className="mx-10 my-5 border-2 p-2 rounded-md">
            <div>
              <div className="flex justify-between my-2">
                <h5 className="font-semibold text-gray-600">{rev.reviewer}</h5>
                {rev.reviewer === username && (
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
                            <Button onClick={() => handleUpdate(rev.id)} color="primary">
                              Update
                            </Button>
                            <Button onClick={() => handleCancelEdit(rev.id)} color="secondary">
                              Cancel
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
                <p className="text-justify font-light">{rev.review}</p>
              ) : (
                <TextField
                  required
                  id={`edit-review-${rev.id}`}
                  label="Edit Review"
                  className="w-full"
                  value={editText[rev.id] || ""}
                  onChange={(event) => handleEditTextChange(event, rev.id)}
                />
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
    </div>
  );
};

export default ReviewList;
