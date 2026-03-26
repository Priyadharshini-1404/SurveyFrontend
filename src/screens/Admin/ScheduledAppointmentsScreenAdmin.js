import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  RefreshControl
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";

// Assuming navigation is passed as prop if needed, or using useNavigation hook
// We'll add navigation prop so we can open the drawer
export default function ScheduledAppointmentsScreen({ navigation }) {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");


  const fetchAppointments = async () => {
    try {

      const res = await baseApi.get("/appointments");
      const data = await res;
      setAppointments([
        {
          id: "1",
          userName: "John Doe",
          surveyType: "Customer Satisfaction",
          date: "2026-03-25",
          time: "10:00 AM",
          selectedStaff: "Alice Smith",
          status: "Pending"
        },
        {
          id: "2",
          userName: "Jane Roe",
          surveyType: "Employee Feedback",
          date: "2026-03-26",
          time: "02:30 PM",
          selectedStaff: "Bob Johnson",
          status: "Completed"
        },
        {
          id: "3",
          userName: "Samuel Jackson",
          surveyType: "Product Usability",
          date: "2026-03-26",
          time: "11:15 AM",
          selectedStaff: "Charlie Davis",
          status: "Approved"
        },
        {
          id: "4",
          userName: "Sarah Connor",
          surveyType: "Market Research",
          date: "2026-03-27",
          time: "09:00 AM",
          selectedStaff: "Diana Prince",
          status: "Rejected"
        },
        {
          id: "5",
          userName: "Bruce Wayne",
          surveyType: "Brand Awareness",
          date: "2026-03-28",
          time: "04:45 PM",
          selectedStaff: "Alice Smith",
          status: "Pending"
        }
      ]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchAppointments();
  }, []);

  const getStatusColor = (status) => {
    const s = (status || '').toLowerCase();
    if (s === 'completed' || s === 'approved') return { bg: '#E8F5E9', text: '#2E7D32' };
    if (s === 'rejected' || s === 'cancelled') return { bg: '#FFEBEE', text: '#C62828' };
    return { bg: '#FFF3E0', text: '#EF6C00' }; // Pending/Default
  };

  const filteredAppointments = appointments.filter(app => {
    const query = searchQuery.toLowerCase();
    return (
      (app.userName && app.userName.toLowerCase().includes(query)) ||
      (app.surveyType && app.surveyType.toLowerCase().includes(query)) ||
      (app.selectedStaff && app.selectedStaff.toLowerCase().includes(query))
    );
  });

  const renderEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Feather name="calendar" size={50} color="#ccc" />
      <Text style={styles.emptyText}>No appointments found</Text>
    </View>
  );

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.userInfo}>
          <View style={styles.avatarPlaceholder}>
            <Text style={styles.avatarText}>
              {item.userName ? item.userName.charAt(0).toUpperCase() : 'U'}
            </Text>
          </View>
          <View>
            <Text style={styles.userName}>{item.userName || 'Unknown User'}</Text>
            <Text style={styles.surveyType}>{item.surveyType}</Text>
          </View>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status).bg }]}>
          <Text style={[styles.statusText, { color: getStatusColor(item.status).text }]}>
            {item.status || 'Pending'}
          </Text>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.detailsRow}>
        <View style={styles.detailItem}>
          <Feather name="calendar" size={14} color="#666" />
          <Text style={styles.detailText}>{item.date}</Text>
        </View>
        <View style={styles.detailItem}>
          <Feather name="clock" size={14} color="#666" />
          <Text style={styles.detailText}>{item.time}</Text>
        </View>
      </View>

      <View style={styles.staffContainer}>
        <Feather name="user" size={14} color="#666" />
        <Text style={styles.staffText}>Staff: {item.selectedStaff || 'Not Assigned'}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation?.openDrawer && navigation.openDrawer()}>
          <Feather name="menu" size={24} color="#1a56db" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Appointments</Text>
        <TouchableOpacity>
          <Feather name="filter" size={20} color="#667085" />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <Feather name="search" size={20} color="#667085" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search appointments..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#999"
        />
      </View>

      <View style={styles.listContainer}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#1a56db" />
          </View>
        ) : (
          <FlatList
            data={filteredAppointments}
            keyExtractor={(item, index) => item.id ? String(item.id) : String(index)}
            renderItem={renderItem}
            contentContainerStyle={styles.flatListContent}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={renderEmptyComponent}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#1a56db']} />
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
    backgroundColor: '#f7f9fc'
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
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 15,
    marginBottom: 10,
    paddingHorizontal: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    height: 48,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 15,
  },
  flatListContent: {
    paddingTop: 10,
    paddingBottom: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
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
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F0F0F0',
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
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#E3F2FD',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1976D2',
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  surveyType: {
    fontSize: 13,
    color: '#666',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: '#F0F0F0',
    marginVertical: 12,
  },
  detailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  detailText: {
    fontSize: thirteenToFourteenFallback(13),
    color: '#555',
    marginLeft: 6,
  },
  staffContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    marginTop: 4,
  },
  staffText: {
    fontSize: thirteenToFourteenFallback(13),
    color: '#444',
    marginLeft: 6,
    fontWeight: '500',
  },
});

// Utility for fallback
function thirteenToFourteenFallback(size) {
  return size;
}
