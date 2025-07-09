#!/bin/bash

# 予約API動作確認スクリプト（ユーザーまたはオペレーターを指定）
# 使い方: ./test_reservation_flow.sh --user  または --operator

API_BASE="http://localhost:88"
LOGIN_USER_ENDPOINT="$API_BASE/api/login"
LOGIN_OPERATOR_ENDPOINT="$API_BASE/api/operator/login"
RESERVATION_ENDPOINT="$API_BASE/api/reservations"

EMAIL=""
PASSWORD="password"
TOKEN=""
LOGIN_MODE=""

# ---------------------
# 引数チェック
# ---------------------
if [ "$1" == "--user" ]; then
  EMAIL="user@example.com"
  LOGIN_MODE="user"
  LOGIN_URL="$LOGIN_USER_ENDPOINT"
elif [ "$1" == "--operator" ]; then
  EMAIL="admin@example.com"
  LOGIN_MODE="operator"
  LOGIN_URL="$LOGIN_OPERATOR_ENDPOINT"
else
  echo "使い方: $0 --user または --operator"
  exit 1
fi

echo "🔐 ログイン中（$LOGIN_MODE）..."

LOGIN_RESPONSE=$(curl -s -X POST "$LOGIN_URL" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -d "{\"email\": \"$EMAIL\", \"password\": \"$PASSWORD\"}")

TOKEN=$(echo "$LOGIN_RESPONSE" | jq -r '.access_token')

if [ "$TOKEN" = "null" ] || [ -z "$TOKEN" ]; then
  echo "❌ ログイン失敗: $LOGIN_RESPONSE"
  exit 1
fi

echo "✅ ログイン成功！アクセストークン取得済み"

HEADER=(
  -H "Accept: application/json"
  -H "Authorization: Bearer $TOKEN"
)

echo -e "\n📋 1. 予約一覧取得"
curl -s -X GET "$RESERVATION_ENDPOINT" "${HEADER[@]}" | jq .

echo -e "\n🆕 2. 新規予約を作成"

# 明日の日付を取得（macOS用）
TOMORROW=$(date -v+1d +"%Y-%m-%d")

  CREATE_DATA='{
    "user_id": 1,
    "operator_id": 1,
    "service_name": "シェルから予約",
    "duration": 45,
    "date": "'"$TOMORROW"'",
    "start_time": "11:00",
    "end_time": "11:45",
    "status": "reserved",
    "notes": "バリデーション確認用"
  }'

echo -e "\n❌ 2b. バリデーションエラーテスト"

CREATE_DATA_ERR='{
  "user_id": 1,
  "operator_id": 1,
  "service_name": "",
  "duration": 45,
  "date": "",
  "start_time": "11:00",
  "end_time": "11:45",
  "status": "reserved",
  "notes": "バリデーション確認用"
}'

curl -s -X POST "$RESERVATION_ENDPOINT" \
  "${HEADER[@]}" \
  -H "Content-Type: application/json" \
  -d "$CREATE_DATA_ERR" | jq .

CREATE_RESPONSE=$(curl -s -X POST "$RESERVATION_ENDPOINT" \
  "${HEADER[@]}" \
  -H "Content-Type: application/json" \
  -d "$CREATE_DATA")

echo "$CREATE_RESPONSE" | jq .

RESERVATION_ID=$(echo "$CREATE_RESPONSE" | jq -r '.id // .data.id')

if [ "$RESERVATION_ID" = "null" ] || [ -z "$RESERVATION_ID" ]; then
  echo "❌ 予約作成に失敗したため、以降を中止します"
  exit 1
fi

echo -e "\n🔍 3. 予約詳細取得（ID: $RESERVATION_ID）"
curl -s -X GET "$RESERVATION_ENDPOINT/$RESERVATION_ID" "${HEADER[@]}" | jq .

echo -e "\n✏️ 4. 予約を更新"
curl -s -X PUT "$RESERVATION_ENDPOINT/$RESERVATION_ID" \
  "${HEADER[@]}" \
  -H "Content-Type: application/json" \
  -d '{
    "user_id": 1,
    "operator_id": 1,
    "service_name": "更新済みサービス",
    "duration": 45,
    "date": "'"$TOMORROW"'",
    "start_time": "14:00",
    "end_time": "14:45",
    "notes": "スクリプトで更新"
  }' | jq .

echo -e "\n✏️ 4b. バリデーションエラー更新テスト"
curl -s -X PUT "$RESERVATION_ENDPOINT/$RESERVATION_ID" \
  "${HEADER[@]}" \
  -H "Content-Type: application/json" \
  -d '{
    "user_id": "",
    "operator_id": 1,
    "service_name": "エラー更新",
    "duration": "",
    "date": "'"$TOMORROW"'",
    "start_time": "14:00",
    "end_time": "14:45",
    "notes": "バリデーションエラー更新テスト"
  }' | jq .

echo -e "\n🗑 5. 予約を削除"
curl -s -X DELETE "$RESERVATION_ENDPOINT/$RESERVATION_ID" "${HEADER[@]}" | jq .

echo -e "\n✅ テスト完了！（$LOGIN_MODE）"
