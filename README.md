# node-google-classroom
  A promise based Google Classroom wrapper.

### Too lazy to do this. If you can understand the code pls do this for me :)
___
## Index
[Getting Started](#gettingStarted)
___
<a id="gettingStarted"></a>
## Getting Started:
You will need:
  * client id from google api
  * client secret from google api
  * refresh token
  * preferably all scopes permitted for the tokens
___

Example:
```js
const Client = require('google-classroom')

const client = new Client({
  clientId: 'xxx',
  clientSecret:  'xxx',
  refreshToken: 'xxx'
})

client.on('ready', async classr =>{
  client.getCourses()
   .then(data =>{
     console.log(data)
   })
})
```
___
<a id=properties></a>
## Properties/Structures/Associated methods
___
### Client
  * clientId - Your client id
  * clientSecret - Your client secret
  * refreshToken - Your refresh token
  * acceptInvitation(id) - Accepts an invitation
    * Parameters:
      * id: The identifier for the invite you are accepting.
  * createCoures(name, section) - Creates a course (You'll have to accept the invitation to teach on a desktop.)
    * Parameters:
      * name: The name of the course
      * section: The section of the course
  * getCourses() - Returns a list of courses you're in
  * getInvites() - Returns a list of outstanding invites

