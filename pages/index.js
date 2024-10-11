// pages/index.js
import React, { useState } from "react";

const localhost = "http://localhost:3000";
const domain = "https://next12apivercel.vercel.app";
let selectedHost = localhost;

export async function getServerSideProps() {
  const response = await fetch(`${selectedHost}/api/hello`);
  const data = await response.json();

  return {
    props: {
      message: data.message,
      users: data.users || [], // 사용자 목록 추가
    },
  };
}

const HomePage = ({ message, users: initialUsers }) => {
  const [responseMessage, setResponseMessage] = useState("");
  const [addName, setAddName] = useState(""); // POST 요청을 위한 입력
  const [oldName, setOldName] = useState(""); // PUT 요청을 위한 수정할 이름
  const [newName, setNewName] = useState(""); // PUT 요청을 위한 새 이름
  const [deleteName, setDeleteName] = useState(""); // DELETE 요청을 위한 이름
  const [users, setUsers] = useState(initialUsers); // 초기 사용자 리스트 상태

  const handlePostRequest = async () => {
    const response = await fetch(`${selectedHost}/api/hello`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: addName }),
    });
    const data = await response.json();
    setResponseMessage(data.message);

    // 새로 추가된 사용자 이름을 리스트에 추가
    setUsers([...users, addName]);
    setAddName(""); // 입력 필드 초기화
  };

  const handlePutRequest = async () => {
    const response = await fetch(`${selectedHost}/api/hello`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ oldName, newName }), // 수정할 이름과 새 이름
    });
    const data = await response.json();
    setResponseMessage(data.message);

    // 사용자 이름 수정
    setUsers(users.map((user) => (user === oldName ? newName : user)));
    setOldName(""); // 입력 필드 초기화
    setNewName(""); // 입력 필드 초기화
  };

  const handleDeleteRequest = async () => {
    const response = await fetch(`${selectedHost}/api/hello`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: deleteName }), // 삭제할 이름
    });
    const data = await response.json();
    setResponseMessage(data.message);

    // 삭제된 사용자 이름을 리스트에서 제거
    setUsers(users.filter((user) => user !== deleteName));
    setDeleteName(""); // 입력 필드 초기화
  };

  return (
    <div>
      <h1>Next.js와 Vercel 연동하기</h1>
      <p>{message}</p>
      <h3>
        api주소 :{" "}
        <a
          href={`${selectedHost}/api/hello`}
          target="_blank"
        >{`${selectedHost}/api/hello`}</a>
      </h3>

      {/* POST 요청을 위한 입력 필드 */}
      <div>
        <h2>POST 요청</h2>
        <input
          type="text"
          placeholder="추가할 이름"
          value={addName}
          onChange={(e) => setAddName(e.target.value)}
        />
        <button onClick={handlePostRequest}>이름 추가</button>
      </div>

      {/* PUT 요청을 위한 입력 필드 */}
      <div>
        <h2>PUT 요청</h2>
        <input
          type="text"
          placeholder="수정할 이름"
          value={oldName}
          onChange={(e) => setOldName(e.target.value)}
        />
        <input
          type="text"
          placeholder="새 이름"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
        <button onClick={handlePutRequest}>이름 수정</button>
      </div>

      {/* DELETE 요청을 위한 입력 필드 */}
      <div>
        <h2>DELETE 요청</h2>
        <input
          type="text"
          placeholder="삭제할 이름"
          value={deleteName}
          onChange={(e) => setDeleteName(e.target.value)}
        />
        <button onClick={handleDeleteRequest}>이름 삭제</button>
      </div>

      {/* 사용자 리스트 표시 */}
      <h2>저장 리스트</h2>
      <ul>
        {users.length > 0 ? (
          users.map((user, index) => (
            <li key={index}>{user}</li> // 사용자 이름을 리스트로 표시
          ))
        ) : (
          <li>리스트가 없습니다.</li> // 사용자 목록이 없을 경우
        )}
      </ul>

      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
};

export default HomePage;
