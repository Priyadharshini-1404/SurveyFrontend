import React from "react";
import {
  View,
  Text,
  ActivityIndicator,
  Alert,
  StyleSheet,
} from "react-native";
import { WebView } from "react-native-webview";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RazorpayWeb({ route, navigation }) {
  const {
    orderId,
    amount,
    key,
    userName,
    contactNumber,
  } = route.params || {};

  const htmlCode = `
    <html>
      <body style="background:#ffffff;">
        <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
        <script>
          var options = {
            key: "${key}",
            order_id: "${orderId}",
            amount: "${amount}",
            currency: "INR",
            
            name: "Survey Booking",
            description: "Advance Payment for Survey",

            prefill: {
              name: "${userName}",
              contact: "${contactNumber}"
            },

            method: {
              netbanking: true,
              card: true,
              upi: true,
              wallet: true
            },

            theme: { color: "#0a74da" },

            handler: function (response) {
              window.ReactNativeWebView.postMessage(JSON.stringify({
                success: true,
                orderId: response.razorpay_order_id,
                paymentId: response.razorpay_payment_id
              }));
            },

            modal: {
              ondismiss: function () {
                window.ReactNativeWebView.postMessage(JSON.stringify({
                  success: false,
                  closed: true
                }));
              }
            }
          };

          var rzp = new Razorpay(options);
          rzp.open();
        </script>
      </body>
    </html>
  `;

  const handleWebMessage = (event) => {
    const data = JSON.parse(event.nativeEvent.data);

    if (data.success) {
      Alert.alert("Payment Successful", "Your payment is completed", [
        {
          text: "OK",
          onPress: () => navigation.replace("WalletScreen"),
        },
      ]);
    }

    if (data.closed) {
      Alert.alert("Payment Cancelled", "You closed the Razorpay window", [
        { text: "OK", onPress: () => navigation.goBack() },
      ]);
    }
  };

  return (
    <SafeAreaView style={styles.mainContainer}>

      {/* Custom Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Complete Payment</Text>
      </View>

      <WebView
        source={{ html: htmlCode }}
        onMessage={handleWebMessage}
        style={{ flex: 1 }}
        startInLoadingState
        renderLoading={() => (
          <View style={styles.loaderWrapper}>
            <View style={styles.loaderBox}>
              <ActivityIndicator size="large" />
              <Text style={styles.loaderText}>Processing payment...</Text>
            </View>
          </View>
        )}
      />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#ffffff",
  },

  header: {
    backgroundColor: "#0a74da",
    padding: 18,
    alignItems: "center",
    borderBottomLeftRadius: 14,
    borderBottomRightRadius: 14,
  },

  headerTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },

  loaderWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },

  loaderBox: {
    backgroundColor: "#f3f3f3",
    padding: 20,
    borderRadius: 16,
    alignItems: "center",
    elevation: 4,
  },

  loaderText: {
    marginTop: 10,
    fontSize: 16,
    color: "#555",
  },
});
