const mongoose = require('mongoose');

// One user has many plants
// A plant belongs to a user
const plantSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        commonName: String,
        photoUrl: String
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model("Plant", plantSchema);