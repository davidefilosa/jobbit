import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { checkImageURL } from "../../../../utilis";
import styles from "./popularjobcard.style";

const PopularJobCard = ({ item, selectedJob, handleCardPress }) => {
  return (
    <TouchableOpacity
      style={styles.container(selectedJob, item)}
      onPress={() => {
        handleCardPress(item);
      }}
    >
      <TouchableOpacity style={styles.logoContainer(selectedJob, item)}>
        <Image
          source={{
            uri: checkImageURL(item.employer_logo)
              ? item.employer_logo
              : "https://img.freepik.com/free-vector/business-logo-template-minimal-branding-design-vector_53876-136228.jpg?w=740&t=st=1682854382~exp=1682854982~hmac=b47d99fe68628b69f0ea937dce4070cc7be77de06188287c601e83d2f7be1d10",
          }}
          resizeMode="contain"
          style={styles.logoImage}
        />
      </TouchableOpacity>
      <Text style={styles.companyName} numberOfLines={1}>
        {item.employer_name}
      </Text>
      <View style={styles.infoContainer}>
        <Text style={styles.jobName(selectedJob, item)} numberOfLines={1}>
          {item.job_title}
        </Text>
        <Text style={styles.location} numberOfLines={1}>
          {item.job_city}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default PopularJobCard;
