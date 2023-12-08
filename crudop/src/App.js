import { useEffect, useState } from "react";
import "./App.css";
import Table from "./components/Table.tsx";
import { connect } from "react-redux";
import { changeTableData, saveApiData } from "./store/actions/crudActions.js";
import Modal from "./components/Modal.tsx";
import { APIURL } from "./common/constants.js";

function App(props) {
  const apiUrl = APIURL;
  const [openModal, setOpenModal] = useState(false);
  const [dataChange, setDataChange] = useState({});
  const [captureIndex, setCaptureIndex] = useState();
  const [modalType, setModalType] = useState("");

  const editOrDeleteData = (dataToChange, index, type) => {
    handleOpen();
    setDataChange(dataToChange);
    setCaptureIndex(index);
    setModalType(type);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  const handleOpen = () => {
    setOpenModal(true);
  };

  useEffect(() => {
    const fetchApi = async () => {
      try {
        let apiData = await fetch(apiUrl);
        let jsonData = await apiData.json();
        props.saveApiData(jsonData);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchApi();
  }, []);

  return (
    <div className="App">
      <Modal
        modalType={modalType}
        open={openModal}
        handleClose={handleClose}
        dataChange={dataChange}
        captureIndex={captureIndex}
        tableData={props.tableData}
        changeTableData={(newData) => props.changeTableData(newData)}
      />

      <Table
        tableData={props.tableData}
        editOrDeleteData={(dataToChange, index, modalType) =>
          editOrDeleteData(dataToChange, index, modalType)
        }
      />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    tableData: state.crudReducer.tableData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveApiData: (payload) => dispatch(saveApiData(payload)),
    changeTableData: (payload) => dispatch(changeTableData(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
