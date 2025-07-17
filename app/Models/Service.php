<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Carbon\Carbon;
use App\Models\Reservation;
use App\Models\Operator;

/**
 * サービス（Service）モデル
 *
 * @property int $id
 * @property string $name
 * @property string $description
 * @property int $duration
 * @property int $price
 * @property int $operator_id
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 *
 * オペレーターに属し、複数の予約を持つ構成。
 */
class Service extends Model
{
    use HasFactory;

    /**
     * 一括代入可能な属性
     */
    protected $fillable = [
        'name',        // サービス名
        'description', // サービスの説明
        'duration',    // 提供時間（分）
        'price',       // 価格（整数）
        'operator_id',     // 対応するオペレーターID（管理者）
    ];

    /**
     * 型変換を適用する属性
     */
    protected $casts = [
        'duration' => 'integer',
        'price' => 'integer',
    ];

    /**
     * サービスに紐づく予約一覧
     */
    public function reservations(): HasMany
    {
        return $this->hasMany(Reservation::class);
    }

    /**
     * 担当オペレーターとの関連
     */
    public function operator(): BelongsTo
    {
        return $this->belongsTo(Operator::class);
    }
}
