package com.higradius;

import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

@WebServlet("/Search")
public class Search extends HttpServlet {
	private static final long serialVersionUID = 1L;
	// Storing the JDBC connection strings
	private static String dbURL = "jdbc:mysql://localhost:3306/hrc";
	private static String dbUsername = "root";
	private static String dbPassword = "root";
	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		List<HashMap<String, Object>> result = new ArrayList<HashMap<String, Object>>();
		try {
			// Getting the parameters from query string 
			Integer invoice_id = Integer.parseInt(request.getParameter("invoice_id"));
			
			String dbDriver = "com.mysql.jdbc.Driver";
			String fetchQuery = 
			"SELECT id, cust_number, name_customer, invoice_id, total_open_amount, pred_payment_date, due_date_pd, delay FROM invoice where invoice_id=?";

			// Connecting to the database
			Class.forName(dbDriver);
			Connection con = DriverManager.getConnection(dbURL, dbUsername, dbPassword);
			PreparedStatement ps = con.prepareStatement(fetchQuery);
			ps.setInt(1, invoice_id);
			
			// This is a select query so its gonna return data from database.
			// So first I am storing it in a hashmap
			ResultSet rs = ps.executeQuery();
			
			// Converting to required datatype and storing in another hashmap object row;
			while(rs.next()) {
				HashMap<String, Object> row = new HashMap<String, Object>();
				row.put("id", rs.getInt(1));
				row.put("cust_number", rs.getString(2));
				row.put("name_customer", rs.getString(3));
				row.put("invoice_id", rs.getLong(4));
				row.put("total_open_amount", rs.getFloat(5));
				row.put("pred_payment_date", rs.getDate(6));
				row.put("due_date_pd", rs.getDate(7));
				row.put("delay", rs.getInt(8));
				
				result.add(row);
			}
			
			
		} catch(Exception e) {
			e.printStackTrace();
		}
		
		// Creating gson object and sending the result list as JSON.
		Gson gson = new Gson();
		
		response.setContentType("application/json");
		response.getWriter().print(gson.toJson(result));

	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
