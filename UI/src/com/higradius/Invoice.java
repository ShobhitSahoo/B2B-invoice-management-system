package com.higradius;

import java.sql.Date;

public class Invoice {
	protected int id;
	protected String cust_number;
	protected String name_customer;
	protected long invoice_id;
	protected float total_open_amount;
	protected Date pred_payment_date;
	protected Date due_date_pd;
	protected int delay;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getCust_number() {
		return cust_number;
	}
	public void setCust_number(String cust_number) {
		this.cust_number = cust_number;
	}
	public String getName_customer() {
		return name_customer;
	}
	public void setName_customer(String name_customer) {
		this.name_customer = name_customer;
	}
	public long getInvoice_id() {
		return invoice_id;
	}
	public void setInvoice_id(long invoice_id) {
		this.invoice_id = invoice_id;
	}
	public float getTotal_open_amount() {
		return total_open_amount;
	}
	public void setTotal_open_amount(float total_open_amount) {
		this.total_open_amount = total_open_amount;
	}
	public Date getPred_payment_date() {
		return pred_payment_date;
	}
	public void setPred_payment_date(Date pred_payment_date) {
		this.pred_payment_date = pred_payment_date;
	}
	public Date getDue_date_pd() {
		return due_date_pd;
	}
	public void setDue_date_pd(Date due_date_pd) {
		this.due_date_pd = due_date_pd;
	}
	public int getDelay() {
		return delay;
	}
	public void setDelay(int delay) {
		this.delay = delay;
	}
	
	
}
