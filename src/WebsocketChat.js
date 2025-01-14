import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, FlatList, StyleSheet } from "react-native";

const WebSocketChat = () => {
    const [socket, setSocket] = useState(null);
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);

    // 마운트될 때 한번만 실행하려고 useEffect 사용
    useEffect(() => {
        // A 컴퓨터의 IP 주소로 WebSocket 연결
        const ws = new WebSocket("ws://192.168.239.191:5002"); // A 컴퓨터의 IP 주소로 변경

        ws.onopen = () => {
            console.log("Connected to WebSovket server");
        };

        ws.onmessage = (e) => {
            let message = "";
            if (typeof e.data === "string") {
                try {
                    const parsedDate = JSON.parse(e.data);
                    message = parsedDate.message || e.data;
                } catch {
                    message = e.date;
                }
            }
            setMessages((prevMessages) => [...prevMessages, message]);
            console.log("Message from server : ", message);
        };

        ws.onerror = (e) => {
            console.log("Error : ", e);
        };

        setSocket(ws);

        // 컴포넌트 인마운트 시 WebSocket 연결 닫기
        return () => {
            ws.close();
        };
    }, []);

    const sendMessage = () => {
        if (socket && message.trim()) {
            //ws.send();
            socket.send(message);
            setMessages((prevMessages) => [...prevMessages, `You: ${message}`]);
            setMessage("");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>WebSocket Chat</Text>

            <FlatList
                data={messages}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => <Text style={styles.message}>{item}</Text>}
            />
            <TextInput style={styles.input} placeholder="Type a message" value={message} onChangeText={setMessage} />
            <Button title="Send" onPress={sendMessage} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: "center",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
    },
    message: {
        fontSize: 16,
        marginVertical: 5,
    },
    input: {
        height: 40,
        borderColor: "gray",
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
});

export default WebSocketChat;
