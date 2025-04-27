import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDb conectado: ${conn.connection.host}`);
  } catch (error) {
    console.log("Erro de conexão com MongoDb:", error);
  }
};
