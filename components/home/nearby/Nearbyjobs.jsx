import { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import styles from "./nearbyjobs.style";
import { COLORS, SIZES } from "../../../constants";
import NearbyJobCard from "../../common/cards/nearby/NearbyJobCard";
import useFetch from "../../../hook/useFetch";

const Nearbyjobs = () => {
  const router = useRouter();

  const { data, isLoading, error, refetch } = useFetch("search");

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nearby Job</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Show All</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator
            size="large"
            colors={COLORS.primary}
          ></ActivityIndicator>
        ) : error ? (
          <Text>Something went wrong</Text>
        ) : (
          data?.map((item) => {
            return (
              <NearbyJobCard
                item={item}
                key={item?.job_id}
                handleNavigate={() =>
                  router.push(`/job-details/${item.job_id}`)
                }
              />
            );
          })
        )}
      </View>
    </View>
  );
};

export default Nearbyjobs;
