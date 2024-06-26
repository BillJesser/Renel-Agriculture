// Import necessary libraries
import React from 'react';
import { SafeAreaView, StyleSheet, View, Button, Alert, Linking } from 'react-native';
import { WebView } from 'react-native-webview';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';

// Your component to render the embedded file and buttons
const GoogleDriveEmbed = () => {
  // Replace with your actual file ID from Google Drive
  const fileId = '1By8IkUlQYePKYKhK7cWYrVAVyrfDc-6A';

  // URLs for file operations
  const fileUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;
  const previewUrl = `https://drive.google.com/file/d/${fileId}/preview`;

  // URL for direct download from Google Drive
  const download = `https://drive.usercontent.google.com/u/0/uc?id=${fileId}&export=download`;

  // Embed HTML for Google Drive file preview
  const embedHtml = `
    <html>
      <body>
        <iframe src="${previewUrl}" width="100%" height="100%"></iframe>
      </body>
    </html>
  `;

  // Function to handle file download
  const handleDownload = () => {
    Alert.alert('Download', 'Starting download...', [
      {
        text: 'OK',
        onPress: () => {
          // Open the URL in the default browser to start the download
          Linking.openURL(download).catch(err => console.error('An error occurred', err));
        },
      },
    ]);
  };

  // Function to handle file sharing
  const handleShare = async () => {
    try {
      // Prepare the local file URI where the file will be downloaded
      const fileUri = `${FileSystem.documentDirectory}${fileId}.pdf`; // Assuming the file is a PDF

      // Create a download resumable object
      const downloadResumable = FileSystem.createDownloadResumable(
        fileUrl, // Remote URL of the file
        fileUri   // Local URI where the file will be saved
      );

      // Start downloading the file asynchronously
      const { uri } = await downloadResumable.downloadAsync();

      // Check if sharing is available on the device
      const canShare = await Sharing.isAvailableAsync();

      // Share the downloaded file if sharing is available
      if (canShare) {
        await Sharing.shareAsync(uri);
      } else {
        Alert.alert('Error', 'Sharing is not available on this device');
      }
    } catch (error) {
      console.error('Error sharing file:', error);
    }
  };

  // Render the component
  return (
    <SafeAreaView style={styles.container}>
      {/* WebView to render the Google Drive file preview */}
      <WebView
        originWhitelist={['*']}
        source={{ html: embedHtml }}
        style={styles.webview}
      />

      {/* Container for download and share buttons */}
      <View style={styles.buttonContainer}>
        <Button
          title="Download File"
          onPress={handleDownload}
          color="#080" // Green color for the button text
        />
        <Button
          title="Share File"
          onPress={handleShare}
          color="#080" // Green color for the button text
        />
      </View>
    </SafeAreaView>
  );
};

// Styles for the container, webview, and buttons
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});

// Export the component as the default export
export default GoogleDriveEmbed;
