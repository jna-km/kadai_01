<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

/**
 * サービス（Service）モデル
 *
 * @property string $name
 * @property string $description
 * @property int $duration
 * @property int $price
 */
class Service extends Model
{
    //
    use HasFactory;

    protected $fillable = [
        'name',        // サービス名
        'description', // サービスの説明
        'duration',    // 提供時間（分）
        'price',       // 価格（整数）
    ];

    protected $casts = [
        'duration' => 'integer',
        'price' => 'integer',
    ];
}
