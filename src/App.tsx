/* eslint-disable eqeqeq */
import { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import BoardList from "BoardList";
import Write from "Write";
import Edit from "Edit";
import { BrowserRouter, Routes, Route } from "react-router-dom";

/**
 * App class
 */
class App extends Component {
  state = {
    isModifyMode: false,
    isComplete: true,
    employeeId: 0,
  };

  /**
   * @param {any} checkList
   */
  handleModify = (checkList: any) => {
    if (checkList.length == 0) {
      alert("수정할 게시글을 선택하세요.");
    } else if (checkList.length > 1) {
      alert("하나의 게시글만 선택하세요.");
    }

    this.setState({
      isModifyMode: checkList.length == 1,
    });

    this.setState({
      employeeId: checkList[0] || 0,
    });
  };

  handleCancel = () => {
    this.setState({
      isModifyMode: false,
      isComplete: false,
      employeeId: 0,
    });
  };

  renderComplete = () => {
    this.setState({
      isComplete: true,
    });
  };

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <BoardList
                  isComplete={this.state.isComplete}
                  handleModify={this.handleModify}
                  renderComplete={this.renderComplete}
                ></BoardList>
              }
            ></Route>

            <Route
              path="/write"
              element={<Write handleCancel={this.handleCancel}></Write>}
            ></Route>

            <Route
              path="/edit/:id"
              element={
                <Edit
                  employeeId={this.state.employeeId}
                  handleCancel={this.handleCancel}
                />
              }
            ></Route>
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
