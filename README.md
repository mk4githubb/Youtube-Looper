# Youtube Looper
###### A chrome extension to make a Youtube video loop between two given times.

### Motivation
Do you often find a section of a song better than the whole song and you only want to listen to the your favourite portion?

This extension solves this exact problem. You can now put the timings you want to keep repeating on Youtube and this extension will keep playing the video during this times.

### Solution
This extension takes two integer time inputs from user, i.e start and finish time, and sets up a loop between those two times.

##### Logic
At the core of this extension, Javascript's `setInterval` method is used to put the playing video on loop.

### What's next?
In the next iterations of this extension the following things will be added:
* Better UI
* support for other websites such as youtube music, spotify and other music and video streaming apps.