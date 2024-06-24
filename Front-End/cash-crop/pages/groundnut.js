// Import necessary libraries
import React from 'react';
import { SafeAreaView, StyleSheet, View, Button, Alert, Linking } from 'react-native';
import { WebView } from 'react-native-webview';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';

// Your component to render the embedded file and buttons
const GoogleDriveEmbed = () => {
  const fileId = '1m5wUIGaYTUabbVZP-SYHpINJtRqhYaav'; // Replace with your actual file ID
  const fileUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;
  const previewUrl = `https://drive.google.com/file/d/${fileId}/preview`;

  const downloadUrl = `https://drive.usercontent.google.com/u/0/uc?id=${fileId}&export=download`; // URL for direct download

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
          Linking.openURL(downloadUrl).catch(err => console.error('An error occurred', err));
        },
      },
    ]);
  };

  // Function to handle file sharing
  const handleShare = async () => {
    try {
      const fileUri = `${FileSystem.documentDirectory}${fileId}.pdf`; // File URI where it will be stored (assuming PDF)
      const downloadResumable = FileSystem.createDownloadResumable(fileUrl, fileUri);

      const { uri } = await downloadResumable.downloadAsync(); // Download the file asynchronously

      const canShare = await Sharing.isAvailableAsync(); // Check if sharing is available on the device
      if (canShare) {
        await Sharing.shareAsync(uri); // Share the downloaded file
      } else {
        Alert.alert('Error', 'Sharing is not available on this device');
      }
    } catch (error) {
      console.error('Error sharing file:', error);
    }
  };

  // Component render method
  return (
    <SafeAreaView style={styles.container}>
      {/* WebView to render the embedded Google Drive preview */}
      <WebView
        originWhitelist={['*']}
        source={{ html: embedHtml }}
        style={styles.webview}
      />
      {/* Button container for download and share buttons */}
      <View style={styles.buttonContainer}>
        {/* Download button */}
        <Button
          title="Download File"
          onPress={handleDownload}
          color="#080" // Green color
        />
        {/* Share button */}
        <Button
          title="Share File"
          onPress={handleShare}
          color="#080" // Green color
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

export default GoogleDriveEmbed;
