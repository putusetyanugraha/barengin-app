<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class ActivityLog extends Model
{
    protected $fillable = ['user_id', 'actor_name', 'action', 'ip_address'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Catat satu aktivitas. Default aktor = user yang sedang login & IP request saat ini.
     */
    public static function record(string $action, ?User $actor = null, ?string $ip = null): self
    {
        $actor = $actor ?? Auth::user();

        return self::create([
            'user_id' => $actor?->id,
            'actor_name' => $actor?->full_name ?? 'Sistem',
            'action' => $action,
            'ip_address' => $ip ?? request()->ip(),
        ]);
    }
}
