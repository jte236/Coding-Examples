/*
-------------------------------------------------------------------------------------------
										CS 215 - 007 - Lab 1
-------------------------------------------------------------------------------------------

Author: Jack Teegarden

Date: Jan 16, 2018

Description: My first C++ program. This program does Math Between two numbers
-------------------------------------------------------------------------------------------
*/


#include <iostream>
using namespace std;

int main() {
	
	int numOne, numTwo, sum, diff, prod, quoatint;
	float quoat;
	cout << "+------------------------------+\n";
	cout << "|      Fun with Math!          |\n";
	cout << "|    By: Jack Teegarden        |\n";
	cout << "+------------------------------+\n";

	cout << "Enter a number:       ";
	cin >> numOne;
	cout << "Enter another number: ";
	cin >> numTwo;
	cout << "\n";
	cout << "\n";
	
	sum = numOne + numTwo; //adding
	diff = numOne - numTwo;//subtracting
	prod = numOne * numTwo;//multiplication
	quoat = (float)numOne / numTwo;//divison float
	quoatint = numOne / numTwo;//divison int

	cout << "Sum:                  " << sum << endl;
	cout << "Difference:           " << diff << endl;
	cout << "Product:              " << prod << endl;
	cout << "Int Quotient:         " << quoatint << endl;
	cout << "Float Quotient:       " << quoat << endl;

	system("pause");
	return 0;
}