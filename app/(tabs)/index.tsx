// app/(tabs)/index.tsx
import SectionCard from "@/components/SectionCard";
import { TasksGroup } from "@/types/type";
import { useState } from "react";
import {
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Home() {
  const [groups, setGroups] = useState<TasksGroup[]>([]);
  const [heading, setHeading] = useState("");

  const addGroup = () => {
    if (!heading.trim()) return;

    const newGroup: TasksGroup = {
      id: Date.now().toString(),
      heading,
      createdAt: new Date(),
      tasks: [],
    };

    setGroups((prev) => [...prev, newGroup]);
    setHeading("");
  };

  return (
    <View className="flex-1 bg-white px-4 pt-6">
      <Text className="text-2xl font-bold mb-4">Daily Works</Text>

      {/* Add Heading */}
      <View className="flex-row mb-4">
        <TextInput
          value={heading}
          onChangeText={setHeading}
          placeholder="Add Heading"
          className="flex-1 border border-gray-300 rounded-lg px-3 py-2"
        />
        <TouchableOpacity
          onPress={addGroup}
          className="bg-blue-500 px-4 ml-2 rounded-lg justify-center"
        >
          <Text className="text-white font-bold">ADD</Text>
        </TouchableOpacity>
      </View>

      {/* List */}
      <FlatList
        data={groups}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <SectionCard group={item} groups={groups} setGroups={setGroups} />
        )}
      />
    </View>
  );
}
