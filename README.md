 # Student Attendance Monitoring System
 A demo of **Student Attendance Monitoring System**, a web application developed using HTML, CSS, JavaScript and Django (A Python Framework)

 ## The Initial Flow
 1. **Students enter classroom**
    - They scan a **given QR code** or **enter the website** to the attendance monitoring page.

2. **Students enter student ID and full name to submit attendance**
    - Upon submission, attendance is logged with the current date and time automatically, viewable through the faculty dashboard.
3. **Teacher/Supervisor logs into the dashboard to view the attendance**

The attendance is, for now, saved into a local database (SQLite) built into Django. **This is not ready for deployment and is only in its testing/presentation stages**. There is no stable release and there are a lot of issues yet to be tackled (such as how this can be employed for several classrooms, not just 1.)

### TODO:
- ~~Faculty dashboard login~~
- ~~Faculty dashboard design~~
    - Current design is a prototype (IT'S TRASH)
- IP (or MAC?) address logging to prevent cheating (e.g. logging for others)
- Faculty dashboard settings & features
    - Such as the ability to export attendance into a downloadable .CSV or .PDF file
    - The feature to clear attendance entirely, add own entry manually (in case a student does not have internet connection), or remove a specific entry
- How do we employ such a change for several classrooms? (Current program is only designed for functionality for one classroom currently.)