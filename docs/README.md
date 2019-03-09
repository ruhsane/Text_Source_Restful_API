# Table of Contents

## What is Text Source API?
An awesome project that you can post/get/delete/update text sources such as stories, speeches etc.

##Upcoming future?
Takes in a text source of your choice,  analyzes the whole text using 2nd order Markov Chain and generates a sentence.

##API CALLS
### Authentication

**baseURL:** https://text-source-api.herokuapp.com

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

#### Login
```js
post('https://text-source-api.herokuapp.com/login', {
    username,
    password
})

```
Successful Response:
```json
{
    "token": "thisxxxis.axxxjson.webxxxtoken"
}


###Authorized Routes


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

