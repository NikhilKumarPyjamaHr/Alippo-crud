import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import { DELETE, EDIT, themeColors } from "../common/constants";
import styled from "styled-components";

interface TableProps {
  tableData: [];
  editOrDeleteData: (dataToEdit: {}, index: number, modalType: string) => void;
}

export const CustomIcon = styled(Button)`
  color: ${themeColors.mainPalete};
`;

const Table: React.FC<TableProps> = ({ tableData, editOrDeleteData }) => {
  return (
    <div className="container">
      <ul className="responsive-table">
        <li className="table-header">
          <div className="col col-1">Sl No.</div>
          <div className="col col-2">Name</div>
          <div className="col col-3">Age</div>
          <div className="col col-4">City</div>
          <div className="col col-5">Pin code</div>
          <div className="col col-6"></div>
        </li>

        {tableData &&
          tableData.map((data, index) => (
            <li className="table-row" key={index}>
              <div className="col col-1" data-label="Sl No.">
                {index + 1}
              </div>
              <div className="col col-2" data-label="Name">
                {data?.name}
              </div>
              <div className="col col-3" data-label="Age">
                {data?.age}
              </div>
              <div className="col col-4" data-label="City">
                {data?.city}
              </div>
              <div className="col col-5" data-label="City">
                {data?.pinCode}
              </div>
              <div className="col col-6" data-label="Actions">
                <Tooltip title={EDIT}>
                  <CustomIcon
                    onClick={() => editOrDeleteData(data, index, EDIT)}
                  >
                    <EditIcon />
                  </CustomIcon>
                </Tooltip>

                <Tooltip title={DELETE}>
                  <CustomIcon
                    onClick={() => editOrDeleteData(data, index, DELETE)}
                  >
                    <DeleteIcon />
                  </CustomIcon>
                </Tooltip>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Table;
