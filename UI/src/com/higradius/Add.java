package com.higradius;

import java.io.IOException;
import java.sql.Connection;
import java.sql.Date;
import java.sql.DriverManager;
import java.sql.PreparedStatement;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

@WebServlet("/Add")
public class Add extends HttpServlet {
	private static final long serialVersionUID = 1L;
	// Storing the JDBC connection strings
	private static String dbURL = "jdbc:mysql://localhost:3306/hrc";
	private static String dbUsername = "root";
	private static String dbPassword = "root";
	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		boolean rs = true;
		try {
			// Getting the parameters from query string 
			String C_name = request.getParameter("cust_name");
			String C_no = request.getParameter("cust_no");
			Float total_amt = Float.parseFloat(request.getParameter("total_amt"));
			Integer invoice_id = Integer.parseInt(request.getParameter("invoice_id"));
			Date dueDate = Date.valueOf(request.getParameter("due"));
			
			String dbDriver = "com.mysql.jdbc.Driver";
			String fetchQuery = "INSERT INTO invoice (cust_number, name_customer, total_open_amount, invoice_id, due_date_pd) VALUES (?, ?, ?, ?, ?);";
			
			// Connecting to the database
			Class.forName(dbDriver);
			Connection con = DriverManager.getConnection(dbURL, dbUsername, dbPassword);
			PreparedStatement ps = con.prepareStatement(fetchQuery);
			ps.setString(1, C_no);
			ps.setString(2, C_name);
			ps.setFloat(3, total_amt);
			ps.setInt(4, invoice_id);
			ps.setDate(5, dueDate);
			
			rs = ps.executeUpdate() > 0;
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		Gson gson = new Gson();
		response.setContentType("application/json");
		
		// Sending the acknowledgement
		if(rs==true)
			response.getWriter().print(gson.toJson("Success"));
		else
			response.getWriter().print(gson.toJson("Unsuccessful"));
	}

	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		// INSERT INTO mytable_null (cust_number, name_customer, total_open_amount, invoice_id, due_date_pd) VALUES (?, ?, ?, ?, ?);

		// http://localhost:8080/H2HBABBA1626/Add.do?cust_name=${}&cust_no=${}&invoice_id=${}&total_amt=${}&due=${}
		
		doGet(request, response);
	}

}
