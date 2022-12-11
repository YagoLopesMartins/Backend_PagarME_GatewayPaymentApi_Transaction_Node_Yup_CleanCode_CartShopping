// import "dotenv/config";
import dotenv from "dotenv";
dotenv.config();

export default {
    url: process.env.MONGODB_URI
};