import React from "react";
import ReactPDF, {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Link,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  sectionHeading: {
    fontSize: "15pt",
    fontWeight: "bold",
    borderBottom: "1px solid black",
  },

  nameGeneral: {
    fontSize: "30pt",
  },

  emailResume: {
    flex: "flex",
    flexDirection: "row",
    gap: "3pt",
  },

  linkedInResume: {
    flex: "flex",
    flexDirection: "row",
    gap: "3pt",
  },

  educationResume: {
    flex: "flex",
    flexDirection: "column",
    gap: "3pt",
  },

  educationContainer: {
    flex: "flex",
    flexDirection: "column",
    padding: "0 12pt",
  },

  educationSchoolPlace: {
    flex: "flex",
    justifyContent: "space-between",
  },

  schoolEducation: {
    fontWeight: 600,
    fontSize: "15pt",
  },

  placeStudyEducation: {
    fontSize: "15pt",
  },

  educationTitleGpaDates: {
    flex: "flex",
    justifyContent: "space-between",
  },

  titleGpaEducationSpan: {
    fontStyle: "italic",
    fontSize: "15pt",
  },

  titleGpaEducationB: {
    fontStyle: "italic",
    fontSize: "15pt",
  },

  dateStudyEducation: {
    fontStyle: "italic",
    fontSize: "15pt",
  },

  technicalSkillsResume: {
    flex: "flex",
    flexDirection: "column",
    gap: "6pt",
  },

  skillsContainer: {
    flex: "flex",
    flexDirection: "column",
    fontSize: "15pt",
    padding: "0 12pt",
  },

  workResume: {
    flex: "flex",
    flexDirection: "column",
    gap: "3pt",
  },

  workContainer: {
    flex: "flex",
    flexDirection: "column",
    fontSize: "15pt",
    gap: "9pt",
    padding: "0 12pt",
  },

  workPositionDates: {
    flex: "flex",
    justifyContent: "space-between",
  },

  workCompanyPlace: {
    flex: "flex",
    justifyContent: "space-between",
  },

  projectResume: {
    flex: "flex",
    flexDirection: "column",
    gap: "3pt",
  },

  projectContainer: {
    flex: "flex",
    flexDirection: "column",
    fontSize: "15pt",
    gap: "9pt",
    padding: "0 12pt",
  },

  projectNameTechStackDate: {
    flex: "flex",
    justifyContent: "space-between",
  },

  anchor: { color: "black" },
});

export function MyDocument({ appData }) {
  const contactDetails =
    Object.keys(appData.contactDetails).length > 0
      ? appData.contactDetails
      : {
          name: "",
          phNo: "",
          email: "",
          linkedIn: "",
          gitHub: "",
          formSubmitted: false,
        };

  return (
    <Document>
      <Page
        size="A4"
        style={{
          padding: "0.5in",
          flex: "flex",
          flexDirection: "column",
          gap: "12pt",
          fontFamily: "Times-Roman",
        }}
      >
        <View
          style={{
            flex: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "24pt",
          }}
        >
          {/* GENERAL */}
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "24pt",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: "24pt",
                fontFamily: "Times-Bold",
              }}
            >
              {contactDetails.name}
            </Text>
            <Text
              style={{
                fontSize: "12pt",
              }}
            >
              {contactDetails.phNo} |{" "}
              <Link
                style={styles.anchor}
                href={
                  contactDetails.email.startsWith("http")
                    ? contactDetails.email
                    : `http://${contactDetails.email}`
                }
              >
                {contactDetails.email}
              </Link>{" "}
              |{" "}
              <Link
                style={styles.anchor}
                href={
                  contactDetails.linkedIn.startsWith("http")
                    ? contactDetails.linkedIn
                    : `http://${contactDetails.linkedIn}`
                }
              >
                {contactDetails.linkedIn}
              </Link>{" "}
              |{" "}
              <Link
                style={styles.anchor}
                href={
                  contactDetails.gitHub.startsWith("http")
                    ? contactDetails.gitHub
                    : `http://${contactDetails.gitHub}`
                }
              >
                {contactDetails.gitHub}
              </Link>
            </Text>
          </View>

          {/* EDUCATION */}
        </View>
      </Page>
    </Document>
  );
}
