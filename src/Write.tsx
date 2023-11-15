/* eslint-disable eqeqeq */
import { useState } from "react";
import Axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

function Write() {
  const [employeeName, setEmployeeName] = useState("");
  const [employeeTel, setEmployeeTel] = useState("");
  const [employeeMail, setEmployeeMail] = useState("");

  const write = () => {
    Axios.post("/insert", {
      name: employeeName,
      tel: employeeTel,
      mail: employeeMail,
    })
      .then((res) => {
        setEmployeeName("");
        setEmployeeTel("");
        setEmployeeMail("");

        document.location.href = "/";
      })
      .catch((e) => {
        console.error(e);
      });
  };

  return (
    <div>
      <Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>이름</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={employeeName || ""}
            onChange={(e) => setEmployeeName(e.target.value)}
            placeholder="이름을 입력하세요"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>전화번호</Form.Label>
          <Form.Control
            as="textarea"
            name="tel"
            value={employeeTel || ""}
            onChange={(e) => setEmployeeTel(e.target.value)}
            placeholder="전화번호를 입력하세요"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>메일</Form.Label>
          <Form.Control
            as="textarea"
            name="mail"
            value={employeeMail || ""}
            onChange={(e) => setEmployeeMail(e.target.value)}
            placeholder="내용을 입력하세요"
          />
        </Form.Group>
      </Form>
      <Button variant="info" onClick={write}>
        작성완료
      </Button>
      <Link to="/">
        <Button variant="secondary">취소</Button>
      </Link>
    </div>
  );
}

export default Write;
