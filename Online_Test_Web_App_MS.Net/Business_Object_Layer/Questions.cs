using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
namespace Business_Object_Layer
{
    public class Questions
    {
        [BsonRepresentation(BsonType.ObjectId)]
        public String Id { get; set; } 
        public String question { get; set; }
        public String option1{ get; set; }
        public String option2 { get; set; }
        public String option3 { get; set; }
        public String option4 { get; set; }
        public String correct { get; set; }
    }
}
