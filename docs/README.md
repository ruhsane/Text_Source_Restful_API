# Table of Contents

## What is Tweet Generator API?
An awesome project that users can post/get/delete/update text sources such as stories, speeches etc.

ADDITIONALLY, it can generate a sentence based on Markov chain for any of these text sources.

(thus making it a tweet generator considering each generated sentence as a tweet.)

**baseURL:** https://text-source-api.herokuapp.com

## Example Project:
Predicts and generates a tweet that Donald Trump could tweet using Markov Chain based on corpus of all his past speeches (168k+ words). 
Website: www.donald-trump-tweet-generator.herokuapp.com/ (New sentence each refresh)
Markov Chain Algorithm: https://github.com/ruhsane/Tweet-Generator-OOP

## Documentation
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


#### Markov Sentence For a Text Source
##### Markov Chain algorithm implementation: https://github.com/ruhsane/Tweet-Generator-OOP

```js
get('https://text-source-api.herokuapp.com/text_sources/:sourceId/get_markov', { 
})
```
Successful Response:
```json
"generated text by markov chain"
```
