exports = async function(changeEvent){
  // Destructure out fields from the change stream event object
  const { fullDocument } = changeEvent;
  // Check if the author field was updated
  const { author, _id } = fullDocument;
  const mongodb = context.services.get("mongodb-atlas");
  const authors = mongodb.db("blog").collection("Author");
  await authors.updateOne(
    { _id: author },
    { $push: { articles: _id } }
  )
};
