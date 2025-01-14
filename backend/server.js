const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const User = require('./models/user');
const Employee = require('./models/employeeModel');

const employeeRoutes = require('./routes/employeeRoutes');
const path = require('path')

const dotenv = require('dotenv')
dotenv.config();

const app = express();
//const PORT = 5000;
const JWT_SECRET = 'your_jwt_secret_key';

// Middleware
app.use(express.json());
app.use(cors());

app.use(cors({ origin: 'http://localhost:5173' }));

app.use(bodyParser.json());

///////////////////////////////
///deployment//////
const _dirname1 = path.resolve();
if(process.env.NODE_ENV ==="production"){
  app.use(express.static(path.join(_dirname1,"/frontend/dist")))
app.get('*',(req,res)=>{
  res.sendFile(path.resolve(_dirname1,"frontend","dist","index.html"))
});

}else{
  app.get("/",(req,res)=>{
    res.send("API is running succrssfully")
  });
}

// Log the MongoDB URI to ensure it's correct
console.log('MongoDB URI:', process.env.MONGO_URI);


// Connect to MongoDB

mongoose.connect(process.env.MONGO_URI, 
  
  
  {
  
  
  useNewUrlParser: true, useUnifiedTopology: true, connectTimeoutMS: 30000
})
  .then(() => {
    
    console.log(`MongoDB connected to: ${mongoose.connection.host}`)
  })
  .catch((err) => {
    console.log('MongoDB connection error:', err);
  });

// Routes
app.use('/api/employees', employeeRoutes);

// Login route
app.post('/api/login', async (req, res) => {
    const { siteName, email, password } = req.body;
    try {
  
      console.log("Request Body:", req.body); // Log request payload for debugging
  
      const user = await User.findOne({ siteName,email }).select('+password');
      if (!user) {return res.status(404).json({ success: false, message: 'User not found' });
    }
  
  
   // Ensure the password field exists
   if (!user.password) {
    return res.status(400).json({ success: false, message: 'No password stored for this user' });
  }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch){ return res.status(400).json({ success: false, message: 'Invalid password' });
      }
  
  
      // const token = jwt.sign({ id: user._id }, JWT_SECRET);
  
  
  
  // Check if the admin login already exists in the Employee collection
  const existingEmployee = await Employee.findOne({ email });
  
  if (!existingEmployee) {
    // Add the admin login details to the Employee collection
    const newEmployee = new Employee({
      userId: user._id,
      siteName: user.siteName,
      email: user.email,
      
      role:'admin', // You might want to hash this before saving
    });
  
    await newEmployee.save();
    console.log('Admin login data added as employee');
  }
  
  
  
  const token = jwt.sign({ id: user._id }, JWT_SECRET,{ expiresIn: '1d' });
  
  
      return res.json({ success: true, token,
        user:{
          id: user._id,
          siteName:user.siteName,
          email: user.email
        },
  
  
       });
    } catch (err) {
   console.error("Error during login:", err.message,err.stack); // Log the actual error
   res.status(500).json({ success: false, message: 'Server error' });
    }
  });
       



  // Signup route
  app.post('/api/signup', async (req, res) => {
    const { siteName,  email, password } = req.body;
    try {
      console.log("Request Body:",req.body)
      const userExists = await User.findOne({ email });
      if (userExists) return res.status(400).json({ success: false, message: 'User already registered' });
  
      
      const newUser = new User({siteName, email, password });
      await newUser.save();
  
      return res.json({ success: true , message:'user registered successfully'});
    } catch (err) {
      console.error("Error during signup:", err);
      res.status(500).json({ success: false, message: 'Server .....error' });
    }
  });
  app.post('/api/logout', (req, res) => {
    // Clear the token on the server-side (if using server-side sessions)
    res.clearCookie('token');
    return res.status(200).json({ message: 'Logged out successfully' });
  });
  
  
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Define valid categories and subcategories
  
  
  const categorySubcategories = {
    Board: ['2-inch', '4-inch', '8-inch'],
    Hardware: ['Nails', 'Bolts', 'Screws'],
    'Electric item': ['Wires', 'Switches', 'Sockets'],
  };
  
  
  
  // Order Schema
  const orderSchema = new mongoose.Schema(
    {
  
      category: {
        type: String,
        // enum: Object.keys(categorySubcategories),
        required: true,
      },
      subcategory: {
        type: String,
        validate: {
          validator: function (value) {
            //check if category  exists
            if (!this.category) return false;
            ///get  subcategories for the selected category 
  
            const currentSubcategories = categorySubcategories[this.category] || [];
  ///allow new subcategories to be added dynamically
  return currentSubcategories.includes(value) || true; 
            //return categorySubcategories[this.category]?.includes(value);
          },
          message: (props) => `${props.value} is not a valid subcategory for the selected category.`,
        },
      },
      location: { type: String, required: true },
      quantity: { type: Number, required: true },
      siteName: { type: String, required: true },
      createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      createdAt: { type: Date, default: Date.now },
  
  },
  
  );
  
  const Order = mongoose.model('Order', orderSchema);
  
  
  // Middleware to authenticate users
  
  const authenticate = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    console.log("Token:", token); // Log the token
    if (!token) return res.status(401).json({ error: 'Unauthorized access' });
  
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      const user = await User.findById(decoded.id);
      if (!user) return res.status(404).json({ error: 'User not found' });
  
      req.user = { id: user._id, siteName: user.siteName }; // Attach user info to request
      next();
    } catch (error) {
      console.error('Authentication error:', error);
      res.status(403).json({ error: 'Invalid or expired token' });
    }
  };
  
  
  
  // API to fetch categories and subcategories
  app.get('/api/categories', (req, res) => {
    res.status(200).json(categorySubcategories);
  });
  
  
  
  // API to handle order creation
  app.post('/api/orders',authenticate, async (req, res) => {
    try{
      console.log('order data:', req.body)
    const {category,subcategory, quantity, location } = req.body;
    
    const siteName = req.user?.siteName;
  
    if (!siteName) {
      return res.status(400).json({ error: 'Site name is required.' });
    }
  
  
    if(!category ||  !location || !quantity ||(category ==='Board','Hardware','Electric item' &&!subcategory )) {
      return res.status(400).json({ message: 'All fields are required' });
    }
  
  const newOrder = new Order({ 
        //  user:req.user._id,
        category, subcategory, quantity, location ,quantity,siteName,createdBy:req.user.id,
      });
      
   await newOrder.save();
  res.status(201).json(newOrder);
  
  
   } catch (err) {
      console.error(err);
        // Log the error details
      res.status(500).json({ error: 'Failed to create order' });
  };
  });
  
  
  // API to get all orders
  
  
  app.get('/api/orders', async (req, res) => {
    try {
       const orders = await Order.find();
      res.status(200).json(orders);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch orders' });
    }
  }); 
  // API to update an order
  app.put('/api/orders/:id', authenticate, async (req, res) => {
    try {
      const order = await Order.findById(req.params.id);
      if (order)
        
        {
       
         order.quantity = req.body.quantity || order.quantity;
        order.location = req.body.location || order.location;
        order.category = req.body.category || order.category;
        order.subcategory = subcategory || order.subcategory;
  
  
      const updatedOrder = await order.save();
        res.json(updatedOrder);
      } else {
        res.status(404).json({ message: 'Order not found' });
      }
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
  // API to delete an order
  app.delete('/api/orders/:id',authenticate, async (req, res) => {
    try {
      const order = await Order.findByIdAndDelete(req.params.id);
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
      res.json({ message: 'Order deleted successfully' });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

const PORT = process.env.PORT || 5000;
  
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
  