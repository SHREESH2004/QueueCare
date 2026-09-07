import app from "./app";
import { connectDB } from "./db";

const PORT = 5000;

async function startServer() {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`QueueCare server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start QueueCare:", error);
    process.exit(1);
  }
}

startServer();