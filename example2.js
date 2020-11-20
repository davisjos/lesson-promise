//Set up mongoose connection
var mongoose = require('mongoose');
var mongoDB = 'mongodb+srv://kjdmongo:kjdpassword@cluster0.uu7ac.mongodb.net/local_library?retryWrites=true&w=majority';
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;
db.on('error', function() { console.log('MongoDB connection error:') });
db.once('open', funDataOpen);

function funDataOpen() {
    const AuthorSchema = new mongoose.Schema({
        first_name: { type: String },
        family_name: { type: String },
        date_of_birth: { type: Date },
        date_of_death: { type: Date },
    });

    const Author = mongoose.model('Author', AuthorSchema);

    Author.find({ family_name: 'Asimov' })
        .sort('family_name')
        .exec(mycallback);

}

function mycallback(err, documents) {
    if (err) console.log("Could not find data")
    else {
        documents.forEach(function(item) {
            console.log(item.first_name + '  ' + item.family_name);
        });
    }
}