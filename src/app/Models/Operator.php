<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\Reservation;

/**
 * Operator（管理者）モデル
 *
 * @property string $name
 * @property string $email
 */
class Operator extends Model
{
    use HasFactory;

    /**
     * モデルの一括代入可能な属性
     *
     * @var array
     */
    protected $fillable = [
        'name',      // オペレーターの氏名
        'email',     // メールアドレス
    ];

    /**
     * リレーション：このオペレーターが担当する予約一覧
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function reservations()
    {
        return $this->hasMany(Reservation::class);
    }
}
