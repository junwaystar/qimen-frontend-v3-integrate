/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',       // 強制純靜態導出
  trailingSlash: true,    // 🌟 物理關鍵：解決 Cloudflare 尋找靜態資產與 CSS 衣服的 Bug
  images: {
    unoptimized: true,    // 瓦解圖片優化造成的編譯當機
  },
};

export default nextConfig;
