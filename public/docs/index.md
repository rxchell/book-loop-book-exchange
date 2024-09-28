# User Guide

Welcome! **Choose from a topic above to get started!**
Or you can read the introduction below too!

---

# Table of Contents
- [What is *Book Loop*?](#what-is-book-loop)
- [Origin](#origin)
- [Features](#features)
  - [User Profiles](#user-profiles)
  - [Book Listings & Search](#book-listings--search)
  - [Exchange Mechanism](#exchange-mechanism-a-secure-and-straightforward-system-for-initiating-and-completing-book-exchanges-between-users)
  - [Community Engagement](#community-engagement)
  - [Upcoming features](#upcoming-features)
- [How to use (the exciting part)](#how-to-use-the-exciting-part)
- [Tech Stack](#tech-stack)
- [Installation for developers](#installation-for-developers)
- [Project plan and milestone for future extensions](#project-plan-and-milestone-for-future-extensions)

---

# Book Loop

## What is ***Book Loop***?

***Book Loop*** is a Peer-to-Peer (P2P) Book Exchange Platform. It is designed to create a seamless and community-driven solution for book enthusiasts to share and exchange physical books.

> The name ***Book Loop*** reflects the idea of circulating books among readers, emphasizing the sharing and community aspects of the platform.


## Origin
The idea stems from the realization that many books are often left unread on shelves, while others may be searching for the very same books. This platform aims to give books a second life, encouraging sustainability by reducing waste and fostering a community of readers.


## Features
### User Profiles
- You can create your personal account, with information such as your favourite genres and what kinds of books you are looking out for.
    <img width="1451" alt="Screenshot 2024-09-29 at 03 29 05" src="https://github.com/user-attachments/assets/2f6f4554-99ad-4ed2-9671-13bed877efd1">

### Book Listings & Search
- You can list books which you are willing to exchange. You can include details such as the title, author, genre, exchange method, and image.
     <img width="1457" alt="Screenshot 2024-09-29 at 03 38 47" src="https://github.com/user-attachments/assets/e65cb876-878d-42d7-b5e4-00cf7ab96b1b">
- You can also browse available books by genre, title, or author.
     <img width="1454" alt="Screenshot 2024-09-29 at 03 34 50" src="https://github.com/user-attachments/assets/1f2a7335-8ae2-4c5f-8380-eac96eba142f">

### Exchange Mechanism: A secure and straightforward system for initiating and completing book exchanges between users
- Click on the "Exchange" button to chat with the owner about the book exchange.
      <img width="1103" alt="Screenshot 2024-09-29 at 03 41 07" src="https://github.com/user-attachments/assets/d99681b5-7216-4cbd-aee4-4e163a8c3ff9">

- Start chatting! The messaging function shows the number of unread messages too.
      <img width="1470" alt="Screenshot 2024-09-29 at 03 45 37" src="https://github.com/user-attachments/assets/91d6e5b7-9a48-497b-b3ea-afcbb4e69c3e">

- Mark your book as exchanged once it's exchanged, and you can see it in the "Exchanged books" page.

     <img width="229" alt="Screenshot 2024-09-29 at 03 48 05" src="https://github.com/user-attachments/assets/cb61323f-c8a9-4cb1-b7dc-29a7dc2acc2c">
     <img width="215" alt="Screenshot 2024-09-29 at 03 48 18" src="https://github.com/user-attachments/assets/bc8e33ac-2c7a-47ec-98c1-ed1018cdb668">


### Community Engagement
- You can look through the "Social" page for the users on the platform.
      <img width="1452" alt="Screenshot 2024-09-29 at 03 51 17" src="https://github.com/user-attachments/assets/2b0d102d-e5bd-4628-af83-1a1fdd0e196e">

- Feel free to make a friend request too! The request will be seen as "Pending", and will be accepted if the other user accepts it.
      <img width="1449" alt="Screenshot 2024-09-29 at 03 51 44" src="https://github.com/user-attachments/assets/d6d97630-af9d-4264-ae51-a16dc498481b">

### Others 
- User-friendly interface with easy navigability
- Embedded user guide to guide users along
 
### Upcoming features:
- [ ] A more robust search function with drop-down options based on genre, ratings etc
- [ ] Leveraging AI to provide personalized book recommendations
- [ ] Forum page for like-minded users to share their knowledge, opionions, and book recommendations
- [ ] A leaderboard showing the most number of books exchanged and total number exchanged on the platform

Refer to [Project plan and milestone for future extensions](#project-plan-and-milestone-for-future-extensions) for a more detailed plan!



## How to use (the exciting part)
Head over to [Book Loop](https://book-loop-book-exchange.vercel.app/) @ https://book-loop-book-exchange.vercel.app/!

In case you need a test account:
```
Email address: bw@gmail.com
Password: bookworm
```

Otherwise, feel free to create a new account to try out the features!

## Tech Stack
Frontend
- React (frontend framework)
- MaterialUI (frontend component library)
- Typescript (frontend language)

Database
- Firebase

## Installation for developers
1. Clone or fork the repository 
2. Run `npm install` to install the necessary dependencies.
3. Run `npm run dev` to start the web application.
4. For the databse, you can create your own database using Firebase as the `.env.local` files are currently not in this public repository.

--- 

# Project plan and milestone for future extensions
## Milestones

### Phase 1: Proof Of Concept for Core Functionality Development 
- **Objective:** Build a Minimum Viable Product (MVP) that showcases essential features.

#### Tasks:
1. **User Authentication**
   - Implement user sign-up and login functionality.
   - Set up profile creation with favorite genres and interests.

2. **Book Listings**
   - Allow users to list books with details (title, author, genre, exchange method).
   - Implement image upload functionality.

3. **Search and Filter**
   - Develop a basic search feature for browsing available books by title, author, or genre.

4. **Exchange Mechanism**
   - Create a messaging system for users to communicate about book exchanges.
   - Implement a mark-as-exchanged feature.

5. **Social Features**
   - Add a "Social" page to view other users and their listings.
   - Implement friend request functionality.

### Phase 2: More User Engagement and Community Features
- **Objective:** Further enhance user interaction and community involvement.

#### Tasks:
1. **User Reviews and Ratings**
   - Allow users to leave reviews and ratings for users and books they have exchanged.

3. **Notification System**
   - Implement notifications for messages, friend requests, and book exchanges.

4. **Discussion Forums**
   - Introduce forums for users to discuss book recommendations, share insights, and connect over mutual interests.

### Phase 3: Advanced Features and AI Integration
- **Objective:** Introduce innovative features to improve user experience.

#### Tasks:
1. **AI-Powered Recommendations**
   - Develop an algorithm that analyzes user reading habits, preferences, and past exchanges to provide personalized book recommendations.

2. **Sentiment Analysis on Reviews**
   - Use natural language processing (NLP) to analyze user reviews for sentiment, helping to highlight popular and well-received books.

3. **Predictive Analytics for Book Demand**
   - Implement AI models to predict which books might become popular based on trends, seasonal changes, and user interests.

4. **Robust Search Functionality**
   - Implement advanced search options with filters for ratings, genres, and exchange methods.

5. **Leaderboard and Gamification**
   - Create a leaderboard to display top users based on exchanged books and engagement.
   - Introduce achievements and badges for users to encourage participation.

6. **Dynamic Book Recommendations Based on User Behavior**
   - Analyze real-time data to adjust recommendations based on current trends and what similar users are exchanging or searching for.

### Phase 4: Testing and Optimization
- **Objective:** Ensure the platform is stable, user-friendly, and optimized for performance.

#### Tasks:
1. **User Testing**
   - Conduct user testing sessions to gather feedback on usability and functionality.
   - Make necessary adjustments based on feedback.

2. **Performance Optimization**
   - Optimize database queries and improve loading times.

3. **Documentation and Code Quality**
   - Review and refactor code for maintainability.
   - Update documentation and README files with setup instructions and features.

### Phase 5: Future Extensions and Innovations
- **Objective:** Explore potential partnerships and new technologies for platform enhancement.

#### Tasks:
1. **Partnerships with Local Libraries**
   - Collaborate with local libraries or bookstores to facilitate physical book exchanges and community events.

2. **Mobile Application Development**
   - Develop a mobile app to increase accessibility and engagement.

3. **Augmented Reality (AR) Features**
   - Integrate AR features to allow users to visualize book covers and their collection in their physical space.

4. **Machine Learning for Content Moderation**
   - Utilize machine learning to automate content moderation for reviews and user-generated content to ensure a safe environment.

5. **Integration with Social Media**
   - Enable users to share their book exchanges and recommendations on social media platforms to promote the community.

6. **Sustainability Dashboard**
   - Create a dashboard that tracks the environmental impact of book exchanges (e.g., reduction in waste, carbon footprint savings).

---

A project by Rachel | [Source Repository](https://github.com/rxchell/book-loop-book-exchange) | [LinkedIn](https://www.linkedin.com/in/racheltai-/) | [Github](https://github.com/rxchell)