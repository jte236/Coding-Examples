//-------------------------------------------------------------------
//                      CS 215 - Spring 2019
//                            Lab 8 
//-------------------------------------------------------------------
// Name:        TODO: YOUR NAME HERE
// Section:     TODO: YOUR SECTION HERE
// Description: Test driver program for the contact and contactList
//              classes
//-------------------------------------------------------------------
#include <iostream>
// TODO: include the header file (interface) for contactList class.
// include other header files if needed
#include "contactList.h"
#include "contact.h"
#include <iostream>
#include <iomanip>
using namespace std;

const int EXIT_OPT = 7;

//------------------------------------------------------------
//							getOpt
//------------------------------------------------------------
int getOpt() {
	int opt = 0;
	cout << "\n1. Add contact\n";
	cout << "2. Get contact by index\n";
	cout << "3. Search by name\n";
	cout << "4. Print contact list\n";
	cout << "5. Name the list\n";
	cout << "6. Get contact list stats\n";
	cout << "7. Exit\n";
	cout << "Enter option: ";
	cin >> opt;
	cin.ignore();
	return opt;
}

//------------------------------------------------------------
//							testAddContact
//------------------------------------------------------------
void testAddContact(contactList & list) {
	string name, phone;
	contact newContact;
	cout << "Enter new contact name:  ";
	getline(cin, name);
	cout << "Enter new contact phone: ";
	getline(cin, phone);
	// TODO: declare a contact object; populate it with the data
	// entered by the user; add it to the list (about 4 lines of code)

	newContact.setName(name);
	newContact.setNum(phone);
	list.addContact(newContact, list);


} // testAddContact()

//------------------------------------------------------------
//							testByIndex
//------------------------------------------------------------
void testByIndex(contactList & list) {
	int index;
	cout << "Enter index: ";
	cin >> index;
	cin.ignore();
	// TODO: declare a contact object to "catch" the value returned
	// by getContact(); set it the result of invoking the getContact()
	// method in the list. Invoke the print() method in the contact
	// object returned. (really: just 2 lines of code needed)

	contact newContact = list.getContact(list, index);
	newContact.print();


} // testByIndex()

//------------------------------------------------------------
//							testSearch
//------------------------------------------------------------
void testSearch(contactList & list) {
	string name;
	int i;
	cout << "Enter search name: ";
	getline(cin, name);
	// TODO: invoke the searchByName() method in the list object,
	// passing it the name entered above. When NOT_FOUND (-1) is
	// returned, just print "Not Found".
	// When an object is found, invoke getContact() in the list object,
	// giving it the index found by the search. Declare a contact 
	// object to "catch" the contact returned. Invoke print() in the
	// contact returned. (around 5-7 lines of code)

	i = list.searchByName(name);
	if (i == -1)
		cout << "Not Found" << endl;
	else
	{
		contact foundContact = list.getContact(i);
		foundContact.print();
	}



} // testSearch()

//------------------------------------------------------------
//							testSetName
//------------------------------------------------------------
void testSetName(contactList & list) {
	string name;
	cout << "Enter list name: ";
	getline(cin, name);
	// TODO: set the name of the list object to the string
	// entered by the user (1 line)
	list.setlistName(name);
} // testSetName()

//------------------------------------------------------------
//							testGetStats
//------------------------------------------------------------
void testGetStats(contactList & list) {
	// TODO: complete the following cout by retrieving
	// the number of contacts and name from the list object.
	cout << "Number of Contacts: " << list.getLength()
		<< "\nName of List:       " << list.getlistName();
} // testGetStats()

//------------------------------------------------------------
//							main
//------------------------------------------------------------
int main() {
	// TODO: declare on object of class contactList named list
	contactList list;
	int option = 0;

	while (option != EXIT_OPT) {
		option = getOpt();
		switch (option) {
		case 1: testAddContact(list); break;
		case 2: testByIndex(list);    break;
		case 3: testSearch(list);     break;
		case 4: list.print(list);         break;
		case 5: testSetName(list);    break;
		case 6: testGetStats(list);   break;
		case EXIT_OPT: cout << "Thanks for playing!\n"; break;
		default: cout << "Invalid option, try again\n";
		} // end switch
	} // end while not EXIT option

	system("pause");
	return 0;
} // main()