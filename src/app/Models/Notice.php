<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

/**
 * お知らせ（Notice）モデル
 *
 * @property string $title
 * @property string $body
 * @property \Carbon\Carbon|null $published_at
 */
class Notice extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',     // お知らせのタイトル
        'body',      // 本文
        'published_at', // 公開日時
    ];

    protected $casts = [
        'published_at' => 'datetime',  // 公開日時をCarbonに変換
    ];
}
