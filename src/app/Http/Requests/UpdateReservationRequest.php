<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateReservationRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'user_id' => 'required|exists:users,id',
            'operator_id' => 'nullable|exists:operators,id',
            'service_name' => 'required|string|max:255',
            'duration' => 'required|integer|min:1',
            'date' => 'required|date',
            'start_time' => 'required|date_format:H:i',
            'end_time' => 'required|date_format:H:i|after:start_time',
            'status' => 'nullable|in:reserved,cancelled',
            'notes' => 'nullable|string|max:1000',
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'user_id.required' => 'ユーザーIDは必須です。',
            'user_id.exists' => '選択されたユーザーが存在しません。',
            'operator_id.exists' => '選択された担当者が存在しません。',
            'service_name.required' => 'サービス名を入力してください。',
            'service_name.max' => 'サービス名は255文字以内で入力してください。',
            'duration.required' => '所要時間を入力してください。',
            'duration.integer' => '所要時間は整数で入力してください。',
            'duration.min' => '所要時間は1分以上である必要があります。',
            'date.required' => '予約日を入力してください。',
            'date.date' => '予約日は正しい日付形式で入力してください。',
            'start_time.required' => '開始時刻を入力してください。',
            'start_time.date_format' => '開始時刻は「HH:MM」形式で入力してください。',
            'end_time.required' => '終了時刻を入力してください。',
            'end_time.date_format' => '終了時刻は「HH:MM」形式で入力してください。',
            'end_time.after' => '終了時刻は開始時刻より後でなければなりません。',
            'status.in' => 'ステータスには「reserved」または「cancelled」を指定してください。',
            'notes.max' => '備考は1000文字以内で入力してください。',
        ];
    }
}
