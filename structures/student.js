const request = require('superagent')

class student{
  constructor(client, obj){
    let self = this
    self.courseId = obj.courseId
    self.userId = obj.userId
    self.profile = obj.profile
    self.studentWorkFolder = obj.studentWorkFolder
    self.client = client
  }

  remove(){
    let self = this
    return new Promise((resolve, reject) =>{
      request
        .del(`https://classroom.googleapis.com/v1/courses/${self.courseId}/students/${self.userId}`)
        .set('Authorization', `Bearer ${self.client.accessToken}`)
        .type('json')
        .send({
          courseId: self.courseId,
          userId: self.userId
        })
        .end((err, res) =>{
          if(err) reject(err.stack);
          resolve(res.body)
        })
    })
  }
}

module.exports = student