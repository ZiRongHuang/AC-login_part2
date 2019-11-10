const express = require('express')
const exphbs = require('express-handlebars')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const checkAccount = require('./check_account')
const app = express()
const port = 3000
let firstName = '' // 紀錄使用者名字

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))

// 設定簽章
app.use(cookieParser('123456789'))

app.get('/', (req, res) => {
  if (req.signedCookies.isLogin) {
    res.render('profile', { firstName })
  } else {
    res.render('index', { message: '' })
  }
})

app.post('/', (req, res) => {
  const { email, password } = req.body
  firstName = checkAccount({ email, password })

  if (firstName) {
    // 設定 cookie
    res.cookie('isLogin', true, { signed: true, maxAge: 60000 })

    res.render('profile', { firstName })
  } else {
    res.render('index', {
      message: 'Username/Password 錯誤',
      account: { email, password }
    })
  }
})

app.listen(port, () => {
  console.log('http://localhost:3000')
})
