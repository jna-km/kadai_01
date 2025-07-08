<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Holiday extends Model
{
    use HasFactory;

    protected $fillable = [
        'date',       // 祝日の日付
        'name',       // 祝日の名称（例：海の日）
    ];

    protected $casts = [
        'date' => 'date',  // Carbonインスタンスにキャスト
    ];
}
