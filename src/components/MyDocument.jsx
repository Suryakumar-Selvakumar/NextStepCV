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
import ListItem from "./ListItem";

function renderEndDate(work) {
  if (work.stillWorking) {
    return "Present";
  } else {
    return formatDate(work.endWork);
  }
}

function formatListItem(item) {
  return item
    .split(" ")
    .map((word, i) => {
      if (word.startsWith("*")) {
        let boldWord = word.split("").slice(1).join("");
        return (
          <Text style={styles.boldStyles} key={i}>
            {boldWord}
          </Text>
        );
      } else if (word.startsWith("_")) {
        return (
          <Text style={styles.italicStyles} key={i}>
            {word.split("").slice(1).join("")}
          </Text>
        );
      } else {
        return word;
      }
    })
    .map((word, i) => <Text key={i}>{word} </Text>);
}

const styles = StyleSheet.create({
  page: {
    padding: "0.5in",
    display: "flex",
    flexDirection: "column",
    gap: "9pt",
    fontFamily: "Times-Roman",
  },

  sectionResume: {
    display: "flex",
    flexDirection: "column",
    gap: "3pt",
  },

  sectionHeading: {
    fontSize: "12pt",
    fontWeight: "bold",
    paddingBottom: "1.75pt",
    borderBottom: "0.5pt solid black",
  },

  sectionContainer: {
    display: "flex",
    flexDirection: "column",
    fontSize: "11pt",
    gap: "6pt",
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

  listStyles: {
    paddingLeft: "15pt",
  },

  anchor: { color: "black" },
});

export function MyDocument({ appData }) {
  const contactDetails =
    appData.contactDetails && Object.keys(appData.contactDetails).length > 0
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
  const skills = appData.skills.length ? appData.skills : [];
  const experiences = appData.experiences.length ? appData.experiences : [];
  const projects = appData.projects.length ? appData.projects : [];

  return (
    <Document>
      <Page size="A4" style={styles.page}>
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
              fontSize: "11pt",
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
                <View key={edu.id} style={{ lineHeight: "1.25" }}>
                  <View style={[styles.divStyles, { fontSize: "12pt" }]}>
                    <Text style={styles.boldStyles}>{edu.school}</Text>
                    <Text>{edu.placeStudy}</Text>
                  </View>
                  <View style={styles.divStyles}>
                    <Text>
                      <Text style={styles.italicStyles}>{edu.titleStudy}</Text>{" "}
                      <Text style={styles.boldItalicStyles}>
                        (GPA: {edu.gpa}/4.0)
                      </Text>
                    </Text>
                    {edu.startDateStudy ? (
                      <Text style={styles.italicStyles}>
                        {formatDate(edu.startDateStudy)}
                        {" \u2013 "}
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

        {/* TECHNICAL SKILLS */}
        <View style={styles.sectionResume}>
          {skills.length > 0 && (
            <Text style={styles.sectionHeading}>TECHNICAL SKILLS</Text>
          )}
          <View style={[styles.sectionContainer, { gap: "0pt" }]}>
            {skills.map((skillsGroup) => (
              <View key={skillsGroup.id}>
                <Text style={{ lineHeight: "1.25" }}>
                  <Text style={styles.boldStyles}>
                    {skillsGroup.skillsType}
                  </Text>
                  : {skillsGroup.skillsList}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* EXPERIENCE */}
        <View style={styles.sectionResume}>
          {experiences.length > 0 && (
            <Text style={styles.sectionHeading}>EXPERIENCE</Text>
          )}
          <View style={styles.sectionContainer}>
            {experiences.map((work) => {
              return (
                <View key={work.id} style={{ lineHeight: "1.25" }}>
                  <View style={[styles.divStyles, { fontSize: "12pt" }]}>
                    <Text style={styles.boldStyles}>{work.position}</Text>
                    <Text>
                      {formatDate(work.startWork) +
                        " \u2013 " +
                        renderEndDate(work)}
                    </Text>
                  </View>
                  <View style={styles.divStyles}>
                    <Text style={styles.italicStyles}>{work.company}</Text>
                    <Text style={styles.italicStyles}>{work.place}</Text>
                  </View>
                  <View style={styles.listStyles}>
                    {work.roles.map((role) => (
                      <ListItem key={role.id}>
                        {formatListItem(role.value)}
                      </ListItem>
                    ))}
                  </View>
                </View>
              );
            })}
          </View>
        </View>

        {/* PROJECTS */}
        <View style={styles.sectionResume}>
          {projects.length > 0 && (
            <Text style={styles.sectionHeading}>PROJECTS</Text>
          )}
          <View style={styles.sectionContainer}>
            {projects.map((proj) => {
              return (
                <View key={proj.id} style={{ lineHeight: "1.25" }}>
                  <View style={styles.divStyles}>
                    <Text>
                      <Text style={styles.boldStyles}>{proj.projectName}</Text>{" "}
                      {"| "}
                      <Text style={styles.italicStyles}>{proj.techStack}</Text>
                    </Text>
                    <Text style={{ fontSize: "12pt" }}>
                      {formatDate(proj.projectDate)}
                    </Text>
                  </View>
                  <View style={styles.listStyles}>
                    {proj.details.map((dt) => (
                      <ListItem key={dt.id}>
                        {formatListItem(dt.value)}
                      </ListItem>
                    ))}
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
