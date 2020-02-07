#include <iostream>

using namespace std;
int main() 
{
	int n = 0;
	int x = 0;
	int y = 0;
	
	cin >> x;
	cin >> y;
	cin >> n;
	
	for(int i=1; i<n+1; i++)
	{
		if(((i % x) == 0) && ((i % y) != 0))
			cout << "Fizz"<< endl;
		else if(((i % x) != 0) && ((i % y) == 0))
			cout << "Buzz" << endl;
		else if(((i % x) == 0) && ((i % y) == 0))
			cout << "FizzBuzz" << endl;
		else 
			cout << i << endl;
	}
	
}