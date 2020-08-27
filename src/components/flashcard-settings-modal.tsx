import React, { FC } from "react";
import {
  makeStyles,
  Theme,
  createStyles,
  Modal,
  Backdrop,
  Fade,
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
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      width: 600,
      maxWidth: "100%",
      border: "none",
    },
    fieldLabel: {
      paddingLeft: 10,
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
          <div className="field-select">
            <div className="front-select">
              <h2>Front</h2>
              {availableFields.map((field, i) => (
                <div key={i}>
                  <label>
                    <input
                      type="checkbox"
                      checked={front.includes(field)}
                      onClick={() => toggleSelected("front", field)}
                    />
                    <span className={classes.fieldLabel}>{field}</span>
                  </label>
                </div>
              ))}
            </div>
            <div className="back-select">
              <h2>Back</h2>
              {availableFields.map((field, i) => (
                <div key={i}>
                  <label>
                    <input
                      type="checkbox"
                      checked={back.includes(field)}
                      onClick={() => toggleSelected("back", field)}
                    />
                    <span className={classes.fieldLabel}>{field}</span>
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Fade>
    </Modal>
  );
};
