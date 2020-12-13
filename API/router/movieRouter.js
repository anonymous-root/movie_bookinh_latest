const express = require('express');
const app = express();
const multer = require('multer');
const movie = require('../model/movietb');
const bodyparser = require('body-parser');
var path = require('path');
app.use(bodyparser.urlencoded({ extended: true }));
const router = express.Router();
const fileUpload = require('express-fileupload')

router.use(fileUpload())
// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, 'public/images');
//     },
//     filename: function (req, file, cb) {
//       const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//       cb(null, file.fieldname + '-' + uniqueSuffix+'.png');
//     }
// });
// var imagefilter = (req,file,cb)=>{
//     if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/))
//     {
//         return cb(new Error("Cannot upload other files"),false);
//     }
//     else
//     {
//         cb(null,true);
//     }
// }
// var upload = multer({ storage: storage ,fileFilter:imagefilter});
// var cpUpload = upload.fields([{ name: 'image', maxCount: 1 }, { name: 'images', maxCount: 10 }])
// var cpUpload = upload.fields([{ name: 'movie_logo', maxCount: 1 }]);
//state apis

router.get('/getmovie', async (req, res) => {
    try {
        const movies = await movie.find({});
        res.send(movies);
    } catch (error) {
        console.log(error);
    }
});

router.get('/getsinglemovie/:id', async (req, res) => {
    try {
        const movies = await movie.find({ _id: req.params.id });
        res.send(movies);
    } catch (error) {
        console.log(error);
    }
});

router.delete('/deletemovie/:id', async (req, res) => {
    try {
        const movies = await movie.findByIdAndDelete({ _id: req.params.id });

        res.send(movies);
    } catch (error) {
        console.log(error);
    }
});


router.post('/addmovie', async (req, res) => {
    console.log(req.files);
    console.log(req.body.moviename);
    const { movie_logo } = req.files;
    console.log(movie_logo.name)

    // return res.status(200).send("ok")

    try {
        // const imagepath = path.join(__dirname, '..', '..','public','images');
        const datenow = Date.now();
        movie_logo.mv('./public/images/' + datenow + movie_logo.name)
        req.body.movie_logo = "/images/"+ datenow +movie_logo.name;
        const movies = new movie(req.body);
        movies.save();
        res.send(movies)
    }
    catch (err) {
        console.log(err.message)
        return res.send("err")
    }
    // try
    // {
    //        if(req.files.movie_logo[0]) {
    //         //    const imagepath = path.join(__dirname, '..', '..','public','images');
    //         req.body.movie_logo =   '/images/' + req.files.movie_logo[0].filename;

    //             // console.log(req.files.movie_logo[0]);
    //             console.log(req.body.movie_logo);
    //            console.log(req.body.moviename);
    //     }
    //     const movies = await new movie(req.body);
    //     movies.save();
    //     console.log(movies);

    //     res.send(movies);
    // }
    // catch(error)
    // {
    //     console.log(error);
    // }
});
module.exports = router;