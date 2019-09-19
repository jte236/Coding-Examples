
/*
-------------------------------------------------------------------------------------------
									CS 215 - 007 - Lab 3
-------------------------------------------------------------------------------------------

Author: Jack Teegarden

Date: Jan 30, 2018

Description: Hot dog stand menu and recipt total
deals with menu and calculates users final total after order is finished

Help from:

https://www.tutorialspoint.com/cplusplus/cpp_while_loop.htm

-------------------------------------------------------------------------------------------
*/

#include <iostream>
#include <string>
#include <iomanip>
using namespace std;

// constants for this program
const double TAX = 0.06;
const float PRICE_HOTDOG = 2.50;
const float PRICE_DELUXE_HOTDOG = 3.50;
const float PRICE_SMALL_DRINK = 1.50;
const float PRICE_LARGE_DRINK = 2.50;

int main()
{
	
	//All the variables for this program will go here
	int run = 1;
	string userEntry;
	double subtotal = 0.00;
	double totalTax = 0.00;
	float totalAmount = 0.00;
	float cash = 0.00;
	float change = 0.00;

	//Logo for the hot dog stand
	cout << "---------Jack's Hot Dog and Drink Stand-----------\n";

	while (run == 1)
	{
		//The menu
		cout << "H - Hot Dog        $2.50" << "      " << "D - Deluxe Hot Dog   $3.50\n";
		cout << "S - Small Drink    $1.50" << "      " << "L - Large Drink      $2.25\n";
		cout << "F - Finish Order        " << "      " << "X - Exit system           \n";
		cout << "Enter option ====> ";
		if (cin.peek() == '\n') cin.ignore();
		getline(cin, userEntry);
		cout << endl;
		char choice = userEntry[0];
		choice = toupper(choice);
		

		// now for the switch
		switch (choice)
		{
		   case 'H' :
			   subtotal = (float)subtotal + PRICE_HOTDOG;
			   cout << "Your Sub Total is: $ " << setprecision(2) << fixed << subtotal << endl;
			   break;
		   
		   case 'D' :
			   subtotal = subtotal + PRICE_DELUXE_HOTDOG;
			   cout << "Your Sub Total is: $ " << setprecision(2) << fixed << subtotal << endl;
			   break;

		   case 'S' :
			   subtotal = subtotal + PRICE_SMALL_DRINK;
			   cout << "Your Sub Total is: $ " << setprecision(2) << fixed << subtotal << endl;
			   break;

		   case 'L' :
			   subtotal = subtotal + PRICE_LARGE_DRINK;
			   cout << "Your Sub Total is: $ " << setprecision(2) << fixed << subtotal << endl;
			   break;

		   case 'F' :
			   cout << "Sub Total: $ " << subtotal << endl;
			   totalTax = TAX * subtotal;
			   cout << "Tax:       $ " << totalTax << endl;
			   totalAmount = totalTax + subtotal;
			   cout << "Total:     $ " << totalAmount << endl;
			   cout << "Enter cash:  ";
			   cin >> cash;
			   cout << endl;
			   change = cash - totalAmount;
			   cout << "Change:      " << change << endl;
			   subtotal = 0.00;
			   totalTax = 0.00;
			   totalAmount = 0.00;
			   cash = 0.00;
			   change = 0.00;
			   break;

		   case 'X' :
			   system("pause");
			   run = 0;
			   break;
		}


		
	}
	
	
	

	
	
	return 0;
}