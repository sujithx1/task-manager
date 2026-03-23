// components/SectionCard.tsx
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import TaskItem from "./TaskItem";
import { Task, TasksGroup } from "@/types/type";

type Props = {
  group: TasksGroup;
  groups: TasksGroup[];
  setGroups: (data: TasksGroup[]) => void;
};

export default function SectionCard({ group, groups, setGroups }: Props) {
  const [taskText, setTaskText] = useState("");

  const addTask = () => {
    if (!taskText.trim()) return;

    const newTask: Task = {
      id: Date.now().toString(),
      description: taskText,
      currentStatus: "NOT_STARTED",
      last_update: new Date(),
      links: [],
      headerId: group.id,
    };

    const updated = groups.map((g) =>
      g.id === group.id ? { ...g, tasks: [...g.tasks, newTask] } : g,
    );

    setGroups(updated);
    setTaskText("");
  };

  return (
    <View className="mb-6 border border-gray-200 rounded-xl p-4">
      <Text className="text-lg font-bold mb-3">{group.heading}</Text>

      {/* Add Task */}
      <View className="flex-row mb-3">
        <TextInput
          value={taskText}
          onChangeText={setTaskText}
          placeholder="Add Task"
          className="flex-1 border border-gray-300 rounded-lg px-3 py-2"
        />
        <TouchableOpacity
          onPress={addTask}
          className="bg-green-500 px-3 ml-2 rounded-lg justify-center"
        >
          <Text className="text-white">+</Text>
        </TouchableOpacity>
      </View>

      {/* Tasks */}
      {group.tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          group={group}
          groups={groups}
          setGroups={setGroups}
        />
      ))}
    </View>
  );
}
