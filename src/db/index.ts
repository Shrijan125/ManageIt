import mongoose from 'mongoose';

interface ConnectionObject {
  isConnected?: number;
}

const connection: ConnectionObject = {};

export const connectToDB = async () => {
  try {
    if (connection.isConnected) return;
    const db = await mongoose.connect(process.env.DATABASE_URL || '');
    connection.isConnected = db.connections[0].readyState;
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
