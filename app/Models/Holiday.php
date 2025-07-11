<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Carbon\Carbon;

/**
 * 祝日モデル（Holiday）
 *
 * @property int $id
 * @property Carbon $date
 * @property string $name
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 *
 * 他モデルとのリレーションは持たず、日付と名称のみを管理する。
 */

class Holiday extends Model
{
    use HasFactory;

    /**
     * 一括代入可能な属性
     */
    protected $fillable = [
        'date', // 祝日の日付
        'name', // 祝日の名称（例：海の日）
    ];

    /**
     * 型変換を適用する属性
     */
    protected $casts = [
        'date' => 'date', // Carbonインスタンスにキャスト
    ];
}
