#include "contact.h"
#include <iostream>
#include <iomanip>
using namespace std;


contact::contact()
{
	name = "";
	num = "";
}

void contact::setName(string newName)
{
	name = newName;
}

void contact::setNum(string newNum)
{
	num = newNum;
}

string contact::getName()
{
	return name;
}

string contact::getNum()
{
	return num;
}

void contact::print()
{
	cout << num << setw(12);
	cout << " " << name;

}