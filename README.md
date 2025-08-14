This is a 3-page guitar shop application built with Next.js and Apollo Client, using a public GraphQL API and CSS for design and styling.
It allows users to browse guitar brands, view models, and see detailed guitar information.

FEATURES: 

Page 1 – Guitar Brands
Displays all guitar brands fetched from the API.
Clicking a brand navigates to Page 2.

Page 2 – Guitar Models
Displays models for the selected brand.
Includes:
  Search bar to filter models by name.
  Filter to narrow by guitar type.
  Pagination to navigate through models.
  Clicking a model navigates to Page 3.

Page 3 – Guitar Details
Two tabs:
  Specs Tab – Shows guitar specifications.
  Musicians Tab – Lists musicians who use the guitar (1 at a time, with option to load another one).//i made it 1 at a time because there werent many musicians and had to check if it works correctly
Language switcher (from English to Macedonian and other way around)

Public API: https://graphql-api-brown.vercel.app/api/graphql

HOW TO OPEN:

Clone the repository: git clone <your-repo-url>
Navigate to the project folder: cd guitar-shop
Install dependencies: npm install
Start the development server: npm run dev
Open your browser and go to: http://localhost:3000
