
const mongoose = require('mongoose');


connectDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        });

        console.log('MongoDB connected');
    } catch (error) {
        console.log('MongoDB not connected', error.message);

        // process.exit(1);
    }
};


module.exports = connectDatabase;