// const { response } = require("express")
const ex = require("express")
// const { request } = require("http")
const app = ex()
const qr =require("qrcode")

// Sever Static
app.use(ex.static('public'))
app.use(ex.json())
app.use(ex.urlencoded({ extended: true }))

function logger(req,res,next){
    console.log(new Date().toISOString(), req.method, req.url);
    next()
}

app.use(logger)

app.set('view engine','ejs')

app.get('/home',(req,res)=>{
    res.render('pages/home')
})

app.get('/data',(req,res)=>{
    const student = {
         id: "2325600",
         name: "Nonpawit",
         major: "DE",
         hobbies:[
            'Singing',
            'Play Game',
            'Driving'
        ]
    }
      


    res.render('pages/data',{student})
})


app.get('/qrcode',(req,res)=>{
    res.render('pages/qrcode')
})
app.post("/scan", (req, res) => {
    const input_text = req.body.text;
    console.log(input_text);
    qr.toDataURL(input_text, (err, src) => {
      if (err) res.send("Something went wrong!!");
      res.render('pages/scan', { src })
    })
  })

// app.get('/users',(req,res)=>{
//     const id =req.query.id
//     const faculty = req.query.fac
//     console.log(id);
//     res.send(`<h1>Get data for id: ${id} faculty: ${faculty}</h1>`)
// })

// app.get('/users/:id/:fac',(req,res)=>{
//     const id =req.params.id
//     const faculty = req.params.fac
//     console.log(id,faculty);
//     res.send(`<h1>Get data for id: ${id} faculty: ${faculty}</h1>`)
// })

// app.post('/register',(req,res)=>{
//     const email = req.body.email
//     const username = req.body.name
//     console.log(email,username);
//     res.send(`Data ${email,username}`)
// })






// //Access Home
// app.get('/',function(request, response){
//     response.send("<h1>Hello from Express</h1>")
// })

// app.get('/login',(request, response)=>{
//     response.send("<h1>Login Form</h1>")
// })

// app.get('/logout',(request, response)=>{
//     response.send("<h1>Log Out Form</h1>")
// })

// app.get('/coc',(request, response)=>{
//     response.redirect("https://www.computing.psu.ac.th")
// })

// app.get('/data',(request, response)=>{
//     const data = {
//         framework: 'express',
//         version: 4
//     }
//     response.json(data)
// })

const port = process.env.PORT || 3000
app.listen(port)