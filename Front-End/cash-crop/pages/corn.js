// Import necessary libraries
import React from 'react';
import { SafeAreaView, StyleSheet, View, Button, Alert, Linking } from 'react-native';
import { WebView } from 'react-native-webview';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';

// Your component to render the embedded file and buttons
const GoogleDriveEmbed = () => {
  const fileId = '1UY0TQF7eunNVJ0EQjHr0ykMuM5NM3Sa4'; // Replace with your actual file ID
  const fileUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;
  const previewUrl = `https://drive.google.com/file/d/${fileId}/preview`;

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
      const fileUri = `${FileSystem.documentDirectory}${fileId}.pdf`; // Assuming the file is a PDF
      const downloadResumable = FileSystem.createDownloadResumable(
        fileUrl,
        fileUri
      );

      const { uri } = await downloadResumable.downloadAsync();
      const canShare = await Sharing.isAvailableAsync();
      if (canShare) {
        await Sharing.shareAsync(uri);
      } else {
        Alert.alert('Error', 'Sharing is not available on this device');
      }
    } catch (error) {
      console.error('Error sharing file:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <WebView
        originWhitelist={['*']}
        source={{ html: embedHtml }}
        style={styles.webview}
      />
      <View style={styles.buttonContainer}>
        <Button
          title="Download File"
          onPress={handleDownload}
          color="#080" // Green color
        />
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