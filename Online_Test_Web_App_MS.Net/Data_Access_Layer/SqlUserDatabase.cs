using Business_Object_Layer;
using System;

using MySql.Data.MySqlClient;
using System.Linq;

namespace Data_Access_Layer
{
    public class SqlUserDatabase
    {
        String query;
        User user = new User();

      //  SqlConnection con = new SqlConnection($"data source=RAMENDRA\\SQLEXPRESS; Initial Catalog = user; Integrated Security=true");
        MySqlConnection con = new MySqlConnection($"Server=localhost;User ID=root;Password=ramendra;Database=user");
        

        public String login(String username, String password)
        {
            MySqlCommand cmd = new MySqlCommand(query, con);
            cmd.Connection = con;
            con.Open();
            String privilege="AA";
            query = $"select privilege from userTable where userName='{username}' and passWord= '{password}'";
         cmd.CommandText = query;   
           MySqlDataReader reader = cmd.ExecuteReader();
            if (reader.Read())
            {
                 privilege = reader.GetString(0);
            }
            reader.Close();
            return privilege;
        }

        public int regestration(String firstname,String lastname,String username, String password, String privilege)
        {
            MySqlCommand cmd = new MySqlCommand(query, con);
            cmd.Connection = con;

            con.Open();
            query = $"insert into userTable values('{firstname}','{lastname}','{username}','{password}','{privilege}')";
            cmd.CommandText = query;
           int noOfRow =  cmd.ExecuteNonQuery();
            con.Close();
            return noOfRow;
        }
    }
}
