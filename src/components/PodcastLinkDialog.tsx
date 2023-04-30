import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Button,
  DialogActions,
  Paper,
  PaperProps,
} from "@mui/material";
import React from "react";
import Draggable from "react-draggable";

type Props = {
  podcastLink: string;
  handleClose: () => void;
  isOpen: boolean;
};

function PaperComponent(props: PaperProps) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

export default function PodcastLinkDialog({
  podcastLink,
  handleClose,
  isOpen,
}: Props) {
  console.log({ podcastLink });
  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      PaperComponent={PaperComponent}
      aria-labelledby="draggable-dialog-title"
    >
      <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
        Generated podcast link
      </DialogTitle>
      <DialogContent>
        <Button href={podcastLink}>{podcastLink}</Button>
        <DialogContentText></DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose}>
          Cancel
        </Button>
        <Button
          onClick={() => {
            navigator.clipboard.writeText(podcastLink);
            handleClose();
          }}
        >
          Copy link
        </Button>
      </DialogActions>
    </Dialog>
  );
}
