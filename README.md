# Setting up the gram

- clone the repository
- package install - `npm install`
- run backend server - `npm run dev`
- run frontend server - `npm run start`

# Setting up the data base

change the database connection url in the file `server/index.js` line no `59`

`mongoose.connect("mongodb://127.0.0.1:5000/the-gram-db");`

restore the dumb from the directory  
`dump` using `mongorestore`

`mongorestore --uri <connection string> <path to the backup>`

# Test user details to run the app

# Other details

- works well in mobile view
- To get OTP , check node logs or database
- use only `public` images to create new post
