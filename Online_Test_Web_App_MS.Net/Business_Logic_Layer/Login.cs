using Data_Access_Layer;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business_Logic_Layer
{
    public class Login
    {
        SqlUserDatabase _db = new SqlUserDatabase();
        SqlExamDatabase _examDb= new SqlExamDatabase();
        public String loginConfirmation(String username, String password) 
        {
            String privilege;
           
                 privilege = _db.login(username, password);
            
            
            if (privilege.Equals("true")) return "Welcome! to the Admin login";
            
            if (privilege.Equals("false")) return "Welcome! to the Student login";

            else  return "Wrong username or password"; 
        }

        public void regestration (int id,String firstName,String lastName,String username, String password,String privilege) 
        {
            _db.regestration(firstName,lastName,username,password,privilege);
            _examDb.studentLogin(id, firstName, lastName);
        }

    }
}
