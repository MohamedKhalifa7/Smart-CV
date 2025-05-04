import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Chip,
  Stack,
  TextField
} from "@mui/material";



const Blog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { t } = useTranslation();

  const BLOG_POSTS = [
    {
      id: 1,
      titleKey: "blog1.title",
      excerptKey: "blog1.excerpt",
      categoryKey: "blog1.category",
      author: "Emily Parker",
      date: t("April") + "8, 2025",
      image: "https://images.unsplash.com/photo-1571867424488-4565932edb41?q=80&w=2070&auto=format&fit=crop"
    },
    {
      id: 2,
      titleKey: "blog2.title",
      excerptKey: "blog2.excerpt",
      categoryKey: "blog2.category",
      author: "James Wilson",
      date: t("April")+` 3, 2025`,
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=2072&auto=format&fit=crop"
    },
    {
      id: 3,
      titleKey: "blog3.title",
      excerptKey: "blog3.excerpt",
      categoryKey: "blog3.category",
      author: "Sophia Chen",
      date: t("March")+` 25, 2025`,
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop"
    },
    {
      id: 4,
      titleKey: "blog4.title",
      excerptKey: "blog4.excerpt",
      categoryKey: "blog4.category",
      author: "David Thompson",
      date:t("March")+` 19, 2025`,
      image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070&auto=format&fit=crop"
    },
    {
      id: 5,
      titleKey: "blog5.title",
      excerptKey: "blog5.excerpt",
      categoryKey: "blog5.category",
      author: "Emily Parker",
      date: t("March")+` 12, 2025`,
      image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2070&auto=format&fit=crop"
    },
    {
      id: 6,
      titleKey: "blog6.title",
      excerptKey: "blog6.excerpt",
      categoryKey: "blog6.category",
      author: "Michael Johnson",
      date: t("March")+` 5, 2025`,
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop"
    }
  ];

  const filteredPosts = BLOG_POSTS.filter(post =>
    t(post.titleKey).toLowerCase().includes(searchTerm.toLowerCase()) ||
    t(post.excerptKey).toLowerCase().includes(searchTerm.toLowerCase()) ||
    t(post.categoryKey).toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ py: 6, px: { xs: 2, sm: 4, md: 8 }, flex: 1 }}>
      {/* Search Input */}
      <TextField
        fullWidth
        variant="outlined"
        placeholder={t("searchPlaceholder")}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ mb: 4 }}
      />

      <Grid container spacing={4} justifyContent="center" alignItems="stretch">
        {filteredPosts.length > 0 ? (
          filteredPosts.map(post => (
            <Grid item xs={12} sm={6} md={6} key={post.id} display="flex">
              <Link to={`/Blogs/${post.id}`}>
                <Card
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    width: 480,
                    height: 400,
                    boxShadow: 3,
                    borderRadius: 2,
                  }}
                >
                  <CardMedia
                    component="img"
                    sx={{ height: 180, objectFit: "cover" }}
                    image={post.image}
                    alt={t(post.titleKey)}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Chip
                      label={t(post.categoryKey)}
                      variant="outlined"
                      size="small"
                      sx={{ mb: 1 }}
                    />
                    <Link to={`/Blogs/${post.id}`} style={{ textDecoration: "none" }}>
                      <Typography variant="h6" color="primary">
                        {t(post.titleKey)}
                      </Typography>
                    </Link>
                    <Typography variant="body2" color="text.secondary" mt={1}>
                      {t(post.excerptKey)}
                    </Typography>
                    <Stack direction="row" justifyContent="space-between" mt={2}>
                      <Typography variant="caption">{t("by")} {post.author}</Typography>
                      <Typography variant="caption">{post.date}</Typography>
                    </Stack>
                  </CardContent>
                </Card>
              </Link>
            </Grid>
          ))
        ) : (
          <Box textAlign="center" mt={8} width="100%">
            <Typography variant="h6">{t("noArticles")}</Typography>
            <Typography color="text.secondary">{t("adjustSearch")}</Typography>
          </Box>
        )}
      </Grid>
    </Box>
  );
};

export default Blog;
