#!/usr/bin/env bash

# zsh 互換の配列定義方法
view_keys=("users" "reservations" "services" "timeslots" "working_hours" "notices")
view_labels=("ユーザー" "予約" "サービス" "タイムスロット" "勤務時間" "お知らせ")

for i in "${!view_keys[@]}"; do
  name="${view_keys[$i]}"
  if [ -z "$name" ]; then
    continue
  fi
  cap_name="${view_labels[$i]}"
  path="resources/views/${name}/index.blade.php"
  mkdir -p "$(dirname "$path")"
  cat > "$path" <<EOF
<!DOCTYPE html>
<html>
<head>
    <title>${cap_name}一覧</title>
</head>
<body>
    <h1>${cap_name}一覧</h1>
</body>
</html>
EOF
  echo "書き込み中: $path"
done
