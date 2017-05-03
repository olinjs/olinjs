# Lesson 13 - Agile

## Goals
![ConceptTower](/images/lesson13.png)

## Intro
In the most simple interpretation, agile is a project management methodology and attitude.
When you go work full time on software the odds are very good that you will be using some version of agile.
Agile in its purest form is more of a set of attitudes than a step by step guide.
Hopefully this document and this class will help convey some of these attitudes and philosophies.

## Before Agile
Talking about agile is easier when you are first aware of what software development usually looked like before agile.
In the past, software would be developed using what has become known as waterfall strategy. In this style, the project is tackled by first doing the requirements for the entire project, the design, then the code, and finally one giant release after which the only work on the project would be maintenance. This made sense when software was released largely on discs or even downloads with no updating. Now, however, we develop websites that can change at any frequency without any extra work being done on the part of the user. There are lots of other components too, but a big part of agile rapid iteration and releases. Make things quickly and push your code to your users frequently, taking and responding to feedback as you go.

## Agile Manifesto
The agile manifesto is one publication that tries to specify some of the agile principles.
They list these four priorities as being central to the agile methodology:

- Individuals and interactions over Processes and tools
- Working software over Comprehensive documentation
- Customer collaboration over Contract negotiation
- Responding to change over Following a plan

More specifically, there are 12 principles that also help define agile:

- Customer satisfaction by rapid delivery of useful software
- Welcome changing requirements, even late in development
- Working software is delivered frequently (weeks rather than months)
- Close, daily cooperation between business people and developers
- Projects are built around motivated individuals, who should be trusted
- Face-to-face conversation is the best form of communication (co-location)
- Working software is the principal measure of progress
- Sustainable development, able to maintain a constant pace
- Continuous attention to technical excellence and good design
- Simplicity—the art of maximizing the amount of work not done—is essential
- Self-organizing teams
- Regular adaptation to changing circumstance

## Scrum
As mentioned earlier, agile is more of a mindset and methodology than an actual set of instructions on exactly what to do. A very popular addition to agile that brings in more specific instructions is the scrum framework. In fact, scrum is used so often with agile that components of one are often mistaken for components of the other. What scrum adds is a set of roles and events to your development process that are meant to help maximize your efficiency. It is worth noting that while there are "official" scrum methods, the actual use and implementation varies a good amount from company to company and even team to team.

https://www.youtube.com/watch?v=oyVksFviJVE

### Stories
A big part of scrum is breaking down the tasks of a project into what are called stories.
These stories could be features, bugs, learning about something (referred to as a "spike"), and so on.
Each story is given a point value, which is meant to be an indication of the complexity, difficulty, and unkowns about a task.
The meaning of points varies from team to team, but as long as everyone on the team has a good idea, it doesn't matter too much.
Some places say one point is 1 day or define 3 points to be some basic task such as adding a button to a page.
There is a little ceremony that happens where all the software developers on a team get together and estimate stories in the backlog.
A story is chosen and the developers talk about it very briefly.
They then each pick an estimate for the story and if everyone agrees that becomes the cost of the story.
If not, they discuss why and quickly settle on an estimate.
The official scrum teachings state that a story can take only values of 0, 1, 2, 3, 5, 13, 20, 40, 100.
This is meant to keep you from nitpicking over point estimations.
Depending on the teams preference, the stories can be prioritized either before estimation or after.
Benefit to doing estimation before is that it helps ensure that the truly important stories get tackled, even if they are much more difficult and complex, rather than letting more smaller stories get through as "more" would get accomplished.
The benefit to doing them before is that the project manager to maximize the customer benefit to work amount ratio.

### Sprints
Sprints are lengths of time (usually one or two weeks) during which you complete a certain number of stories.
You kick off the sprint by all getting together and simply adding stories from the top of the backlog until you have an appropriately scoped amount of work for the sprint.
The amount of story points for the sprint is usually determined by how many points the team completed in prior sprints.
The team then works together to complete the stories in the sprint and at the end of the sprint they all get back together for sprint review.
If they completed more stories than the specified (in which case more stories get pulled from backlog mid-sprint) or if they didn't complete all the stories they discuss why and what they can do differently.
They also discuss the sprint holistically, what went well, what didn't, and what can change to make it better.
There is also often a demo that happens to show what has been accomplished and keep the rest of the company appraised of the overall progress.

### Story boards
The exact form of story boards vary, but generally they are columns that each story transitions through. It usually starts in the unclaimed column and when someone claims it they move it to the next column so no one does duplicate work.
![scrum board](http://www.targetprocess.com/blog/wp-content/uploads/2009/06/storyboard-700880.gif)

There are many popular tools that helps your team keep track of this, many of which have all kinds of cool features. Some popular ones include Trello (which has a scrum addon), pivotal, and Jira.
Here is Jira story board manager:
![Jira story board](http://atlassian.wpengine.netdna-cdn.com/wp-content/uploads/Connecting-JIRA-6.2-to-GitHub.png)

### Stand up
A big part of scrum is a daily standup which is a short meeting where people discuss what they did and what they will do on that specific day.
It is meant to keep people working well together and makes sure everyone is aware of what others on the team are doing.
It is also a good time to discuss any difficulties that members are having on their tasks to see if others have ideas about solutions.

## Performance Indicators
One of the main principles of agile is that software developers should and must be trusted. It also assumes that the software developers are dedicated and want to maximize their efficiency and complete their work. Towards this goal, there are many tools to help developers understand their progress.
One such tool is the burndown chart, which shows the current work done next to a straight line that indicates where they should idealy be to stay on track.
![burndown chart](http://joel.inpointform.net/wp-content/uploads/2010/11/burndown132.png)

Another potentially interesting indicator (if you track story points) is the velocity chart. This chart shows the last several sprints, how many stories the team had commited to, and how many they had completed. Idealy, the bars should match and if they don't, the team can discuss what is going wrong.


