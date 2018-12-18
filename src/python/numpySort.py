import timeit
import numpy as np

setup = '''
import numpy as np

s = np.random.randint(0, 1000, size=500000*16)'''

repeats = 2
cycles = 1
min_time = np.min( timeit.Timer('a=s.copy(); a.sort()', setup=setup).repeat(7,cycles))
print( "Best NumPy sort time: {:.1f} us".format(1e6*min_time/cycles) )