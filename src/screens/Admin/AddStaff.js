// src/screens/Admin/AddStaff.js
import React, { useState } from "react";
import {
  View, Text, TextInput, TouchableOpacity, FlatList, Image, Alert, StyleSheet, Modal, ScrollView
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useStaff } from "../../hooks/useStaff";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AddStaff({ navigation }) {
  const { staffList, addStaff, updateStaff, deleteStaff } = useStaff();

  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [editingStaff, setEditingStaff] = useState(null);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [department, setDepartment] = useState("");
  const [contact, setContact] = useState("");
  const [image, setImage] = useState("");

  const filteredStaff = (staffList || []).filter(s =>
    !searchQuery ||
    s.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.role?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.experience?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEdit = (staff) => {
    setEditingStaff(staff);
    setName(staff.name || "");
    setRole(staff.role || staff.experience || "");
    setDepartment(staff.department || staff.rating?.toString() || "");
    setContact(staff.contact || "");
    setImage(staff.image || "");
    setModalVisible(true);
  };

  const resetForm = () => {
    setEditingStaff(null);
    setName("");
    setRole("");
    setDepartment("");
    setContact("");
    setImage("");
    setModalVisible(false);
  };

  const handleSave = () => {
    if (!name || !contact) {
      Alert.alert("Validation Error", "Name and Contact are required!");
      return;
    }

    const staffData = {
      name,
      role,
      department,
      contact,
      image,
      experience: role,
      rating: parseInt(department) || 0,
    };

    if (editingStaff) {
      updateStaff(editingStaff.id, staffData);
      Alert.alert("Success", "Staff updated successfully!");
    } else {
      addStaff(staffData);
      Alert.alert("Success", "New staff added successfully!");
    }

    resetForm();
  };

  const handleDelete = (id) => {
    Alert.alert("Confirm Delete", "Are you sure?", [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", style: "destructive", onPress: () => deleteStaff(id) },
    ]);
  };

  const renderStaff = ({ item }) => {
    const colors = ['#E8D5FF', '#D5E8FF', '#FFE8D5', '#D5FFE8'];
    const charCode = item.name ? item.name.charCodeAt(0) : 0;
    const bgColor = colors[charCode % colors.length];

    return (
      <View style={styles.card}>
        <View style={styles.cardTop}>
          {item.image ? (
            <Image source={{ uri: item.image }} style={styles.avatar} />
          ) : (
            <View style={[styles.avatarPlaceholder, { backgroundColor: bgColor }]}>
              <Text style={styles.avatarPlaceholderText}>
                {item.name ? item.name.substring(0, 2).toUpperCase() : "NA"}
              </Text>
            </View>
          )}

          <View style={styles.badge}>
            <Text style={styles.badgeText}>{(item.department || item.rating || "ENGINEERING").toString().toUpperCase()}</Text>
          </View>
        </View>

        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.role}>{item.role || item.experience || "Staff Member"}</Text>

        <View style={styles.cardBottom}>
          <View style={styles.contactWrapper}>
            <Ionicons
              name={item.contact && item.contact.includes('@') ? "at-outline" : "location-outline"}
              size={16}
              color="#055FE0"
            />
            <Text style={styles.contactInfo}>{item.contact || "No contact info"}</Text>
          </View>
          <View style={styles.actionRow}>
            <TouchableOpacity style={styles.actionBtn} onPress={() => handleEdit(item)}>
              <Ionicons name="pencil" size={16} color="#055FE0" />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionBtn, { backgroundColor: '#FFEBEE', marginLeft: 8 }]} onPress={() => handleDelete(item.id)}>
              <Ionicons name="trash" size={16} color="#D32F2F" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.openDrawer && navigation.openDrawer()}>
          <Ionicons name="menu-outline" size={28} color="#333" />
        </TouchableOpacity>
        <Text style={styles.titleText}>StaffDirectory</Text>
        <TouchableOpacity>
          <Ionicons name="search-outline" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        <FlatList
          data={filteredStaff}
          keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
          renderItem={renderStaff}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <>
              <View style={styles.searchBox}>
                <Ionicons name="search-outline" size={20} color="#888" style={{ marginLeft: 10, marginRight: 6 }} />
                <TextInput
                  style={styles.searchInput}
                  placeholder="Search team members by name, role"
                  placeholderTextColor="#888"
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                />
              </View>

              <TouchableOpacity style={styles.primaryButton} onPress={() => setModalVisible(true)}>
                <Ionicons name="person-add" size={16} color="#FFF" style={{ marginRight: 8 }} />
                <Text style={styles.primaryButtonText}>Add New Staff Member</Text>
              </TouchableOpacity>
            </>
          }
        />
      </View>

      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{editingStaff ? "Edit Staff" : "Add Staff Member"}</Text>
              <TouchableOpacity onPress={resetForm}>
                <Ionicons name="close" size={24} color="#333" />
              </TouchableOpacity>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.inputLabel}>Full Name</Text>
              <TextInput placeholder="e.g. Elena Rodriguez" value={name} onChangeText={setName} style={styles.input} />

              <Text style={styles.inputLabel}>Role</Text>
              <TextInput placeholder="e.g. Senior Frontend Architect" value={role} onChangeText={setRole} style={styles.input} />

              <Text style={styles.inputLabel}>Department</Text>
              <TextInput placeholder="e.g. ENGINEERING" value={department} onChangeText={setDepartment} style={styles.input} />

              <Text style={styles.inputLabel}>Contact (Email/Location)</Text>
              <TextInput placeholder="e.g. elena@nexus.com" value={contact} onChangeText={setContact} style={styles.input} />

              <Text style={styles.inputLabel}>Profile Image URL</Text>
              <TextInput placeholder="https://..." value={image} onChangeText={setImage} style={styles.input} />

              <TouchableOpacity style={styles.saveButtonFull} onPress={handleSave}>
                <Text style={styles.saveTextFull}>{editingStaff ? "Update Staff" : "Save Staff Member"}</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 16,
    backgroundColor: '#FFF'
  },
  titleText: {
    fontSize: 20,
    fontWeight: "900",
    color: "#055FE0",
    letterSpacing: -0.5,
  },
  container: {
    flex: 1,
    backgroundColor: "#F4F7FB"
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 12,
    marginTop: 16,
    paddingHorizontal: 10,
    height: 48,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#333',
  },
  primaryButton: {
    backgroundColor: '#055FE0',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 48,
    borderRadius: 12,
    marginTop: 16,
    marginBottom: 24,
    shadowColor: "#055FE0",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 4,
  },
  primaryButtonText: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: '700',
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 2,
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  avatarPlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarPlaceholderText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  badge: {
    backgroundColor: '#EEF2FB',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#7B89A4',
    letterSpacing: 0.5,
  },
  name: {
    fontSize: 17,
    fontWeight: '800',
    color: '#1F2937',
    marginBottom: 4,
  },
  role: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
  },
  cardBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    paddingTop: 16,
  },
  contactWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contactInfo: {
    fontSize: 13,
    color: '#055FE0',
    marginLeft: 6,
    fontWeight: '500',
  },
  actionRow: {
    flexDirection: 'row',
  },
  actionBtn: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: '#EEF2FB',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    maxHeight: '90%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4B5563',
    marginBottom: 8,
    marginTop: 12,
  },
  input: {
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: 14,
    fontSize: 15,
    color: '#1F2937',
  },
  saveButtonFull: {
    backgroundColor: '#055FE0',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 20,
  },
  saveTextFull: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  }
});
