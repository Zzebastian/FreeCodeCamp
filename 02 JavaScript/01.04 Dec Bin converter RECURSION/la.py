def count_down_and_up(number):
    print(number)
    
    if number == 0:
        print("Reached base case")
        return
    else:
        count_down_and_up(number - 1)
        print(number)

count_down_and_up(3)
