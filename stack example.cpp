#include <iostream>
using namespace std;

// CLASS NODE INTERFACE
class node {
public:
	friend class stack; // allow methods of class stack to access private members
	node();			    // give initial values to data members
private:
	int  data;			// data for this node
	node * next;		// pointer to the next node in the list
};

// CLASS NODE IMPLEMENTATION (write the constructor here)

node::node() {
	data = 0;
	next = NULL;
}


// CLASS STACK INTERFACE
class stack {
public:
	stack();			// init stack to empty stack
	void push(int x);	// allocate a new node, copy x into it, put it on the top of the stack
	int  pop();			// deallocate the top node and return the data that was in it.
						// print "Stack empty" and return 0 when the stack is empty.
	void print();		// print the data of all nodes, left to right, starting with the top.
private:
	node * top;			// pointer to top node of the stack, or NULL when stack is empty
};

// CLASS STACK IMPLEMENTATION (write methods here)
stack::stack() {
	top = NULL;

}

void stack::push(int newData) {
	node * n = new node;
	n->data = newData;
	n->next = top;
	top = n;
}

int stack::pop() {
	if (top->data == NULL) {
		cout << "Stack Empty";
		return 0; 
	}
	else {
		int oldData = top->data;
		node *n = top;
		top = top->next;
		delete n;
		return oldData;
	}
}

void stack::print() {
	node *n = top;
	if (top == NULL)
		cout << "List Empty";
	else {
		cout << "STACK(top first) " << top->data;
		while (n->next != NULL) {
			n = n->next;
			cout << " " << n->data;

		}
	}
	
}

// MAIN
int main() {
	stack s;
	int data, opt = 0;
	const int exit = 4;
	while (opt != exit) {
		cout << "\n1. Push\n2. Pop\n3. Print\n4. Exit\n===> ";
		cin >> opt;
		switch (opt) {
		case 1: cout << "Enter data to push: ";
			cin >> data;
			s.push(data);
			break;
		case 2: data = s.pop();
			cout << "Popped: " << data << endl;
			break;
		case 3: s.print(); break;
		case exit: cout << "Bye!\n"; break;
		default:   cout << "Invalid option, try again\n";
		}
	}
	system("pause");
	return 1;
}