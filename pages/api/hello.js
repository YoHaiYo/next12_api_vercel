// pages/api/hello.js

export default function handler(req, res) {
  res
    .status(200)
    .json({ message: "안녕하세요! Vercel에서 보낸 메시지입니다!" });
}
