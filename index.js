const request = require('superagent')
const events = require('events')

const course = require('./structures/course.js')
const invitation = require('./structures/invitation.js')

class client extends events{
  constructor(obj){
    super()
    let self = this
    self.clientId = obj.clientId
    self.clientSecret = obj.clientSecret
    self.refresh = obj.refreshToken
    self.refreshToken()
      .then(token =>{
        self.accessToken = token
        self.emit('ready', self)
      })
  }

  acceptInvitation(id){
    let self = this
    return new Promise((resolve, reject) =>{
      request
      .post(`https://classroom.googleapis.com/v1/invitations/${id}:accept`)
      .set('Authorization', `Bearer ${self.accessToken}`)
      .end((err, res) =>{
        if(err) reject(err.stack);
        resolve(res)
      })
    })
  }


  createCourse(name, section){
    let self = this
    return new Promise((resolve, reject) =>{
      request
        .post('https://classroom.googleapis.com/v1/courses')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Authorization', `Bearer ${self.accessToken}`)
        .type('json')
        .send({
          name: name,
          section: section,
          ownerId: 'me'
        })
        .end((err, res) =>{
          if(err) reject(err.stack);
          resolve(new course(self, res.body))
        })
    })
  }

  getCourses(){
    let self = this
    return new Promise((resolve, reject) =>{
      request
        .get('https://classroom.googleapis.com/v1/courses')
        .set('Authorization', `Bearer ${self.accessToken}`)
        .end((err, res) =>{
          if(err) reject(err.stack);
          if(res.body.courses.length == 1){
            resolve(new course(self, res.body.courses[0]))
          }else{
            let array = []
            for(let i = 0; i < res.body.courses.length; i++){
              array.push(new course(self, res.body.courses[i]))
            }
            self.refreshToken()
              .then(() => {
                resolve(array)
              })
          }
        })
    })
  }

  getInvites(){
    let self = this
    return new Promise((resolve, reject) =>{
      request
      .get('https://classroom.googleapis.com/v1/invitations')
      .set('Authorization', `Bearer ${self.accessToken}`)
      .type('json')
      .query({
        userId: 'me',
        pageSize: 0
      })
      .end((err, res) =>{
        if(err) reject(err.stack);
        if(res.body.invitations.length == 1){
          resolve(new invitation(self.client, res.body.invitations[0]))
        }else{
          let array = []
          for(let i = 0; i < res.body.invitations.length; i++){
            array.push(new invitation(self.client, res.body.invitations[i]))
          }
          resolve(array)
        }
      })
    })
  }

  refreshToken(){
    let self = this
    return new Promise((resolve, reject) =>{
      request
        .post('https://www.googleapis.com/oauth2/v4/token')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send({
          client_id: self.clientId,
          client_secret: self.clientSecret,
          refresh_token: self.refresh,
          grant_type: 'refresh_token'
        })
        .end((err, res) =>{
          if(err) reject(err.stack);
          self.accessToken = res.body.access_token
          resolve(res.body.access_token)
      })
    })
  }
}

module.exports = client