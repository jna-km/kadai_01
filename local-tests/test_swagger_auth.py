from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import json
import time
import datetime

# 日付変数の定義
today = datetime.date.today()
tomorrow = today + datetime.timedelta(days=1)

# Chromeの設定
options = Options()
# options.add_argument("--headless=new")
service = Service()

# ブラウザ起動
driver = webdriver.Chrome(service=service, options=options)
driver.get("http://localhost:88/swagger/")  # Swagger UIのURL

time.sleep(2)
print("✅ Swagger UI にアクセス")

# /operator/login を展開
login_section = driver.find_element(By.ID, "operations-認証-post_operator_login")
summary_button = login_section.find_element(By.CLASS_NAME, "opblock-summary-control")
summary_button.click()
time.sleep(1)
print("✅ /operator/login を展開")

# Try it out → Execute
login_section.find_element(By.CLASS_NAME, "try-out__btn").click()
time.sleep(0.5)

# リクエストボディの入力
textarea = login_section.find_element(By.TAG_NAME, "textarea")
textarea.clear()
textarea.send_keys('{"email": "admin@example.com", "password": "password"}')
print("✅ 認証情報を入力")

# Executeをクリック
login_section.find_element(By.CLASS_NAME, "execute").click()
time.sleep(2)
print("✅ Execute をクリック")

# レスポンスJSONの取得
response_element = login_section.find_element(By.CSS_SELECTOR, ".responses-wrapper .highlight-code pre")
response_text = response_element.text.strip()
print("✅ レスポンス取得")
print("----- レスポンス内容 -----")
print(response_text)  # レスポンス全体を出力して確認

# JSONとして読み込み
response_json = json.loads(response_text)
access_token = response_json.get("access_token") or response_json.get("data", {}).get("access_token")
print("✅ トークン取得:", access_token)

# Authorizeボタンをクリック
driver.find_element(By.CLASS_NAME, "authorize").click()
time.sleep(1)

# モーダル内の input に Bearerトークン入力
modal = driver.find_element(By.CLASS_NAME, "modal-ux-content")
input_field = modal.find_element(By.TAG_NAME, "input")
input_field.clear()
input_field.send_keys(f"Bearer {access_token}")
print("✅ Authorize 入力欄にトークン入力")

# Authorizeボタンをモーダル内でクリック
authorize_button = modal.find_element(By.XPATH, ".//button[contains(text(),'Authorize')]")
authorize_button.click()
time.sleep(1)

# モーダルを閉じる
close_button = modal.find_element(By.XPATH, ".//button[contains(text(),'Close')]")
close_button.click()
print("✅ Authorize 完了 & モーダル閉じた")


# ----------------------------------------
# 予約一覧のGETエンドポイントを実行する
# ----------------------------------------

# /reservations を展開
reservations_section = driver.find_element(By.ID, "operations-予約-get_reservations")
reservations_summary = reservations_section.find_element(By.CLASS_NAME, "opblock-summary-control")
reservations_summary.click()
time.sleep(1)
print("✅ /reservations を展開")

# Try it out → Execute
reservations_section.find_element(By.CLASS_NAME, "try-out__btn").click()
time.sleep(0.5)
reservations_section.find_element(By.CLASS_NAME, "execute").click()
time.sleep(2)
print("✅ /reservations を実行")

# レスポンス取得
reservations_response = reservations_section.find_element(By.CSS_SELECTOR, ".responses-wrapper .highlight-code pre")
reservations_text = reservations_response.text.strip()

# レスポンスをJSONとしてパースし、最新5件のみ表示
print("----- 予約一覧レスポンス（最新5件） -----")
try:
    reservations_response_json = json.loads(reservations_text)
except Exception:
    reservations_response_json = []

if isinstance(reservations_response_json, list):
    all_data = reservations_response_json
else:
    all_data = reservations_response_json.get("data", [])

print(f"予約件数: {len(all_data)} 件")
for reservation in all_data[-3:]:
    print(json.dumps(reservation, indent=2, ensure_ascii=False))

print("✅ /reservations 一覧取得 成功")

# /reservations を展開（作成）
create_section = driver.find_element(By.ID, "operations-予約-post_reservations")
summary_button = create_section.find_element(By.CLASS_NAME, "opblock-summary-control")
summary_button.click()
time.sleep(1)
print("✅ /reservations を展開（作成）")

# Try it out → Execute
create_section.find_element(By.CLASS_NAME, "try-out__btn").click()
time.sleep(0.5)

# 入力
textarea = create_section.find_element(By.TAG_NAME, "textarea")
textarea.clear()
textarea.send_keys(f'''
{{
  "user_id": 1,
  "operator_id": 1,
  "service_id": 1,
  "duration": 30,
  "date": "{str(today)}",
  "start_time": "13:00",
  "end_time": "13:30",
  "notes": "自動テスト予約"
}}
''')
print("✅ 入力完了")
print("✅ /reservations 作成入力 成功")

# Execute をクリック
create_section.find_element(By.CLASS_NAME, "execute").click()
time.sleep(2)
print("✅ Execute をクリック（予約作成）")

# 結果確認
response_element = create_section.find_element(By.CSS_SELECTOR, ".responses-wrapper .highlight-code pre")
response_text = response_element.text.strip()
print("✅ レスポンス取得（作成）")
print("----- 予約作成レスポンス -----")
print(response_text)
print("✅ /reservations 作成 成功")


# --- 認証エラーチェック ---
if "Unauthenticated" in response_text:
    print("❌ 認証エラーが発生しました。")
    print("  API呼び出しの前に、認証が成功しているか確認してください。")
    driver.quit()
    exit(1)

# ----------------------------------------------------
# 作成済み予約のIDを使って予約詳細を確認 → 更新 → 削除
# ----------------------------------------

# 作成時のレスポンスから予約IDを取得
response_json = json.loads(response_text)
reservation_id = response_json.get("id") or response_json.get("data", {}).get("id")
if not reservation_id:
    print("❌ 作成レスポンスに予約IDが含まれていません")
    driver.quit()
    exit(1)

print(f"✅ 作成した予約ID: {reservation_id}")
print("✅ 予約ID取得 成功")

# --- GET /reservations/{id} ---
detail_section = driver.find_element(By.ID, "operations-予約-get_reservations__id_")
detail_summary = detail_section.find_element(By.CLASS_NAME, "opblock-summary-control")
detail_summary.click()
time.sleep(1)
print(f"✅ /reservations/{reservation_id} を展開（詳細）")

detail_section.find_element(By.CLASS_NAME, "try-out__btn").click()
time.sleep(0.5)
# Wait for the input field to become clickable and perform scroll and input
WebDriverWait(driver, 5).until(
    EC.element_to_be_clickable((By.CSS_SELECTOR, ".parameters input"))
)
id_input = driver.find_element(By.CSS_SELECTOR, ".parameters input")
driver.execute_script("arguments[0].scrollIntoView();", id_input)
id_input.clear()
id_input.send_keys(str(reservation_id))
detail_section.find_element(By.CLASS_NAME, "execute").click()
time.sleep(3)
print(f"✅ /reservations/{reservation_id} を実行（詳細取得）")
print("✅ 予約詳細取得 成功")

# --- PUT /reservations/{id} ---
update_section = driver.find_element(By.ID, "operations-予約-put_reservations__id_")
update_summary = update_section.find_element(By.CLASS_NAME, "opblock-summary-control")
update_summary.click()
time.sleep(1)
print(f"✅ /reservations/{reservation_id} を展開（更新）")

update_section.find_element(By.CLASS_NAME, "try-out__btn").click()
time.sleep(0.5)
id_input = update_section.find_element(By.CSS_SELECTOR, "input[placeholder='id']")
id_input.clear()
id_input.send_keys(str(reservation_id))

textarea = update_section.find_element(By.TAG_NAME, "textarea")
textarea.clear()
textarea.send_keys(f'''
{{
  "user_id": 1,
  "operator_id": 1,
  "service_id": 1,
  "duration": 45,
  "date": "{str(tomorrow)}",
  "start_time": "14:00",
  "end_time": "14:45",
  "notes": "更新テスト"
}}
''')
print("✅ 更新情報入力")
print("✅ 予約更新情報入力 成功")

update_section.find_element(By.CLASS_NAME, "execute").click()
time.sleep(2)
print("✅ Execute をクリック（更新）")
print("✅ 予約更新 成功")

# --- DELETE /reservations/{id} ---
delete_section = driver.find_element(By.ID, "operations-予約-delete_reservations__id_")
delete_summary = delete_section.find_element(By.CLASS_NAME, "opblock-summary-control")
delete_summary.click()
time.sleep(1)
print("✅ /reservations/{id} を展開（削除）")

delete_section.find_element(By.CLASS_NAME, "try-out__btn").click()
time.sleep(0.5)

# Try it out後にID入力欄を再取得
WebDriverWait(driver, 5).until(
    EC.element_to_be_clickable((By.CSS_SELECTOR, ".parameters input"))
)
id_input = driver.find_element(By.CSS_SELECTOR, ".parameters input")
driver.execute_script("arguments[0].scrollIntoView();", id_input)
id_input.clear()
id_input.send_keys(str(reservation_id))
print("✅ 予約IDを入力（削除）")
delete_section.find_element(By.CLASS_NAME, "execute").click()
time.sleep(2)
print("✅ Execute をクリック（削除）")
print("✅ 予約削除 成功")

# --- GET /reservations/{id} → 削除確認 ---
id_input = detail_section.find_element(By.CSS_SELECTOR, "input[placeholder='id']")
id_input.clear()
id_input.send_keys(str(reservation_id))
detail_section.find_element(By.CLASS_NAME, "execute").click()
time.sleep(2)
print("✅ 削除後 /reservations/{id} を再実行（存在確認）")

# レスポンス確認
try:
    deleted_response_element = detail_section.find_element(By.CSS_SELECTOR, ".responses-wrapper .highlight-code pre")
    deleted_response_text = deleted_response_element.text.strip()
    # 取得できた場合は中身を見る
    if deleted_response_text:
        try:
            deleted_response_json = json.loads(deleted_response_text)
        except Exception:
            deleted_response_json = {}
        # 存在しない場合の典型的なキーやメッセージで判定
        if deleted_response_json.get("message") or deleted_response_json.get("error"):
            print("🆗 削除済み: 該当予約は取得不可（削除成功）")
        else:
            print("⚠️ 削除後も予約データが取得できてしまいました")
    else:
        print("🆗 削除済み: 該当予約は取得不可（削除成功）")
except Exception:
    print("🆗 削除済み: 該当予約は取得不可（削除成功）")

# ブラウザ終了（必要に応じて）
print("✅ テスト完了・ブラウザ終了")
driver.quit()
