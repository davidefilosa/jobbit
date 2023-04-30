import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { Stack, useRouter, useSearchParams } from "expo-router";
import { useCallback, useState } from "react";
import { COLORS, SIZES, icons } from "../../constants";
import useFetch from "../../hook/useFetch";

import {
  Company,
  JobAbout,
  JobFooter,
  Jobtabs,
  ScreenHeaderBtn,
} from "../../components";

const JobDetails = () => {
  return <Text>Job Details</Text>;
};

export default JobDetails;
