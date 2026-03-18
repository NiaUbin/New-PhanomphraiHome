import PortfolioClient from "./portfolio-client";

export const metadata = {
  title: 'ผลงานทั้งหมด | รวมงานออกแบบและก่อสร้าง',
  description: 'รวมผลงานการออกแบบและก่อสร้างที่เราภาคภูมิใจ ทุกโครงการสร้างด้วยมาตรฐานสูงสุด โดย PHANOMPHRAI PK',
};

export default function PortfolioPage() {
  return <PortfolioClient />;
}
