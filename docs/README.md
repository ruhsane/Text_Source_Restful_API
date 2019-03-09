# Table of Contents

## What is Text Source API?
An awesome project that you can post/get/delete/update text sources such as stories, speeches etc.
**baseURL:** https://text-source-api.herokuapp.com

## Upcoming feature?
Takes in a text source of your choice,  analyzes the whole text using 2nd order Markov Chain and generates a sentence.

## API CALLS
### Authentication

#### Signing up
```js
post('https://text-source-api.herokuapp.com/sign-up', {
    username,
    password
})

```
Successful Response:
```json
{
    "token": "thisxxxis.axxxjson.webxxxtoken"
}
```

#### Login
```js
post('https://text-source-api.herokuapp.com/login', {
    username: String
    password: String
})

```
Successful Response:
```json
{
    "token": "thisxxxis.axxxjson.webxxxtoken"
}
```


### Authorized Routes


#### Get all text sources
```js
get('https://text-source-api.herokuapp.com/text_sources', {
})
```

Successful Response:
```json
{
[
    {
        "_id": "id",
        "title": "title",
        "Created_date": "2019-03-05T05:07:09.420Z",
        "content": "blah blah"
    },
    {
        ...
    }
]
}
```
#### Upload a text file
```js
post('https://text-source-api.herokuapp.com/text_sources/new', {
    title: String,
    content: txt file    
})
```
Successful Response:
```json
{
    "_id": "id",
    "title": "title",
    "Created_date": "2019-03-09T11:17:38.067Z",
    "content": "blah blah",
    "__v": 0
}
```


#### Read a single text source 
```js
get('https://text-source-api.herokuapp.com/text_sources/:sourceId', { 
})
```
Successful Response:
```json
{
    "_id": "id",
    "title": "title",
    "Created_date": "2019-03-05T05:07:09.420Z",
    "content": "blah blah"
}
```

#### Update a text source
```js
put('https://text-source-api.herokuapp.com/text_sources/:sourceId', { 
    title: String,
    content: String
})
```
Successful Response:
```json
{
    "_id": "5c83a1f87afd960024cb0c13",
    "title": "new title",
    "Created_date": "2019-03-09T11:22:32.851Z",
    "content": "new content",
    "__v": 0
}
```

#### Delete a text source
```js
delete('https://text-source-api.herokuapp.com/text_sources/:sourceId', { 
})
```
Successful Response:
```json
{
    message: "Text source successfully deleted"
}
```
