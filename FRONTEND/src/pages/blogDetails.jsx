export const BLOG_POSTS = [
    {
      id: 1,
      title: "10 Essential Tips for Traveling on a Budget",
      excerpt: "Travel doesn't have to be expensive. Discover how to explore the world without breaking the bank.",
      content: `
  Traveling is one of life's greatest pleasures, but it can often strain your wallet. The good news? You don't have to spend a fortune to explore new places. Here are 10 essential tips to help you travel on a budget:
  
  1. **Travel in the off-season** – Flights and accommodations are cheaper during non-peak times.
  2. **Use budget airlines** – Look for low-cost carriers with flash sales.
  3. **Stay in hostels or use Airbnb** – Cheaper than hotels and sometimes offer a more local experience.
  4. **Cook your own meals** – Hit local markets and cook to save on food expenses.
  5. **Use public transportation** – Avoid costly taxis and car rentals.
  6. **Look for free walking tours** – Great for learning about a city from locals.
  7. **Use travel rewards or credit card points** – Save money on flights and hotels.
  8. **Travel overnight** – Save money on a night's accommodation while covering long distances.
  9. **Pack light** – Avoid baggage fees by packing just the essentials.
  10. **Set a daily budget** – Keep track of spending to avoid surprise costs.
  
  With the right planning, budget travel is not only possible—it can be incredibly rewarding.
      `,
      image: "https://images.unsplash.com/photo-1571867424488-4565932edb41?q=80&w=2070&auto=format&fit=crop",
      category: "Travel",
      author: "Jane Doe",
      date: "2024-06-15",
    },
    {
      id: 2,
      title: "The Power of Morning Routines: How to Start Your Day Right",
      excerpt: "Your morning routine sets the tone for your entire day. Learn how to design one that fuels success and well-being.",
      content: `
  Starting your day with intention can dramatically improve your productivity and mental well-being. Here's how to build a powerful morning routine:
  
  1. **Wake up early** – Give yourself extra time to prepare mentally for the day.
  2. **Avoid checking your phone immediately** – Start with presence and focus, not distractions.
  3. **Hydrate** – A glass of water first thing helps wake up your system.
  4. **Move your body** – A short workout or even stretching helps boost energy.
  5. **Practice mindfulness** – Meditate or journal to center your thoughts.
  6. **Eat a nutritious breakfast** – Fuel your body with something balanced.
  7. **Review your goals** – Revisit your to-do list or long-term objectives.
  
  Even 30 minutes of intentional morning time can transform your mindset and performance throughout the day.
      `,
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=2072&auto=format&fit=crop",
      category: "Lifestyle",
      author: "John Smith",
      date: "2024-07-01",
    },
    {
      id: 3,
      title: "Mastering JavaScript: Top Concepts Every Developer Should Know",
      excerpt: "Level up your coding skills with these crucial JavaScript concepts for modern web development.",
      content: `
  JavaScript is a powerful, versatile language—but mastering it requires understanding core concepts that form the backbone of web development. Here are key concepts every serious JS developer should know:
  
  1. **Closures** – Functions retaining access to their lexical scope even when executed outside it.
  2. **Promises and async/await** – Handle asynchronous operations with clarity and control.
  3. **The event loop** – Understand how JavaScript handles concurrency.
  4. **Hoisting** – Know what gets moved to the top of the scope during execution.
  5. **'this' keyword** – Master how context changes depending on how a function is called.
  6. **Prototype chain & inheritance** – JavaScript’s object model depends on this.
  7. **Destructuring and spread/rest** – Make your code cleaner and more expressive.
  8. **Modules and import/export** – Organize code effectively in modern JS apps.
  
  Whether you're building front-end interfaces or Node.js backends, these fundamentals are essential for writing clean, maintainable JavaScript.
      `,
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop",
      category: "Development",
      author: "Alice Chen",
      date: "2024-06-20",
    },
  ];

  import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Typography, Box, Button, Chip } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import { BLOG_POSTS } from "../data/blogData";

const BlogDetail = () => {
  const { id } = useParams();
  const blogPost = BLOG_POSTS.find((post) => post.id === parseInt(id));
  const navigate = useNavigate();

  if (!blogPost) {
    return <Typography variant="h6">Blog post not found.</Typography>;
  }

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Button
        variant="text"
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate("/blogs")}
        sx={{ mb: 3 }}
      >
        Back to Blog
      </Button>

      <img
        src={blogPost.image}
        alt={blogPost.title}
        style={{ width: "100%", borderRadius: 8 }}
      />

      <Box mt={3}>
        <Chip label={blogPost.category} variant="outlined" />
        <Typography variant="h4" fontWeight="bold" mt={2}>
          {blogPost.title}
        </Typography>
        <Typography variant="subtitle2" color="text.secondary" mt={1}>
          By {blogPost.author} • {blogPost.date}
        </Typography>
      </Box>

      <Box mt={4}>
        {blogPost.content
          .split("\n")
          .filter((line) => line.trim() !== "")
          .map((paragraph, index) => (
            <Typography variant="body1" paragraph key={index}>
              {paragraph}
            </Typography>
          ))}
      </Box>
    </Container>
  );
};

export default BlogDetail;
