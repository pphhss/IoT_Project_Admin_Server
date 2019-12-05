class A():
    def __init__(self,_a):
        self.a = _a
        print("A INIT")
    
    def getA(self):
        return self.a

class B(A):
    def __init__(self,_a):
        pass

b = B(2,3)
print(b.getA())