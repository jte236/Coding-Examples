#include <iostream>
#include <string>

using namespace std;
int main() {

	int x = 0;
	string line;
	
	cin >> x;
	getline(cin, line);
	
	for(int i=0; i<x+1; i++)
	{
		
		if(line.find("Simon says") == 0)
		{
			line.erase(line.begin(), line.begin()+6);
			line.erase(line.begin(), line.begin()+5);
			cout << line << endl;
		}
		getline(cin, line);
		
	}
	
	
}