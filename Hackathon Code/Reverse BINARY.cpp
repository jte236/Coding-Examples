#include <iostream>

using namespace std;
int main() {
	long long binaryNumber = 0;
	int remainder, i = 1, step = 1;
	int n;
	
	cin >> n;
	while (n!=0)
	{
		remainder = n%2;
		cout << "Step " << step++ << ": " << n << "/2, Remainder = " << remainder << ", Quotient = " << n/2 << endl;
		n /= 2;
		binaryNumber += remainder*i;
		i *= 10;
	}
	cout << binaryNumber;
}