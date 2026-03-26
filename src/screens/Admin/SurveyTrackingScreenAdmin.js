import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Alert,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import baseApi from "../../api/api";


export default function SurveyTrackingAdmin({ navigation }) {
  const [surveys, setSurveys] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchSurveys();
  }, []);

  const fetchSurveys = async () => {
    try {
      const res = await baseApi.get("/surveys");
      setSurveys(res || []);
    } catch (err) {
      console.log('FETCH ERROR:', err);
    }
  };

  const updateStatus = async (surveyId, status, userId) => {
    try {

      const res = await baseApi.put(`/surveys/update-status/${surveyId}`, {
        Status: status,
        UserID: userId,
      });
      const result = res;

      if (!res.ok) {
        Alert.alert("Error", result.message || "Unable to update");
        return;
      }

      Alert.alert("Success", `Status updated to ${status}`);
      fetchSurveys();

      // 🔥 Real-time update trigger (user screen updates)
      await baseApi.post(`/surveys/notify-user/${userId}`);

    } catch (err) {
      console.log(err);
      Alert.alert("Error", "Could not update");
    }
  };

  const getStatusBadge = (status) => {
    let bg = "#f2f4f7";
    let color = "#344054";

    if (status === "Pending") { bg = "#fffaeb"; color = "#b54708"; }
    if (status === "In Progress") { bg = "#eff8ff"; color = "#175cd3"; }
    if (status === "Completed") { bg = "#ecfdf3"; color = "#027a48"; }
    if (status === "Outgoing") { bg = "#fdf2fa"; color = "#c11574"; }

    return (
      <View style={[styles.statusBadge, { backgroundColor: bg }]}>
        <Text style={[styles.statusText, { color }]}>{status}</Text>
      </View>
    );
  };

  const filteredSurveys = surveys.filter(s =>
    s.Name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.SurveyType?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.Status?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.Id?.toString().includes(searchQuery)
  );

  const renderItem = ({ item: s }) => (
    <View style={styles.surveyCard}>
      <View style={styles.cardHeader}>
        <View style={styles.surveyIdContainer}>
          <Text style={styles.surveyId}>Survey #{s.Id}</Text>
        </View>
        {getStatusBadge(s.Status || "Pending")}
      </View>

      <View style={styles.cardBody}>
        <View style={styles.infoRow}>
          <Feather name="user" size={16} color="#667085" style={styles.infoIcon} />
          <Text style={styles.infoText}>{s.Name}</Text>
        </View>
        <View style={styles.infoRow}>
          <Feather name="file-text" size={16} color="#667085" style={styles.infoIcon} />
          <Text style={styles.infoText}>{s.SurveyType}</Text>
        </View>
        <View style={styles.infoRow}>
          <Feather name="calendar" size={16} color="#667085" style={styles.infoIcon} />
          <Text style={styles.infoText}>{s.SurveyDate}</Text>
        </View>
      </View>

      <View style={styles.divider} />

      <Text style={styles.actionLabel}>Update Status:</Text>
      <View style={styles.actionRow}>
        <TouchableOpacity style={[styles.actionBtn, styles.btnProgress]} onPress={() => updateStatus(s.Id, "In Progress", s.UserID)}>
          <Text style={[styles.actionBtnText, styles.textProgress]}>In Progress</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionBtn, styles.btnCompleted]} onPress={() => updateStatus(s.Id, "Completed", s.UserID)}>
          <Text style={[styles.actionBtnText, styles.textCompleted]}>Completed</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionBtn, styles.btnOutgoing]} onPress={() => updateStatus(s.Id, "Outgoing", s.UserID)}>
          <Text style={[styles.actionBtnText, styles.textOutgoing]}>Outgoing</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.openDrawer && navigation.openDrawer()}>
          <Feather name="menu" size={24} color="#1a56db" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Survey Tracking (Admin)</Text>
        <View style={{ width: 24 }} /> {/* Spacer */}
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Feather name="search" size={20} color="#667085" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search surveys..."
            placeholderTextColor="#667085"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      <FlatList
        data={filteredSurveys}
        keyExtractor={(item) => item.Id?.toString() || Math.random().toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        renderItem={renderItem}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Feather name="inbox" size={48} color="#d0d5dd" />
            <Text style={styles.emptyText}>No surveys found</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f9fc',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#f7f9fc',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#101828',
    marginLeft: -10,
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 16,
    alignItems: 'center',
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f2f5',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 48,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 15,
    color: '#101828',
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  surveyCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#101828',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#f2f4f7',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  surveyIdContainer: {
    backgroundColor: '#f2f4f7',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  surveyId: {
    fontSize: 14,
    fontWeight: '700',
    color: '#344054',
  },
  statusBadge: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  cardBody: {
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoIcon: {
    marginRight: 10,
    width: 20,
    textAlign: 'center',
  },
  infoText: {
    fontSize: 15,
    color: '#475467',
    flex: 1,
  },
  divider: {
    height: 1,
    backgroundColor: '#f2f4f7',
    marginVertical: 12,
  },
  actionLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#667085',
    marginBottom: 10,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  actionBtn: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  btnProgress: {
    backgroundColor: '#eff8ff',
    borderColor: '#b2ddff',
  },
  textProgress: {
    color: '#175cd3',
  },
  btnCompleted: {
    backgroundColor: '#ecfdf3',
    borderColor: '#abefc6',
  },
  textCompleted: {
    color: '#027a48',
  },
  btnOutgoing: {
    backgroundColor: '#fdf2fa',
    borderColor: '#fccce7',
  },
  textOutgoing: {
    color: '#c11574',
  },
  actionBtnText: {
    fontSize: 13,
    fontWeight: '600',
  },
  emptyContainer: {
    padding: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    marginTop: 12,
    fontSize: 16,
    color: '#98a2b3',
    fontWeight: '500',
  },
});
