using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Business_Object_Layer;
using MySqlX.XDevAPI;
using MongoDB.Bson;

namespace Data_Access_Layer
{
   public class QuestionBank
    {
        MongoClient mc= new MongoClient("mongodb://localhost:27017 ");
        public static List<Questions> GetQuestions()
        {
            var connectionString = "mongodb://localhost:27017";
            var client = new MongoClient(connectionString);
            var database = client.GetDatabase("Questions");
            var collection = database.GetCollection<Questions>("Questions");

            return collection.Find(new BsonDocument()).ToList();
        }

    }
}
