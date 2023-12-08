import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Button, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import styled from "styled-components";
import {
  CANCELBUTTON,
  DELETE,
  EDIT,
  SUBMITBUTTON,
  themeColors,
} from "../common/constants";

interface ModalProps {
  modalType: string;
  open: Boolean;
  dataChange: {};
  captureIndex: number;
  tableData: [];
  handleClose(): void;
  changeTableData(newData: []): void;
}

export const CustomDialogTitle = styled(DialogTitle)`
  text-align: left;
`;

export const CustomCloseIcon = styled(CloseIcon)`
  float: right;
  color: red;
  cursor: pointer;
`;

export const CustomButton = styled(Button)`
  width: ${(props) => (props.width ? `${props.width}px` : "auto")};
  background: ${themeColors.mainPalete};
  color: ${themeColors.secondaryPalete};
`;

export const CustomDiv = styled("div")`
  padding-top: 5%;
  display: flex;
  justify-content: flex-end;
`;

export const CustomTextField = styled(TextField)`
  width: 400px;
`;

const Modal: React.FC<ModalProps> = ({
  modalType,
  open,
  handleClose,
  dataChange,
  captureIndex,
  tableData,
  changeTableData,
}) => {
  const [formData, setFormData] = useState({
    name: "",
  });

  useEffect(() => {
    setFormData({
      name: dataChange?.name,
    });
  }, [dataChange]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const updateTableData = () => {
    const changedData = tableData.map((data, index) => {
      if (index == captureIndex) {
        let dataCopy = { ...data };
        dataCopy.name = formData.name;
        data = dataCopy;
      }
      return data;
    });
    changeTableData([...changedData]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateTableData();
    clearFields();
  };

  const handleDelete = () => {
    tableData.splice(captureIndex, 1);
    handleClose();
  };

  const clearFields = () => {
    setFormData({
      name: "",
    });
    handleClose();
  };
  if (modalType == EDIT) {
    return (
      <>
        <Dialog open={open} onClose={handleClose}>
          <CustomDialogTitle>
            {`Edit Name`}
            <CustomCloseIcon onClick={handleClose} />
          </CustomDialogTitle>
          <DialogContent>
            <form onSubmit={handleSubmit}>
              <CustomTextField
                label="Name"
                name="name"
                variant="outlined"
                fullWidth
                margin="normal"
                size="small"
                value={formData.name}
                onChange={handleInputChange}
                required
              />

              <CustomDiv>
                <CustomButton
                  variant="contained"
                  size="small"
                  onClick={handleClose}
                  width={100}
                >
                  {CANCELBUTTON}
                </CustomButton>
                &nbsp;
                <CustomButton
                  type="submit"
                  variant="contained"
                  size="small"
                  width={100}
                >
                  {SUBMITBUTTON}
                </CustomButton>
              </CustomDiv>
            </form>
          </DialogContent>
        </Dialog>
      </>
    );
  } else {
    return (
      <Dialog open={open} onClose={handleClose}>
        <CustomDialogTitle>
          {`Delete ${captureIndex + 1}`}
          <CustomCloseIcon onClick={handleClose} />
        </CustomDialogTitle>
        <DialogActions>
          <CustomButton
            variant="contained"
            size="small"
            onClick={handleClose}
            width={200}
          >
            {CANCELBUTTON}
          </CustomButton>

          <CustomButton
            variant="contained"
            size="small"
            width={200}
            onClick={handleDelete}
          >
            {DELETE}
          </CustomButton>
        </DialogActions>
      </Dialog>
    );
  }
};

export default Modal;
