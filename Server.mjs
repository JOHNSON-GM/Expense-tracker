import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';
import open from 'open';

const app = express();
const port = 3001;

app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files
app.use(express.static('public'));

// Handle form submission
app.post('/submit', (req, res) => {
  const userData = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    category: req.body.category,
  };

  // Read existing JSON data from the file
  let jsonData = [];
  try {
    const existingData = fs.readFileSync('data.json', 'utf-8');
    try {
      jsonData = JSON.parse(existingData);
    } catch (parseError) {
      console.log(parseError)
      // Handle the parsing error, e.g., by initializing jsonData to an empty array
      jsonData = [];
    }
  } catch (err) {
    console.error(err);
  }

  const existingUser = jsonData.find((user) => user.email == userData.email);

  if(existingUser)
    console.log('/login.html');

  // Add the user input data to the JSON array
  jsonData.push(userData);

  // Convert the updated data back to JSON string
  const updatedData = JSON.stringify(jsonData, null, 2);

  // Write the updated data to the JSON file
  fs.writeFileSync('data.json', updatedData);

  res.redirect('/login.html');

});


// Handle log in

// Handle login form submission
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Read existing user data from the file
  const jsonData = JSON.parse(fs.readFileSync('data.json', 'utf-8'));

  // Check if the user exists in the JSON data
  const user = jsonData.find((userData) => userData.email === email && userData.password === password);

  if (user) {
    // Redirect to the homepage if the user is found
    res.redirect('/home.html');
  } else {
    // Handle authentication failure, e.g., show an error message
    res.send('Authentication failed. Please check your email and password.');
  }
});



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

open('http://localhost:' + port);
