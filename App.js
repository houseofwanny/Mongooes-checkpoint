
/** 1) Install & Set up mongoose */
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI);


//create a person schema
const personSchema = new Schema({
    name: { type: String, required: true },
    age: Number,
    favoriteFoods: [String]
  });



//Create and save a person 
var Person = mongoose.model('Person', personSchema);

var createAndSavePerson = function(done) {
  var OumaymaBj = new Person({name: "Jane Fonda", age: 84, favoriteFoods: ["eggs", "fish", "fresh fruit"]});

  OumaymaBj.save(function(err, data) {
    if (err) return console.error(err);
    done(null, data)
  });
};

//Create many records
var arrayOfPeople = [
    {name: "MedSalah", age: 27, favoriteFoods: ["Tacos Pasta"]},
    {name: "Firas", age: 28, favoriteFoods: ["Spaghetty chicken"]},
    {name: "Majed", age: 29, favoriteFoods: ["Chocolate"]}
  ];
  
  var createManyPeople = function(arrayOfPeople, done) {
    Person.create(arrayOfPeople, function (err, people) {
      if (err) return console.log(err);
      done(null, people);
    });
  };


//Search your database
var findPeopleByName = function(personName, done) {
    Person.find({name: personName}, function (err, personFound) {
      if (err) return console.log(err);
      done(null, personFound);
    });
  };

//Return a Single Matching Document from Your Database
var findOneByFood = function(food, done) {
    Person.findOne({favoriteFoods: food}, function (err, data) {
      if (err) return console.log(err);
      done(null, data);
    });
  };

//Search your database with id
var findPersonById = function(personId, done) {
    Person.findById(personId, function (err, data) {
      if (err) return console.log(err);
      done(null, data);
    });
  };
  
//Perform Classic Updates by Running Find, Edit, then Save
const findEditThenSave = (personId, done) => {
    const foodToAdd = 'Pasta';
    Person.findById(personId, (err, person) => {
      if(err) return console.log(err); 
      person.favoriteFoods.push(foodToAdd);
      //save
      person.save((err, updatedPerson) => {
        if(err) return console.log(err);
        done(null, updatedPerson)
      })
    })
  };  


//Perform New Updates on a Document Using model.findOneAndUpdate()
const findAndUpdate = (personName, done) => {
    const ageToSet = 20;
  
    Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}, (err, updatedDoc) => {
      if(err) return console.log(err);
      done(null, updatedDoc);
    })
  };

//Delete One Document Using model.findByIdAndRemove
var removeById = function(personId, done) {
    Person.findByIdAndRemove(
      personId,
      (err, removedDoc) => {
        if(err) return console.log(err);
        done(null, removedDoc);
      }
    ); 
  }; 
  

//MongoDB and Mongoose - Delete Many Documents with model.remove()  
const removeManyPeople = (done) => {
    const nameToRemove = "OumaymaBj";
    Person.remove({name: nameToRemove}, (err, response) => {
      if(err) return console.log(err);
      done(null, response);
    })
  };

//Chain Search Query Helpers to Narrow Search Results
       /* FIND BY NAME */  
       Model.find({ name: "Firas" });
       /* STORE FOR LATER */
       var findQuery = Model.find({ name: "Firas" });
       /* SORT BY AGE */
       Person.sort({ age: 1 });
       /* LIMIT SIZE TO SHOW ONLY 5 PERSONS*/
       Person.limit(5);
       /* TO NOT SHOW ALL THE RESULT (show = 1 , hide=0) */
       Person.select({ name: 0, age: 1 });

       /* CHAIN TOGETHER */
       Person.find({ age: 55 }) //find by age 
            .sort({ name: -1 })
            .limit(5) // limit only 5 persons
            .select({ favoriteFoods: 0 }) // hide the favourite food proprieties
            .exec(function(error, people) {
             });
