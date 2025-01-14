import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import WebSocketChat from "./src/WebsocketChat";

export default function App() {
    return (
        <View style={styles.container}>
            <WebSocketChat />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});
