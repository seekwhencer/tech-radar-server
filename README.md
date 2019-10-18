# tech-radar-server

This is the backend for the tech-radar.
   
## Features

- written in ES6
- trying to use less external modules as possible
- is a Rest API-Server
- Authenticate via Json Web Token
- create, update, delete a Radar
- create, update, delete a Version or Dataset for a Radar
- create, update, delete a Dot or Entry in a Dataset
- is the Api Data Source for the Frontend

## Install

Node 12 is needed. Use `n` as node version manager from [here](https://github.com/mklement0/n-install).

```
git clone https://github.com/seekwhencer/tech-radar-server.git
cd tech-radar-server
npm install
```

## Run

##### Development
```
npm run dev
```

##### Production
```
npm run prod
```

## Api
- Authenticate
  ###### [ POST ] `/v1/login`
  ```
  username, password
  ```
  ```
  {
    "message": "authenticated",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaGVjayI6dHJ1ZSwidXNlciI6ImFkbWluIiwiaWF0IjoxNTcxMjI1MzI2LCJleHAiOjE1NzEyNDI2MDZ9.jOpNBe_UkzGTI3pDe7NE6nL2UNtlrm2kJ5UyvE1W4BU"
  }
  ```
  Any GET and POST Request needs a `header` like:
  ```
  "access-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaGVjayI6dHJ1ZSwidXNlciI6ImFkbWluIiwiaWF0IjoxNTcxMjI1MzI2LCJleHAiOjE1NzEyNDI2MDZ9.jOpNBe_UkzGTI3pDe7NE6nL2UNtlrm2kJ5UyvE1W4BU"
  ```
---



- The Radar Index
  ###### [ GET ] `/v1/radar`
---
- A Radar by ID
  ###### [ GET ] `/v1/radar/:radar`
---
- Create a Radar
  ###### [ POST ] `/v1/radar/create`
  ```
  label, theme, seet_to, seed_from, quadrant0_label, quadrant1_label, quadrant2_label, quadrant3_label,
  ring0_label, ring1_label, ring2_label, ring3_label, dot_offset_x, dot_offset_y
  ```
---
- Update a Radar
  ###### [ POST ] `/v1/radar/:radar/update`
  ```
  label, theme, seet_to, seed_from, quadrant0_label, quadrant1_label, quadrant2_label, quadrant3_label,
  ring0_label, ring1_label, ring2_label, ring3_label, dot_offset_x, dot_offset_y
  ```
---
- Delete a Radar
  ###### [ POST ] `/v1/radar/:radar/delete`
---


- All Datasets of a Radar
  ###### [ GET ] `/v1/radar/:radar/dataset`
---
- A Dataset by ID from a Radar
  ###### [ GET ] `/v1/radar/:radar/dataset/:dataset`
---
- Create a Dataset
  ###### [ POST ] `/v1/radar/:radar/dataset/create`
  ```
  name
  ```
---
- Update a Dataset
  ###### [ POST ] `/v1/radar/:radar/dataset/update`
  ```
  name, radar
  ```
- Delete a Dataset
  ###### [ POST ] `/v1/radar/:radar/dataset/:dataset/delete`
--- 
- All Dots of a Dataset
  ###### [ GET ] `/v1/radar/:radar/dataset/:dataset/dot`
---
- A Dot by ID
  ###### [ GET ] `/v1/radar/:radar/dataset/:dataset/dot/:dot`
---
- Create a Dot
  ###### [ POST ] `/v1/radar/:radar/dataset/:dataset/dot/create`
  ```
  label, radar, version, quadrant, ring, active, moved, boost
  ```
---
- Update a Dot
  ###### [ POST ] `/v1/radar/:radar/dataset/:dataset/dot/:dot/update`
  ```
  label, radar, version, quadrant, ring, active, moved, boost
  ```
---
- Update a Dot
  ###### [ POST ] `/v1/radar/:radar/dataset/:dataset/dot/:dot/delete`



