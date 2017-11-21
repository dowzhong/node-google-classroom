const request = require('superagent')

class courseWork{
  constructor(client, obj){
    let self = this
    self.courseId = obj.courseId
    self.id = obj.id
    self.title = obj.title
    self.description = obj.description
    self.materials = obj.materials
    self.state = obj.state
    self.alternateLink = obj.alternateLink
    self.creationTime = obj.creationTime
    self.updateTime = obj.updateTime
    self.dueDate = obj.dueDate
    self.dueTime = obj.dueTime
    self.scheduledTime = obj.scheduledTime
    self.maxPoints = obj.maxPoints
    self.workType = obj.workType
    self.associatedWithDeveloper = obj.associatedWithDeveloper
    self.assigneeMode = obj.assigneeMode
    self.individualStudentsOptions = obj.individualStudentsOptions
    self.submissionModificationMode = obj.submissionModificationMode
    self.creatorUserId = obj.creatorUserId
    obj.assignment === undefined ? self.assignment = obj.assignment : self.multipleChoiceQuestion = obj.multipleChoiceQuestion
    self.client = client
  }

  delete(){
    let self = this
    return new Promise((resolve, reject) =>{
      request
      .del(`https://classroom.googleapis.com/v1/courses/${self.courseId}/courseWork/${self.id}`)
      .set('Authorization', `Bearer ${self.client.accessToken}`)
      .type('json')
      .end((err, res) =>{
        if(err) reject(err.stack);
        resolve(res.body)
      })
    })
  }
}

module.exports = courseWork