<!-- Pending points -->
5: if i update the "time duration" change then auto scroll the timeline and also show the progress the "time duration" tab
 --> if its list start or end and the index is present at end points scroll the upper frame to the corresponding index

6: if the upper frame is "red" disable the "Proceed Btn", when the upper frame is over any gray area then change the upper frame color to red
7: "time duration" loader: show overlay on it with Activity indicator "dim"

<!-- Done Points -->
1: show only the: ex: 2, 2:30, 3 (timer)
2: on initial load set the pre selected date (today)
3: on initial load set the pre selected time (now) but
   --> current_minute < 30 , select 30
   ex: if 1:20 then show 1:30
   --> current_minute >= 30, select +hr:00
   ex: if 1:31 then show 2:00
Note: the end time is coming from duration 
4: if day pass user do not show the repeat booking time ==> Done
9: show Bottom Sheet when the repeat booking "Yes" is pressed,
   --> by def "No"
   --> if i did not select any thing on repeat booking bottom sheet then keep the old state
   --> if i select any thing on repeat booking bottom sheet (then select "Yes" & show selected item below the repeat booking)
11: Dynamic the upper frame of timeline based on duration
12: Merge Him in Real Screen
8: if no booking or under loading disabled the "Proceed Btn"
5: (P)  --> (Bug) if i change the "date" from date picker the round about value of time is changed and the logic is break
5: (P)  --> when i change the "date" from date picker call the getBookings API with new date data
5: (P)  --> while selecting range if the last matched range is not matched return -1
5: (P)  --> also limit the time picker to the timeline duration or show "the selected time is out of range"
5: (P)  --> also show the shimmer on timeline when select date from date picker
5: (P)  --> Set Error Styling or state on Time Tab
5: (P)  --> resolve AP,PM spacing issue with upper frame of the timeline
10: on timeline if there is AM,PM the frame inner data will be overflowed




<!-- Blocked -->
P#5 (1st): Invariant Violation: scrollToIndex should be used in conjunction with getItemLayout or onScrollToIndexFailed, otherwise there is no way to know the location of offscreen indices or handle failures.