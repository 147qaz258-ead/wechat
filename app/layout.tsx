import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://wechat-editor.vercel.app'), // Replace with actual domain later if needed
  title: {
    default: "AI 微信公众号编辑器 - 一键排版工具",
    template: "%s | AI 微信编辑器"
  },
  description: "使用 AI 自动优化微信公众号文章排版。智能重写、自动配图、一键生成专业美观的文章布局。让写作更简单，排版更高效。",
  keywords: ["微信公众号编辑器", "AI排版", "公众号排版", "Markdown转微信", "自动排版工具"],
  openGraph: {
    title: "AI 微信公众号编辑器",
    description: "一键将枯燥文本转化为杂志级排版的公众号文章",
    url: 'https://wechat-editor.vercel.app',
    siteName: 'WeChat AI Editor',
    locale: 'zh_CN',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
