const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const router = express.Router();

let otps = {};
let users = {};

const app = express();
app.use(express.json());
const PORT = 5300;

// Middleware
app.use(cors({ origin: 'http://localhost:4200' }));
app.use(bodyParser.json());

// Paths to JSON files
const userFilePath = path.join(__dirname, 'users.json');
const resetTokensPath = path.join(__dirname, 'resetTokens.json'); 
const accommodationFilePath = path.join(__dirname, 'accommodation.json');

// Helper functions for reading and writing JSON data
function readFile(filePath, callback) {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            if (err.code === 'ENOENT') {
                console.log(`${path.basename(filePath)} does not exist, initializing with an empty array.`);
                return callback(null, []);
            }
            return callback(err);
        }
        const parsedData = data ? JSON.parse(data) : [];
        callback(null, parsedData);
    });
}

function writeFile(filePath, data, callback) {
    fs.writeFile(filePath, JSON.stringify(data, null, 2), (err) => {
        if (err) {
            console.error(`Error writing to ${path.basename(filePath)} file:`, err);
            return callback(err);
        }
        console.log(`${path.basename(filePath)} data successfully saved.`);
        callback(null);
    });
}



// Function to read user data
const readUserFile = (filePath, callback) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, JSON.parse(data || '[]'));
        }
    });
};

// Function to write user data
const writeUserFile = (filePath, data, callback) => {
    fs.writeFile(filePath, JSON.stringify(data, null, 2), callback);
};

// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'mbsravanthi2006@gmail.com',
        pass: 'zfhj kjzl ygdl hnlu' // Use environment variables for security
    }
});

// Route to send OTP to user email
app.post('/api/send-otp', (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: 'Email is required' });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate 6-digit OTP
    otps[email] = otp; // Store OTP

    const mailOptions = {
        from: 'mbsravanthi2006@gmail.com',
        to: email,
        subject: 'Your OTP for Registration',
        text: `Your OTP is: ${otp}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).json({ message: 'Error sending OTP' });
        }
        res.status(200).json({ message: 'OTP sent to email' });
    });
});

// Route to validate OTP
app.post('/api/validate-otp', (req, res) => {
    const { email, otp } = req.body;

    if (!email || !otp) {
        return res.status(400).json({ message: 'Email and OTP are required' });
    }
    console.log(`Validating OTP for ${email}. Received OTP: ${otp}, Stored OTP: ${otps[email]}`);

    // Check if OTP is correct
    if (otps[email] === otp) {
        delete otps[email]; // OTP is validated, so remove it
        res.status(200).json({ message: 'OTP is valid' });
    } else {
        res.status(400).json({ message: 'Invalid or expired OTP' });
    }
});

// Route to complete registration after OTP validation
app.post('/api/register', (req, res) => {
    const { username, fullName, phone, email, password } = req.body;

    // Ensure all registration fields are present
    if (!username || !fullName || !phone || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    readUserFile(userFilePath, (err, users) => {
        if (err) {
            return res.status(500).json({ message: 'Error reading user data' });
        }

        // Check if user already exists
        const userExists = users.some(user => user.username === username);

    if (userExists) {
        return res.status(400).json({ message: 'User already exists! Try a different username.' });
    }

        // Add new user to the file
        const newUser = { username, fullName, phone, email, password };
        users.push(newUser);

        writeUserFile(userFilePath, users, (err) => {
            if (err) {
                return res.status(500).json({ message: 'Error saving user data' });
            }
            res.status(201).json({ message: `${username} registered successfully!` });
        });
    });
});


// Route for user login
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    readFile(userFilePath, (err, users) => {
        if (err) {
            return res.status(500).json({ message: 'Error reading user data' });
        }

        const user = users.find(user => user.username === username && user.password === password);
        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        res.status(200).json({ message: 'Login successful!' });
    });
});


function readUsersFiles() {
    const filePath = path.join(__dirname, 'users.json');
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
  }
  // Helper function to read accommodations from accommodation.json
function readAccommodationsFile() {
    const filePath = path.join(__dirname, 'accommodation.json');
  const data = fs.readFileSync(path.join(__dirname, 'accommodation.json'), 'utf8');
  return JSON.parse(data);
}
  
  // API endpoint to get user data by username
  app.get('/api/users/:username', (req, res) => {
    const users = readUsersFiles();
    const user = users.find(u => u.username === req.params.username);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  });
  
  

//sushma
  // Route for user login
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    readFile(userFilePath, (err, users) => {
        if (err) {
            return res.status(500).json({ message: 'Error reading user data' });
        }

        const user = users.find(user => user.username === username && user.password === password);
        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        res.status(200).json({ message: 'Login successful!' });
    });
});

// Function to read users.json file
function readUsersFiles() {
    const filePath = path.join(__dirname, 'users.json');
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
  }
  
  // Function to read accommodations.json file
  function readAccommodationsFile() {
    const filePath = path.join(__dirname, 'accommodation.json');
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
  }
  
  // API endpoint to update user data
  app.put('/api/users/:username', (req, res) => {
    const users = readUsersFiles();
    const index = users.findIndex(u => u.username === req.params.username);
  
    if (index !== -1) {
      const updatedData = { ...users[index], ...req.body };
  
      // Check for username duplication if it’s being changed
      if (updatedData.username !== users[index].username) {
        const existingUser = users.find(u => u.username === updatedData.username);
        if (existingUser) {
          return res.status(400).json({ message: 'Username already exists' });
        }
      }
  
      // Update user details in users.json
      const oldUsername = users[index].username;
      users[index] = updatedData;
      fs.writeFileSync(path.join(__dirname, 'users.json'), JSON.stringify(users, null, 2));
  
      // Read accommodations from accommodation.json and update the userName field
      const accommodations = readAccommodationsFile();
      let accommodationUpdated = false;
  
      accommodations.forEach(accommodation => {
        if (accommodation.userName === oldUsername) {  // Use userName for matching in accommodations
          accommodation.userName = updatedData.username; // Update userName in accommodation
          accommodationUpdated = true;
        }
      });
  
      if (accommodationUpdated) {
        // Write updated accommodations back to accommodation.json if there were changes
        fs.writeFileSync(path.join(__dirname, 'accommodation.json'), JSON.stringify(accommodations, null, 2));
      }
  
      res.json({ message: 'User updated successfully' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  });

//sushma
  

  
// Route for user login for admin dashboard
app.get('/api/users', (req, res) => {
    const filePath = path.join(__dirname, 'users.json');

    fs.readFile(filePath, 'utf-8', (err, data) => {
      if (err) {
        console.error('Error reading user data:', err);
        return res.status(500).json({ message: 'Error reading user data' });
      }
  
      try {
        const users = JSON.parse(data); // Ensure valid JSON parsing
        res.json(users);
      } catch (parseError) {
        console.error('Error parsing user data:', parseError);
        res.status(500).json({ message: 'Error parsing user data' });
      }
    });
  });
   
  app.use(express.json()); // Middleware to parse JSON bodies

const USERS_FILE_PATH = path.join(__dirname, 'users.json');

// Helper function to read users.json
const readUsersFile = () => {
  const data = fs.readFileSync(USERS_FILE_PATH, 'utf-8');
  return JSON.parse(data);
};

// Helper function to write to users.json
const writeUsersFile = (data) => {
  fs.writeFileSync(USERS_FILE_PATH, JSON.stringify(data, null, 2), 'utf-8');
};

// POST to add a new user
app.post('/api/users', (req, res) => {
    const newUser = req.body;
  
    try {
      const users = readUsersFile();
      if (users.some(user => user.username === newUser.username)) {
        return res.status(400).json({ message: 'Username already exists' });
      }
      users.push(newUser);
      writeUsersFile(users);
      res.status(201).json({ message: 'User added successfully' });
    } catch (error) {
      console.error('Error adding new user:', error);
      res.status(500).json({ message: 'Error adding new user' });
    }
  });
  
  // PUT to update a user
  app.put('/api/users/:username', (req, res) => {
    const username = req.params.username;
    const updatedUser = req.body;
  
    try {
      const users = readUsersFile();
      const userIndex = users.findIndex(user => user.username === username);
  
      if (userIndex === -1) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Check if new username is already in use by a different user
      if (username !== updatedUser.username && users.some(user => user.username === updatedUser.username)) {
        return res.status(400).json({ message: 'Username already exists' });
      }
  
      users[userIndex] = { ...users[userIndex], ...updatedUser };
      writeUsersFile(users);
      res.json({ message: 'User updated successfully' });
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ message: 'Error updating user' });
    }
  });
  
  // DELETE to remove a user
  app.delete('/api/users/:username', (req, res) => {
    const username = req.params.username;
  
    try {
      const users = readUsersFile();
      const filteredUsers = users.filter(user => user.username !== username);
  
      if (users.length === filteredUsers.length) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      writeUsersFile(filteredUsers);
      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ message: 'Error deleting user' });
    }
  });
  

// Edit (update) a user by username


// Route for forgot password
app.post('/api/forgotpassword', (req, res) => {
    console.log("Forgot password request received:", req.body);
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ message: 'Email is required' });
    }

    // Read user data from the userFilePath
    fs.readFile(userFilePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Error reading user data' });
        }

        const users = JSON.parse(data);
        const user = users.find(user => user.email === email);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Generate a token
        const token = crypto.randomBytes(20).toString('hex');
        const expirationTime = Date.now() + 3600000; // 1 hour expiration

        // Store the token with the user's email
        fs.readFile(resetTokensPath, 'utf8', (err, tokensData) => {
            if (err) return res.status(500).json({ message: 'Error reading reset tokens' });
            let tokens = [];
            if (tokensData) {
                tokens = JSON.parse(tokensData);
            }
            tokens.push({ email, token, expires: expirationTime });

            // Write updated tokens to file
            fs.writeFile(resetTokensPath, JSON.stringify(tokens), (err) => {
                if (err) return res.status(500).json({ message: 'Error saving reset tokens' });

                // Send email with reset link
                const transporter = nodemailer.createTransport({
                    service: 'Gmail',
                    auth: {
                        user: 'mbsravanthi2006@gmail.com', // replace with your email
                        pass: 'zfhj kjzl ygdl hnlu', // replace with your app password
                    },
                });

                const resetLink = `http://localhost:${PORT}/api/reset-password/${token}`;

                const mailOptions = {
                    from: 'mbsravanthi2006@gmail.com', // Update this to your email
                    to: email,
                    subject: 'Password Reset Request',
                    text: `Click the following link to reset your password: ${resetLink}`,
                };

                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.log("Error sending email:",error);
                        return res.status(500).json({ message: 'Failed to send email' });
                    }
                    res.status(200).json({ message: 'Password reset email sent' });
                });
            });
        });
    });
});
   


// Function to validate the reset token (add your logic here)
function validateToken(token) {
    // Check if the token is valid (this is a placeholder logic)
    return true; // Adjust your logic as needed
}

// Route to handle password reset (POST)
app.post('/api/reset-password/:token', (req, res) => {
    const token = req.params.token;
    const { newPassword } = req.body;

    if (!newPassword) {
        return res.status(400).json({ message: 'New password is required' });
    }

    // Read reset tokens
    fs.readFile(resetTokensPath, 'utf8', (err, tokensData) => {
        if (err) return res.status(500).json({ message: 'Error reading reset tokens' });

        const tokens = JSON.parse(tokensData);
        const resetToken = tokens.find(t => t.token === token);

        if (!resetToken) {
            return res.status(404).json({ message: 'Invalid or expired token' });
        }

        // Check if the token has expired
        if (resetToken.expires < Date.now()) {
            return res.status(400).json({ message: 'Token has expired' });
        }

        // Update the user's password
        fs.readFile(userFilePath, 'utf8', (err, userData) => {
            if (err) return res.status(500).json({ message: 'Error reading user data' });

            const users = JSON.parse(userData);
            const user = users.find(u => u.email === resetToken.email);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            user.password = newPassword; // Update password directly

            // Save updated users data
            fs.writeFile(userFilePath, JSON.stringify(users), (err) => {
                if (err) return res.status(500).json({ message: 'Error saving user data' });

                // Optionally, remove the token after successful reset
                tokens.splice(tokens.indexOf(resetToken), 1);
                fs.writeFile(resetTokensPath, JSON.stringify(tokens), (err) => {
                    if (err) return res.status(500).json({ message: 'Error saving reset tokens' });

                    res.status(200).json({ message: 'Password has been reset successfully' });
                });
            });
        });
    });
});

// Route to handle password reset (GET)
app.get('/api/reset-password/:token', (req, res) => {
    const token = req.params.token;

    // Read reset tokens
    fs.readFile(resetTokensPath, 'utf8', (err, tokensData) => {
        if (err) return res.status(500).json({ message: 'Error reading reset tokens' });

        const tokens = JSON.parse(tokensData);
        const resetToken = tokens.find(t => t.token === token);

        if (!resetToken) {
            return res.status(404).json({ message: 'Invalid or expired token' });
        }

        // Check if the token has expired
        if (resetToken.expires < Date.now()) {
            return res.status(400).json({ message: 'Token has expired' });
        }

        // If valid, redirect to the Angular reset password page
        res.redirect(`http://localhost:4200/reset-password/${token}`); // Adjust based on your frontend route
    });
});

// Middleware to serve static files, including users.json
app.use(express.static(path.join(__dirname)));

// Route to serve users.json
app.get('/users.json', (req, res) => {
  fs.readFile(path.join(__dirname, 'users.json'), 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading users.json:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }
    res.setHeader('Content-Type', 'application/json');
    res.send(data);
  });
});

// Route to check if the username exists
app.post('/check-username', (req, res) => {
  const { username } = req.body;

  // Read users.json
  fs.readFile(path.join(__dirname, 'users.json'), 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Internal server error' });
    }

    // Parse JSON data
    try {
      const users = JSON.parse(data); // Ensure we're parsing correctly

      // Check if the username exists
      const userExists = users.some(user => user.username === username); // Correct property: username

      if (userExists) {
        return res.json({ status: 'exists' });
      } else {
        return res.json({ status: 'not_found', registerUrl: '/register' });
      }
    } catch (parseError) {
      console.error(parseError);
      return res.status(500).json({ message: 'Error parsing users data' });
    }
  });
});



// Route for the registration page
app.get('/register', (req, res) => {
    res.send('<h1>Registration Page</h1><p>Please register here.</p>');
});
// Route for submitting accommodation form

const hotelData = {
    'Jaipur': { name: 'Jaipur Palace', address: 'Pink City, Jaipur' },
    'Udaipur': { name: 'Lake View Hotel', address: 'Lake Pichola, Udaipur' },
    'Jaisalmer': { name: 'Desert Inn', address: 'Fort Road, Jaisalmer' },
    'Jodhpur': { name: 'Blue City Stay', address: 'Clock Tower, Jodhpur' },

    'Agra': { name: 'Taj View', address: 'Taj Mahal Road, Agra' },
    'Varanasi': { name: 'Ganga Residency', address: 'Dashashwamedh Ghat, Varanasi' },
    'Lucknow': { name: 'Nawab’s Retreat', address: 'Hazratganj, Lucknow' },
    'Mathura': { name: 'Krishna Comfort', address: 'Janmabhoomi Road, Mathura' },

    'Alleppey': { name: 'Backwater Retreat', address: 'Punnamada, Alleppey' },
    'Munnar': { name: 'Tea Garden Stay', address: 'Chithirapuram, Munnar' },
    'Kochi': { name: 'Cochin Gateway', address: 'Marine Drive, Kochi' },
    'Varkala': { name: 'Cliff Side Inn', address: 'Cliff Road, Varkala' },

    'Mumbai': { name: 'Mumbai Stay', address: 'Juhu Beach, Mumbai' },
    'Pune': { name: 'Pune Comfort', address: 'FC Road, Pune' },
    'Aurangabad': { name: 'Ellora Residency', address: 'Ajanta & Ellora Caves, Aurangabad' },
    'Nashik': { name: 'Nashik Vineyard', address: 'Sula Vineyards, Nashik' },

    'Chennai': { name: 'Chennai Plaza', address: 'Marina Beach, Chennai' },
    'Madurai': { name: 'Meenakshi Stay', address: 'Temple Road, Madurai' },
    'Kanyakumari': { name: 'Cape Residency', address: 'Sunset Point, Kanyakumari' },
    'Ooty': { name: 'Hilltop Inn', address: 'Doddabetta Road, Ooty' },

    'Bengaluru': { name: 'Bangalore Residency', address: 'MG Road, Bengaluru' },
    'Mysore': { name: 'Mysore Comfort', address: 'Palace Road, Mysore' },
    'Hampi': { name: 'Hampi Heritage', address: 'Near Virupaksha Temple, Hampi' },
    'Coorg': { name: 'Coorg Bliss', address: 'Madikeri, Coorg' },

    'Kolkata': { name: 'Kolkata Heights', address: 'Park Street, Kolkata' },
    'Darjeeling': { name: 'Mountain View', address: 'Mall Road, Darjeeling' },
    'Sundarbans': { name: 'Sundarbans Retreat', address: 'National Park, Sundarbans' },
    'Shantiniketan': { name: 'Heritage Stay', address: 'Visva Bharati, Shantiniketan' },

    'Ahmedabad': { name: 'Ahmedabad Inn', address: 'Sabarmati Ashram, Ahmedabad' },
    'Kutch': { name: 'White Desert Resort', address: 'Rann of Kutch, Kutch' },
    'Gir National Park': { name: 'Lion’s Den', address: 'Gir Forest, Gir National Park' },
    'Somnath': { name: 'Somnath Comfort', address: 'Temple Road, Somnath' },

    'Amritsar': { name: 'Golden Temple Stay', address: 'Golden Temple Road, Amritsar' },
    'Chandigarh': { name: 'Chandigarh Plaza', address: 'Sector 17, Chandigarh' },
    'Ludhiana': { name: 'Ludhiana Residency', address: 'Clock Tower, Ludhiana' },
    'Patiala': { name: 'Patiala Palace', address: 'Qila Mubarak, Patiala' },

    'Hyderabad': { name: 'Hyderabad Haven', address: 'Charminar Road, Hyderabad' },
    'Warangal': { name: 'Warangal Comfort', address: 'Fort Road, Warangal' },
    'Ramoji Film City': { name: 'Ramoji Stay', address: 'Film City, Hyderabad' },
    'Khammam': { name: 'Khammam Residency', address: 'Fort Road, Khammam' },

    'Bhubaneswar': { name: 'Bhubaneswar Comfort', address: 'Temple Road, Bhubaneswar' },
    'Puri': { name: 'Puri Retreat', address: 'Jagannath Temple Road, Puri' },
    'Konark': { name: 'Sun Temple Stay', address: 'Sun Temple Road, Konark' },
    'Ganjam': { name: 'Ganjam Inn', address: 'Coastline, Ganjam' },

    'Visakhapatnam': { name: 'Hotel Visakha', address: 'Beach Road, Visakhapatnam' },
    'Amaravati': { name: 'Amaravati Stay', address: 'Stupa Road, Amaravati' },
    'Tirupati': { name: 'Tirupati Inn', address: 'Tirumala Hills, Tirupati' },
    'Kadapa': { name: 'Kadapa Comfort', address: 'City Center, Kadapa' },

    'Red Fort': { name: 'Heritage Stay', address: 'Chandni Chowk, Delhi' },
    'Qutub Minar': { name: 'Minar Residency', address: 'Qutub Complex, Delhi' },
    'India Gate': { name: 'India Gate View', address: 'Rajpath, Delhi' },
    'Humayun\'s Tomb': { name: 'Mughal Inn', address: 'Nizamuddin, Delhi' }
};

// Utility functions for reading/writing JSON data
function readFile(filePath, callback) {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) return callback(err);
        callback(null, JSON.parse(data || '[]'));
    });
}

function writeFile(filePath, data, callback) {
    fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8', callback);
}


// POST route to add accommodation data
app.post('/api/accommodation', (req, res) => {
    const accommodationData = req.body;
    const { userName, email, phone, fullName, checkin, checkout } = accommodationData;
    
    // Validate if the user exists by checking the username
    fs.readFile(path.join(__dirname, 'users.json'), 'utf8', (err, data) => {
        if (err) return res.status(500).json({ message: 'Error reading users data' });

        try {
            const users = JSON.parse(data);
            const userExists = users.some(user => user.username === userName); // Check if user exists

            if (!userExists) {
                return res.status(400).json({ message: 'Username not found. Please register first.' });
            }

            // Continue with adding accommodation if the user exists
            const place = accommodationData.place;
            if (hotelData[place]) {
                accommodationData.hotelName = hotelData[place].name;
                accommodationData.hotelAddress = hotelData[place].address;
            }

            // Check required fields
            const requiredFields = [
                'userName', 'email', 'phone', 'address', 'location', 'place',
                'accommodationType', 'priceRange', 'checkin', 'checkout', 'persons', 
                'roomType', 'payment'
            ];

            for (const field of requiredFields) {
                if (!accommodationData[field]) {
                    return res.status(400).json({ message: `Field ${field} is required` });
                }
            }

            // Check for duplicate accommodation entry
            readFile(accommodationFilePath, (err, accommodations) => {
                if (err) return res.status(500).json({ message: 'Error reading accommodation data' });

                const isDuplicate = accommodations.some(accom =>
                    accom.userName === accommodationData.userName &&
                    accom.email === accommodationData.email &&
                    accom.checkin === accommodationData.checkin &&
                    accom.checkout === accommodationData.checkout
                );

                if (isDuplicate) {
                    return res.status(400).json({ message: 'Accommodation for the same dates already exists for this user.' });
                }

                accommodations.push(accommodationData);

                writeFile(accommodationFilePath, accommodations, (err) => {
                    if (err) return res.status(500).json({ message: 'Error saving accommodation data' });
                    res.status(201).json({ message: 'Accommodation data saved successfully!' });

                    // Proceed with sending the email only if the user exists
                    const mailOptions = {
                        from: 'mbsravanthi2006@gmail.com',
                        to: accommodationData.email,
                        subject: 'Accommodation Confirmation',
                        text: `Dear ${accommodationData.userName},\n\nYour accommodation request has been received and it is confirmed.\n\nDetails:\n${JSON.stringify(accommodationData, null, 2)}\n\nThank you!`,
                    };

                    transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            return res.status(500).send({ message: 'Error sending email', error });
                        }
                        res.send({ message: 'Email sent successfully!', info });
                    });
                });
            });

        } catch (parseError) {
            console.error('Error parsing users data:', parseError);
            res.status(500).json({ message: 'Error processing users data' });
        }
    });
});


// Endpoint to fetch all bookings
app.get('/api/bookings', (req, res) => {
    fs.readFile(accommodationFilePath, 'utf-8', (err, data) => {
      if (err) {
        console.error('Error reading data:', err);
        res.status(500).json({ error: 'Failed to read data' });
      } else {
        res.json(JSON.parse(data));
      }
    });
  });
  
  // Endpoint to fetch all bookings by username
  app.get('/api/bookings/:username', (req, res) => {
    const { username } = req.params;
  
    fs.readFile(accommodationFilePath, 'utf-8', (err, data) => {
      if (err) {
        console.error('Error reading data:', err);
        res.status(500).json({ error: 'Failed to read data' });
        return;
      }
  
      const bookings = JSON.parse(data);
      const userBookings = bookings.filter((booking) => booking.userName === username);
  
      if (userBookings.length === 0) {
        
      } else {
        res.json(userBookings);
      }
    });
  });
  
  
  
  // Use express.json() middleware to parse JSON request bodies
  app.use(express.json());
  
  // DELETE booking endpoint (requires userName, place, and checkin)
app.delete('/api/bookings', (req, res) => {
    const { userName, place, checkin } = req.body;

    // Validate required fields
    if (!userName || !place || !checkin) {
        return res.status(400).json({ error: 'Missing required fields: userName, place, or checkin' });
    }

    fs.readFile(accommodationFilePath, 'utf-8', (err, data) => {
        if (err) {
            console.error('Error reading accommodation file:', err);
            return res.status(500).json({ error: 'Failed to read accommodation data' });
        }

        let bookings;
        try {
            bookings = JSON.parse(data); // Parse the data into JSON format
        } catch (parseError) {
            console.error('Error parsing accommodation data:', parseError);
            return res.status(500).json({ error: 'Failed to parse accommodation data' });
        }

        // Filter out the booking that matches userName, place, and checkin
        const updatedBookings = bookings.filter(
            (booking) => !(booking.userName === userName && booking.place === place && booking.checkin === checkin)
        );

        // If no bookings were deleted, return an error
        if (updatedBookings.length === bookings.length) {
            return res.status(404).json({ error: 'Booking not found for cancellation' });
        }

        // Write the updated data back to the accommodation file
        fs.writeFile(accommodationFilePath, JSON.stringify(updatedBookings, null, 2), 'utf-8', (writeError) => {
            if (writeError) {
                console.error('Error saving updated accommodation data:', writeError);
                return res.status(500).json({ error: 'Failed to save updated accommodation data' });
            }

            res.status(200).json({ message: 'Booking cancelled successfully' });
        });
    });
});

//Endpoint to send email
  app.post('/api/send-email', (req, res) => {
    const accommodationData = req.body;
    const { userName } = accommodationData;  // Extract the userName

    // First, check if the username exists in users.json
    fs.readFile(path.join(__dirname, 'users.json'), 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading users.json:', err);
            return res.status(500).json({ message: 'Internal server error' });
        }

        // Parse users.json
        try {
            const users = JSON.parse(data);

            // Check if the username exists
            const userExists = users.some(user => user.username === userName);

            if (!userExists) {
                // Return an error if the username doesn't exist, and ensure no further processing occurs
                return res.status(404).json({ });
            }

            // Proceed to send the email only if the user exists
            const mailOptions = {
                from: 'mbsravanthi2006@gmail.com', // Your email
                to: accommodationData.email, // Sending to the user's email
                subject: 'Accommodation Confirmation',
                text: `Dear ${accommodationData.userName},\n\nYour accommodation request has been received and it is confirmed.\n\nDetails:\n${JSON.stringify(accommodationData, null, 2)}\n\nThank you!`,
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return res.status(500).send({ message: 'Error sending email', error });
                }
                // Only send this response once after email is sent successfully
                return res.send({ message: 'Accommodation data saved and email sent successfully!', info });
            });

        } catch (parseError) {
            console.error('Error parsing users data:', parseError);
            return res.status(500).json({ message: 'Error parsing users data' });
        }
    });
});

  
// Route to get all accommodation entries
app.get('/api/accommodations', (req, res) => {
    readFile(accommodationFilePath, (err, accommodations) => {
        if (err) return res.status(500).json({ message: 'Error reading accommodation data' });
        res.status(200).json(accommodations);
    });
});


//Route to get all users

app.get('/api/users', (req, res) => {
    fs.readFile(userFilePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Error reading user data' });
        }

        try {
            const users = JSON.parse(data); // Parse the data to get users
            res.status(200).json(users);
        } catch (parseError) {
            return res.status(500).json({ message: 'Error parsing user data' });
        }
    });
});

app.get('/', (req, res) => {
    res.send('Server is up and running!');
});

// Feedback POST route
const feedbackFilePath = path.join(__dirname, 'feedback.json');

// Endpoint to submit feedback
app.post('/api/feedback', (req, res) => {
    const newFeedback = req.body;

    // Check if feedback.json exists, and create it if not
    fs.readFile(feedbackFilePath, 'utf8', (err, data) => {
        let feedbackData = [];
        if (!err && data) {
            feedbackData = JSON.parse(data);
        }

        // Append the new feedback entry
        feedbackData.push(newFeedback);

        // Write updated feedback data to feedback.json
        fs.writeFile(feedbackFilePath, JSON.stringify(feedbackData, null, 2), (writeErr) => {
            if (writeErr) {
                console.error('Error writing to feedback file:', writeErr);
                return res.status(500).json({ message: 'Failed to save feedback.' });
            }
            res.status(201).json({ message: 'Feedback submitted successfully!' });
        });
    });
});

// Endpoint to retrieve all feedback entries
app.get('/api/feedbacks', (req, res) => {
    fs.readFile(feedbackFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading feedback file:', err);
            return res.status(500).json({ message: 'Failed to load feedback data.' });
        }

        try {
            const feedbackData = JSON.parse(data);
            res.status(200).json(feedbackData);
        } catch (parseError) {
            console.error('JSON parsing error:', parseError);
            return res.status(500).json({ message: 'Error parsing feedback data.' });
        }
    });
});

// Path for agent registration JSON file
const agentRegFilePath = path.join(__dirname, 'agent-reg.json');

// Ensure JSON file exists
if (!fs.existsSync(agentRegFilePath)) {
    fs.writeFileSync(agentRegFilePath, JSON.stringify([]));
}

// Read and write data functions
const readAgentData = () => JSON.parse(fs.readFileSync(agentRegFilePath, 'utf-8'));
const writeAgentData = (data) => fs.writeFileSync(agentRegFilePath, JSON.stringify(data, null, 2));

// API endpoint to save agent registration data
app.post('/api/agent-register', (req, res) => {
    const { name, email, address, education, referenceName, comments, confirmation } = req.body;

    // Save data to JSON
    const agentData = { name, email, address, education, referenceName, comments, confirmation };
    const existingData = readAgentData();
    existingData.push(agentData);
    writeAgentData(existingData);

    res.status(201).json({ message: 'Agent registered successfully.' });
});

// Endpoint to retrieve all agent registration data
app.get('/api/agent-registers', (req, res) => {
    const agentData = readAgentData();
    res.json(agentData);
});

//Path for Admin login
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'admin123';

app.post('/admin/login', (req, res) => {
  const { username, password } = req.body;

  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});