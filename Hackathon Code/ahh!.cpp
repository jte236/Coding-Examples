#include <iostream>
#include <string>

using namespace std;
int main() {
	
	string x;
	string y;
	
	cin >> x;
	cin >> y;
	
	if (x.length() < y.length())
		cout << "no";
	else
		cout << "go";
}