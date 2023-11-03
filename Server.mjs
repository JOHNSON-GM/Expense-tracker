import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';
import open from 'open';

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files
app.use(express.static('public'));

// Handle form submission
app.post('/submit', (req, res) => {
  const userData = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };

  // Read existing JSON data from the file
  let jsonData = [];
  try {
    const existingData = fs.readFileSync('data.json', 'utf-8');
    try {
      jsonData = JSON.parse(existingData);
    } catch (parseError) {
      console.error('Error parsing JSON data:', parseError);
      // Handle the parsing error, e.g., by initializing jsonData to an empty array
      jsonData = [];
    }
  } catch (err) {
    console.error(err);
  }

  // Add the user input data to the JSON array
  jsonData.push(userData);

  // Convert the updated data back to JSON string
  const updatedData = JSON.stringify(jsonData, null, 2);

  // Write the updated data to the JSON file
  fs.writeFileSync('data.json', updatedData);

  res.send('Data saved successfully');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

open('http://localhost:' + port);
