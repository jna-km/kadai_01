<!DOCTYPE html>
<html lang="ja">
<head>
  @viteReactRefresh
  @vite('resources/js/main.tsx') {{-- Vite経由で読み込む --}}
</head>
<body>
  <div id="root"></div> {{-- ← ここを app → root に修正 --}}
</body>
</html>
