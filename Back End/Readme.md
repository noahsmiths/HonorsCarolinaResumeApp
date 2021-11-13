# Honors Carolina Resume App

CRUD API for Resumes

## End Points

GET: https://node-mongodb-sample-git-rnarveka.apps.cloudapps.unc.edu/resumes
Return response:
```bash
[
    {
        "_id": "MongoID",
        "name": "name",
        "link": "resume link",
        "major": "student major",
        "tags": "useful tags for student's resume",
        "approved": "approved/pending status",
        "createdAt": "when created",
        "updatedAt": "when updated",
        "__v": 0
    },...
]
```

GET: https://node-mongodb-sample-git-rnarveka.apps.cloudapps.unc.edu/resumes/{resumeID}
Return response:
```bash
{
    "_id": "MongoID",
    "name": "name",
    "link": "resume link",
    "major": "student major",
    "tags": "useful tags for student's resume",
    "approved": "approved/pending status",
    "createdAt": "when created",
    "updatedAt": "when updated",
    "__v": 0
}
```
POST: https://node-mongodb-sample-git-rnarveka.apps.cloudapps.unc.edu/resumes
post Body:
```bash
{
     "_id": "MongoID",
    "name": "name",
    "link": "resume link",
    "major": "student major",
    "tags": "useful tags for student's resume",
    "approved": "approved/pending status",
}
```
PUT: https://node-mongodb-sample-git-rnarveka.apps.cloudapps.unc.edu/resumes/{resumeId}
update Body:
```bash
{
    "approved": "approved/pending status",
}
```
DELETE: https://node-mongodb-sample-git-rnarveka.apps.cloudapps.unc.edu/resumes/{resumeId}


