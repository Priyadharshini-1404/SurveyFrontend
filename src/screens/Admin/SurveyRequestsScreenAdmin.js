import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ActivityIndicator,
  RefreshControl
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons";
import baseApi from "../../api/api";
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from "@expo/vector-icons";


export default function SurveyRequestsScreen() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const res = await baseApi.get('/surveys/all');
      setRequests(res || []);
    } catch (err) {
      console.log("Error fetching:", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchRequests();
  }, []);

  const handleAction = async (surveyId, action) => {
    if (!surveyId) return Alert.alert("Error", "Survey ID missing");
    try {


      const res = await baseApi.put(`/surveys/update-status/${surveyId}`, {
        Status: action === "accept" ? "Approved" : "Rejected",
      });
      const result = await res;
      if (!res.ok) return Alert.alert("Error", result.message || "Failed");
      Alert.alert("Success", `Survey ${action === "accept" ? "Approved" : "Rejected"} successfully`);
      fetchRequests();
    } catch (err) {
      console.log(err);
      Alert.alert("Error", "Something went wrong");
    }
  };

  const renderEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Icon name="document-text-outline" size={60} color="#ccc" />
      <Text style={styles.emptyText}>No survey requests await your review</Text>
    </View>
  );

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.userInfo}>
          <View style={styles.avatarPlaceholder}>
            <Text style={styles.avatarText}>
              {item.Name ? item.Name.charAt(0).toUpperCase() : 'U'}
            </Text>
          </View>
          <View>
            <Text style={styles.userName}>{item.Name || 'Unknown User'}</Text>
            <Text style={styles.surveyType}>
              <Icon name="clipboard-outline" size={12} color="#666" /> {item.SurveyType}
            </Text>
          </View>
        </View>
        <View style={styles.statusBadge}>
          <Text style={styles.statusText}>Pending</Text>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.dateContainer}>
        <Icon name="calendar-outline" size={16} color="#666" />
        <Text style={styles.dateText}>{item.SurveyDate}</Text>
      </View>

      <View style={styles.actionContainer}>
        <TouchableOpacity
          style={[styles.actionButton, styles.rejectButton]}
          onPress={() => handleAction(item.Id, "reject")}
          activeOpacity={0.7}
        >
          <Icon name="close" size={16} color="#F44336" />
          <Text style={styles.rejectButtonText}>Reject</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, styles.acceptButton]}
          onPress={() => handleAction(item.Id, "accept")}
          activeOpacity={0.7}
        >
          <Icon name="checkmark" size={16} color="#FFF" />
          <Text style={styles.acceptButtonText}>Accept</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation?.openDrawer && navigation.openDrawer()}>
          <Feather name="menu" size={24} color="#1a56db" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Transactions</Text>
        <TouchableOpacity>
          <Feather name="filter" size={20} color="#667085" />
        </TouchableOpacity>
      </View>

      <View style={styles.listContainer}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#3b5998" />
          </View>
        ) : (
          <FlatList
            data={requests}
            keyExtractor={(item, index) => item.Id ? String(item.Id) : String(index)}
            renderItem={renderItem}
            contentContainerStyle={styles.flatListContent}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={renderEmptyComponent}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#3b5998']} />
            }
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f9fc',
  },
  headerGradient: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    marginBottom: -20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#101828',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#E0E0E0',
    opacity: 0.9,
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 15,
    backgroundColor: '#F4F6F8',
  },
  flatListContent: {
    paddingTop: 30,
    paddingBottom: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 60,
  },
  emptyText: {
    marginTop: 15,
    fontSize: 16,
    color: '#9E9E9E',
    textAlign: 'center',
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatarPlaceholder: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#E3F2FD',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  avatarText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1976D2',
  },
  userName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#333',
    marginBottom: 2,
  },
  surveyType: {
    fontSize: 12,
    color: '#666',
  },
  statusBadge: {
    backgroundColor: '#FFF3E0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 10,
    color: '#F57C00',
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: '#F0F0F0',
    marginVertical: 10,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  dateText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 6,
  },
  actionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 8,
  },
  rejectButton: {
    backgroundColor: '#FFEBEE',
    marginRight: 6,
  },
  rejectButtonText: {
    color: '#F44336',
    fontWeight: '600',
    fontSize: 13,
    marginLeft: 4,
  },
  acceptButton: {
    backgroundColor: '#4CAF50',
    marginLeft: 6,
  },
  acceptButtonText: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 13,
    marginLeft: 4,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#f7f9fc',
  },
});
