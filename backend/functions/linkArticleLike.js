exports = async function(changeEvent){
  const { fullDocument } = changeEvent;
  const { article, _id } = fullDocument;
  const mongodb = context.services.get("mongodb-atlas");
  const articles = mongodb.db("blog").collection("Article");
  await articles.updateOne(
    { _id: article },
    { $push: { likes: _id } }
  )
};
