import PortfolioClient from "./portfolio-client";

export const metadata = {
  title: 'ผลงานทั้งหมด | FORMA BUILD',
  description: 'รวมผลงานการออกแบบและก่อสร้างที่เราภาคภูมิใจ ทุกโครงการสร้างด้วยมาตรฐานสูงสุด',
};

export default function PortfolioPage() {
  return <PortfolioClient />;
}
