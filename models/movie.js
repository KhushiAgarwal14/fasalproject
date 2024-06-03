const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieSchema = new Schema({
    title: {
        type: String
    },
    year: {
        type: String
        
    },
    type: {
        type: String
        
    },
    poster: {
        type: String
        
    }
});

module.exports = mongoose.model('Movie', movieSchema);
