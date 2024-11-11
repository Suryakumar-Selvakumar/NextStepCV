import React from "react";
import ReactPDF, {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  resume: {
    padding: "0.5in",
    display: "flex",
    flexDirection: "column",
    gap: "12pt",
  },
});

export function MyDocument({ appData }) {
  return (
    <Document>
      <Page size="A4" style={styles.resume}>
        <View>
          <Text>Section #1</Text>
        </View>
      </Page>
    </Document>
  );
}
