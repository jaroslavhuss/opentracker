import MainLayout from "../components/Layouts/MainLayout";
import { BsFiletypeJson } from "react-icons/bs";
import { getAllPatients } from "../APIs/Patients";
import { useState } from "react";

const Export = () => {
  const [data, setData] = useState("");

  const dataExport = async () => {
    const data = await getAllPatients();
    setData(JSON.stringify(data));
  };

  const [btnName, setBtnName] = useState("Zkopírovat do schránky");

  const dataClipboard = () => {
    navigator.clipboard.writeText(data);
    setBtnName("Zkopírováno!");

    setTimeout(() => {
      setBtnName("Zkopírovat do schránky");
    }, 2000);
  };
  return (
    <MainLayout>
      <h1 className="text-center text-2xl py-2 my-2">Export dat</h1>
      <p className="text-center">
        Data se v současné době exportují ve formátu JSON, který lze snadno
        převést do CSV či jiného formátu
      </p>

      <div className="mx-auto text-center mt-5">
        <span className="btn btn-success " onClick={dataExport}>
          Exportovat data do formátu JSON <BsFiletypeJson />
        </span>
        {data.length > 0 && (
          <span className="btn btn-primary ml-2" onClick={dataClipboard}>
            {btnName}
          </span>
        )}
      </div>
      {data.length > 0 && (
        <div className="mt-5">
          <textarea
            className="w-full h-96 overflow-y-scroll"
            value={data}
            onChange={(e) => setData(e.target.value)}
          ></textarea>
        </div>
      )}
    </MainLayout>
  );
};

export default Export;
