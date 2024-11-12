import { Text, View, StyleSheet } from "@react-pdf/renderer";

const ListItem = ({ children }) => {
  return (
    <View style={styles.row}>
      <View style={styles.bullet}>
        <Text style={{ fontSize: "11pt" }}>{"\u2022" + " "}</Text>
      </View>
      <Text style={{ lineHeight: "1.25" }}>{children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    display: "flex",
    flexDirection: "row",
  },
  bullet: {
    height: "100%",
  },
});

export default ListItem;
