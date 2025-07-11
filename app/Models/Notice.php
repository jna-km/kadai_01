<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Carbon\Carbon;

/**
 * お知らせ（Notice）
 *
 * @property int $id
 * @property string $title
 * @property string $body
 * @property Carbon|null $published_at
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 *
 * 他モデルとのリレーションを持たない単体利用の構成。
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

    /**
     * 公開済みのお知らせのみを取得するスコープ
     *
     * 公開日時が現在時刻以前のものに限定
     */
    public function scopePublished($query)
    {
        return $query->whereNotNull('published_at')
                     ->where('published_at', '<=', now());
    }
}
