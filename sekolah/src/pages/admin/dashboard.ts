// Asumsi ada lib/supabase.ts untuk query
import { supabase } from '../../../lib/supabase';

async function loadDashboardData() {
	const today = new Date().toISOString().split('T')[0]; // Format YYYY-MM-DD

	// Greeting
	const { data: session } = await supabase.auth.getSession();
	document.getElementById('adminName')!.textContent = session?.user?.user_metadata?.name || 'Admin';
	document.getElementById('currentDate')!.textContent = new Date().toLocaleDateString('id-ID', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });

	// Ringkasan Sekolah
	const { data: students } = await supabase.from('users').select('*').eq('role', 'siswa');
	const { data: teachers } = await supabase.from('users').select('*').eq('role', 'guru');
	const { data: classes } = await supabase.from('classes').select('*');
	const { data: settings } = await supabase.from('school_settings').select('academic_year').single();

	document.getElementById('studentCount')!.textContent = students?.length.toString() || '0';
	document.getElementById('teacherCount')!.textContent = teachers?.length.toString() || '0';
	document.getElementById('classCount')!.textContent = classes?.length.toString() || '0';
	document.getElementById('academicYear')!.textContent = settings?.academic_year || '2025/2026';

	// Kehadiran Hari Ini
	const { data: attendance } = await supabase.from('attendance').select('*').eq('date', today);
	const present = attendance?.filter((a: { status: string; }) => a.status === 'hadir').length || 0;
	const sick = attendance?.filter((a: { status: string; }) => a.status === 'sakit').length || 0;
	const excused = attendance?.filter((a: { status: string; }) => a.status === 'izin').length || 0;
	const absent = attendance?.filter((a: { status: string; }) => a.status === 'alpha').length || 0;
	const total = attendance?.length || 1; // Avoid division by zero

	document.getElementById('presentCount')!.textContent = present.toString();
	document.getElementById('presentPercent')!.textContent = ((present / total) * 100).toFixed(0);
	document.getElementById('sickCount')!.textContent = sick.toString();
	document.getElementById('excusedCount')!.textContent = excused.toString();
	document.getElementById('absentCount')!.textContent = absent.toString();

	// Tagihan Outstanding
	const { data: invoices } = await supabase.from('invoices').select('*').eq('status', 'unpaid');
	const totalOutstanding = invoices?.reduce((sum: any, inv: { amount: any; }) => sum + inv.amount, 0) || 0;
	const unpaidStudents = new Set(invoices?.map((inv: { student_id: any; }) => inv.student_id)).size;

	document.getElementById('outstandingAmount')!.textContent = totalOutstanding.toLocaleString('id-ID');
	document.getElementById('unpaidStudents')!.textContent = unpaidStudents.toString();

	// Pengumuman Terbaru
	const { data: announcements } = await supabase.from('announcements').select('*').order('created_at', { ascending: false }).limit(3);
	const list = document.getElementById('announcementList')!;
	list.innerHTML = announcements?.map((ann: { title: any; content: string; }) => `< li > ${ann.title} - ${ann.content.substring(0, 50)}...</li>`).join('') || '<li>Tidak ada pengumuman.</li > ';
}

// Navigasi sederhana (asumsi ada router)
function navigateTo(page: string) {
	window.location.href = `../${page}/`; // Sesuaikan dengan routing proyek
}

// Load data saat halaman ready
document.addEventListener('DOMContentLoaded', loadDashboardData);