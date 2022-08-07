Site Title : Epic Viewer

Site URL : https://epic-viewer-capstone.herokuapp.com/

Description : This site provides a reading environment for the viewing of Classical epic poetry.
	      Currently, the sole language involved is Latin; future expansion to Greek and beyond
	      would be anticipated.

User Flow : The site user is first directed to a landing page where they can register a user profile for the site,
	    or log in if previously registered. Once logged in, the user is redirected to the "authors" resource page,
	    which lists all of the authors currently in the site's database. This also includes a responsive search feature,
	    allowing for filtering of the authors based on the search criterion/-a. Each author links to a page listing
	    all of the works by said author in the database. These lists are searchable identical to the authors list.
	    There is also a page linked in the navigation bar which lists each and every work in the database (similar to authors).
	    Each "work" page is a list of the lines of poetry from said work. Finally, each line links to a "details" page
	    where further information specific to the line is displayed.

API : This site uses an API and a database custom-developed for the project.

Tech Stack : This application uses the PERN (PostgreSQL, Express.js, React, Node.js) stack.