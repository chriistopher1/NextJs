import { MongoClient } from "mongodb";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  const { email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const client = new MongoClient(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await client.connect();

    const db = client.db("furniture_database");
    const usersCollection = db.collection("users_table");

    const findUser = await usersCollection.findOne({ email });

    if (findUser !== null) {
      res.status(500).json({ message: "Email has been taken" });
      return;
    }

    // Insert the user data into the collection
    const result = await usersCollection.insertOne({
      email,
      password: hashedPassword, // Remember to hash and salt the password before inserting
    });

    if (result.acknowledged) {
      res.status(201).json({ message: "User created successfully" });
    } else {
      res.status(500).json({ message: "Failed to create user" });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  } finally {
    client.close();
  }
}
