import React, { FC } from "react";
import {
  makeStyles,
  Theme,
  createStyles,
  Modal,
  Backdrop,
  Fade,
  Button,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";

interface SettingsModalProps {
  availableFields: string[];
  front: string[];
  back: string[];
  show: boolean;
  toggleSelected: (side: "front" | "back", field: string) => void;
  onDismiss: () => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      border: "none",
      maxHeight: "100vh",
      overflow: "hidden",
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(5, 4, 5),
      width: 400,
      maxWidth: "100%",
      border: "none",
      display: "flex",
      flexDirection: "column",
      maxHeight: "100vh",
      overflow: "auto",
    },
    fieldLabel: {
      paddingLeft: 10,
    },
    fieldSelect: {
      margin: theme.spacing(0, 0, 4),
    },
  })
);

export const FlashcardSettingsModal: FC<SettingsModalProps> = ({
  availableFields,
  front,
  back,
  show,
  toggleSelected,
  onDismiss,
}) => {
  const classes = useStyles();
  return (
    <Modal
      open={show}
      className={classes.modal}
      onClose={() => onDismiss()}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={show}>
        <div className={classes.paper}>
          <div className={classes.fieldSelect}>
            <div className="front-select">
              <h2>Front</h2>
              {availableFields.map((field, i) => (
                <div key={i}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={front.includes(field)}
                        onChange={() => toggleSelected("front", field)}
                        name={"checked-front-" + field}
                      />
                    }
                    label={field}
                  />
                </div>
              ))}
            </div>
            <div className="back-select">
              <h2>Back</h2>
              {availableFields.map((field, i) => (
                <div key={i}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={back.includes(field)}
                        onChange={() => toggleSelected("back", field)}
                        name={"checked-back-" + field}
                      />
                    }
                    label={field}
                  />
                </div>
              ))}
            </div>
          </div>
          <Button
            variant="contained"
            color="primary"
            disableElevation
            onClick={() => onDismiss()}
          >
            Done
          </Button>
        </div>
      </Fade>
    </Modal>
  );
};
