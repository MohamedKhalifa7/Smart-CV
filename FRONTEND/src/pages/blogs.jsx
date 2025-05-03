import { useState } from "react";
import { Link } from "react-router-dom";
// import { Search } from "lucide-react";
import {
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  TextField,
  Chip,
  Button,
  Stack,
} from "@mui/material";


const BLOG_POSTS = [
  {
    id: 1,
    title: "10 Essential Elements Every CV Should Include",
    excerpt: "Discover the must-have components that make a CV stand out to recruiters and hiring managers.",
    category: "CV Tips",
    author: "Emily Parker",
    date: "April 8, 2025",
    image: "https://images.unsplash.com/photo-1571867424488-4565932edb41?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "How to Optimize Your CV for Applicant Tracking Systems",
    excerpt: "Learn the secrets to getting past ATS software and into the hands of real recruiters.",
    category: "ATS Optimization",
    author: "James Wilson",
    date: "April 3, 2025",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=2072&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "The Psychology Behind a Great CV Design",
    excerpt: "Understand how visual elements affect how recruiters perceive your CV and how to use this to your advantage.",
    category: "Design",
    author: "Sophia Chen",
    date: "March 25, 2025",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 4,
    title: "Skills vs. Experience: What Employers Value Most",
    excerpt: "Discover the right balance between showcasing your skills and highlighting your relevant experience.",
    category: "Job Search",
    author: "David Thompson",
    date: "March 19, 2025",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 5,
    title: "Common CV Mistakes, Cost You the Interview",
    excerpt: "Avoid these critical errors that many job seekers make when crafting their resumes.",
    category: "CV Tips",
    author: "Emily Parker",
    date: "March 12, 2025",
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 6,
    title: "Industry-Specific CV Advice.",
    excerpt: "Customize your CV for your specific industry with these tailored tips and examples.",
    category: "Industry Insights",
    author: "Michael Johnson",
    date: "March 5, 2025",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop"
  }
];

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPosts = BLOG_POSTS.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
   
   
    <Box sx={{ py: 6, px: { xs: 2, sm: 4, md: 8 }, flex: 1 }}>
  <Grid
    container
    spacing={4}
    justifyContent="center"
    alignItems="stretch"
  >
    {filteredPosts.length > 0 ? (
      filteredPosts.map(post => (
        <Grid
          item
          xs={12}
          sm={6}
          md={6}
          key={post.id}
          display="flex"
        >
          <Link to={`/Blogs/${post.id}`}>
          <Card
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              width: 480,
              height: 400, // Fixed card height for all screen sizes
              boxShadow: 3,
              borderRadius: 2,
            }}
          >
              <CardMedia
                component="img"
                sx={{
                  height: 180, // Fixed image height
                  objectFit: 'cover', // Ensure the image covers the area without distortion
                }}
                image={post.image}
                alt={post.title}
              />
            <CardContent sx={{ flexGrow: 1 }}>
              <Chip
                label={post.category}
                variant="outlined"
                size="small"
                sx={{ mb: 1 }}
                />
              <Link to={`/Blogs/${post.id}`} style={{ textDecoration: 'none' }}>
                <Typography variant="h6" color="primary">
                  {post.title}
                </Typography>
              </Link>
              <Typography variant="body2" color="text.secondary" mt={1}>
                {post.excerpt}
              </Typography>
              <Stack direction="row" justifyContent="space-between" mt={2}>
                <Typography variant="caption">By {post.author}</Typography>
                <Typography variant="caption">{post.date}</Typography>
              </Stack>
              <Box mt={2}>
              </Box>
            </CardContent>
          </Card>
                  </Link>
        </Grid>
      ))
    ) : (
      <Box textAlign="center" mt={8} width="100%">
        <Typography variant="h6">No articles found</Typography>
        <Typography color="text.secondary">Try adjusting your search term</Typography>
      </Box>
    )}
  </Grid>
</Box>
  

  );
};

export default Blog;
