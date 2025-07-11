import time
from selenium import webdriver
from selenium.webdriver.common.by import By
import chromedriver_autoinstaller

# ChromeDriverの自動インストール
chromedriver_autoinstaller.install()

# ブラウザ起動（表示あり）
options = webdriver.ChromeOptions()
driver = webdriver.Chrome(options=options)

# DuckDuckGoを開く
driver.get("https://duckduckgo.com/")

# 「車」で検索
search_box = driver.find_element(By.NAME, "q")
search_box.send_keys("車")
search_box.submit()

# 30秒表示
time.sleep(30)
driver.quit()
