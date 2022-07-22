import pylas
import numpy as np

las = pylas.create()

array = np.linspace(0.0, 15.0, 10000)
las.x = array
las.y = array
las.z = array

las.write('diagonal.las')