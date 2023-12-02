using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business_Object_Layer
{
    public class Exam
    {
        public int sessionId { get; set; }

        public int id { get; set; }

        public string studentFirstName { get; set; }

        public string studentLastName { get; set; }

        public string subject { get; set; }

        public double marks { get; set; }

        public double percentage { get; set; }
        public void print() 
        {
            Console.WriteLine(sessionId);
            Console.WriteLine(id); 
            Console.WriteLine(studentFirstName);
            Console.WriteLine(studentLastName);
            Console.WriteLine(subject);
            Console.WriteLine(marks);
            Console.WriteLine(percentage);
        }
    }
   
}
