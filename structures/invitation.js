const request = require('superagent')

class invitation{
  constructor(client, obj){
    let self = this
    self.id = obj.id
    self.userId = obj.userId
    self.courseId = obj.courseId
    self.role = obj.role
    self.client = client
  }

  accept(){
    let self = this
    return new Promise((resolve, reject) =>{
      request
      .post(`https://classroom.googleapis.com/v1/invitations/${self.id}:accept`)
      .set('Authorization', `Bearer ${self.client.accessToken}`)
      .end((err, res) =>{
        if(err) reject(err.stack);
        resolve(res)
      })
    })
  }

}

module.exports = invitation