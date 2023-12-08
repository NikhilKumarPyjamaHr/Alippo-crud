import { CHANGEAPIDATA, SAVEAPIDATA } from "../actions/crudActions";

const initialState = {
  tableData: [],
};
const crudReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVEAPIDATA:
      return { ...state, tableData: action.payload };
    case CHANGEAPIDATA:
      return { ...state, tableData: action.payload };
    default:
      return state;
  }
};

export default crudReducer;
