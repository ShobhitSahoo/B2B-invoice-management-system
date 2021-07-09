package com.higradius;

import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

@WebServlet("/Edit")
public class Edit extends HttpServlet {
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
			Float amt = Float.parseFloat(request.getParameter("amt"));
			Integer id = Integer.parseInt(request.getParameter("id"));
			
			String dbDriver = "com.mysql.jdbc.Driver";
			String fetchQuery = "UPDATE invoice SET total_open_amount = ? WHERE id = ?;";
			
			// Connecting to the database
			Class.forName(dbDriver);
			Connection con = DriverManager.getConnection(dbURL, dbUsername, dbPassword);
			PreparedStatement ps = con.prepareStatement(fetchQuery);
			ps.setFloat(1, amt);
			ps.setInt(2, id);
			
			// Since this is an update query so using executeUpdate()
			rs = ps.executeUpdate() > 0;
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		// Creating gson object
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
		doGet(request, response);
	}

}
