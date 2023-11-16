/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable eqeqeq */
import { Component } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Axios from "axios";
import { Link } from "react-router-dom";
import "./BoardList.css";

const Board = ({
  employeeId,
  name,
  tel,
  mail,
  registerDate,
  props,
}: {
  employeeId: number;
  name: string;
  tel: string;
  mail: string;
  registerDate: string;
  props: any;
}) => {
  return (
    <tr style={{ backgroundColor: "rgb(255, 255, 255)" }}>
      <td style={{ width: "5%" }}>
        <input
          type="checkbox"
          value={employeeId}
          onChange={(e) => {
            props.onCheckboxChange(
              e.currentTarget.checked,
              e.currentTarget.value
            );
          }}
        ></input>
      </td>
      <td style={{ width: "10%" }}>{employeeId}</td>
      <td style={{ width: "20%" }}>{name}</td>
      <td style={{ width: "20%" }}>{tel}</td>
      <td style={{ width: "20%" }}>{mail}</td>
      <td style={{ width: "10%" }}>{registerDate}</td>
    </tr>
  );
};

interface IProps {
  isComplete: boolean;
  handleModify: any;
  renderComplete: any;
}

class BoardList extends Component<IProps> {
  constructor(props: any) {
    super(props);
    this.state = {
      boardList: [],
      checkList: [],
      updateFlag: false,
    };
  }

  state = {
    boardList: [],
    checkList: [],
    updateFlag: false,
  };

  getList = () => {
    Axios.get("/list", {})
      .then((res) => {
        const { data } = res;
        this.setState({
          boardList: data,
        });
      })
      .catch((e) => {
        console.error(e);
      });
  };

  onCheckboxChange = (checked: boolean, employeeId: any) => {
    const list: Array<string> = this.state.checkList.filter((v) => {
      return v != employeeId;
    });

    if (checked) {
      list.push(employeeId);
    }

    this.setState({
      checkList: list,
      updateFlag: true,
    });
  };

  handleDelete = () => {
    if (this.state.checkList.length == 0) {
      alert("삭제할 게시글을 선택하세요.");
      return;
    }

    let boardIdList = "";

    this.state.checkList.forEach((v: any) => {
      boardIdList += `'${v}',`;
    });

    Axios.post("http://localhost:8000/delete", {
      boardIdList: boardIdList.substring(0, boardIdList.length - 1),
    })
      .then((res) => {
        if (res) {
          this.getList();
        }
      })
      .catch((e) => {
        console.error(e);
      });
  };

  componentDidMount() {
    this.getList();
  }

  componentDidUpdate() {
    if (!this.props.isComplete) {
      this.getList();
    }
  }

  onLogout = () => {
    // sessionStorage 에 username 로 저장되어있는 아이템을 삭제한다.
    sessionStorage.removeItem("username");
    // App 으로 이동(새로고침)
    document.location.href = "/";
  };

  render() {
    const { boardList }: { boardList: any } = this.state;

    return (
      <div>
        <Table striped bordered hover>
          <thead className="boarder-list-title">
            <tr>
              <th>선택</th>
              <th>사원번호</th>
              <th>사원이름</th>
              <th>전화번호</th>
              <th>이메일</th>
              <th>작성일</th>
            </tr>
          </thead>
          <tbody>
            {
              // eslint-disable-next-line
              boardList.map((v: any) => {
                return (
                  <Board
                    employeeId={v.EMPLOYEE_ID}
                    name={v.EMPLOYEE_NM}
                    tel={v.TEL_NO}
                    mail={v.MAIN_ADDRESS}
                    registerDate={v.REGISTER_DATE}
                    key={v.EMPLOYEE_ID}
                    props={this}
                  />
                );
              })
            }
          </tbody>
        </Table>
        <Link to="/write">
          <Button className="write">글쓰기</Button>
        </Link>
        <Link
          key={this.state.checkList[0]}
          to={!this.state.updateFlag ? "" : `/edit/${this.state.checkList[0]}`}
          state={{ id: this.state.checkList[0] }}
        >
          <Button className="edit">수정하기</Button>
        </Link>
        <Button className="delete" onClick={this.handleDelete}>
          삭제하기
        </Button>
        <Button className="logout" onClick={this.onLogout}>
          로그아웃
        </Button>
      </div>
    );
  }
}

export default BoardList;
