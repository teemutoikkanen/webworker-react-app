import os
os.environ["MKL_NUM_THREADS"] = "1" 
os.environ["NUMEXPR_NUM_THREADS"] = "1" 
os.environ["OMP_NUM_THREADS"] = "1" 

import random
import time
import numpy as np

list1 = []
nElements = 1000000
nArrays = 64    

numpyArray = np.random.random_sample(nElements*nArrays)




# t00 = time.time()
# for i in range(nElements*nArrays):
#     list1.append(random.uniform(0,1))
# t01 = time.time()




# t0 = time.time()
# for i in range(nArrays):
#     begin = i*nElements
#     end = i*nElements+nElements

#     # print(len(list1[begin:end]))
#     list1[begin:end].sort()
# t1 = time.time()

# print("sorting time: ", t1-t0)
# print("list creation time: ", t01-t00)

# Numpy sort

# import mkl
# mkl.set_num_threads(1)


t0n = time.time()
# numpyArray.sort()
for i in range(nArrays):
    begin = i*nElements
    end = i*nElements+nElements
    numpyArray[begin:end].sort()

t1n = time.time()


print("numpy sorting time: ", t1n-t0n)
