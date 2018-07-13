import cv2
import cv2 as cv

# Hue profiles based on first frame of videos

white_keeper_hp = 74.0
green_keeper_hp = 40.0
red_player_hp = 30.0
blue_player_hp = 50.0
referee_hp = 50.0
linesman_hp = 25.0

# Range width

range_width = 10.0
range_width_half = range_width / 2
range_width_half = int (range_width_half)

def is_white_keeper(average_hue):
   
    if white_keeper_hp - range_width_half <= round(average_hue,3) <= white_keeper_hp + range_width_half:
        return True
    return False

def is_green_keeper(average_hue):
    
    if green_keeper_hp - range_width_half <= round(average_hue,3) <= green_keeper_hp + range_width_half:
        return True
    return False

def is_red_player(average_hue):
   
    if red_player_hp - range_width_half <= round(average_hue,3) <= red_player_hp + range_width_half:
        return True
    return False

def is_blue_player(average_hue):
    
    if blue_player_hp - range_width_half <= round(average_hue,3) <= blue_player_hp + range_width_half:
        return True
    return False

def is_referee(average_hue):
    
    if referee_hp - range_width_half <= round(average_hue,3) <= referee_hp + range_width_half:
        return True
    return False

def is_linesman(average_hue):
    
    if linesman_hp - range_width_half <= round(average_hue,3) <= linesman_hp + range_width_half:
        return True
    return False

def average_hue(x, y, width, height, frame):
    hsv = cv2.cvtColor(frame, cv2.COLOR_BGR2HSV)
    sum = 0
    n_points = 0
    
    ysize, xsize, _ = hsv.shape 
    
    if (x+width+1>xsize):
        tot_width=xsize-1
    else:
        tot_width=x+width
    
    if (y+height+1>ysize):    
        tot_height=ysize-1
    else:
        tot_height=y+height
    
    for i in range(x, tot_width + 1):
        for j in range(y, tot_height + 1):
           sum += hsv[j, i, 0]
           n_points += 1
    return sum / n_points

def white_keeper(first_frame):    
    hue_avg = average_hue(x=401, y=1615, width=20, height=60, frame=first_frame)
    print ("White keeper: %d" % (hue_avg))

def green_keeper(first_frame):    
    hue_avg = average_hue(x=296, y=941, width=18, height=32, frame=first_frame)
    print ("Green keeper: %d" % (hue_avg))

def red_player(first_frame):    
    hue_avg = average_hue(x=491, y=210, width=46, height=74, frame=first_frame)
    print ("Red player: %d" % (hue_avg))

def blue_player(first_frame):    
    hue_avg = average_hue(x=270, y=377, width=14, height=45, frame=first_frame)
    print ("Blue player: %d" % (hue_avg))

def referee(first_frame):    
    hue_avg = average_hue(x=309, y=197, width=20, height=50, frame=first_frame)
    print ("Referee: %d" % (hue_avg))

def linesman(first_frame):    
    hue_avg = average_hue(x=589, y=1562, width=23, height=70, frame=first_frame)
    print ("Linesman: %d" % (hue_avg))
    
