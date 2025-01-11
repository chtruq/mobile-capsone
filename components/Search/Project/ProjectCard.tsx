import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import React, { FC } from "react";
import { ProjectApartment } from "@/model/projects";
import { router } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import LocationIcon from "@/assets/icon/details/location";

interface ProjectCardProps {
  data: ProjectApartment;
}

const ProjectCard: FC<ProjectCardProps> = ({ data }) => {
  return (
    <TouchableOpacity
      style={{
        width: "100%",
        padding: 8,
        borderRadius: 8,
        marginBottom: 8,
      }}
      onPress={() => {
        router.push({
          pathname: "/(main)/project-detail/[id]",
          params: { id: data.projectApartmentID },
        });
      }}
    >
      <View
        style={{
          backgroundColor: "#f5f4f8",
          borderRadius: 16,
        }}
      >
        <View
          style={{
            width: "100%",
            height: 200,
            borderRadius: 8,
            overflow: "hidden",
          }}
        >
          <Image
            source={{ uri: data?.projectImages[0]?.url }}
            style={{ width: "100%", height: 200 }}
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 8,
            paddingTop: 8,
          }}
        >
          <View
            style={{
              padding: 8,
            }}
          >
            <ThemedText type="defaultSemiBold">
              {data?.projectApartmentName}
            </ThemedText>
            <View style={styles.row}>
              <LocationIcon width={16} height={16} />
              <ThemedText
                numberOfLines={1}
                style={{
                  color: "#666",
                }}
              >
                {data?.address}
              </ThemedText>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
    width: "90%",
  },
});

export default ProjectCard;
