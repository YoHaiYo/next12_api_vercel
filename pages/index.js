// pages/index.js
import React from "react";
const localhost = "http://localhost:3000";
const domain = "https://next12apivercel.vercel.app";

// 서버 측에서 데이터를 가져오는 함수.
export async function getServerSideProps() {
  const response = await fetch(`${domain}/api/hello`); // 배포된 URL에 맞게 수정
  const data = await response.json();

  return {
    props: {
      message: data.message,
    },
  };
}

const HomePage = ({ message }) => {
  return (
    <div>
      <h1>Next.js와 Vercel 연동하기</h1>
      <p>{message}</p>
    </div>
  );
};

export default HomePage;
