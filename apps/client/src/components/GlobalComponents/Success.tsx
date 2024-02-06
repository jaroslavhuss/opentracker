import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideSuccess } from "../../store/gsms/successSlice";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { ISuccessGlobalState } from "../../store/store";
import RGGirl from "../../assets/rg-girl.png"
const Success: React.FC = ({}) => {
  const success = useSelector((state: ISuccessGlobalState) => {
    return state.success;
  });
  const dispatch = useDispatch();
  return (
    <div className="w-[300px] h-[200px] sticky bottom-0 right-0 m-8 rounded-lg shadow-2xl z-20">
     <img src={RGGirl} style={{width:200, height:200}} className="absolute -z-10 right-0 -top-44 mr-auto floating"/>
     <div className="bg-gradient-to-br from-rose-400  to-pink-600 p-2 rounded-lg shadow-lg text-white z-20">
       <div className="relative w-auto overflow-scroll h-[200px] z-20 ">
         <div className=" items-center grid grid-cols-3 p-2 z-20 ">
           <div className="col-span-2 text-center text-xs"></div>
           <div className="col-span-1 text-right items-end justify-self-end">
             <AiOutlineCloseCircle
               style={{ fontSize: 30, color: "black" }}
               onClick={() => {
                 dispatch(hideSuccess());
               }}
             />
           </div>
         </div>
 
         <div
           className="tooltip tooltip-closed tooltip-bottom w-full"
           data-tip={success.rawData.toString() || ""}
         >
           <p className="text-center w-full">{success.message}</p>
         </div>
       </div>
     </div>
    </div>
   
  );
};

export default Success;
