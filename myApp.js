const mongoose = require("mongoose");
const Schema = mongoose.Schema;

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });

const personSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	age: Number,
	favoriteFoods: [String],
});

const Person = mongoose.model("Person", personSchema);

const createAndSavePerson = done => {
	const newPerson = new Person({
		name: "Test",
		age: 0,
		favoriteFoods: ["Test", "Test2"],
	});
	newPerson.save((err, data) => {
		if (err) return done(err);
		done(null, data);
	});
};

const createManyPeople = (arrayOfPeople, done) => {
	Person.create(arrayOfPeople, (err, data) => {
		if (err) return done(err);
		done(null, data);
	});
};

const findPeopleByName = (personName, done) => {
	Person.find({ name: personName }, (err, data) => {
		if (err) return done(err);
		done(null, data);
	});
};

const findOneByFood = (food, done) => {
	Person.findOne({ favoriteFoods: food }, (err, data) => {
		if (err) return done(err);
		done(null, data);
	});
};

const findPersonById = (personId, done) => {
	Person.findById(personId, (err, data) => {
		if (err) return done(err);
		done(null, data);
	});
};

const findEditThenSave = (personId, done) => {
	const foodToAdd = "hamburger";
	Person.findById(personId, (err, data) => {
		if (err) return done(err);
		data.favoriteFoods.push(foodToAdd);
		data.save((err, data) => {
			if (err) return done(err);
			done(null, data);
		});
	});
};

const findAndUpdate = (personName, done) => {
	const ageToSet = 20;
	Person.findOneAndUpdate(
		{ name: personName },
		{ age: ageToSet },
		{ new: true },
		(err, data) => {
			if (err) return done(err);
			done(null, data);
		},
	);
};

const removeById = (personId, done) => {
	Person.findByIdAndRemove(personId, (err, data) => {
		if (err) return done(err);
		done(null, data);
	});
};

const removeManyPeople = done => {
	const nameToRemove = "Mary";
	Person.remove({ name: nameToRemove }, (err, data) => {
		if (err) return done(err);
		done(null, data);
	});
};

/** # C[R]UD part V -  More about Queries # 
/*  ======================================= */

/** 12) Chain Query helpers */

// If you don't pass the `callback` as the last argument to `Model.find()`
// (or to the other similar search methods introduced before), the query is
// not executed, and can even be stored in a variable for later use.
// This kind of object enables you to build up a query using chaining syntax.
// The actual db search is executed when you finally chain
// the method `.exec()`, passing your callback to it.
// There are many query helpers, here we'll use the most 'famous' ones.

// Find people who like "burrito". Sort them alphabetically by name,
// Limit the results to two documents, and hide their age.
// Chain `.find()`, `.sort()`, `.limit()`, `.select()`, and then `.exec()`,
// passing the `done(err, data)` callback to it.

const queryChain = function(done) {
	const foodToSearch = "burrito";

	done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

/** # Further Readings... #
/*  ======================= */
// If you are eager to learn and want to go deeper, You may look at :
// * Indexes ( very important for query efficiency ),
// * Pre/Post hooks,
// * Validation,
// * Schema Virtuals and  Model, Static, and Instance methods,
// * and much more in the [mongoose docs](http://mongoosejs.com/docs/)

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
