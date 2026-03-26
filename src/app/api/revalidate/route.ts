import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function POST(request: NextRequest) {
  // รับ secret จาก Query Parameter
  const secret = request.nextUrl.searchParams.get('secret');

  // ตรวจสอบ Secret Token เพื่อความปลอดภัย
  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
  }

  try {
    // สั่งให้ Next.js อัปเดต Cache ของหน้าแรกใหม่
    // ข้อมูลจะถูกดึงจาก Supabase อีกครั้งในเบื้องหลัง
    revalidatePath('/');
    
    // คุณสามารถระบุ path อื่นๆ ได้ตามต้องการ เช่น
    revalidatePath('/portfolio');
    revalidatePath('/project/[slug]', 'page');

    console.log('Successfully revalidated path /');
    return NextResponse.json({ 
      revalidated: true, 
      now: Date.now(),
      message: 'Revalidation successful for all main paths'
    });
  } catch (err) {
    console.error('Revalidation error:', err);
    return NextResponse.json({ message: 'Error revalidating' }, { status: 500 });
  }
}
