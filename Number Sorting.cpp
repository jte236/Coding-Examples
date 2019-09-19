/*
-------------------------------------------------------------------------------------------
									CS 215 - 007 - Lab 1
-------------------------------------------------------------------------------------------

Author: Jack Teegarden

Date: Jan 22, 2018

Description: More user inputs, learing strings and if/else statements.

It actual sorts number in sequence order and also tells you the scovilles of 4 pepper types

the number and the peppers are two seprate programs in one that is why I have them seperated by a system("pause")
-------------------------------------------------------------------------------------------
*/

#include <iostream>
#include <string>
using namespace std;

int main() {

	//All variables for the program
	int num1 = 0 , num2 = 0, num3 = 0;
	string pepperChoice;
	
	// user inputs and outputs for the number part of the lab
	cout << "Enter a number: ";
	cin >> num1;
	cout << endl;
	cout << "Enter a number: ";
	cin >> num2;
	cout << endl;
	cout << "Enter a number: ";
	cin >> num3;
	cout << endl;

	// first part of code; sorting numbers
	// first set of if else statements for the numbers
	if (num1 <= num2 && num2 <= num3) 
	{
		cout << "Sorted they are: " << num1 << " " << num2 << " " << num3 << endl;
	}
	else if (num2 <= num1 && num1 <= num3)
	{
		cout << "Sorted they are: " << num2 << " " << num1 << " " << num3 << endl;
	}
	else if (num3 <= num2 && num2 <= num1)
	{
		cout << "Sorted they are: " << num3 << " " << num2 << " " << num1 << endl;
	}
	else if (num3 <= num1 && num1 <= num2)
	{
		cout << "Sorted they are: " << num3 << " " << num1 << " " << num2 << endl;
	}
	else if (num2 <= num3 && num3 <= num1)
	{
		cout << "Sorted they are: " << num2 << " " << num3 << " " << num1 << endl;
	}
	else if (num1 <= num3 && num3 <= num2)
	{
		cout << "Sorted they are: " << num1 << " " << num3 << " " << num2 << endl;
	}
	
	cout << endl;

	system("pause"); // adds a nice break to keep to user input simple so no one gets confused

	// Next part of code for peppers
	// pepper menu
	cout << endl;
	cout << "A. Aleppo Pepper\n";
	cout << "B. Banana Pepper\n";
	cout << "C. Cayenne Pepper\n";
	cout << "D. Dragons Breath\n";
	cout << endl;
	cout << "Enter a letter to choose a pepper: ";
	cin >> pepperChoice;
	cout << endl;

	//if else statements for the peppers
	if (pepperChoice == "A" || pepperChoice == "a") // Aleppo Pepper
	{
		cout << "That's 30,000 Scovilles of Heat!\n";
	}
	else if (pepperChoice == "B" || pepperChoice == "b") // Banana Pepper
	{
		cout << "That's 1,000 Scovilles of Heat\n";
	}
	else if (pepperChoice == "C" || pepperChoice == "c") // Cayenne Pepper
	{
		cout << "That's 40,000 Scovilles of Heat!!\n";
	}
	else if (pepperChoice == "D" || pepperChoice == "d") //Dragons Breath
	{
		cout << "That's 2,480,000 Scovilles of Heat !!!!!! YIKES!\n";
	}
	else
	{
		cout << "That pepper is not on the list\n"; // for anything that is entered that does not match up with list
	}

	system("pause"); // end of the program
	return 0;
}