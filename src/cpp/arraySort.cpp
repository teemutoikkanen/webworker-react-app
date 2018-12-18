

#include <algorithm>
#include <stdio.h>      /* printf, scanf, puts, NULL */
#include <stdlib.h>     /* srand, rand */
#include <time.h>       /* time */
#include <algorithm>
#include <functional>
#include <array>
#include <iostream>

#include <ctime>
#include <vector>


int main () {

    
    srand(time(NULL));

    int nElements = 500000;
    int nArrays = 16;
    int length = nElements*nArrays;
    

    std::vector<float> vec1;
    
    //generete a std::vector with random variables
    std::clock_t begin1 = clock();
    for (int i = 0; i < length; i++) {
        vec1.push_back(rand() % 100);
        // std::cout  << array1[i] << "\n";
    }
    std::clock_t end1 = clock();

    //sort arrays & time it
    std::clock_t begin = clock();
    
    // std::sort(vec1.begin(), vec1.end());
    for (int i = 0; i < nArrays; i++) {
        std::sort(vec1.begin()+i*nElements, vec1.begin()+i*nElements+nElements);
    }
    
    std::clock_t end = clock();


    std::cout << "sort time: " << double(end-begin) / CLOCKS_PER_SEC;
    std::cout << "creation time: " << double(end1-begin1) / CLOCKS_PER_SEC;

}



//  int main();