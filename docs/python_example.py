import sys
from PyQt5 import QtWidgets

class Example(QtWidgets.QWidget):
    def __init__(self):
        super().__init__()
        btn = QtWidgets.QPushButton('Button', self)
        btn.clicked.connect(lambda: print('hello'))
        self.setGeometry(300, 300, 300, 200)
        self.setWindowTitle('Example')
        self.show()

app = QtWidgets.QApplication([])
ex = Example()
sys.exit(app.exec_())
