import React, { useState } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import { IoCameraOutline, IoTrashOutline } from "react-icons/io5";
import { useLinks } from "../../context/link";

const ProfilePictureUploader: React.FC = () => {
  const [hover, setHover] = useState<boolean>(false);

  const { setValue, setAvatar, avatar } = useLinks();

  const resizeImage = (
    image: HTMLImageElement,
    maxWidth: number,
    maxHeight: number
  ) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    // Calculate the new dimensions while maintaining the aspect ratio
    let width = image.width;
    let height = image.height;

    if (width > height) {
      if (width > maxWidth) {
        height *= maxWidth / width;
        width = maxWidth;
      }
    } else {
      if (height > maxHeight) {
        width *= maxHeight / height;
        height = maxHeight;
      }
    }

    canvas.width = width;
    canvas.height = height;
    ctx?.drawImage(image, 0, 0, width, height);

    // Convert the resized image to base64
    return canvas.toDataURL("image/jpeg");
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      const validTypes = ["image/png", "image/jpeg"];
      if (!validTypes.includes(file.type)) {
        console.error("Invalid file type. Please upload a PNG or JPG image.");
        return;
      }

      // Validate and resize image
      const img = new Image();
      img.onload = () => {
        // Resize the image to a max of 1024x1024
        const resizedImage = resizeImage(img, 1024, 1024);

        // Create the payload with the resized image
        const jsonPayload = {
          filename: file.name,
          content: resizedImage.replace(/^data:image\/[a-z]+;base64,/, ""), // Image content without base64 prefix
          contentType: file.type,
        };

        setValue("avatar", jsonPayload);
        setAvatar(resizedImage); // Set the resized image as the avatar
      };

      img.src = URL.createObjectURL(file); // Load image to check dimensions
    }
  };

  const handleDeleteImage = () => {
    setAvatar(null);
    setValue("avatar", undefined);
  };

  return (
    <Box
      display="flex"
      flexDirection={{ xs: "column", sm: "row" }} // Adjust layout for mobile
      alignItems="center"
      justifyContent="space-between"
      padding={2}
      bgcolor="white"
      borderRadius={2}
      boxShadow={1}
      marginBlock={"20px"}
      sx={{ width: "100%", maxWidth: 600 }}
    >
      {/* Profile Picture Text */}
      <Typography
        variant="body1"
        fontWeight={400}
        color="textSecondary"
        sx={{
          textAlign: { xs: "center", sm: "left" },
          marginBottom: { xs: 1, sm: 0 },
        }}
      >
        Profile picture
      </Typography>

      {/* Upload Image Section */}
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        bgcolor="#F3F0FF"
        width={{ xs: "100%", sm: 200 }} // Full width on mobile
        height={{ xs: 200, sm: 200 }}
        borderRadius={2}
        textAlign="center"
        sx={{
          border: "2px dashed #A3A3A3",
          backgroundImage: avatar ? `url(${avatar})` : "none",
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
          "&:hover": {
            cursor: "pointer",
          },
        }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        {avatar && hover && (
          <IconButton
            onClick={handleDeleteImage}
            sx={{ position: "absolute", top: 10, right: 10 }}
            color="secondary"
          >
            <IoTrashOutline />
          </IconButton>
        )}
        <input
          accept="image/png, image/jpeg"
          style={{ display: "none" }}
          id="upload-button"
          type="file"
          onChange={handleImageUpload}
        />
        <label htmlFor="upload-button">
          <IconButton color="primary" component="span">
            <IoCameraOutline fontSize="large" />
          </IconButton>
          <Typography variant="body2" color="primary">
            + Upload Image
          </Typography>
        </label>
      </Box>

      {/* Image size information */}
      <Typography
        variant="body2"
        color="textSecondary"
        sx={{
          marginLeft: { sm: 2 },
          textAlign: { xs: "center", sm: "start" },
          fontSize: { xs: "0.75rem", sm: "1rem" },
        }} // Responsive text alignment and size
        style={{ color: "#737373" }}
      >
        Image must be below 1024x1024px. Use PNG or JPG format.
      </Typography>
    </Box>
  );
};

export default ProfilePictureUploader;
