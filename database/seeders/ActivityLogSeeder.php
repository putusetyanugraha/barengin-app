<?php

namespace Database\Seeders;

use App\Models\ActivityLog;
use App\Models\User;
use Illuminate\Database\Seeder;

class ActivityLogSeeder extends Seeder
{
    public function run(): void
    {
        $users = User::inRandomOrder()->take(5)->get();

        $actions = [
            'Mengubah izin pengguna',
            'Memulai backup database',
            'Percobaan login gagal',
            'Menghapus berkas sementara',
            'Rotasi kunci API',
            'Mempublikasikan trip baru',
            'Menyetujui permintaan pergi bareng',
            'Mengekspor log kegiatan',
            'Memperbarui profil pengguna',
            'Menonaktifkan akun pengguna',
        ];

        $ips = ['192.168.1.102', '45.22.192.11', '10.0.0.45', 'Server Internal', '172.16.0.8', '103.94.21.7'];

        foreach (range(1, 24) as $i) {
            $user = $users->isNotEmpty() ? $users->random() : null;

            ActivityLog::create([
                'user_id' => $user?->id,
                'actor_name' => $user?->full_name ?? 'System Admin',
                'action' => $actions[array_rand($actions)],
                'ip_address' => $ips[array_rand($ips)],
                'created_at' => now()->subMinutes($i * 37),
                'updated_at' => now()->subMinutes($i * 37),
            ]);
        }

        $this->command?->info('ActivityLogSeeder: 24 log kegiatan dibuat.');
    }
}
