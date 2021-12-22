// This keeps track of all the moviess irrespective of the roles
const mongoose = require("mongoose");
const moviesSchema = mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    isPublic: {
        type: Boolean,
        required: true,
        defalt: true
    },
    movies: {
        type: Array,
        default: []
    },
    playlistName: {
        type: String,
    }


}, { timestamps: true });

module.exports = mongoose.model("Movies", moviesSchema);
