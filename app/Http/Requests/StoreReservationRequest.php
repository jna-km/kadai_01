<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreReservationRequest extends FormRequest
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
            'service_id' => 'required|exists:services,id',
            'duration' => 'required|integer|min:1',
            'date' => 'required|date|after_or_equal:today',
            'start_time' => 'required|date_format:H:i',
            'end_time' => 'required|date_format:H:i|after:start_time',
            'status' => 'nullable|in:reserved,cancelled,confirmed',
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
            'operator_id.exists' => '選択された担当者は存在しません。',
            'service_id.required' => 'サービスを選択してください。',
            'service_id.exists' => '選択されたサービスが存在しません。',            'duration.required' => '所要時間を入力してください。',
            'duration.integer' => '所要時間は整数で入力してください。',
            'duration.min' => '所要時間は1分以上である必要があります。',
            'date.required' => '予約日を入力してください。',
            'date.date' => '予約日は正しい日付形式で入力してください。',
            'date.after_or_equal' => '予約日は今日以降の日付を指定してください。',
            'start_time.required' => '開始時刻を入力してください。',
            'start_time.date_format' => '開始時刻は「HH:MM」形式で入力してください。',
            'end_time.required' => '終了時刻を入力してください。',
            'end_time.date_format' => '終了時刻は「HH:MM」形式で入力してください。',
            'end_time.after' => '終了時刻は開始時刻より後でなければなりません。',
            'status.in' => 'ステータスには「reserved」または「cancelled」を指定してください。',
            'notes.max' => '備考は1000文字以内で入力してください。',
        ];
    }


    /**
     * Get custom attributes for validator errors.
     *
     * @return array<string, string>
     */
    public function attributes(): array
    {
        return [
            'user_id' => 'ユーザーID',
            'operator_id' => '担当者',
            'service_id' => 'サービス',
            'duration' => '所要時間',
            'date' => '予約日',
            'start_time' => '開始時刻',
            'end_time' => '終了時刻',
            'status' => 'ステータス',
            'notes' => '備考',
        ];
    }

}
