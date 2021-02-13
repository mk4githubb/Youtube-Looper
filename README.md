# Youtube Looper
###### A chrome extension to make a Youtube video loop between two given times.

### Motivation
Do you often find a section of a song better than the whole song and you only want to listen to the your favourite portion?

This extension solves this exact problem. You can now put the timings you want to keep repeating on Youtube and this extension will keep looping the video between the given times.

### Solution
This extension takes two time inputs from the user, i.e start and finish time, and sets up a loop between those two times.

##### Input time format
User can enter time in the following formats:
* If the time is in seconds just enter the value i.e. 5.
* If the time has minutes and seconds `m:ss`/`mm:ss` should be used.
* If the time has hours, minutes and seconds `h:mm:ss`/`hh:mm:ss` should be used.

##### Logic
At the core of this extension, Javascript's `setInterval` method is used to put the playing video on loop.

### What's next?
In the next iterations of this extension the following things will be added:
* better UI
* list songs you want to loop
* support for other websites such as youtube music, spotify and other music and video streaming apps.