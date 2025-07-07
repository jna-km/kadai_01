#!/bin/bash

FOOTER_BASE="./docs/_footer.md"
TMP_FOOTER="./_footer.tmp.md"
TMP_BODY="./_body.tmp.md"

# 対象ファイル一覧（README と docs配下すべて）
TARGET_FILES=(./README.md ./docs/*.md ./docs/logs/*.md)

for file in "${TARGET_FILES[@]}"; do
  # _footer.base.md は除外
  if [[ "$file" == "$FOOTER_BASE" ]]; then
    continue
  fi

  # パス条件に応じたプレフィックスと戻り先を設定
  if [[ "$file" == "./README.md" ]]; then
    PREFIX="docs/"
    README_LINK=""
  elif [[ "$file" == ./docs/logs/* ]]; then
    PREFIX="../"
    README_LINK="../../README.md"
  else
    PREFIX=""
    README_LINK="../README.md"
  fi

  # フッターを一時生成（{{prefix}} と {{readme}} を置換）
  sed -e "s|{{prefix}}|$PREFIX|g" -e "s|{{readme}}|$README_LINK|g" "$FOOTER_BASE" > "$TMP_FOOTER"

  # フッターを除いた本文を一時保存
  awk '/--- フッター開始 ---/{p=1} !p; /--- フッター終了 ---/{p=0}' "$file" > "$TMP_BODY"

  # 本文と新しいフッターを結合して上書き
  cat "$TMP_BODY" "$TMP_FOOTER" > "$file"
done

# 一時ファイル削除
rm "$TMP_BODY" "$TMP_FOOTER"

echo "✅ README含め全Markdownファイルにフッターを更新しました。"