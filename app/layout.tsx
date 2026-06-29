import type { Metadata } from "next";
import "./globals.css"; // 🎯 衣服總連結，死死扣住

export const metadata: Metadata = {
  title: "堂筠命理 - 科技玄學預覽中樞",
  description: "Qimen Divination App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    /* 🌟 物理微調點：在 html 標籤上也強制加上 className="dark"，與 tailwind.config.js 的 darkMode: 'class' 完美卡死對齊！ */
    <html lang="zh-TW" className="dark">
      <body className="dark bg-[#050c26] text-white antialiased">
        {children}
      </body>
    </html>
  );
}
