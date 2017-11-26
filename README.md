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
  * createAnnouncement(announcement, materials) - Creates an announcment for the course
    * Parameters:
      * announcment: The announcment
      * materials: An array of object of materials as documented [here](https://developers.google.com/classroom/reference/rest/v1/Material)
  * createAssignment(assignment)
    * Parameter
      * assignment: An Assignment object as documented [here](https://developers.google.com/classroom/reference/rest/v1/courses.courseWork#CourseWork)
___
### courseWork
  * courseId - The id of the courseWork/assignment
  * id - The id of the classroom this courseWork/assignment is in
  * title - The title of the assignment
  * description - THe description of the assignment
  * materials - The materials the assignment has set
  * state - The state of the assignment
  * alternateLink - Absolute link to this course in the Classroom web UI
  * creationTime - The time the course was created (RFC3339 UTC "Zulu" format, accurate to nanoseconds)
  * updateTime - The most recent time the course was updated
  * dueDate - The date the assignment is due
  * dueTime - The time the assignment is due
  * scheduledTime - Optional timestamp when this course work is scheduled to be published.
  * maxPoints - Maximum grade for this course work. If zero or unspecified, this assignment is considered ungraded.
  * workType - Type of this course work.
  * associatedWithDeveloper - Whether this course work item is associated with the Developer Console project making the request.
  * assigneeMode - Assignee mode of the coursework. Default value is ALL_STUDENTS. 
  * individualStudentsOptions - Identifiers of students with access to the coursework. This field is set only if assigneeMode is INDIVIDUAL_STUDENTS. If the assigneeMode is INDIVIDUAL_STUDENTS, then only students specified in this field will be assigned the coursework. 
  * submissionModificationMode - Setting to determine when students are allowed to modify submissions.
  * creatorUserId - Identifier for the user that created the coursework.
  * assignment - Assignment details
  * multipleChoiceQuestion - Multiple choice question details.
  *delete() - Deletes the assignment.
___
### invitation
  * id - Identifier of classroom
  * userId - Identifier of the invited user
  * courseId - Identifier of the course to invite the user to
  * role - Role to invite the user to have
  * accept() - Accept the invitation
___
### student
  * courseId - Identifier of the course
  * userId - Identifier of the user
  * profile - Global user information for the student
  * studentWorkFolder - Information about a Drive Folder for this student's work in this course. Only visible to the student and domain administrators
  * remove() - Removes the student from this course
___
### teacher
  * courseId - Identifier of the course
  * userId - Identifier of the user
  * profile - Global user information for the teacher
  * remove() - Removes the teacher from this course


