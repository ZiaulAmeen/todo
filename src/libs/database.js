import mysql from "mysql2/promise";

export async function query({ query, values = [] }) {
  const dbconnection = await mysql.createConnection({
    host: "localhost",
    port: "3306",
    database: "ameendb",
    user: "root",
    password: "321Neema478",
  });

  try {
    const [results] = await dbconnection.execute(query, values);
    dbconnection.end();
    return results;
  } catch (error) {
    throw Error(error.message);
    return { error };
  }
}
// import mongoose from "mongoose";

// const connectMongoDB = async () => {
//   try {
//     await mongoose.connect(
//       "mongodb+srv://ameen:ameen_password@ats.rravmnm.mongodb.net/todo"
//     );
//     console.log("Connected to MongoDB.");
//   } catch (error) {
//     console.log(error);
//   }
// };

// export default connectMongoDB;
