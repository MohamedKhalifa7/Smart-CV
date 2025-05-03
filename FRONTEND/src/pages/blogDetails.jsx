

  import React from "react";
  import { useParams, useNavigate } from "react-router-dom";
  import { Container, Typography, Box, Button, Chip } from "@mui/material";
  import ArrowBackIcon from "@mui/icons-material/ArrowBack";
  import { BLOG_POSTS } from "../data/blogData";
  // import { BLOG_POSTS } from "./path-to-blogData"; // Update path as needed
  
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
  
        {/* Responsive image with aspect ratio */}
        <Box
          sx={{
            position: "relative",
            width: "100%",
            maxWidth: "800px",
            aspectRatio: "16 / 9",
            margin: "0 auto",
            borderRadius: 2,
            overflow: "hidden",
          }}
        >
          <img
            src={blogPost.image}
            alt={blogPost.title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </Box>
  
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
  
