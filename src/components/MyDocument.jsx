import React from "react";
import ReactPDF, {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Link,
} from "@react-pdf/renderer";
import { formatDate } from "./utils";

const styles = StyleSheet.create({
  sectionHeading: {
    fontSize: "12pt",
    fontWeight: "bold",
    borderBottom: "1px solid black",
  },

  divStyles: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
  },

  boldStyles: {
    fontFamily: "Times-Bold",
  },

  italicStyles: {
    fontFamily: "Times-Italic",
  },

  boldItalicStyles: {
    fontFamily: "Times-BoldItalic",
  },

  sectionResume: {
    display: "flex",
    flexDirection: "column",
    gap: "3pt",
  },

  technicalSkillsResume: {
    display: "flex",
    flexDirection: "column",
    gap: "6pt",
  },

  sectionContainer: {
    display: "flex",
    flexDirection: "column",
    fontSize: "12pt",
    padding: "0 12pt",
    gap: "9pt",
  },

  workResume: {
    display: "flex",
    flexDirection: "column",
    gap: "3pt",
  },

  workContainer: {
    display: "flex",
    flexDirection: "column",
    fontSize: "15pt",
    gap: "9pt",
    padding: "0 12pt",
  },

  projectResume: {
    display: "flex",
    flexDirection: "column",
    gap: "3pt",
  },

  projectContainer: {
    display: "flex",
    flexDirection: "column",
    fontSize: "15pt",
    gap: "9pt",
    padding: "0 12pt",
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
  const courses = appData.courses.length ? appData.courses : [];

  return (
    <Document>
      <Page
        size="A4"
        style={{
          padding: "0.5in",
          display: "flex",
          flexDirection: "column",
          gap: "12pt",
          fontFamily: "Times-Roman",
        }}
      >
        {/* GENERAL */}
        <View
          style={{
            display: "flex",
            flexDirection: "column",
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
        <View style={styles.sectionResume}>
          {courses.length > 0 && (
            <Text style={styles.sectionHeading}>EDUCATION</Text>
          )}
          <View style={styles.sectionContainer}>
            {courses.map((edu) => {
              return (
                <View key={edu.id}>
                  <View style={styles.divStyles}>
                    <Text style={styles.boldStyles}>{edu.school}</Text>
                    <Text>{edu.placeStudy}</Text>
                  </View>
                  <View style={styles.divStyles}>
                    <Text>
                      <Text>{edu.titleStudy}</Text>{" "}
                      <Text style={styles.boldItalicStyles}>
                        (GPA: {edu.gpa}/4.0)
                      </Text>
                    </Text>
                    {edu.startDateStudy ? (
                      <Text style={styles.italicStyles}>
                        {formatDate(edu.startDateStudy)}
                        {" - "}
                        {formatDate(edu.endDateStudy)}
                      </Text>
                    ) : (
                      <Text style={styles.italicStyles}>
                        <Text>Expected Graduation Year:</Text>{" "}
                        {formatDate(edu.endDateStudy)}
                      </Text>
                    )}
                  </View>
                </View>
              );
            })}
          </View>
        </View>
      </Page>
    </Document>
  );
}
