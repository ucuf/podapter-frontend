import React, { ChangeEvent, useState } from "react";
import { Button, Box } from "@mui/material";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";

export default function UploadContent() {
  const axiosPrivate = useAxiosPrivate();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/profile";

  const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
    }
  };

  const handleUpload = async () => {
    if (selectedFile) {
      console.log(selectedFile);
      const formData = new FormData();
      formData.append("file", selectedFile);

      try {
        const response = await axiosPrivate.post("/content/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        console.log("File uploaded successfully:", response.data);
        navigate(from, { replace: true });
      } catch (err) {
        console.error("Error uploading file:", err);
      }
      setSelectedFile(null);
    }
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <input
        accept=".pdf,.doc,.docx"
        id="contained-button-file"
        type="file"
        onChange={handleFileSelect}
        style={{ display: "none" }}
      />
      <label htmlFor="contained-button-file">
        <Button variant="contained" component="span">
          Select file
        </Button>
      </label>
      <Box sx={{ marginLeft: "10px" }}>
        {selectedFile && <span>{selectedFile.name}</span>}
      </Box>
      <Box sx={{ marginLeft: "auto" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleUpload}
          disabled={!selectedFile}
        >
          Upload
        </Button>
      </Box>
    </Box>
  );
}
