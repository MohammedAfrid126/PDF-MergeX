
const express = require("express");
const path = require("path");
const app = express();
const { mergePDF }  = require('./merge')
const multer  = require('multer');

const port = 3000;

const upload = multer({ dest: 'uploads/' });
app.use('/static', express.static('public'));


app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname,"template/index.html"));
});


app.post('/merge', upload.array('pdfs', 2), async (req, res)=> {
    // console.log(req.files);
    // res.send({data:req.files});

    let d = await mergePDF(path.join(__dirname,req.files[0].path),path.join(__dirname,req.files[1].path));
    res.redirect(`http://localhost:3000/static/${d}.pdf`);
    // req.files is array of `photos` files
    // req.body will contain the text fields, if there were any
    })


    //TODO: To handle sigle pdf in a same array

// app.post('/merge', upload.single('pdf-1'), function (req, res, next) {
//     console.log(req.files);
//     res.send({data:req.files});
// })
// app.post('/merge', upload.single('pdf-2'), function (req, res, next) {
//     console.log(req.files);
//     res.send({data:req.files});
// })

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
