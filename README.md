# Speed Dating Project

## What this is
A partially completed assessment running in an AWS S3 bucket behind a CloudFront Distribution.

[https://wlsllc.io](https://wlsllc.io)

## What this is not

A production-level example of my work.

Here is an example on that level:

[https://smartnarrative.network](https://smartnarrative.network)

[And the github repo](https://github.com/smartnarrative/dsf-endpoint)


Both examples use the Material-UI framework for React front-end development (the Smart Narrative example uses TypeScript).
## Install and run the speed dating project

```sh
yarn
yarn start
```

Build for production

```
yarn build
```

## Framework

We load the following when the app launches: 

Mock administrator (user id - *admin*, pw - *123*) 

100 mock users (user id - *user1* to *user100*, pw - *123*)

There is a registration page to create new users.

We also load 4 mock events.

## Gaps and known issues

The scope of this project does not include a database. Rather than use Redux as a store, we chose the render props functionality of react-router-dom. This produced issues with some navigation links that can be solved going forward.

A user sees a schedule of events, each with a button to register. When the user registers, the button is replaced by a link to attend the event. Currently, navigating away from the user page and then back to hit will show the register button again.

The event page shows 20 tables, each with a man and woman, and a bar area with 60 people. There is currently no functionality for choosing an empty spot, seeing a list of other attendees, filtering by gennder or selecting.

There is no waitlist functionality.

## Attendee Matching Algorithm

Create two arrays: male and female registered attendees.

Create a 12-slot schedule for each table: 

10 minutes for each date, 2 hours total event time.

For each member of the shorter of the two attendee arrays, choose 12 different members of the other array and assign to a table. 

Put left over attendees in the bar area.
