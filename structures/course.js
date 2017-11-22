const request = require('superagent')
const courseWork = require('./courseWork.js')
const student = require('./student.js')

class course{
  constructor(client, obj){
    let self = this
    self.id = obj.id
    self.name = obj.name
    self.section = obj.section
    self.descriptionHeading = obj.descriptionHeading
    self.description = obj.description
    self.room = obj.room
    self.ownerId = obj.ownerId
    self.creationTime = obj.creationTime
    self.updateTime = obj.updateTime
    self.enrollmentCode = obj.enrollmentCode
    self.courseState = obj.courseState
    self.alternateLink = obj.alternateLink
    self.teacherGroupMail = obj.teacherGroupEmail
    self.courseGroupMail = obj.courseGroupEmail
    self.teacherFolder = obj.teacherFolder === undefined ? {} : obj.teacherFolder
    self.guardiansEnabled = obj.guardiansEnabled
    self.client = client
  }

  createAnnouncement(announcement, materials = []){
    let self = this
    return new Promise((resolve, reject) =>{
      request
      .post(`https://classroom.googleapis.com/v1/courses/${self.id}/announcements`)
      .set('Authorization', `Bearer ${self.client.accessToken}`)
      .type('json')
      .send({
        text: announcement,
        materials: materials
      })
      .end((err, res) =>{
        if(err) reject(err.stack);
        resolve(res.body)
      })
    })
  }

  createAssignment(obj){
    let self = this
    return new Promise((resolve, reject) =>{
      request
      .post(`https://classroom.googleapis.com/v1/clients/${self.id}/courseWork`)
      .set('Authorization', `Bearer ${self.client.accessToken}`)
      .type('json')
      .send(obj)
      .end((err, res) =>{
        if(err) reject(err.stack);
        resolve(res.body)
      })
    })
  }

  delete(){
    let self = this
    return new Promise((resolve, reject) =>{
      request
      .del(`https://classroom.googleapis.com/v1/clients/${self.id}`)
      .set('Authorization', `Bearer ${self.client.accessToken}`)
      .type('json')
      .send({
        id: self.id
      })
      .end((err, res) =>{
        if(err) reject(err.stack);
        resolve(res.body)
      })
    })
  }

  getAssignments(){
    let self = this
    return new Promise((resolve, reject) =>{
      request
      .get(`https://classroom.googleapis.com/v1/courses/${self.id}/courseWork`)
      .set('Authorization', `Bearer ${self.client.accessToken}`)
      .type('json')
      .query({
        courseId: self.id
      })
      .end((err, res) =>{
        if(err) reject(err.stack);
        if(res.body.courseWork.length == 1){
          resolve(new courseWork(self.client, res.body.courseWork[0]))
        }else{
          let array = []
          for(let i = 0; i < res.body.courseWork.length; i++){
            array.push(new courseWork(self.client, res.body.courseWork[i]))
          }
          resolve(array)
        }
      })
    })
  }

  invite(userId, role){
    let self = this
    return new Promise((resolve, reject) =>{
      request
      .post(`https://classroom.googleapis.com/v1/invitations`)
      .set('Authorization', `Bearer ${self.client.accessToken}`)
      .type('json')
      .send({
        userId: userId,
        courseId: self.id.toString(),
        role: role
      })
      .end((err, res) =>{
        if(err) reject(err.stack);
        resolve(res.body)
      })
    })
  }

  setDescription(description){
    let self = this
    return new Promise((resolve, reject) =>{
      request
      .patch(`https://classroom.googleapis.com/v1/courses/${self.id}`)
      .set('Authorization', `Bearer ${self.client.accessToken}`)
      .type('json')
      .query({
        updateMask: 'description'
      })
      .send({
        description: description,
        id: self.id
      })
      .end((err, res) =>{
        if(err) reject(err.stack);
        resolve(res.body)
      })
    })
  }

  setDescriptionHeading(heading){
    let self = this
    return new Promise((resolve, reject) =>{
      request
      .patch(`https://classroom.googleapis.com/v1/courses/${self.id}`)
      .set('Authorization', `Bearer ${self.client.accessToken}`)
      .type('json')
      .query({
        updateMask: 'descriptionHeading'
      })
      .send({
        descriptionHeading: heading,
        id: self.id
      })
      .end((err, res) =>{
        if(err) reject(err.stack);
        resolve(res.body)
      })
    })
  }

  getStudents(){
    let self = this
    return new Promise((resolve, reject) =>{
      request
        .get(`https://classroom.googleapis.com/v1/courses/${self.id}/students`)
        .set('Authorization', `Bearer ${self.client.accessToken}`)
        .type('json')
        .end((err, res) =>{
          if(err) reject(err.stack);
          if(res.body.students.length == 1){
            resolve(new student(self.client, res.body.students[0]))
          }else{
            let array = []
            for(let i = 0; i < res.body.students.length; i++){
              array.push(new student(self.client, res.body.students[i]))
            }
            resolve(array)
          }
        })
    })
  }

  getTeachers(){
    let self = this
    return new Promise((resolve, reject) =>{
      request
        .get(`https://classroom.googleapis.com/v1/courses/${self.id}/teachers`)
        .set('Authorization', `Bearer ${self.client.accessToken}`)
        .type('json')
        .end((err, res) =>{
          if(err) reject(err.stack);
          if(res.body.teachers.length == 1){
            resolve(new teacher(self.client, res.body.teachers[0]))
          }else{
            let array = []
            for(let i = 0; i < res.body.teachers.length; i++){
              array.push(new teacher(self.client, res.body.teachers[i]))
            }
            resolve(array)
          }
        })
    })
  }
}

module.exports = course