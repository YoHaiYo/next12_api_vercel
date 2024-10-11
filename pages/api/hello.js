// pages/api/hello.js
import fs from "fs";
import path from "path";

// 사용자 데이터를 저장할 JSON 파일 경로 (api 폴더 내)
const filePath = path.join(process.cwd(), "pages", "api", "users.json");

// 사용자 데이터를 읽어오는 함수
const readUsersFromFile = () => {
  const fileContent = fs.readFileSync(filePath, "utf8");
  return JSON.parse(fileContent).users;
};

// 사용자 데이터를 저장하는 함수
const saveUsersToFile = (users) => {
  fs.writeFileSync(filePath, JSON.stringify({ users }, null, 2), "utf8");
};

export default function handler(req, res) {
  // 사용자 목록 초기화
  let users = readUsersFromFile();

  // GET 요청 처리
  if (req.method === "GET") {
    res
      .status(200)
      .json({ message: "안녕하세요! Vercel에서 보낸 메시지입니다!", users });
  }

  // POST 요청 처리
  else if (req.method === "POST") {
    const { name } = req.body;
    users.push(name); // 배열에 사용자 추가
    saveUsersToFile(users); // 변경된 사용자 목록을 파일에 저장
    res.status(200).json({ message: `안녕하세요, ${name}님!` });
  }

  // PUT 요청 처리
  else if (req.method === "PUT") {
    const { oldName, newName } = req.body;
    const index = users.indexOf(oldName);
    if (index !== -1) {
      users[index] = newName; // 사용자 이름 수정
      saveUsersToFile(users); // 변경된 목록을 파일에 저장
      res
        .status(200)
        .json({ message: `${oldName}님이 ${newName}로 변경되었습니다!` });
    } else {
      res.status(404).json({ message: `${oldName}님을 찾을 수 없습니다.` });
    }
  }

  // DELETE 요청 처리
  else if (req.method === "DELETE") {
    const { name } = req.body;
    const index = users.indexOf(name);
    if (index !== -1) {
      users.splice(index, 1); // 사용자 삭제
      saveUsersToFile(users); // 변경된 목록을 파일에 저장
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
