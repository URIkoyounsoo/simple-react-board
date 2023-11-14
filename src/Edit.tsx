/* eslint-disable eqeqeq */
import { Component } from "react";
import Axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

interface IProps {
  employeeId: number;
  handleCancel: any;
}

class Edit extends Component<IProps> {
  constructor(props: any) {
    super(props);
    this.state = {
      name: "",
      tel: "",
      mail: "",
    };
  }

  state = {
    name: "",
    tel: "",
    mail: "",
  };

  update = () => {
    Axios.post("/update", {
      name: this.state.name,
      tel: this.state.tel,
      id: this.props.employeeId,
    })
      .then((res) => {
        this.setState({
          name: "",
          tel: "",
          mail: "",
        });
        this.props.handleCancel();
      })
      .catch((e) => {
        console.error(e);
      });
  };

  detail = () => {
    Axios.post("/detail", {
      id: this.props.employeeId,
    })
      .then((res) => {
        if (res.data.length > 0) {
          this.setState({
            name: res.data[0].BOARD_TITLE,
            tel: res.data[0].BOARD_CONTENT,
          });
        }
      })
      .catch((e) => {
        console.error(e);
      });
  };

  // eslint-disable-next-line
  handleChange = (e: any) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  componentDidUpdate = (prevProps: any) => {
    if (this.props.employeeId != prevProps.employeeId) {
      this.detail();
    }
  };

  render() {
    return (
      <div>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>제목</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
              placeholder="제목을 입력하세요"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>내용</Form.Label>
            <Form.Control
              as="textarea"
              name="tel"
              value={this.state.tel}
              onChange={this.handleChange}
              placeholder="내용을 입력하세요"
            />
          </Form.Group>
        </Form>
        <Button variant="info" onClick={this.update}>
          작성완료
        </Button>
        <Button variant="secondary" onClick={this.props.handleCancel}>
          취소
        </Button>
      </div>
    );
  }
}

export default Edit;
