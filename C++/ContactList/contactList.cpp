#include "contactList.h"
#include "contact.h"
#include <iostream>
#include <string>
using namespace std;


contactList::contactList()
{
	listName = "";
	listLength = 0;
}
void contactList::setlistName(string newlistName)
{
	listName = newlistName;
}
string contactList::getlistName()
{
	return listName;
}
void contactList::setLength(int newLength)
{
	listLength = newLength;
}
int contactList::getLength()
{
	return listLength;
}
void contactList::setContact(contact newContact, int& num)
{
	list[num] = newContact;
}
contact contactList::getContact(int num)
{
	return list[num];
}
int contactList::searchByName(string searchName)
{
	int searchValue = NOT_FOUND;

	for (int i = 0; i < MAX_CONTACT; i++)
	{
		if (searchName == list[i].getName())
			searchValue = i;

	}

	return searchValue;
}
contact contactList::getContact(contactList list, int num)
{
	contact find;
	if (num >= 0 && num < MAX_CONTACT)
		find = list.getContact(num);
	return find;

}
void contactList::addContact(contact addContact, contactList& list)
{
	int  length = list.getLength();
	if(length > MAX_CONTACT -1)
	{
		cout << "contactList::addContact(): max contacts added" << endl;
		cout << addContact.getName() << " Not Added!" << endl;
	}
	else
	{
		list.setContact(addContact, length);
		length++;
		list.setLength(length);
		cout << addContact.getName() << " Added!";
	}
}
void contactList::print(contactList &list)
{
	contact print;
	cout << "List:" << list.getlistName() << "(" << list.getLength() << " contacts)" << endl;
	
	for (int j = 0; j < MAX_CONTACT; j++)
	{
		print.print();
		print = list.list[j];
		cout << endl;
	}
}


