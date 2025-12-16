import { Template } from './types';

export const BASE_URL = 'https://weddingwithyou.id';

export const TEMPLATES: Template[] = [
  {
    id: 1,
    label: 'Formal Islami',
    content: `Assalamu’alaikum Wr. Wb.

Yth. Bapak/Ibu {{nama_tamu}},

Dengan penuh rasa syukur, kami mengundang Bapak/Ibu untuk hadir dalam acara pernikahan kami.

Informasi lengkap dapat diakses melalui tautan berikut:
{{link_undangan}}

Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu berkenan hadir.

Terima kasih.`,
  },
  {
    id: 2,
    label: 'Casual Warm',
    content: `Halo {{nama_tamu}},

Kami ingin berbagi kabar bahagia mengenai pernikahan kami.

Detail acara dan undangan digital dapat dilihat di:
{{link_undangan}}

Kami sangat berharap kehadiran Anda.

Salam hangat,`,
  },
  {
    id: 3,
    label: 'Formal Standard',
    content: `Yth. {{nama_tamu}},

Tanpa mengurangi rasa hormat, kami mengundang Bapak/Ibu untuk menghadiri acara pernikahan kami.

Silakan kunjungi undangan digital kami melalui tautan berikut:
{{link_undangan}}

Atas perhatian dan kehadirannya, kami ucapkan terima kasih.`,
  },
  {
    id: 4,
    label: 'Islami Simple',
    content: `Assalamu’alaikum {{nama_tamu}},

Dengan izin Allah SWT, kami akan melangsungkan pernikahan.

Informasi lengkap mengenai acara dapat diakses di:
{{link_undangan}}

Kami berharap {{nama_tamu}} dapat berkenan hadir.`,
  },
  {
    id: 5,
    label: 'Respectful',
    content: `Kepada Yth. {{nama_tamu}},

Kami mengundang Anda untuk menjadi bagian dari hari bahagia pernikahan kami.

Detail acara dan lokasi tersedia di:
{{link_undangan}}

Terima kasih atas doa dan perhatiannya.`,
  },
  {
    id: 6,
    label: 'Joyful',
    content: `Halo {{nama_tamu}},

Dengan penuh kebahagiaan, kami mengundang Anda ke acara pernikahan kami.

Silakan akses undangan digital melalui link berikut:
{{link_undangan}}

Kami menantikan kehadiran Anda.`,
  },
];
