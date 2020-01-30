/*
-------------------------------------------------------------------------------------------
									CS 215 - 007 - Lab 6
-------------------------------------------------------------------------------------------

Author: Jack Teegarden

Date: Feb 21, 2018

Description: reading numbers and putting them in the array and printing it out to a screen
-------------------------------------------------------------------------------------------
*/

#include <iostream>
#include <string>
#include <fstream>
#include <iomanip>
using namespace std;

const int NUM_OF_PRICES = 10;
const int REC_HOURS = 10;

int main()
{
	//variables used in program
	string txt_Name;
	double stockPrice[NUM_OF_PRICES];
	string name;
	string date;
	int recordHours[REC_HOURS];
	double change = 0;
	double average = 0;
	double median = 0;
	int hour = 8;

	cout << "What file do you want to open? ";
	cin >> txt_Name;
	cout << endl;

	ifstream fin;
	fin.open(txt_Name);
	if (fin.fail())
	{
		cout << "Unable to find file \n";
		system("pause");
		return 0;
	}

	//11 lines of data 
	// 10 prices

	fin >> name >> date;

	for (int i = 0; i < NUM_OF_PRICES; i++)
	{
		fin >> stockPrice[i];
	}

	fin.close();

	for (int g = 0; g < NUM_OF_PRICES; g++)
	{
		if (hour > 12)
		{
			hour = 1;
		}
		recordHours[g] = hour;
		hour = hour + 1;
	}


	cout << "Stock: " << name << "   Date: " << date << endl;
	cout << "Time" << "      Price\n";
	cout << "-----" << "     -------\n";

	for (int j = 0; j < REC_HOURS; j++)
	{
		if (hour < 10)
		{
			cout << setw(2);
		}
		cout << recordHours[j] << ":00"<< "      " << "$" << stockPrice[j] << endl;
	}

	change = stockPrice[NUM_OF_PRICES -1] - stockPrice[0];
	cout << endl << "Change:  $"<< change << endl;
	for (int x = 0; x < NUM_OF_PRICES - 1; x++)
	{
		for (int y = x + 1; y < NUM_OF_PRICES; y++)
		{
			if (stockPrice[x] < stockPrice[y])
			{
				double t = stockPrice[x];
				stockPrice[x] = stockPrice[y];
				stockPrice[y] = t;
			}
		}
	}

	cout << "High:    $" << setprecision(2) << fixed << stockPrice[0] << endl;
	cout << "Low:     $" << setprecision(2) << fixed << stockPrice[NUM_OF_PRICES - 1] << endl;
	for (int z = 0; z < NUM_OF_PRICES; z++)
	{
		average = average + stockPrice[z];
	}
	average = average / NUM_OF_PRICES;
	cout << "Average: $" << setprecision(2) << fixed << average << endl;
	median = (stockPrice[NUM_OF_PRICES / 2])+((stockPrice[(NUM_OF_PRICES/2)-1]));
	median = median / 2;
	cout << "Median:  $" << setprecision(2) << fixed << median << endl;
	system("pause");
	return 0;
}