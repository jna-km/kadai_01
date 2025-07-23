<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;
use App\Models\Operator;

/**
 * 休日（Holiday）
 *
 * @property int $id
 * @property int $operator_id
 * @property string $date
 * @property string|null $name
 * @property string|null $reason
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 *
 * 関連:
 * @property Operator $operator
 */
class Holiday extends Model
{
    use HasFactory;

    protected $fillable = [
        'operator_id',
        'date',
        'name',
        'reason',
    ];

    protected $casts = [
        'date' => 'date',
    ];

    public function operator()
    {
        return $this->belongsTo(Operator::class);
    }
}
