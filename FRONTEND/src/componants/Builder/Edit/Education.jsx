import { useCV } from "../../../context/CVcontext";
import {
  Box,
  Typography,
  Button,
  IconButton,
  Stack,
  Divider,
  useTheme,
  useMediaQuery,
  MenuItem,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTranslation } from "react-i18next";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

// Sample data – replace with API in future
const institutions = [
  "Tanta University",
  "Cairo University",
  "Alexandria University",
];

const degreesByInstitution = {
  "Tanta University":["Engineering", "Computer Science", "Statistics"],
  "Cairo University": ["Engineering", "Computer Science", "Statistics"],
  "Alexandria University": ["Engineering", "Computer Science", "Statistics"],
};

const Education = () => {
  const { t } = useTranslation();
  const { formData, updateSection } = useCV();
  const educations = formData.education || [{}];
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleChange = (index, e) => {
    const { name, value } = e.target;

    const updatedEducations = [...educations];
    updatedEducations[index] = {
      ...updatedEducations[index],
      [name]: value,
    };

    if (name === "institution") {
      updatedEducations[index].degree = "";
    }

    updateSection("education", updatedEducations);
  };

  const handleDateChange = (index, date, name) => {
    const updatedEducations = [...educations];
    updatedEducations[index] = {
      ...updatedEducations[index],
      [name]: dayjs(date).year().toString(),
    };
    updateSection("education", updatedEducations);
  };

  const addEducation = () => updateSection("education", [...educations, {}]);
  const removeEducation = (index) => {
    const updated = [...educations];
    updated.splice(index, 1);
    updateSection("education", updated);
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: isMobile ? "90%" : "800px",
        margin: "0 auto",
        padding: "12px",
      }}
    >
      <Stack direction="row" justifyContent="space-between" sx={{ mb: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: "bold", fontSize: "1.1rem" }}>
          {t("Education")}
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={addEducation}
          sx={{
            bgcolor: "#4e54c8",
            color: "white",
            "&:hover": { bgcolor: "#3f46a5" },
            fontSize: "0.85rem",
            padding: "6px 12px",
          }}
        >
          {t("Add Education")}
        </Button>
      </Stack>

      <Box sx={{ border: "1px solid #e0e0e0", borderRadius: "8px", p: 2 }}>
        {educations.map((edu, index) => (
          <Box key={index} sx={{ mb: 3 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: "bold", fontSize: "1rem" }}>
                {t("Education")} {index + 1}
              </Typography>
              <IconButton onClick={() => removeEducation(index)} sx={{ color: "#ff4444" }}>
                <DeleteIcon />
              </IconButton>
            </Box>

            <Box sx={{ display: "flex", gap: "12px", mb: 2 }}>
              <Box sx={{ width: "50%" }}>
                <Typography variant="subtitle1" sx={{ fontWeight: "bold", fontSize: "0.85rem" }}>
                  {t("Institution")}
                </Typography>
                <TextField
                  select
                  fullWidth
                  variant="standard"
                  name="institution"
                  value={edu.institution || ""}
                  onChange={(e) => handleChange(index, e)}
                  InputProps={{ disableUnderline: true }}
                  sx={{
                    "& .MuiInput-input": {
                      border: "1px solid #ddd",
                      borderRadius: "8px",
                      fontSize: "0.85rem",
                      padding: "4px 8px",
                    },
                  }}
                >
                  {institutions.map((inst) => (
                    <MenuItem key={inst} value={inst}>
                      {inst}
                    </MenuItem>
                  ))}
                </TextField>
              </Box>

              <Box sx={{ width: "50%" }}>
                <Typography variant="subtitle1" sx={{ fontWeight: "bold", fontSize: "0.85rem" }}>
                  {t("Degree")}
                </Typography>
                <TextField
                  select
                  fullWidth
                  variant="standard"
                  name="degree"
                  value={edu.degree || ""}
                  onChange={(e) => handleChange(index, e)}
                  disabled={!edu.institution}
                  InputProps={{ disableUnderline: true }}
                  sx={{
                    "& .MuiInput-input": {
                      border: "1px solid #ddd",
                      borderRadius: "8px",
                      fontSize: "0.85rem",
                      padding: "4px 8px",
                    },
                  }}
                >
                  {(degreesByInstitution[edu.institution] || []).map((deg) => (
                    <MenuItem key={deg} value={deg}>
                      BSc in {deg}
                    </MenuItem>
                  ))}
                </TextField>
              </Box>
            </Box>

            <Box sx={{ display: "flex", gap: "12px", mb: 2 }}>
              <Box sx={{ width: "50%" }}>
                <Typography variant="subtitle1" sx={{ fontWeight: "bold", fontSize: "0.85rem" }}>
                  {t("Location")}
                </Typography>
                <TextField
                  fullWidth
                  variant="standard"
                  name="location"
                  value={edu.location || ""}
                  onChange={(e) => handleChange(index, e)}
                  placeholder={t("New York, NY")}
                  InputProps={{ disableUnderline: true }}
                  sx={{
                    "& .MuiInput-input": {
                      border: "1px solid #ddd",
                      borderRadius: "8px",
                      fontSize: "0.85rem",
                      padding: "6px 8px",
                    },
                  }}
                />
              </Box>

              <Box sx={{ width: "25%" }}>
                <Typography variant="subtitle1" sx={{ fontWeight: "bold", fontSize: "0.85rem" }}>
                  {t("Start Year")}
                </Typography>
                <DatePicker
                  views={["year"]}
                    format="YYYY"
                  value={edu.startYear ? dayjs(`${edu.startYear}`) : null}
                  onChange={(newDate) => handleDateChange(index, newDate, "startYear")}
                  maxDate={edu.endYear?dayjs(edu.endYear,"YYYY"):undefined}
                  slotProps={{
                    textField: {
                      variant: "standard",
                      InputProps: { disableUnderline: true },
                      sx: {
                        "& .MuiInput-input": {
                          border: "1px solid #ddd",
                          borderRadius: "8px",
                          fontSize: "0.85rem",
                          padding: "4px 8px",
                        },
                        width:"100%",
                        border:"1px solid #ddd",
                        borderRadius:"8px",
                        paddingLeft:"8px"
                        
                      },
                    },
                  }}
                />
              </Box>

              <Box sx={{ width: "25%" }}>
                <Typography variant="subtitle1" sx={{ fontWeight: "bold", fontSize: "0.85rem" }}>
                  {t("End Year")}
                </Typography>
                <DatePicker
                  views={["year"]}
                    format="YYYY"
                  value={edu.endYear ? dayjs(`${edu.endYear}`) : null}
                  onChange={(newDate) => handleDateChange(index, newDate, "endYear")}
                  minDate={edu.startYear?dayjs(edu.startYear,"YYYY"):undefined}
                  slotProps={{
                    textField: {
                      variant: "standard",
                      InputProps: { disableUnderline: true },
                      sx: {
                        "& .MuiInput-input": {
                          border: "1px solid #ddd",
                          borderRadius: "8px",
                          fontSize: "0.85rem",
                          padding: "4px 8px",
                        },
                        width:"100%",
                                 border:"1px solid #ddd",
                        borderRadius:"8px",
                        paddingLeft:"8px"
                      },
                    },
                  }}
                />
              </Box>
            </Box>

            {index < educations.length - 1 && <Divider sx={{ my: 2 }} />}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Education;
