# node-google-classroom
  A promise based Google Classroom wrapper.

### Too lazy to do this. If you can understand the code pls do this for me :)
___
## Index
[Getting Started](#gettingStarted)
[Properties/Structures/Associated methods](#properties)
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
### client
  * clientId - Your client id
  * clientSecret - Your client secret
  * refreshToken - Your refresh token
  * createCoures(name, section) - Creates a course (You'll have to accept the invitation to teach on a desktop.)
    * Parameters:
      * name: The name of the course
      * section: The section of the course
  * getCourses() - Returns a list of courses you're in
  * getInvites() - Returns a list of outstanding invites
___
### course
  * id - The id of the course
  * name - The name of the course
  * section - The section of the course
  * descriptionHeading - The description heading of the course
  * description - The description of the course
  * room - Room location of the course
  * ownerId - The ID of the owner of the course
  * creationTime - The time the course was created (RFC3339 UTC "Zulu" format, accurate to nanoseconds)
  * updateTime - The most recent time the course was updated
  * enrollmentCode - The enrolement code for the course
  * courseState - The state of the court
  * alternateLink - Absolute link to this course in the Classroom web UI
  * teacherGroupEmail - The email address of a Google group containing all teachers of the course
  * courseGroupEmail - The email address of a Google group containing all members of the course
  * teacherFolder - Information about a Drive Folder that is shared with all teachers of the course
  * guardiansEnabled - Whether or not guardian notifications are enabled for this course
  

