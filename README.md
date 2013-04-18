courseRecommender
=================

A course recommender system written in JavaScript.


## Content based filtering

*Available techniques:*

- cosine similarity
- nearest neighbour
- classification

#### Course to course similarity
| 		   | Course 1 | Course 2 | Course 3
|------------------------------------------|
| Course 1 | 	1	|	?		|	?		| 
| Course 2 | 	?	| 	1		|   ? 		|
| Course 3 |	?	|	?		|	1		|

To determine course similarity we calculate the normalized value of comparing the following values:

* Lecturer
* Tutor
* Core: If the course is an elective or not.

-------------------------
## Collaborative filtering

*Techniques used:*

- cosine similarity
- nearest neighbour
- clustering
- classification


To determine student similarity we use the following:

* Level: undergraduate or postgraduate.
* Gender: Genders often tend to take the same courses.
* local: Consider local vs international.
* GPA: Higher GPA students may prefer more difficult courses.

## Putting it together

