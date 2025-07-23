<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Carbon\Carbon;
use App\Models\Operator;
use App\Models\Service;

/**
 * 時間枠（TimeSlot）モデル
 *
 * @property int $id
 * @property int $operator_id
 * @property int|null $service_id
 * @property Carbon $date
 * @property Carbon $start_time
 * @property Carbon $end_time
 * @property int $capacity
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 *
 * オペレーターとサービスに紐づく予約可能時間枠を表すモデル。
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
        'operator_id',
        'service_id',
        'date',
        'start_time',
        'end_time',
        'capacity',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'date' => 'date',
        'start_time' => 'datetime:H:i:s',
        'end_time' => 'datetime:H:i:s',
        'capacity' => 'integer',
    ];

    /**
     * リレーション：この時間枠を持つオペレーター
     */
    public function operator(): BelongsTo
    {
        return $this->belongsTo(Operator::class);
    }

    /**
     * リレーション：この時間枠に紐づくサービス
     */
    public function service(): BelongsTo
    {
        return $this->belongsTo(Service::class);
    }
}
