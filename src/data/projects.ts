export interface Project {
  id: string;
  img: string;
  title: string;
  location: string;
  tag: string;
  category: string;
  year: string;
  area: string;
  duration: string;
  description: string;
  highlights: string[];
  gallery: string[];
}

export const projects: Project[] = [
  {
    id: 'ban-wongsawang',
    img: '/placeholder.svg',
    title: 'บ้านเดี่ยว วงศ์สว่าง',
    location: 'กรุงเทพฯ',
    tag: 'บ้านใหม่',
    category: 'บ้านใหม่',
    year: '2024',
    area: '320 ตร.ม.',
    duration: '8 เดือน',
    description: 'บ้านเดี่ยวสไตล์โมเดิร์นทรอปิคอล 2 ชั้น ออกแบบโดยคำนึงถึงการระบายอากาศตามธรรมชาติ ใช้วัสดุคุณภาพสูง ผสมผสานความอบอุ่นของไม้กับความแข็งแกร่งของคอนกรีตเปลือย เน้นพื้นที่ใช้สอยกว้างขวาง เชื่อมต่อกับสวนรอบบ้านอย่างลงตัว',
    highlights: ['โครงสร้างเหล็กทนทาน', 'ระบบ Smart Home', 'สระว่ายน้ำส่วนตัว', 'ระบบโซลาร์เซลล์'],
    gallery: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
  },
  {
    id: 'villa-pattaya',
    img: '/placeholder.svg',
    title: 'วิลล่า พัทยา',
    location: 'ชลบุรี',
    tag: 'บ้านใหม่',
    category: 'บ้านใหม่',
    year: '2023',
    area: '480 ตร.ม.',
    duration: '12 เดือน',
    description: 'วิลล่าหรูสไตล์คอนเทมโพรารี่ ริมหน้าผาวิวทะเล ออกแบบเพื่อรับลมทะเลและแสงธรรมชาติ ห้องนั่งเล่นแบบ double volume ผนังกระจกบานใหญ่เปิดมุมมองสู่ท้องทะเล',
    highlights: ['วิวทะเล 180°', 'Infinity Pool', 'ห้องครัว Chef-grade', 'ระบบรักษาความปลอดภัย'],
    gallery: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
  },
  {
    id: 'condo-sukhumvit',
    img: '/placeholder.svg',
    title: 'คอนโด สุขุมวิท 49',
    location: 'กรุงเทพฯ',
    tag: 'คอนโด',
    category: 'คอนโด',
    year: '2024',
    area: '85 ตร.ม.',
    duration: '3 เดือน',
    description: 'รีโนเวทคอนโดมิเนียมให้กลายเป็นพื้นที่อยู่อาศัยสไตล์ Japandi มินิมอล เน้นโทนสีอบอุ่น ใช้ไม้โอ๊คธรรมชาติ ออกแบบพื้นที่เก็บของอย่างชาญฉลาด ทุก ตร.ม. ถูกใช้ประโยชน์อย่างคุ้มค่า',
    highlights: ['Built-in ทั้งห้อง', 'ระบบไฟ Ambient', 'ครัวแบบเปิด', 'ห้องน้ำกระจกใส'],
    gallery: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
  },
  {
    id: 'extension-nonthaburi',
    img: '/placeholder.svg',
    title: 'ต่อเติมหลังบ้าน',
    location: 'นนทบุรี',
    tag: 'ต่อเติม',
    category: 'ต่อเติม',
    year: '2023',
    area: '60 ตร.ม.',
    duration: '2 เดือน',
    description: 'ต่อเติมพื้นที่ด้านหลังบ้านเดี่ยว เพิ่มห้องครัวขนาดใหญ่และห้องซักรีด เชื่อมต่อกับตัวบ้านเดิมอย่างกลมกลืน โครงสร้างออกแบบให้รับน้ำหนักของบ้านเดิมได้อย่างปลอดภัย',
    highlights: ['เชื่อมรอยต่อไร้รอย', 'หลังคากันความร้อน', 'ระบบระบายน้ำใหม่', 'พื้นกระเบื้องลายไม้'],
    gallery: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
  },
  {
    id: 'bathroom-renovation',
    img: '/placeholder.svg',
    title: 'รีโนเวทห้องน้ำ',
    location: 'กรุงเทพฯ',
    tag: 'รีโนเวท',
    category: 'รีโนเวท',
    year: '2024',
    area: '12 ตร.ม.',
    duration: '1 เดือน',
    description: 'รีโนเวทห้องน้ำแบบครบวงจร เปลี่ยนจากห้องน้ำเก่าให้กลายเป็น spa ส่วนตัวในบ้าน ใช้หินอ่อนธรรมชาติ สุขภัณฑ์นำเข้า ระบบ rain shower พร้อมระบบน้ำร้อนจากโซลาร์',
    highlights: ['หินอ่อนอิตาลี', 'Rain Shower', 'ระบบน้ำร้อนโซลาร์', 'กระจกนิรภัย'],
    gallery: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
  },
  {
    id: 'modern-kitchen',
    img: '/placeholder.svg',
    title: 'ครัวโมเดิร์น',
    location: 'เชียงใหม่',
    tag: 'รีโนเวท',
    category: 'รีโนเวท',
    year: '2023',
    area: '25 ตร.ม.',
    duration: '1.5 เดือน',
    description: 'ออกแบบและรีโนเวทห้องครัวใหม่ทั้งหมด สไตล์โมเดิร์นอินดัสเทรียล เคาน์เตอร์หินแกรนิตสีเข้ม ตู้ครัวไม้วอลนัท ระบบดูดควันแรงสูง พร้อมเกาะกลางสำหรับเตรียมอาหาร',
    highlights: ['เคาน์เตอร์หินแกรนิต', 'ตู้ครัว Soft-close', 'เกาะกลางครัว', 'ระบบดูดควันแรงสูง'],
    gallery: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
  },
];

export const filters = ['ทั้งหมด', 'บ้านใหม่', 'ต่อเติม', 'รีโนเวท', 'คอนโด'];
