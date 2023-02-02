import SearchResult from "../models/search.model.js";
import connectDB from "../services/connectDB.js";
connectDB();
const args = process.argv.slice(2);
const code = args[0];
const name = args[1];
const isAvailable = args[2];

if (!code || !name || !isAvailable) {
    console.log("Invalid or insufficient arguments!");
    process.exit(1);
}
const NewSearch = new SearchResult({ code, name, isAvailable });
try {
    await NewSearch.save();
    console.log("Saved!");
    process.exit();
} catch (error) {
    console.log(error);
    process.exit();
}
