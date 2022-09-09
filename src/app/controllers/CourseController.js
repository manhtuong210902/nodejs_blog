const Course = require('../models/Course')
const { mongooseToObject } = require('../../util/mongooes')


class CourseController {
    // [GET] /courses/:slug
    show(req, res, next) {
        // res.send(req.params.slug)
        Course.findOne({slug : req.params.slug})
            .then((course) => {
                res.render('courses/show', {course: mongooseToObject(course)})
            })
            .catch(next);
    }


    // [GET] /courses/create
    create(req, res, next){
        res.render('courses/create')
    }

    // [POST] /courses/store
    store(req, res, next){
        const formData = req.body;
        formData.image = `https://files.fullstack.edu.vn/f8-prod/courses/1.png`
        const course = new Course(formData);
        course.save()
            .then(() => res.redirect('/me/stored/courses'))
            .catch(next)
    }

    // [GET] /courses/:id/edit
    edit(req, res, next) {
        Course.findOne({_id : req.params.id})
            .then((course) => {
                res.render('courses/update', {course: mongooseToObject(course)})
            })
            .catch(next);
    }

    //[PUT] /course/:id
    update(req, res, next) {
        Course.updateOne({_id: req.params.id}, req.body)
            .then(() => res.redirect('/me/stored/courses'))
            .catch(next)
    }

    //[DELETE] /course/:id
    destroy(req, res, next) {
       Course.delete({_id: req.params.id})
            .then(() => res.redirect('back'))
            .catch(next)
    }


    //[PATCH] /course/:id/restore
    restore(req, res, next) {
        Course.restore({_id: req.params.id})
             .then(() => res.redirect('back'))
             .catch(next)
    }

     //[DELETE] /course/:id/force
    forceDestroy(req, res, next){
        Course.deleteOne({_id: req.params.id})
            .then(() => res.redirect('back'))
            .catch(next)
    }

    //[] /courses/handle-form-actions
    handleFormActions(req, res, next){
        var action = req.body.action;
        if(action === 'delete'){
            Course.delete({_id: {$in: req.body.courseIds}})
            .then(() => res.redirect('back'))
            .catch(next)
        }else{
            res.json({ message: 'error'})
        }
    }
 
}

module.exports = new CourseController();
