<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Relations\HasMany;
use App\Models\Reservation;

/**
 * 時間枠（TimeSlot）モデル
 *
 * @property int $id
 * @property Carbon $start_time
 * @property Carbon $end_time
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 *
 * 他モデルとのリレーションを持たない時間枠の定義モデル。
 */
class TimeSlot extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'start_time',  // 開始時刻（例: 09:00）
        'end_time',    // 終了時刻（例: 09:30）
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'start_time' => 'datetime:H:i:s',
        'end_time' => 'datetime:H:i:s',
    ];

    /**
     * この時間枠に紐づく予約一覧
     */
    public function reservations(): HasMany
    {
        return $this->hasMany(Reservation::class);
    }
}
