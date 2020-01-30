/*
-------------------------------------------------------------------------------------------
							     CS 215 - 007 - Lab 5
-------------------------------------------------------------------------------------------

Author: Jack Teegarden

Date: Feb 13, 2019

Description: Use of for loop and while/do loops. It creates a menu and has user interact with
options till the user clicks x to exit.
-------------------------------------------------------------------------------------------
*/


#include <iostream>
#include <string>
using namespace std;

int main()
{
	// Variables used in the program
	int x = 1;
	int startNum = 0, endNum = 0, sum = 0;
	int boxSize;
	string userChoice;

	// while do loop for the whole program
	do
	{

		cout << "S - Sum Between\n";
		cout << "B - Print Box  \n";
		cout << "X - Exit       \n";
		cout << "Enter Option: ";

		// getline() function
		if (cin.peek() == '\n') cin.ignore(); 
		getline(cin, userChoice);
		cout << endl;
		char choiceSBX = userChoice[0]; 
		choiceSBX = toupper(choiceSBX);

		// makes sure user enters the correct choice
		while (choiceSBX != 'S' && choiceSBX != 'B' && choiceSBX != 'X')
		{
			// lets user beaware of wrong answer choice
			cout << "Invaild Option! Try again!\n";

			// Restates menu options for the user to select
			cout << "S - Sum Between\n";
			cout << "B - Print Box  \n";
			cout << "X - Exit       \n";
			cout << "Enter Option:    ";

			// makes choice capitol
			cin >> userChoice;
			choiceSBX = userChoice[0];
			choiceSBX = toupper(choiceSBX);
			cout << endl;
		}

		switch (choiceSBX)
		{
			case 'S':
				cout << "Enter a starting number: ";
				cin >> startNum;
				cout << endl;
				cout << "Enter an ending number:  ";
				cin >> endNum;
				cout << endl;

				for (int i = startNum; i <= endNum; i++)
				{
					sum += i;
				}

				

				cout << "The sum is: " << sum << endl << endl;
				break;

			 case 'B':
				 cout << "Please enter a number between 1 and 15: ";
				 cin >> boxSize;


				 //prints a box
				 for (int i = 0; i < boxSize; i++) {
					 cout << endl;
					 cout << "*" << " ";
					for (int j = 0; j < boxSize - 1; j++) {
						cout << "*" << " ";
						 }
				 }
				 cout << endl;
				 cout << endl;
				 break;

			 case 'X':
				 cout << "Thanks for playing!\n";
				 x = 0;
				 break;

		}

	} while (x == 1);

	system("pause");
	return 0;
}