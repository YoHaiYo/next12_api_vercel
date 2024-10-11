// pages/index.js
import React, { useState } from "react";

const localhost = "http://localhost:3000";
const domain = "https://next12apivercel.vercel.app";
let selectedHost = domain;

export async function getServerSideProps() {
  const response = await fetch(`${selectedHost}/api/hello`);
  const data = await response.json();

  return {
    props: {
      message: data.message,
    },
  };
}

const HomePage = ({ message }) => {
  const [responseMessage, setResponseMessage] = useState("");
  const [name, setName] = useState(""); // 이름 상태 추가

  const handlePostRequest = async () => {
    const response = await fetch(`${selectedHost}/api/hello`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }), // 요청 바디에 입력한 이름 추가
    });
    const data = await response.json();
    setResponseMessage(data.message); // API 응답 메시지 상태 업데이트
  };

  return (
    <div>
      <h1>Next.js와 Vercel 연동하기</h1>
      <p>{message}</p>
      {/* 사용자 입력 필드 추가 */}
      <input
        type="text"
        placeholder="이름을 입력하세요"
        value={name}
        onChange={(e) => setName(e.target.value)} // 입력 필드 변화에 따라 상태 업데이트
      />
      <button onClick={handlePostRequest}>POST 요청 보내기</button>
      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
};

export default HomePage;
