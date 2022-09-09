const Course = require('../models/Course')
const { mutipleMongooseToObject } = require('../../util/mongooes')

class NewsController {
    // [GET] /home
    index(req, res, next) {
        //promise
        Course.find({})
            .then(courses => {
                res.render('home', { courses: mutipleMongooseToObject(courses) })
            })
            .catch(error => next(error))
    }

    // [GET] /search
    search(req, res) {
        res.render('search');
    }
}

module.exports = new NewsController();
