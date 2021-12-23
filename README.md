# Lab 6 Poll App

Assignment Due Dec 15 by 11:30 PM.

This is your final-boss React assignment.

Using the scaffold in this repo and [Figma materials](~https://www.figma.com/file/EOboZve1GjcyTjsPGFEPmk/Lab6-Poll-App~), create a full-featured React application that allows you to create, manage, participate, and watch the results for the online polls. The application should use REST api for storing the data. You should use React with styled-components. Redux is optional. Any additional libs are ok.

By the deadline, you should have your code in the repo and demo video on how the app works.

You will be graded based on the following criteria:

1. Storybook with all main components (Button, Input, PollListItem, Poll, PollOption) in different states. (+7 points)
2. Implement a full-featured "My polls" screen with whole data (e.g. created_at and votes) and an ability to copy the link and remove a poll. (+4 point)
3. Implement "Create a new" poll form with server integration and handling error and progress states correctly. (+7 point)
4. Implement a poll screen with an ability to vote and handling all states. (+7 point)
5. Empty state for "My polls" screen. (+2 point)
6. Validation for the new poll and Keystore forms. (+4 points)
7. Visited polls screen with an empty state. (+3 points)
8. Global state management with Redux. (+4 points)

Total: 38 points

## Development

```
cd mmcs-cross-lab-6
npm install
npm start
```

Storybook:

```
npm run storybook
```

## Postman

Postman collection for poll api
https://www.getpostman.com/collections/0ab4055e8c91f2775710