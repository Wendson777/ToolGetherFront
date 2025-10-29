import React from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import Header from "../../Components/Header";
import { height, width, font } from "../../utils/responsive";
import { Feather } from '@expo/vector-icons';

const mockChats = [
  {
    id: '1',
    name: 'João S. Vieira',
    lastMessage: 'Bom dia, tudo bem?',
    unreadCount: 1,
  },
  {
    id: '2',
    name: 'Mateus M. Borges',
    lastMessage: 'Ok, muito obrigado.',
    unreadCount: 0,
  },
];

const ChatListItem = ({ name, lastMessage, unreadCount, navigation }) => (
  <TouchableOpacity
    style={styles.chatItemContainer}
    onPress={() => {
      console.log(`Abrindo chat com: ${name}`);
    }}
  >
    <View style={styles.avatar}>
      <Feather name="user" size={font(5)} color="#000" />
      {unreadCount > 0 && (
        <View style={styles.badge}>
        </View>
      )}
    </View>

    <View style={styles.listItemTextWrapper}>
      <Text style={styles.nameText}>{name}</Text>
      <Text
        style={styles.messageText}
        numberOfLines={1}
      >
        {lastMessage}
      </Text>
    </View>
  </TouchableOpacity>
);

export default function Chats({ navigation }) {
  return (
    <View style={styles.container}>
      <Header
        navigation={navigation}
        showBackButton={true}
        title="Chat"
      />

      <FlatList
        data={mockChats}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ChatListItem
            name={item.name}
            lastMessage={item.lastMessage}
            unreadCount={item.unreadCount}
            navigation={navigation}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  chatItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingVertical: height(2),
    paddingHorizontal: width(5),
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#CDCDCD",
    width: width(100),
  },

  avatar: {
    width: width(14),
    height: width(14),
    borderRadius: width(8),
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: width(4),
  },

  badge: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: width(3),
    height: width(3),
    borderRadius: width(1.5),
    backgroundColor: 'green',
    borderWidth: 1,
    borderColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: font(1.5),
    fontWeight: 'bold',
  },

  listItemTextWrapper: {
    flex: 1,
    justifyContent: 'center',
  },

  nameText: {
    fontSize: font(2.5),
    fontWeight: 'bold',
    color: "#000",
  },

  messageText: {
    fontSize: font(2.25),
    color: '#666',
    marginTop: height(0.5),
  },
});