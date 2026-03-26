import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, TextInput, StyleSheet, Image, Modal, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useAuth } from "../../hooks/useAuth";
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import baseApi from "../../api/api";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export default function UsersList({ navigation }) {
  const { user, authHeaders } = useAuth();
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const [isAddUserModalVisible, setAddUserModalVisible] = useState(false);
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newRole, setNewRole] = useState('user');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitNewUser = async () => {
    if (!newName || !newEmail || !newPassword) {
      Alert.alert("Missing Fields", "Please fill out all required fields.");
      return;
    }
    try {
      setIsSubmitting(true);
      await baseApi.post('/users/admin/add', { name: newName, email: newEmail, password: newPassword, role: newRole });
      Alert.alert('Success', 'User added successfully');
      setAddUserModalVisible(false);
      setNewName('');
      setNewEmail('');
      setNewPassword('');
      setNewRole('user');
      fetchUsers();
    } catch (err) {
      Alert.alert('Error', err.response?.data?.message || err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await baseApi.get("/users");
      setUsers(res);
    } catch (err) { console.log(err); }
  };

  useEffect(() => { fetchUsers(); }, []);

  const promote = async (id) => {
    try {
      const res = await baseApi.put(`/users/role/${id}`, { role: 'admin' });
      fetchUsers();
    } catch (err) { console.log(err); }
  };

  const remove = async (id) => {
    try {
      await baseApi.delete(`/users/${id}`);
      fetchUsers();
    } catch (err) { console.log(err); }
  };

  const handleOptions = (item) => {
    const buttons = [];
    if (item.role !== 'admin') {
      buttons.push({ text: 'Promote to Admin', onPress: () => promote(item.id) });
    }
    buttons.push({ text: 'Delete User', onPress: () => remove(item.id), style: 'destructive' });
    buttons.push({ text: 'Cancel', style: 'cancel' });

    Alert.alert('User Options', `Manage ${item.name}`, buttons);
  };

  const getStatusColor = (index) => {
    const colors = ['#6941C6', '#12B76A', '#F04438'];
    return colors[index % colors.length];
  };

  const filteredUsers = users.filter(u =>
    u.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.role?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.openDrawer && navigation.openDrawer()}>
          <Feather name="menu" size={24} color="#1a56db" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>User Directory</Text>
        <View style={{ width: 24 }} /> {/* Spacer */}
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Feather name="search" size={20} color="#667085" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search directory..."
            placeholderTextColor="#667085"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <Feather name="filter" size={16} color="#667085" />
          <Text style={styles.filterText}>Filters</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredUsers}
        keyExtractor={i => i.id?.toString() || Math.random().toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={() => (
          /* Banner */
          <View style={styles.banner}>
            <View style={styles.bannerIconContainer}>
              <Feather name="users" size={20} color="#1a56db" />
            </View>
            <Text style={styles.bannerTitle}>Grow your directory</Text>
            <Text style={styles.bannerSubtitle}>Invite new members to collaborate and manage projects.</Text>
            <TouchableOpacity
              style={styles.bannerButton}
              onPress={() => setAddUserModalVisible(true)}
            >
              <Feather name="plus" size={18} color="#ffffff" style={{ marginRight: 6 }} />
              <Text style={styles.bannerButtonText}>ADD NEW USER</Text>
            </TouchableOpacity>
          </View>
        )}
        renderItem={({ item, index }) => (
          <View style={styles.userCard}>
            <View style={styles.userInfoContainer}>
              <View style={styles.avatarContainer}>
                <Feather name="user" size={24} color="#98a2b3" />
                <View style={[styles.statusDot, { backgroundColor: getStatusColor(index) }]} />
              </View>
              <View>
                <Text style={styles.userName}>{item.name}</Text>
                <Text style={styles.userRole}>{item.role}</Text>
              </View>
            </View>
            <TouchableOpacity onPress={() => handleOptions(item)} style={styles.optionsButton}>
              <Feather name="more-vertical" size={20} color="#667085" />
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Add User Modal */}
      <Modal
        visible={isAddUserModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setAddUserModalVisible(false)}
      >
        <KeyboardAvoidingView
          style={styles.modalBackground}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add New User</Text>
              <TouchableOpacity onPress={() => setAddUserModalVisible(false)} style={styles.closeButton}>
                <Feather name="x" size={24} color="#667085" />
              </TouchableOpacity>
            </View>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.modalContent}>
              <View style={styles.inputContainerModal}>
                <Text style={styles.inputLabel}>Full Name</Text>
                <TextInput
                  style={styles.inputModal}
                  placeholder="e.g. John Doe"
                  placeholderTextColor="#98a2b3"
                  value={newName}
                  onChangeText={setNewName}
                />
              </View>
              <View style={styles.inputContainerModal}>
                <Text style={styles.inputLabel}>Email Address</Text>
                <TextInput
                  style={styles.inputModal}
                  placeholder="e.g. john@example.com"
                  placeholderTextColor="#98a2b3"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={newEmail}
                  onChangeText={setNewEmail}
                />
              </View>
              <View style={styles.inputContainerModal}>
                <Text style={styles.inputLabel}>Password</Text>
                <TextInput
                  style={styles.inputModal}
                  placeholder="Create a password"
                  placeholderTextColor="#98a2b3"
                  secureTextEntry
                  value={newPassword}
                  onChangeText={setNewPassword}
                />
              </View>
              <View style={styles.inputContainerModal}>
                <Text style={styles.inputLabel}>Role</Text>
                <View style={styles.roleSelector}>
                  <TouchableOpacity
                    style={[styles.roleOption, newRole === 'user' && styles.roleOptionActive]}
                    onPress={() => setNewRole('user')}
                  >
                    <Text style={[styles.roleOptionText, newRole === 'user' && styles.roleOptionTextActive]}>User</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.roleOption, newRole === 'admin' && styles.roleOptionActive]}
                    onPress={() => setNewRole('admin')}
                  >
                    <Text style={[styles.roleOptionText, newRole === 'admin' && styles.roleOptionTextActive]}>Admin</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <TouchableOpacity
                style={[styles.submitButton, isSubmitting && styles.submitButtonDisabled]}
                onPress={submitNewUser}
                disabled={isSubmitting}
              >
                <Text style={styles.submitButtonText}>{isSubmitting ? 'Adding...' : 'Add User'}</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </Modal>
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
    marginBottom: 20,
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
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    paddingHorizontal: 16,
    height: 48,
    marginLeft: 12,
    shadowColor: '#101828',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  filterText: {
    marginLeft: 6,
    fontSize: 14,
    fontWeight: '600',
    color: '#344054',
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  banner: {
    backgroundColor: '#eaf1ff',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#b6cbf2',
    borderStyle: 'dashed',
  },
  bannerIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#dcebfe',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  bannerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#101828',
    marginBottom: 8,
  },
  bannerSubtitle: {
    fontSize: 14,
    color: '#475467',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 20,
  },
  bannerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a56db',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: '100%',
    justifyContent: 'center',
  },
  bannerButtonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 14,
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#101828',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 2,
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#f2f4f7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  statusDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 2,
    borderColor: '#ffffff',
    position: 'absolute',
    bottom: -2,
    right: -2,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#101828',
    marginBottom: 4,
  },
  userRole: {
    fontSize: 14,
    color: '#667085',
    textTransform: 'capitalize',
  },
  optionsButton: {
    padding: 8,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(16, 24, 40, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    minHeight: '60%',
    paddingTop: 8,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f4f7',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#101828',
  },
  closeButton: {
    padding: 4,
  },
  modalContent: {
    padding: 24,
  },
  inputContainerModal: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#344054',
    marginBottom: 8,
  },
  inputModal: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#d0d5dd',
    borderRadius: 8,
    paddingHorizontal: 14,
    height: 44,
    fontSize: 15,
    color: '#101828',
  },
  roleSelector: {
    flexDirection: 'row',
    backgroundColor: '#f2f4f7',
    borderRadius: 8,
    padding: 4,
  },
  roleOption: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 6,
  },
  roleOptionActive: {
    backgroundColor: '#ffffff',
    shadowColor: '#101828',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  roleOptionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#475467',
  },
  roleOptionTextActive: {
    color: '#101828',
  },
  submitButton: {
    backgroundColor: '#1a56db',
    borderRadius: 8,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
    shadowColor: '#1a56db',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  submitButtonDisabled: {
    backgroundColor: '#9fb9f0',
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});
