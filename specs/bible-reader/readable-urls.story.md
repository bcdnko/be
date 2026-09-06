# User Story: Readable URLs

As a **Bible researcher**\
I want the Bible URLs to be **human readable**\
So that it's clear what version, book, chapter and verse it leads to

## Acceptance Criteria

### R1: user is redirected to the exact chapter if URL points to a version or book

E: should redirect user to the 1st chapter of the book of Genesis when user opens /bible/kjv

E: should redirect user to the 1st chapter of the book of Matthew when user opens /bible/rst/mat

### R2: user can read the requested chapter

E: should display the correct chapter content when user requests /bible/kjv/job/5

E: should display the correct chapter content when user requests /bible/rst/rev/10

### R3: user is redirected to his default version

E: should redirect user to the version which he selected as the default in settings
