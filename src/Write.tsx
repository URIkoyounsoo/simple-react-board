/* eslint-disable eqeqeq */
import { Component } from "react";
import Axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

interface IProps {
  handleCancel: any;
}

class Write extends Component<IProps> {
  constructor(props: any) {
    super(props);
    this.state = {
      name: "",
      tel: "",
      isRendered: false,
    };
  }

  state = {
    name: "",
    tel: "",
    isRendered: false,
  };

  write = () => {
    Axios.post("/insert", {
      name: this.state.name,
      tel: this.state.tel,
    })
      .then((res) => {
        this.setState({
          name: "",
          tel: "",
        });
        this.props.handleCancel();
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
        <Button variant="info" onClick={this.write}>
          작성완료
        </Button>
        <Link to="/">
          <Button variant="secondary" onClick={this.props.handleCancel}>
            취소
          </Button>
        </Link>
      </div>
    );
  }
}

export default Write;
