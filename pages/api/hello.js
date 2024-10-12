import fs from "fs";
import path from "path";
import fetch from "node-fetch"; // 추가된 부분

let users = []; // 사용자를 저장할 배열

// 서버 시작 시 users.json에서 사용자 목록 읽기 및 POST 요청으로 추가
const loadUsersFromFile = () => {
  const filePath = path.join(process.cwd(), "pages/api/users.json");
  const jsonData = fs.readFileSync(filePath);
  const data = JSON.parse(jsonData);
  users = data.users; // JSON 데이터에서 사용자 배열을 가져옴
};

// 초기 데이터 로드 및 POST 요청으로 추가
const initializeUsers = async () => {
  loadUsersFromFile();
  // 기본 메시지 출력
  console.log("서버 시작 시 사용자 목록 초기화:", users);

  // 사용자 목록을 POST 요청으로 추가
  for (const user of users) {
    await fetch(`${selectedHost}/api/hello`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: user }),
    });
  }
};

// 초기 데이터 로드
initializeUsers();

export default function handler(req, res) {
  // GET 요청 처리
  if (req.method === "GET") {
    res
      .status(200)
      .json({ message: "안녕하세요! Vercel에서 보낸 메시지입니다!", users });
  }

  // POST 요청 처리
  else if (req.method === "POST") {
    const { name } = req.body; // 요청 바디에서 name을 가져옴
    users.push(name); // 배열에 사용자 추가
    res.status(200).json({ message: `안녕하세요, ${name}님!` });
  }

  // PUT 요청 처리
  else if (req.method === "PUT") {
    const { oldName, newName } = req.body; // 요청 바디에서 oldName과 newName을 가져옴
    const index = users.indexOf(oldName);
    if (index !== -1) {
      users[index] = newName; // 사용자 이름 수정
      res
        .status(200)
        .json({ message: `${oldName}님이 ${newName}로 변경되었습니다!` });
    } else {
      res.status(404).json({ message: `${oldName}님을 찾을 수 없습니다.` });
    }
  }

  // DELETE 요청 처리
  else if (req.method === "DELETE") {
    const { name } = req.body; // 요청 바디에서 name을 가져옴
    const index = users.indexOf(name);
    if (index !== -1) {
      users.splice(index, 1); // 사용자 삭제
      res.status(200).json({ message: `${name}님이 삭제되었습니다!` });
    } else {
      res.status(404).json({ message: `${name}님을 찾을 수 없습니다.` });
    }
  }

  // 지원하지 않는 메서드에 대한 처리
  else {
    res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
