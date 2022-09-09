const Course = require('../models/Course')
const { mutipleMongooseToObject } = require('../../util/mongooes')


class MeController {
    // [GET] /store/courses
    storedCourses(req, res, next) {
        Course.find({ })
            .then(courses => res.render('me/stored-courses', {courses: mutipleMongooseToObject(courses)}))
            .catch(next)
    }

    trashCourses(req, res, next){
        Course.findDeleted()
            .then(courses => res.render('me/trash-courses', {courses: mutipleMongooseToObject(courses)}))
            .catch(next)
    }
}

module.exports = new MeController();
