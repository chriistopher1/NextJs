import { MongoClient } from "mongodb";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  const { email, password } = req.body;

  const client = new MongoClient(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await client.connect();

    const db = client.db("furniture_database");
    const usersCollection = db.collection("users_table");

    const user = await usersCollection.findOne({ email });

    if (user) {
      // Compare the entered password with the hashed password using bcrypt.compare
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        res.status(200).json({ message: "User found" });
      } else {
        res.status(401).json({ message: "Incorrect password" });
      }
    } else {
      res.status(404).json({ message: "Email not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  } finally {
    client.close();
  }
}
