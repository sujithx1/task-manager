// components/TaskItem.tsx
import { Task, TasksGroup } from "@/types/type";
import { useState } from "react";
import { Linking, Text, TextInput, TouchableOpacity, View } from "react-native";

type Props = {
  task: Task;
  group: TasksGroup;
  groups: TasksGroup[];
  setGroups: (data: TasksGroup[]) => void;
};

const STATUS_BG = {
  CANCELLED: "bg-red-100",
  STARTED: "bg-blue-100",
  COMPLETED: "bg-green-100",
  NOT_STARTED: "bg-gray-200",
};

const STATUS_TEXT = {
  CANCELLED: "text-red-600",
  STARTED: "text-blue-600",
  COMPLETED: "text-green-600",
  NOT_STARTED: "text-gray-600",
};

const formatStatus = (status: string) => {
  return status.replace("_", " ");
};

export default function TaskItem({ task, group, groups, setGroups }: Props) {
  const [link, setLink] = useState("");

  const nextStatus = () => {
    const order = ["NOT_STARTED", "STARTED", "COMPLETED", "CANCELLED"] as const;
    const index = order.indexOf(task.currentStatus);
    return order[(index + 1) % order.length];
  };

  const updateTask = (updatedTask: Task) => {
    const updated = groups.map((g) =>
      g.id === group.id
        ? {
            ...g,
            tasks: g.tasks.map((t) => (t.id === task.id ? updatedTask : t)),
          }
        : g,
    );

    setGroups(updated);
  };

  return (
    <View className="mb-2 p-3 border rounded-lg bg-gray-50">
      {/* Title + Status */}
      <View className="flex-row justify-between items-center">
        <Text className="font-semibold">{task.description}</Text>

        <TouchableOpacity
          onPress={() =>
            updateTask({
              ...task,
              currentStatus: nextStatus(),
              last_update: new Date(),
            })
          }
          className={`px-3 py-1 rounded-full ${STATUS_BG[task.currentStatus]}`}
        >
          <Text
            className={`text-xs font-semibold ${STATUS_TEXT[task.currentStatus]}`}
          >
            {formatStatus(task.currentStatus)}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Add Link */}
      <View className="mt-3">
        <View className="flex-row items-center bg-gray-100 border border-gray-200 rounded-xl px-3 py-2">
          {/* 🔗 Icon */}

          {/* Input */}
          <TextInput
            value={link}
            onChangeText={setLink}
            placeholder="Paste or type link..."
            placeholderTextColor="#9CA3AF"
            className="flex-1 text-sm text-gray-800"
          />

          {/* Add Button */}
          <TouchableOpacity
            onPress={() => {
              if (!link.trim()) return;

              updateTask({
                ...task,
                links: [
                  ...task.links,
                  {
                    id: Date.now().toString(),
                    url: link,
                    linkType: "general",
                  },
                ],
              });

              setLink("");
            }}
            className="ml-2 bg-indigo-500 px-3 py-1.5 rounded-lg"
          >
            <Text className="text-white text-xs font-semibold">ADD</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* Show Links */}
      {task.links.map((l) => (
        <Text
          key={l.id}
          className="text-xs text-blue-500 mt-1 underline"
          onPress={() => {
            let url = l.url;

            // fix if user enters without http
            if (!url.startsWith("http")) {
              url = "https://" + url;
            }

            Linking.openURL(url);
          }}
        >
          🔗{l.url}
        </Text>
      ))}
    </View>
  );
}
