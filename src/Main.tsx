/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import BoardList from "BoardList";
import Write from "Write";
import Edit from "Edit";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function Main(props: { isLogin: any }) {
  const [isModifyMode, setIsModifyMode] = useState(false);
  const [isComplete, setIsComplete] = useState(true);
  const [employeeId, setEmployeeId] = useState(0);

  const handleModify = (checkList: any) => {
    if (checkList.length == 0) {
      alert("수정할 게시글을 선택하세요.");
    } else if (checkList.length > 1) {
      alert("하나의 게시글만 선택하세요.");
    }

    setIsModifyMode(checkList.length == 1);
    setEmployeeId(checkList[0] || 0);
  };

  const handleCancel = () => {
    setIsModifyMode(false);
    setIsComplete(false);
    setEmployeeId(0);
  };

  const renderComplete = () => {
    setIsComplete(true);
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <BoardList
                isComplete={isComplete}
                handleModify={handleModify}
                renderComplete={renderComplete}
              ></BoardList>
            }
          ></Route>

          <Route
            path="/write"
            element={<Write handleCancel={handleCancel}></Write>}
          ></Route>

          <Route
            path="/edit/:id"
            element={
              <Edit employeeId={employeeId} handleCancel={handleCancel} />
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Main;
