// pages/api/hello.js

export default function handler(req, res) {
  // GET 요청 처리
  if (req.method === "GET") {
    res
      .status(200)
      .json({ message: "안녕하세요! Vercel에서 보낸 메시지입니다!" });
  }

  // POST 요청 처리
  else if (req.method === "POST") {
    const { name } = req.body; // 요청 바디에서 name을 가져옴
    res.status(200).json({ message: `안녕하세요, ${name}님!` });
  }

  // 지원하지 않는 메서드에 대한 처리
  else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
