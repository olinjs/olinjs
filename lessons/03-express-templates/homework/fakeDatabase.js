var FakeDatabase = module.exports = {

    data: [],

    add: function(obj) {
        //adds item to end of array holding data
        FakeDatabase.data.push(obj);
    },

    getAll: function() {
        //returns copy of array of all items in the database
        return FakeDatabase.data.slice();
    },

    remove: function(index) {
        //removes item located at index in array and returns it
        return FakeDatabase.data.splice(index,1);
    },

    killOldestCat: function() {
        var index_of_oldest;
        var oldest_age = 0;
        var name;
        for (var i = 0; i < FakeDatabase.data.length; i++) {
            if (FakeDatabase.data[i].age > oldest_age) {
                oldest_age = FakeDatabase.data[i].age;
                index_of_oldest = i;
            }
        }
        var cat = FakeDatabase.data[index_of_oldest];
        var forensics;
        if (cat != undefined) {
            forensics = [cat.name, cat.age];
        }
        FakeDatabase.remove(index_of_oldest);
        return forensics;
    }
}