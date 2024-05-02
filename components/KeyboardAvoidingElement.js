import React, { useState, useEffect } from "react";
import { KeyboardAvoidingView, StyleSheet, Platform } from "react-native";

const KeyboardAvoidingElement = ({ children }) => {
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
    >
      {children}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default KeyboardAvoidingElement;