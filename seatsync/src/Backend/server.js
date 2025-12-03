const { Server } = require('socket.io');
const http = require('http');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // 1. Import cors
const dotenv = require('dotenv');
dotenv.config();
const movieRouter = require('./Routes/movieRoute.js');
const showtimeRouter = require('./Routes/showtimeRoute.js');
const auditoriumRouter = require('./Routes/auditoriumRoute.js');
const venueRouter = require('./Routes/venueRoute.js');
const bookingRouter = require('./Routes/bookingRoute.js');
const app = express();
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        // You must allow your frontend URL here, or Socket.IO will block the connection.
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});


io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);
    socket.on("Join_room", (showtimeId) => {
        socket.join(showtimeId); // <--- This is the magic function
        console.log(`User ${socket.id} joined room: ${showtimeId}`);
    });
    socket.emit('message', 'welcome to the booking window');
    socket.broadcast.emit('message', 'A user has joined the chat');
    socket.on('seat', (seat) => {
        const { showTimeId, seatNumber } = seat;
        console.log(seat);
        socket.to(showTimeId).emit("otherSelection", seatNumber);
    })
    socket.on("disconnect", () => {
        console.log("User Disconnected", socket.id);
    });
});

app.set('io', io);

const PORT = process.env.PORT || 5000;
const MONGO_PORT = process.env.MONGO_PORT || 27017;


app.use(express.json());
app.use("/api/v1/movies", movieRouter);
app.use("/api/v1/showtimes", showtimeRouter);
app.use("/api/v1/auditorium", auditoriumRouter);
app.use("/api/v1/venue", venueRouter);
app.use("/api/v1/bookings", bookingRouter);



mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected successfully to practiseMongoDB"))
    .catch((err) => console.error("MongoDB connection error:", err));


server.listen(PORT, () => {
    console.log(`app is running on port ${PORT}`);
});



// Why Two Different Connections: app.listen vs. mongoose.connect
// They are two separate connections because your application needs to connect to two different things: the internet and the database.

// Think of your application as a restaurant.

// app.listen (Opening the Restaurant)
// This starts your Express web server and opens a network port (e.g., 5000) to the outside world. This is like unlocking the front doors of your restaurant and turning on the "Open" sign. It allows customers (users on the internet) to come in and make requests.

// mongoose.connect (The Phone Line to Your Supplier)
// This creates a private, internal connection from your application to your separate MongoDB database server. This is like the restaurant's private phone line to its food supplier. The restaurant needs this connection to order ingredients (read and write data), but it's not for customers to use.




/********************************Begin********************************/


// The Simplest Explanation
// Parser = The Address Reader 📍
// Think of the parser as the brain inside Google Maps.

// You type in a messy address like "AMB Cinemas, gachibowli, hyd". The parser is what reads that text and figures out the exact, correct location on the map.

// useNewUrlParser: true was simply an instruction to use the new, smarter version of the address reader.

// Topology Engine = The Connection Manager 📶
// Think of the topology engine as your smart Wi-Fi router at home.

// Your router manages the connection for all your devices. If the main signal gets weak, it might automatically switch your phone to a booster to keep your connection stable. You don't even notice it happening.

// useUnifiedTopology: true was just an instruction to use the new, "smart router" system that could handle connection problems automatically.

// In short: one option was for reading the address correctly, and the other was for keeping the connection stable. Both are now built-in, so you can forget the terms and safely remove those lines from your code.