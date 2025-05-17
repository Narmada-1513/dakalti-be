import mongoose, { ConnectOptions } from "mongoose";

export const connectToMongoDB = async (mongoDbUrl: string) => {
  try {
    await mongoose.connect(mongoDbUrl, {
      tls: true, 
      tlsAllowInvalidCertificates: false, 
      serverSelectionTimeoutMS: 5000, 
      socketTimeoutMS: 45000, 
    } as ConnectOptions); 
    console.log(`✅ Connected to MongoDB at ${mongoDbUrl}`);
  } catch (err) {
    console.error("❌ Could not connect to MongoDB:", err);
    process.exit(1); 
  }
};
