import mongoose from "mongoose";

// // const connectDB=async()=>{

// // try{

  
// //   mongoose.connection.on('connected',()=>console.log("Database Connected"))
// //  await mongoose.connect(process.env.MONGODB_URL)
// // }

// // catch(error){
// // console.log(error)
// // };
// // }

// const connectDB=async()=>{
//   try{
  
//     await mongoose.connect('mongodb://127.0.0.1:27017/appointment')

//     // await mongoose.connect(process.env.MONGODB_URI)
//   console.log("Database is connected successfully")
// }

// catch(err){
// console.log(err) 
// }
// }
// export default connectDB

// import mongoose from "mongoose";
 const connectDB=()=>{
  mongoose.connect(process.env.MONGO_URI)
  .then(()=>{
    console.log("Connected to database!")
  }).catch(err=>{
    console.log(`Some error occured while connecting to database ${err}`)
  })
}
export default connectDB