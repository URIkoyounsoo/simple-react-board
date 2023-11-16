/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
import { useState, useEffect } from "react";
import Axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

function Edit() {
  const location = useLocation();

  const employeeId = location.state.id;
  const [employeeName, setEmployeeName] = useState("");
  const [employeeTel, setEmployeeTel] = useState("");
  const [employeeMail, setEmployeeMail] = useState("");

  const getEmplpyee = () => {
    try {
      Axios.get("/edit", {
        params: {
          id: employeeId,
        },
      })
        .then((res) => {
          setEmployeeName(res.data[0].EMPLOYEE_NM);
          setEmployeeTel(res.data[0].TEL_NO);
          setEmployeeMail(res.data[0].MAIN_ADDRESS);
        })
        .catch((e) => {
          console.error(e);
        });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getEmplpyee();
  }, [employeeId]);

  const update = () => {
    Axios.post("/update", {
      id: employeeId,
      name: employeeName,
      tel: employeeTel,
      mail: employeeMail,
    })
      .then((res) => {
        console.log("res :", res);

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
        <h3 style={{ marginBottom: "30px" }}>편집 화면</h3>
        <p>----------------------------------------------------</p>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label style={{ fontWeight: "bold" }}>이름</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={employeeName || ""}
            onChange={(e) => setEmployeeName(e.target.value)}
            placeholder="이름을 입력하세요"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label style={{ fontWeight: "bold" }}>전화번호</Form.Label>
          <Form.Control
            as="textarea"
            name="tel"
            value={employeeTel || ""}
            onChange={(e) => setEmployeeTel(e.target.value)}
            placeholder="전화번호를 입력하세요"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label style={{ fontWeight: "bold" }}>메일</Form.Label>
          <Form.Control
            as="textarea"
            name="mail"
            value={employeeMail || ""}
            onChange={(e) => setEmployeeMail(e.target.value)}
            placeholder="내용을 입력하세요"
          />
        </Form.Group>
      </Form>
      <Button onClick={update} style={{ marginRight: "15px" }}>
        작성완료
      </Button>
      <Link to="/">
        <Button>취소</Button>
      </Link>
    </div>
  );
}

export default Edit;
