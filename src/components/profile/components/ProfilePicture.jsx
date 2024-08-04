import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserProfile } from '../../../redux/slice/authSlice';
import { Button, TextField, Avatar, CircularProgress, Snackbar , IconButton } from '@mui/material';
import { styled } from '@mui/system';
import { FaTimes } from 'react-icons/fa';


const ProfilePicture = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [openToast, setOpenToast] = useState(false);
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);
  const authorisation = currentUser?.authorisation;

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleAvatarClick = () => {
    document.getElementById('profilePictureInput').click();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append('profile_picture', selectedFile);

    setLoading(true);

    try {
      const response = await axios.post(
        'https://dev-realestate.cammob.ovh/api/profile/picture',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${authorisation.token}`,
          },
          onUploadProgress: (progressEvent) => {
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setUploadProgress(progress);
          },
        }
      );
      console.log('Upload successful:', response.data);
      dispatch(updateUserProfile({ authorisation: authorisation, user: response.data.data }));
      setOpenToast(true);
    } catch (error) {
      console.error('Error uploading file:', error);
    } finally {
      setLoading(false);
      setUploadProgress(0);
    }
  };

  const handleCloseToast = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenToast(false);
  };

  const Input = styled('input')({
    display: 'none',
  });

  return (
    <div className="profile-upload">
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <div className="flex items-center justify-center mb-4 relative" onClick={handleAvatarClick}>
          {preview ? (
            <Avatar src={preview} alt="Profile Preview" sx={{ width: 100, height: 100, cursor: 'pointer' }} />
          ) : (
            <Avatar src={currentUser?.profile_image || '/static/images/avatar/1.jpg'} sx={{ width: 100, height: 100, cursor: 'pointer' }} />
          )}
          {loading && (
            <CircularProgress
              variant="determinate"
              value={uploadProgress}
              size={100}
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                zIndex: 1,
                color: 'rgba(255, 255, 255, 0.5)',
              }}
            />
          )}
        </div>
        <Input
          id="profilePictureInput"
          type="file"
          onChange={handleFileChange}
          inputProps={{ accept: 'image/*' }}
        />
        <Button
          type="submit"
          variant="outlined"
          color="primary"
          disabled={loading}
          sx={{ marginTop: 2 }}
        >
          {loading ? <CircularProgress size={24} /> : 'Upload'}
        </Button>
        <Snackbar
          open={openToast}
          autoHideDuration={6000}
          onClose={handleCloseToast}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          message="Profile picture uploaded successfully!"
          action={
            <React.Fragment>
              <IconButton size="small" aria-label="close" color="inherit" onClick={handleCloseToast}>
                <FaTimes fontSize="small" />
              </IconButton>
            </React.Fragment>
          }
        />
      </form>
    </div>
  );
};

export default ProfilePicture;
