#pragma once
#include <string>
using namespace std;

class contact
{
public:
	contact();
	string getName();
	string getNum();
	void setName(string newName);
	void setNum(string newNum);
	void print();
	
private:
	string name;
	string num;
};

