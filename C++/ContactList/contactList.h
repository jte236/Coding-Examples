#pragma once
#include<string>
#include "contact.h"
const int MAX_CONTACT = 5;
const int NOT_FOUND = -1;
class contactList
{
public:
	contactList();
	void setlistName(string newlistName);
	string getlistName();
	void setLength(int newLength);
	int getLength();
	void setContact(contact newContact, int& num);
	contact getContact(int num);
	int searchByName(string searchName);
	contact getContact(contactList list, int num);
	void addContact(contact addContact, contactList& list);
	void print(contactList &list);


private:
	string listName;
	int listLength;
	contact list[MAX_CONTACT];
};

