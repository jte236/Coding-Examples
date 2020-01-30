/*
-------------------------------------------------------------------------------------------
								 CS 215 - 007 - Lab 7
-------------------------------------------------------------------------------------------

Author: Jack Teegarden

Date: March 6, 2019

Description: Function fun
-------------------------------------------------------------------------------------------
*/

#include <iostream>
#include <string>
using namespace std;

const int MAX_FRACTION_LIST = 10;

struct fraction 
{
	int num;
	int den;
	float dec = 0.0;
};

//----------------------------------------------
//					printFrac
//----------------------------------------------

void printFrac(fraction &print)
{
	
	cout << print.num << " " << "/" << " " << print.den << " " << "(" << print.dec << ")";
}

//-----------------------------------------------
//					calcDecimal
//-----------------------------------------------

float calcDecimal(fraction &calc)
{

	calc.dec = (float)calc.num / (float)calc.den;
	return calc.dec;
}

//--------------------
//     askFunction
//--------------------

fraction askFraction()
{
	fraction f1;


	cout << "Enter a Numerator: ";
	cin >> f1.num;
	cout << "Enter a Denomantor: ";
	cin >> f1.den;


	while (f1.den == 0)
	{
		cout << "Invaild Entry!!!!!" << endl;
		cout << "Enter a number greater than 0" << endl;
		cout << endl;
		cout << "Enter a Denominator: ";
		cin >> f1.den;
	}

	f1.dec = calcDecimal(f1);

	return f1;
}

//------------------------
//     askFracList()
//------------------------

void askFracList(fraction fracs[], int &numFracs)
{
	cout << "How many fractions? (1-10): ";
	cin >> numFracs;

	while (numFracs < 1 || numFracs > 10)
	{
		cout << "Invaild Entry" << endl;
		cout << "How many fractions? (1-10): ";
		cin >> numFracs;
	}

	for (int i = 1; i <= numFracs; i++)
	{
		cout << "For fraction " << i << ":" << endl;
		fracs[i] = askFraction();
	}
	
}

//---------------------------
//     printFracList()
//---------------------------

void printFracsList(fraction fracs[], int &numFracs)
{


	for (int i = 1; i <= numFracs; i++)
	{
		printFrac(fracs[i]);
		cout << endl;
	}

}

void findMaxFraction(fraction frac[], int &numFracs)
{
	double max = frac[0].dec;
	int found = -1;

	for (int i = 1; i < numFracs; i++)
	{
		if (frac[i].dec > max)
		{
			max = frac[i].dec;
		}


	}

	for (int j = 0; j < numFracs; j++)
	{
		if (frac[j].dec == max)
		{
			found = j;
			
			cout << "The highest fraction is: ";
			printFrac(frac[found]);

		}
	}

}

int main()
{
	fraction fracs[MAX_FRACTION_LIST];
	fraction test;
	int numFracs;
	askFracList(fracs, numFracs);
	printFracsList(fracs, numFracs);
	findMaxFraction(fracs, numFracs);
	cout << endl;
	system("pause");
	return 0;
}