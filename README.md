# Models

### User
- username*
  - String
  - unique
  - same as west-mec login
- email*
  - String
  - unique
- password*
  - String
  - min of 4 chars
- permission*
  - enum (teacher, student)

### Service
- timestamps
- reviewed
  - boolean
  - only teacher can change value
- proof?
- act*
  - String
- description*
  - String
- student
  - mongoose.Types.ObjectId
- hours*
  - Number

# Controllers

### Auth
- login
- register
- updateUser
- getUsers
- getUser
- deleteUser

### Service
- createService
- getServices
- getService
- deleteService
- updateService

# Routes

### Auth
- '/'
  - get: getUsers
- '/:id'
  - get: getUser
  - delete: deleteUser
  - patch: updateUser
- '/login'
  - post: login
- '/register'
  - post: register
  
### Service
- '/'
  - post: createService
  - get: getServices
- '/:id'
  - get: getService
  - patch: updateService
  - delete: deleteService