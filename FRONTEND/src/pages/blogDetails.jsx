

  import React from "react";
  import { useParams, useNavigate } from "react-router-dom";
  import { Container, Typography, Box, Button, Chip } from "@mui/material";
  import ArrowBackIcon from "@mui/icons-material/ArrowBack";
  import i18n from '../i18n';
  import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
  // import { BLOG_POSTS } from "./path-to-blogData"; // Update path as needed
  import { useTranslation } from "react-i18next";
  const BlogDetail = () => {
    const { t } = useTranslation();
     const currentLang = i18n.language;
      const isRTL = currentLang === 'ar';


     const BLOG_POSTS = [
      {
        id: 1,
        title: t("blog1.title"),
        excerpt: t("blog1.excerpt"),
        content: t("blog1.content"),
        image: "https://images.unsplash.com/photo-1571867424488-4565932edb41?q=80&w=2070&auto=format&fit=crop",
        category: t("CV Tips"),
        author: "Jane Doe",
        date: "2025-04-25",
      },
      {
        id: 2,
        title: t("blog2.title"),
        excerpt: t("blog2.excerpt"),
  content: t("blog2.content"),
        image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=2072&auto=format&fit=crop",
        category: "ATS Optimization",
        author: "John Smith",
        date: "2025-04-03",
      },
      {
        id: 3,
        title: t("blog3.title"),
        excerpt: t("blog3.excerpt"),
        content: t("blog3.content"),
        image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop",
        category: t("blog3.category"),
        author: "Alice Chen",
        date: "2025-03-25",
      },
  
      {
        id: 4,
        title: t("blog4.title"),
        excerpt: t("blog4.excerpt"),
        content: t("blog4.content"),
        image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070&auto=format&fit=crop",
        category: t("blog4.category"),
        author: "Alice Chen",
        date: "2025-03-19",
      },
  
      {
        id: 5,
        title: t("blog5.title"),
        excerpt: t("blog5.excerpt"),
        content: t("blog5.content"),
        image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2070&auto=format&fit=crop",
        category: t("blog5.category"),
        author: "Alice Chen",
        date: "2025-03-12",
      },
  
      {
        id: 6,
        title: t("blog6.title"),
        excerpt: t("blog6.excerpt"),
        content: t("blog6.content"),
        image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop",
        category: t("blog6.category"),
        author: "Alice Chen",
        date: "2025-03-5",
      },
    ];






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
          startIcon={currentLang==='en'?<ArrowBackIcon />:<ArrowForwardIcon sx={{px:1}}/>}
          onClick={() => navigate("/blogs")}
          sx={{ mb: 3 }}
        >
           {t("Back to Blog")}
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
           {t("By")} {blogPost.author} • {blogPost.date}
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
  
