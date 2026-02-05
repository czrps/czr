'use strict';

export const Storage = {
  STORAGE_KEYS: {
    LAST_CONNECTED_CONTROLLER: 'lastConnectedController',
    EDGE_MODAL_DONT_SHOW_AGAIN: 'edgeModalDontShowAgain',
    FAILED_CALIBRATION_COUNT: 'failedCalibrationCount',
    CENTER_CALIBRATION_METHOD: 'centerCalibrationMethod',
    RANGE_CALIBRATION_METHOD: 'rangeCalibrationMethod',
    QUICK_TEST_SKIPPED_TESTS: 'quickTestSkippedTests',
    SHOW_RAW_NUMBERS_CHECKBOX: 'showRawNumbersCheckbox',
    FINETUNE_CENTER_STEP_SIZE: 'finetuneCenterStepSize',
    FINETUNE_CIRCULARITY_STEP_SIZE: 'finetuneCircularityStepSize',
    FINETUNE_HISTORY: 'finetuneHistory',
    DEADZONE_SETTINGS: 'deadzoneSettings',
  },

  getChangesStorageKey(serialNumber) {
    if (!serialNumber) return null;
    return `changes_${serialNumber}`;
  },

  setString(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch (e) {
      console.warn(`Failed to save to localStorage (${key}):`, e);
    }
  },

  getString(key) {
    try {
      return localStorage.getItem(key);
    } catch (e) {
      console.warn(`Failed to read from localStorage (${key}):`, e);
      return null;
    }
  },

  setObject(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.warn(`Failed to save object to localStorage (${key}):`, e);
    }
  },

  getObject(key) {
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch (e) {
      console.warn(`Failed to read object from localStorage (${key}):`, e);
      return null;
    }
  },

  removeItem(key) {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.warn(`Failed to remove from localStorage (${key}):`, e);
    }
  },

  setBoolean(key, value) {
    this.setString(key, value.toString());
  },

  getBoolean(key, defaultValue = false) {
    const value = this.getString(key);
    return value !== null ? value === 'true' : defaultValue;
  },

  setNumber(key, value) {
    this.setString(key, value.toString());
  },

  getNumber(key, defaultValue = 0) {
    const value = this.getString(key);
    return value !== null ? parseInt(value, 10) : defaultValue;
  },

  lastConnectedController: {
    set(info) {
      Storage.setObject(Storage.STORAGE_KEYS.LAST_CONNECTED_CONTROLLER, info);
    },

    get() {
      return Storage.getObject(Storage.STORAGE_KEYS.LAST_CONNECTED_CONTROLLER);
    },

    clear() {
      Storage.removeItem(Storage.STORAGE_KEYS.LAST_CONNECTED_CONTROLLER);
    },
  },

  edgeModalDontShowAgain: {
    set(value) {
      Storage.setBoolean(Storage.STORAGE_KEYS.EDGE_MODAL_DONT_SHOW_AGAIN, value);
    },

    get() {
      return Storage.getBoolean(Storage.STORAGE_KEYS.EDGE_MODAL_DONT_SHOW_AGAIN);
    },

    clear() {
      Storage.removeItem(Storage.STORAGE_KEYS.EDGE_MODAL_DONT_SHOW_AGAIN);
    },
  },

  failedCalibrationCount: {
    set(count) {
      Storage.setNumber(Storage.STORAGE_KEYS.FAILED_CALIBRATION_COUNT, count);
    },

    get() {
      return Storage.getNumber(Storage.STORAGE_KEYS.FAILED_CALIBRATION_COUNT, 0);
    },

    clear() {
      Storage.removeItem(Storage.STORAGE_KEYS.FAILED_CALIBRATION_COUNT);
    },
  },

  centerCalibrationMethod: {
    set(method) {
      Storage.setString(Storage.STORAGE_KEYS.CENTER_CALIBRATION_METHOD, method);
    },

    get(defaultValue = 'four-step') {
      return Storage.getString(Storage.STORAGE_KEYS.CENTER_CALIBRATION_METHOD) || defaultValue;
    },

    clear() {
      Storage.removeItem(Storage.STORAGE_KEYS.CENTER_CALIBRATION_METHOD);
    },
  },

  rangeCalibrationMethod: {
    set(method) {
      Storage.setString(Storage.STORAGE_KEYS.RANGE_CALIBRATION_METHOD, method);
    },

    get(defaultValue = 'normal') {
      return Storage.getString(Storage.STORAGE_KEYS.RANGE_CALIBRATION_METHOD) || defaultValue;
    },

    clear() {
      Storage.removeItem(Storage.STORAGE_KEYS.RANGE_CALIBRATION_METHOD);
    },
  },

  quickTestSkippedTests: {
    set(tests) {
      Storage.setObject(Storage.STORAGE_KEYS.QUICK_TEST_SKIPPED_TESTS, tests);
    },

    get() {
      return Storage.getObject(Storage.STORAGE_KEYS.QUICK_TEST_SKIPPED_TESTS) || [];
    },

    clear() {
      Storage.removeItem(Storage.STORAGE_KEYS.QUICK_TEST_SKIPPED_TESTS);
    },
  },

  showRawNumbersCheckbox: {
    set(value) {
      Storage.setString(Storage.STORAGE_KEYS.SHOW_RAW_NUMBERS_CHECKBOX, value.toString());
    },

    get() {
      const value = Storage.getString(Storage.STORAGE_KEYS.SHOW_RAW_NUMBERS_CHECKBOX);
      return value === 'true';
    },

    clear() {
      Storage.removeItem(Storage.STORAGE_KEYS.SHOW_RAW_NUMBERS_CHECKBOX);
    },
  },

  finetuneCenterStepSize: {
    set(value) {
      Storage.setString(Storage.STORAGE_KEYS.FINETUNE_CENTER_STEP_SIZE, value.toString());
    },

    get() {
      return Storage.getString(Storage.STORAGE_KEYS.FINETUNE_CENTER_STEP_SIZE);
    },

    clear() {
      Storage.removeItem(Storage.STORAGE_KEYS.FINETUNE_CENTER_STEP_SIZE);
    },
  },

  finetuneCircularityStepSize: {
    set(value) {
      Storage.setString(Storage.STORAGE_KEYS.FINETUNE_CIRCULARITY_STEP_SIZE, value.toString());
    },

    get() {
      return Storage.getString(Storage.STORAGE_KEYS.FINETUNE_CIRCULARITY_STEP_SIZE);
    },

    clear() {
      Storage.removeItem(Storage.STORAGE_KEYS.FINETUNE_CIRCULARITY_STEP_SIZE);
    },
  },

  hasChangesState: {
    set(serialNumber, hasChanges) {
      const key = Storage.getChangesStorageKey(serialNumber);
      if (key) {
        Storage.setObject(key, hasChanges);
      }
    },

    get(serialNumber) {
      const key = Storage.getChangesStorageKey(serialNumber);
      if (!key) return false;
      return Storage.getObject(key) || false;
    },

    clear(serialNumber) {
      const key = Storage.getChangesStorageKey(serialNumber);
      if (key) {
        Storage.removeItem(key);
      }
    },
  },

  finetuneHistory: {
    getAll() {
      return Storage.getObject(Storage.STORAGE_KEYS.FINETUNE_HISTORY) || {};
    },

    setAll(history) {
      Storage.setObject(Storage.STORAGE_KEYS.FINETUNE_HISTORY, history);
    },

    clear() {
      Storage.removeItem(Storage.STORAGE_KEYS.FINETUNE_HISTORY);
    },
  },

  deadzoneSettings: {
    /**
     * Get deadzone settings for a specific controller
     * @param {string} serialNumber - Controller serial number
     * @returns {Object} Deadzone settings { left: {inner, outer}, right: {inner, outer} }
     */
    get(serialNumber, useDefault = true) {
      const allSettings = Storage.getObject(Storage.STORAGE_KEYS.DEADZONE_SETTINGS) || {};
      const stored = allSettings[serialNumber];
      if (stored) return stored;
      if (!useDefault) return null;
      return {
        left: { inner: 0.05, outer: 0.95 },
        right: { inner: 0.05, outer: 0.95 }
      };
    },

    /**
     * Set deadzone settings for a specific controller
     * @param {string} serialNumber - Controller serial number
     * @param {Object} settings - Deadzone settings
     */
    set(serialNumber, settings) {
      const allSettings = Storage.getObject(Storage.STORAGE_KEYS.DEADZONE_SETTINGS) || {};
      allSettings[serialNumber] = settings;
      Storage.setObject(Storage.STORAGE_KEYS.DEADZONE_SETTINGS, allSettings);
    },

    /**
     * Clear deadzone settings for a specific controller
     * @param {string} serialNumber - Controller serial number
     */
    clear(serialNumber) {
      const allSettings = Storage.getObject(Storage.STORAGE_KEYS.DEADZONE_SETTINGS) || {};
      delete allSettings[serialNumber];
      Storage.setObject(Storage.STORAGE_KEYS.DEADZONE_SETTINGS, allSettings);
    },

    /**
     * Clear all deadzone settings
     */
    clearAll() {
      Storage.removeItem(Storage.STORAGE_KEYS.DEADZONE_SETTINGS);
    },
  },

  /**
   * Export all settings as a JSON object
   * @returns {Object} All settings
   */
  exportAllSettings() {
    const settings = {
      version: '2.0',
      exportDate: new Date().toISOString(),
      settings: {}
    };

    // Export all localStorage items
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const value = localStorage.getItem(key);
        
        // Try to parse as JSON, otherwise store as string
        try {
          settings.settings[key] = JSON.parse(value);
        } catch {
          settings.settings[key] = value;
        }
      }
    } catch (e) {
      console.error('Failed to export settings:', e);
    }

    return settings;
  },

  /**
   * Import settings from a JSON object
   * @param {Object} data - Imported settings object
   * @param {boolean} merge - If true, merge with existing settings; if false, replace all
   * @returns {Object} Import result { success: boolean, imported: number, errors: Array }
   */
  importSettings(data, merge = true) {
    const result = {
      success: false,
      imported: 0,
      errors: []
    };

    try {
      // Validate data structure
      if (!data || typeof data !== 'object') {
        throw new Error('Invalid settings format');
      }

      if (!data.settings || typeof data.settings !== 'object') {
        throw new Error('Settings object not found in import data');
      }

      // Clear existing settings if not merging
      if (!merge) {
        try {
          localStorage.clear();
        } catch (e) {
          result.errors.push('Failed to clear existing settings: ' + e.message);
        }
      }

      // Import settings
      for (const [key, value] of Object.entries(data.settings)) {
        try {
          const stringValue = typeof value === 'string' ? value : JSON.stringify(value);
          localStorage.setItem(key, stringValue);
          result.imported++;
        } catch (e) {
          result.errors.push(`Failed to import ${key}: ${e.message}`);
        }
      }

      result.success = result.imported > 0;
    } catch (e) {
      result.errors.push('Import failed: ' + e.message);
    }

    return result;
  },
};

