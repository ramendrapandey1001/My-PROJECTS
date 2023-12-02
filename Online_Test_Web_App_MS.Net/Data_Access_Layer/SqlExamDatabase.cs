using Business_Object_Layer;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data_Access_Layer
{
    public class SqlExamDatabase
    {

        String query;
        User user = new User();
        MySqlConnection con = new MySqlConnection($"Server=localhost;User ID=root;Password=ramendra;Database=user");

        public int studentLogin(int id,String studentfirdtname, String studentlastname) 
        {
            MySqlCommand cmd = new MySqlCommand(query, con);
            cmd.Connection = con;
            con.Open();
            query = $"insert into examTable values(0,{id},'{studentfirdtname}','{studentlastname}','NoSubject',0,0)";
            cmd.CommandText = query;    
            int noOfRows=cmd.ExecuteNonQuery();
            con.Close();    
            return noOfRows;
        }

        public int submitExam(int sessionid,int id, String subject,double marks,double percentage)
        {
            MySqlCommand cmd = new MySqlCommand(query, con);
            cmd.Connection = con;
            con.Open();

            query = $"update examTable set sessionId={sessionid},subject='{subject}',marks={marks},percentage={percentage} where id={id}";
            cmd.CommandText = query;
            int noOfRows=cmd.ExecuteNonQuery();
            con.Close();
            return noOfRows;
            
        }

        public SortedDictionary<double, Exam> displayLeaderboard() 
        {
           SortedDictionary<double,Exam> studentList= new SortedDictionary<double,Exam>();
            
            MySqlCommand cmd = new MySqlCommand(query, con);
            cmd.Connection = con;
            con.Open();

            query = $"Select id, StudentFirstName,studentLastName,marks,percentage from examTable";
            cmd.CommandText = query;
            MySqlDataReader reader = cmd.ExecuteReader();
            while (reader.Read())
            {
                Exam exam = new Exam();
                exam.id = reader.GetInt32(0);
                exam.studentFirstName = reader.GetString(1);
                exam.studentLastName = reader.GetString(2);
                exam.marks = reader.GetDouble(3);
                exam.percentage = reader.GetDouble(4);
                studentList.Add(exam.marks, exam);
                exam.print();
                
            }
                con.Close();
            return studentList;
        }
    }
}
