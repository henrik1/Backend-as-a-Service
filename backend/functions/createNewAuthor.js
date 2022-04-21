exports = function(authEvent){
  const mongodb = context.services.get("mongodb-atlas");
  const authors = mongodb.db("blog").collection("Author");
  const { user } = authEvent;
  const _id = new BSON.ObjectId(user.id);
  const newUser = {
    _id,
    _partition: user.id,
    name: user.data.email,
    email: user.data.email,
    articles: []
  };

  authors.insertOne(newUser);
};
