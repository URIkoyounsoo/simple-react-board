import React, { useState } from "react";
import Axios from "axios";
import "./Login.css";

function Login() {
  const [inputId, setInputId] = useState("");
  const [inputPw, setInputPw] = useState("");

  // input data 의 변화가 있을 때마다 value 값을 변경해서 useState 해준다
  const handleInputId = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setInputId(e.target.value);
  };

  const handleInputPw = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setInputPw(e.target.value);
  };

  // login 버튼 클릭 이벤트
  const onClickLogin = () => {
    Axios.post("/onLogin", {
      username: inputId,
      password: inputPw,
    })
      .then((res) => {
        console.log("res", res);
        if (res.data[0].username === undefined) {
          // id 일치하지 않는 경우 username = undefined, msg = '입력하신 id 가 일치하지 않습니다.'
          console.log("res.data[0].username", res.data[0].username);
          alert("입력하신 id 가 일치하지 않습니다.");
        } else if (res.data[0].username === null) {
          // id는 있지만, pw 는 다른 경우 username = null , msg = undefined
          alert("입력하신 비밀번호 가 일치하지 않습니다.");
        } else if (res.data[0].username === inputId) {
          // id, pw 모두 일치 username = userId1, msg = undefined
          sessionStorage.setItem("username", inputId);
        }
        // 작업 완료 되면 페이지 이동(새로고침)
        document.location.href = "/";
      })
      .catch((e) => {
        console.error(e);
      });
  };

  return (
    <div className="background">
      <h2>Login</h2>
      <div className="id">
        <label htmlFor="input_id">ID : </label>
        <input
          className="id-input"
          type="text"
          name="input_id"
          value={inputId}
          onChange={handleInputId}
        />
      </div>
      <div className="pw">
        <label htmlFor="input_pw">PW : </label>
        <input
          className="pw-input"
          type="password"
          name="input_pw"
          value={inputPw}
          onChange={handleInputPw}
        />
      </div>
      <div>
        <button className="btn" type="button" onClick={onClickLogin}>
          로그인
        </button>
      </div>
    </div>
  );
}

export default Login;
