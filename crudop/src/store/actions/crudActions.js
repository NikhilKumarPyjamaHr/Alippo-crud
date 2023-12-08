export const SAVEAPIDATA = "SAVEAPIDATA";
export const CHANGEAPIDATA = "CHANGEAPIDATA";

export const saveApiData = (apiData) => ({
  type: SAVEAPIDATA,
  payload: apiData,
});

export const changeTableData = (newTableData) => ({
  type: CHANGEAPIDATA,
  payload: newTableData,
});
