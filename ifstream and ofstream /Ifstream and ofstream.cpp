/*
-------------------------------------------------------------------------------------------
								   CS 215 - 007 - Lab 4
-------------------------------------------------------------------------------------------

Author: Jack Teegarden

Date: Feb 7, 2019

Description: Read one file, then write a new file
-------------------------------------------------------------------------------------------
*/


#include <iostream>
#include <string>
#include <fstream>
#include <iomanip>
using namespace std;

int main()
{
	// Variables 
	string day;
	int highTemp = -999;
	int lowTemp = 999;
	int numofReadings;
	int temp;

	ifstream fin;
	fin.open("tempsin.txt");
	if (fin.fail())
	{
		cout << "Unable to find file \n";
		system("pause");
		return 0;
	}

	ofstream fout;
	fout.open("tempsout.txt");
	if (fout.fail())
	{
		cout << "Failed to write file\n";
		system("pause");
		return 0;
	}

	fout << "Date      " << " High" << " Low " << endl;
	fout << "----------" << " ----" << " ----" << endl;

	fin >> day >> numofReadings;

	while (day != "ENDOFDATA")
	{

		//four lines of data 
		// lots of numbers


		for (int i = 0; i < (numofReadings); ++i)
		{
			fin >> temp;
			if (highTemp < temp)
			{
				highTemp = temp;
			}
			if (lowTemp > temp)
			{
				lowTemp = temp;
			}
		}


		
		fout << day << "  " << highTemp << " " << lowTemp << endl;
		fin >> day >> numofReadings;

	}

	fin.close();
	fout.close();
	return 0;
}
