// src/screens/Admin/PaymentTransactionsScreen.js
import React, { useEffect, useState } from "react";
import { 
  View, 
  Text, 
  FlatList, 
  ActivityIndicator, 
  StyleSheet,
  TouchableOpacity,
  TextInput
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";

export default function PaymentTransactionsScreen({ navigation }) {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const dummyData = [
      { id: "TXN1001", user: "Suresh", amount: 1999, method: "UPI", date: "2025-01-10", status: "Completed" },
      { id: "TXN1002", user: "Kavya", amount: 2999, method: "Credit Card", date: "2025-01-11", status: "Pending" },
      { id: "TXN1003", user: "Ramesh", amount: 500, method: "Debit Card", date: "2025-01-12", status: "Completed" },
      { id: "TXN1004", user: "Priya", amount: 4500, method: "Net Banking", date: "2025-01-15", status: "Failed" },
      { id: "TXN1005", user: "Vikram", amount: 1250, method: "UPI", date: "2025-01-18", status: "Completed" },
    ];

    setTimeout(() => {
      setPayments(dummyData);
      setLoading(false);
    }, 800);
  }, []);

  const getStatusBadge = (status) => {
    let bg = "#f2f4f7";
    let color = "#344054";

    if (status === "Pending") { bg = "#fffaeb"; color = "#b54708"; }
    if (status === "Completed") { bg = "#ecfdf3"; color = "#027a48"; }
    if (status === "Failed") { bg = "#fef3f2"; color = "#b42318"; }

    return (
      <View style={[styles.statusBadge, { backgroundColor: bg }]}>
        <Text style={[styles.statusText, { color }]}>{status}</Text>
      </View>
    );
  };

  const getMethodIcon = (method) => {
    if (method.includes("Card")) return "credit-card";
    if (method === "UPI") return "smartphone";
    return "briefcase";
  };

  const filteredPayments = payments.filter(p =>
    p.user?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.method?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.status?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.id?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.txnIdContainer}>
          <Text style={styles.txnId}>{item.id}</Text>
        </View>
        {getStatusBadge(item.status)}
      </View>

      <View style={styles.cardBody}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <View style={styles.infoRow}>
            <View style={styles.iconContainer}>
              <Feather name="user" size={18} color="#1a56db" />
            </View>
            <View>
              <Text style={styles.infoLabel}>Customer</Text>
              <Text style={styles.infoValue}>{item.user}</Text>
            </View>
          </View>

          <View style={[styles.infoRow, { alignItems: 'flex-end', justifyContent: 'flex-end' }]}>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={styles.infoLabel}>Amount</Text>
              <Text style={styles.amountValue}>₹{item.amount}</Text>
            </View>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 }}>
          <View style={[styles.infoRow, { marginBottom: 0 }]}>
            <Feather name={getMethodIcon(item.method)} size={16} color="#667085" style={styles.smallIcon} />
            <Text style={styles.smallInfoText}>{item.method}</Text>
          </View>
          <View style={[styles.infoRow, { marginBottom: 0 }]}>
            <Feather name="calendar" size={16} color="#667085" style={styles.smallIcon} />
            <Text style={styles.smallInfoText}>{item.date}</Text>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation?.openDrawer && navigation.openDrawer()}>
          <Feather name="menu" size={24} color="#1a56db" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Transactions</Text>
        <TouchableOpacity>
          <Feather name="filter" size={20} color="#667085" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Feather name="search" size={20} color="#667085" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search transactions..."
            placeholderTextColor="#667085"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#1a56db" />
          <Text style={styles.loadingText}>Loading transactions...</Text>
        </View>
      ) : (
        <FlatList
          data={filteredPayments}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          renderItem={renderItem}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Feather name="credit-card" size={48} color="#d0d5dd" />
              <Text style={styles.emptyText}>No transactions found</Text>
            </View>
          }
        />
      )}
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
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
    borderWidth: 1,
    borderColor: '#e4e7ec',
    shadowColor: '#101828',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 15,
    color: '#101828',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 15,
    color: '#667085',
    fontWeight: '500',
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  card: {
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
  txnIdContainer: {
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#e4e7ec',
  },
  txnId: {
    fontSize: 13,
    fontWeight: '700',
    color: '#344054',
    letterSpacing: 0.5,
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
    flexDirection: 'column',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#eff8ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  infoLabel: {
    fontSize: 12,
    color: '#667085',
    fontWeight: '500',
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 16,
    color: '#101828',
    fontWeight: '600',
  },
  amountValue: {
    fontSize: 18,
    color: '#027a48',
    fontWeight: '700',
  },
  divider: {
    height: 1,
    backgroundColor: '#f2f4f7',
    width: '100%',
  },
  smallIcon: {
    marginRight: 6,
  },
  smallInfoText: {
    fontSize: 14,
    color: '#475467',
    fontWeight: '500',
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
