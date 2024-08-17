require("dotenv").config();
const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

const uri = process.env.MONGODB_URI;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server
    await client.connect();
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );

    const database = client.db("Scic-Task");
    const bookCollection = database.collection("Books");

    app.get("/books", async (req, res) => {
      const {
        page = 1,
        limit = 9,
        search = "",
        categoryName = "",
        sort = "asc",
        minPrice = 0,
        maxPrice = Infinity,
      } = req.query;
    
      const query = {};
    
      if (search) {
        query.title = { $regex: search, $options: "i" };
      }
    
      if (categoryName && categoryName !== "All") {
        query.categoryName = categoryName;
      }
    
      query.price = {
        $gte: parseFloat(minPrice), 
        $lte: parseFloat(maxPrice), 
      };
    
      const sortOrder = sort === "asc" ? 1 : -1;
    
      const books = await bookCollection
        .find(query)
        .sort({ price: sortOrder })
        .skip((page - 1) * parseInt(limit))
        .limit(parseInt(limit))
        .toArray();
    
      const totalBooks = await bookCollection.countDocuments(query);
      const totalPages = Math.ceil(totalBooks / limit);
    
      res.send({ books, totalPages });
    });
    
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
  }
}

// Call run to initialize MongoDB connection and start API server
run();

app.get("/", (req, res) => {
  res.send("Scic Task Is Running");
});

app.listen(port, () => {
  console.log(`Scic Task is running on port ${port}`);
});
