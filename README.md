# Repo Viewer

### Introduction

This document provides a detailed overview of my solution to the given frontend web coding challenge. The task involved creating a single-page web application that uses the GitHub REST API to display a list of the top 100 most starred GitHub repositories and a list of the commits made in the last 24 hours. I built the site in approximately 4 hours total, trying to allocate a realistic amount of time for the features and the code as though it were a real-life product I was building. The application's UI was designed by myself with inspiration from [shadcnui](https://ui.shadcn.com/) and GitHub's native design.

### Technologies Used

**Next.js**

I chose to use Next.js as the primary framework due to its ease of hosting and the range of useful components it offers, such as Image and Link. While I didn’t use anything especially unique or powerful to Next.js, it’s still an excellent choice for making a quick React applications without much overhead.

**TailwindCSS & Headless UI**

For the application's styling, I used TailwindCSS and Headless UI. TailwindCSS is efficient and straightforward, allowing for easy writing, maintenance, and organization of styling within the code. It was made to work with component frameworks and css-in-js tools like [clsx](https://github.com/lukeed/clsx), working very well with the separation of concerns and re-usability in components.

**React Query**

For state management and data fetching, I used react-query. This was not only in alignment with the internal tools used by the team but also an excellent choice due to its efficient handling of re-validation, cache-control, and fetching logic with minimal lines of code.

---

Overall, I am pleased with the solution I made and the technologies I used. I am excited to discuss my solution and answer any questions you may have!