# Login

登入機制

### Installing

需要 [node](https://nodejs.org/en/) 環境

終端機輸入

```
npm i
```

啟動伺服器，瀏覽器輸入 http://localhost:3000

```
npm run dev
```

### Features

- 輸入信箱與密碼，如有該會員，可登入成功（測試帳號可以參考 public/apis/accountData.json）
- 可紀錄使用者的登入狀態（使用 cookie 簽章, 生存時間 60 秒）
