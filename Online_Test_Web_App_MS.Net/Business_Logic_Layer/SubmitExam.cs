using Business_Object_Layer;
using Data_Access_Layer;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business_Logic_Layer
{
    internal class SubmitExam
    {
        SqlExamDatabase _examdb;
        public Boolean submitExam (int sessionid, int id, String subject, double marks, double percentage)
        {
            int confirationNumber=_examdb.submitExam(sessionid, id, subject, marks, percentage);
            if(confirationNumber==1) { return true; }  
            return false;    
        }

       
    }
}
