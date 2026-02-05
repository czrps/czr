const Storage = {
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

/**
* Utility functions for DualShock controller operations
*/

/**
* Sleep for specified milliseconds
* @param {number} ms Milliseconds to sleep
* @returns {Promise} Promise that resolves after the specified time
*/
async function sleep(ms) {
  await new Promise(r => setTimeout(r, ms));
}
/**
* Convert float to string with specified precision
* @param {number} f Float number to convert
* @param {number} precision Number of decimal places
* @returns {string} Formatted string
*/
function float_to_str(f, precision = 2) {
  if(precision <=2 && f < 0.004 && f >= -4e-3) return "+0.00";
  return (f<0?"":"+") + f.toFixed(precision);
}

/**
* Convert buffer to hexadecimal string
* @param {ArrayBuffer} buffer Buffer to convert
* @returns {string} Hexadecimal string representation
*/
function buf2hex(buffer) {
  return [...new Uint8Array(buffer)].map(x => x.toString(16).padStart(2, '0')).join('');
}

/**
* Convert decimal to 16-bit hexadecimal string
* @param {number} i Decimal number
* @returns {string} 4-character uppercase hex string
*/
function dec2hex(i) {
  return (i + 0x10000).toString(16).substr(-4).toUpperCase();
}

/**
* Convert decimal to 32-bit hexadecimal string
* @param {number} i Decimal number
* @returns {string} 8-character uppercase hex string
*/
function dec2hex32(i) {
  return (i + 0x100000000).toString(16).substr(-8).toUpperCase();
}

/**
* Convert decimal to 8-bit hexadecimal string
* @param {number} i Decimal number
* @returns {string} 2-character uppercase hex string
*/
function dec2hex8(i) {
  return (i + 0x100).toString(16).substr(-2).toUpperCase();
}

/**
* Format MAC address from DataView
* @returns {string} Formatted MAC address (XX:XX:XX:XX:XX:XX)
*/
function format_mac_from_view(view, start_index_inclusive) {
  const bytes = [];
  for (let i = 0; i < 6; i++) {
    const idx = start_index_inclusive + (5 - i);
    bytes.push(dec2hex8(view.getUint8(idx, false)));
  }
  return bytes.join(":");
}

/**
* Reverse a string (for ASCII strings only, not UTF)
* @param {string} s String to reverse
* @returns {string} Reversed string
*/
function reverse_str(s) {
  return s.split('').reverse().join('');
}

let la = undefined;

function initAnalyticsApi({gj, gu}) {
  la = (k, v = {}) => {
    $.ajax({
      type: 'POST', 
      url: "https://the.al/ds4_a/l",
      data: JSON.stringify({u: gu, j: gj, k, v}),
      contentType: "application/json", 
      dataType: 'json'
    });
  };
}

function lerp_color(a, b, t) {
  // a, b: hex color strings, t: 0.0-1.0
  function hex2rgb(hex) {
    hex = hex.replace('#', '');
    if (hex.length === 3) hex = hex.split('').map(x => x + x).join('');
    const num = parseInt(hex, 16);
    return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
  }
  function rgb2hex(r, g, b) {
    return '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('');
  }
  const c1 = hex2rgb(a);
  const c2 = hex2rgb(b);
  const c = [
    Math.round(c1[0] + (c2[0] - c1[0]) * t),
    Math.round(c1[1] + (c2[1] - c1[1]) * t),
    Math.round(c1[2] + (c2[2] - c1[2]) * t)
  ];
  return rgb2hex(c[0], c[1], c[2]);
}

/**
* Get the appropriate locale for date formatting based on language and timezone
* @returns {string} Locale string for use with toLocaleString()
*/
function getLocaleForDateFormatting() {
  let lang = Storage.getString('force_lang') || navigator.language;
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  // Replace en_US with en_UK if timezone does not start with "America"
  if (lang.toLowerCase() === 'en_us' && !timezone.startsWith('America')) {
    lang = 'en_UK';
  }

  return lang.replace('_', '-').toLowerCase();
}

/**
* Format a timestamp as a localized date/time string
* @param {number|string} timestamp Unix timestamp or date string
* @returns {string} Formatted date/time string
*/
function formatLocalizedDate(timestamp) {
  const locale = getLocaleForDateFormatting();
  return new Date(timestamp).toLocaleString(locale);
}

// Alphabetical order
const available_langs = {
  "ar_ar": { "name": "العربية", "file": "ar_ar.json", "direction": "rtl"},
  "bg_bg": { "name": "Български", "file": "bg_bg.json", "direction": "ltr"},
  "cz_cz": { "name": "Čeština", "file": "cz_cz.json", "direction": "ltr"},
  "da_dk": { "name": "Dansk", "file": "da_dk.json", "direction": "ltr"},
  "de_de": { "name": "Deutsch", "file": "de_de.json", "direction": "ltr"},
  "es_es": { "name": "Español", "file": "es_es.json", "direction": "ltr"},
  "fa_fa": { "name": "فارسی", "file": "fa_fa.json", "direction": "rtl"},
  "fr_fr": { "name": "Français", "file": "fr_fr.json", "direction": "ltr"},
  "hu_hu": { "name": "Magyar", "file": "hu_hu.json", "direction": "ltr"},
  "it_it": { "name": "Italiano", "file": "it_it.json", "direction": "ltr"},
  "jp_jp": { "name": "日本語", "file": "jp_jp.json", "direction": "ltr"},
  "ko_kr": { "name": "한국어", "file": "ko_kr.json", "direction": "ltr"},
  "nl_nl": { "name": "Nederlands", "file": "nl_nl.json", "direction": "ltr"},
  "pl_pl": { "name": "Polski", "file": "pl_pl.json", "direction": "ltr"},
  "pt_br": { "name": "Português do Brasil", "file": "pt_br.json", "direction": "ltr"},
  "pt_pt": { "name": "Português", "file": "pt_pt.json", "direction": "ltr"},
  "rs_rs": { "name": "Srpski", "file": "rs_rs.json", "direction": "ltr"},
  "ru_ru": { "name": "Русский", "file": "ru_ru.json", "direction": "ltr"},
  "tr_tr": { "name": "Türkçe", "file": "tr_tr.json", "direction": "ltr"},
  "ua_ua": { "name": "Українська", "file": "ua_ua.json", "direction": "ltr"},
  "vi_vn": { "name": "Tiếng Việt", "file": "vi_vn.json", "direction": "ltr"},
  "zh_cn": { "name": "中文", "file": "zh_cn.json", "direction": "ltr"},
  "zh_tw": { "name": "中文(繁)", "file": "zh_tw.json", "direction": "ltr"}
};

// Translation state - will be imported from core.js app object
let translationState = null;
let welcomeModal = null;
let handleLanguageChange$1 = null;

function lang_init(appState, handleLanguageChangeCb, welcomeModalCb) {
  translationState = appState;
  handleLanguageChange$1 = handleLanguageChangeCb;
  welcomeModal = welcomeModalCb;
  
  let id_iter = 0;
  const items = document.getElementsByClassName('ds-i18n');
  for(let item of items) {
    if (item.id.length == 0) {
      item.id = `ds-i18n-${id_iter++}`;
    }
    
    translationState.lang_orig_text[item.id] = $(item).html();
  }
  translationState.lang_orig_text[".title"] = document.title;
  
  const force_lang = Storage.getString("force_lang");
  if (force_lang != null) {
    lang_set(force_lang, true).catch(error => {
      console.error("Failed to set forced language:", error);
    });
  } else {
    const nlang = navigator.language.replace('-', '_').toLowerCase();
    const ljson = available_langs[nlang];
    if(ljson) {
      la("lang_init", {"l": nlang});
      lang_translate(ljson["file"], nlang, ljson["direction"]).catch(error => {
        console.error("Failed to load initial language:", error);
      });
    }
  }
  
  const langs = Object.keys(available_langs);
  const olangs = [
    '<li><a class="dropdown-item" href="#" onclick="lang_set(\'en_us\');">English</a></li>',
    ...langs.map(lang => {
      const name = available_langs[lang]["name"];
      return `<li><a class="dropdown-item" href="#" onclick="lang_set('${lang}');">${name}</a></li>`;
    }),
    '<li><hr class="dropdown-divider"></li>',
    '<li><a class="dropdown-item" href="https://github.com/dualshock-tools/dualshock-tools.github.io/blob/main/TRANSLATIONS.md" target="_blank">Missing your language?</a></li>'
  ].join('');
  $("#availLangs").html(olangs);
}

async function lang_set(lang, skip_modal=false) {
  la("lang_set", { l: lang });
  
  lang_reset_page();
  if(lang != "en_us") {
    const { file, direction } = available_langs[lang];
    await lang_translate(file, lang, direction);
  }
  
  await handleLanguageChange$1(lang);
  Storage.setString("force_lang", lang);
  if(!skip_modal && welcomeModal) {
    Storage.setString("welcome_accepted", "0");
    welcomeModal();
  }
}

function lang_reset_page() {
  lang_set_direction("ltr", "en_us");

  // Reset translation state to disable translations
  translationState.lang_cur = {};
  translationState.lang_disabled = true;

  const { lang_orig_text } = translationState;
  const items = document.getElementsByClassName('ds-i18n');
  for(let item of items) {
    $(item).html(lang_orig_text[item.id]);
  }  $("#authorMsg").html("");
  $("#curLang").html("English");
  document.title = lang_orig_text[".title"];
}

function lang_set_direction(new_direction, lang_name) {
  const lang_prefix = lang_name.split("_")[0];
  $("html").attr("lang", lang_prefix);

  if(new_direction == translationState.lang_cur_direction)
    return;

  if(new_direction == "rtl") {
    $('#bootstrap-css').attr('integrity', 'sha384-dpuaG1suU0eT09tx5plTaGMLBsfDLzUCCUXOY2j/LSvXYuG6Bqs43ALlhIqAJVRb');
    $('#bootstrap-css').attr('href', 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.rtl.min.css');
  } else {
    $('#bootstrap-css').attr('integrity', 'sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH');
    $('#bootstrap-css').attr('href', 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css');
  }
  $("html").attr("dir", new_direction);
  translationState.lang_cur_direction = new_direction;
}

function l(text) {
  if(!translationState || translationState.lang_disabled)
    return text;

  const [out] = translationState.lang_cur[text] || [];
  if(out) return out;
  
  console.log(`Missing translation for "${text}"`);
  return text;
}

function lang_translate(target_file, target_lang, target_direction) {
  return new Promise((resolve, reject) => {
    $.getJSON("lang/" + target_file)
      .done(function(data) {
        const { lang_orig_text, lang_cur } = translationState;
        lang_set_direction(target_direction, target_lang);

        $.each(data, function( key, val ) {
          if(lang_cur[key]) {
            console.log("Warn: already exists " + key);
          } else {
            lang_cur[key] = [val];
          }
        });

        if(Object.keys(lang_cur).length > 0) {
          translationState.lang_disabled = false;
        }

        const items = document.getElementsByClassName('ds-i18n');
        for(let item of items) {
          const originalText = lang_orig_text[item.id];
          const [translatedText] = lang_cur[originalText] || [];
          if (translatedText) {
            $(item).html(translatedText);
          } else {
            console.log(`Cannot find mapping for "${originalText}"`);
            $(item).html(originalText);
          }
        }

        const old_title = lang_orig_text[".title"];
        document.title = lang_cur[old_title];
        if(lang_cur[".authorMsg"]) {
          $("#authorMsg").html(lang_cur[".authorMsg"]);
        }
        $("#curLang").html(available_langs[target_lang]["name"]);

        resolve();
      })
      .fail(function(jqxhr, textStatus, error) {
        console.error("Failed to load translation file:", target_file, error);
        reject(error);
      });
  });
}

// Make lang_set available globally for onclick handlers in HTML
window.lang_set = lang_set;

const NOT_GENUINE_SONY_CONTROLLER_MSG = "Your device might not be a genuine Sony controller. If it is not a clone then please report this issue.";

/**
* Controller Manager - Manages the current controller instance and provides unified interface
*/
class ControllerManager {
  constructor(uiDependencies = {}) {
    this.currentController = null;
    this.handleNvStatusUpdate = uiDependencies.handleNvStatusUpdate;
    this.has_changes_to_write = null; 
    this.inputHandler = null; // Callback function for input processing
    this.deadzoneSettings = null; // Deadzone settings for current controller

    // Button and stick states for UI updates
    this.button_states = {
      // e.g. 'square': false, 'cross': false, ...
      sticks: {
        left: {
          x: 0,
          y: 0
        },
        right: {
          x: 0,
          y: 0
        }
      }
    };

    // Touch points for touchpad input
    this.touchPoints = [];

    // Battery status tracking
    this.batteryStatus = {
      bat_txt: "",
      changed: false,
      charge_level: 0,
      cable_connected: false,
      is_charging: false,
      is_error: false
    };
    this._lastBatteryText = "";
  }

  /**
  * Save has_changes_to_write state to storage
  */
  async _saveHasChangesState() {
    if (!this.currentController) return;
    try {
      const serialNumber = await this.currentController.getSerialNumber();
      Storage.hasChangesState.set(serialNumber, this.has_changes_to_write);
    } catch (e) {
      console.warn('Failed to save changes state:', e);
    }
  }

  /**
  * Restore has_changes_to_write state from storage
  */
  async _restoreHasChangesState() {
    if (!this.currentController) return;
    try {
      const serialNumber = await this.currentController.getSerialNumber();
      const restoredState = Storage.hasChangesState.get(serialNumber);
      if (restoredState !== null) {
        this.has_changes_to_write = restoredState;
        this._updateUI();
      }
    } catch (e) {
      console.warn('Failed to restore changes state:', e);
    }
  }

  /**
  * Update UI based on current has_changes_to_write state
  */
  _updateUI() {
    const saveBtn = $("#savechanges");
    saveBtn
      .prop('disabled', !this.has_changes_to_write)
      .toggleClass('btn-success', this.has_changes_to_write)
      .toggleClass('btn-outline-secondary', !this.has_changes_to_write);
  }

  /**
  * Clear controller state: remove storage entry and reset UI
  * @private
  */
  async _clearControllerState() {
    if (this.currentController) {
      try {
        const serialNumber = await this.currentController.getSerialNumber();
        Storage.hasChangesState.clear(serialNumber);
      } catch (e) {
        console.warn('Failed to clear storage:', e);
      }
    }
    this.has_changes_to_write = false;
    this._updateUI();
  }

  /**
  * Set the current controller instance
  * @param {BaseController} controller Controller instance
  */
  async setControllerInstance(instance) {
    this.currentController = instance;
    if (instance) {
      await this._restoreHasChangesState().catch(e => console.warn('Failed to restore changes state:', e));
      
      // Load deadzone settings for the current controller (only if explicitly saved)
      try {
        const serialNumber = await instance.getSerialNumber();
        this.deadzoneSettings = Storage.deadzoneSettings.get(serialNumber, false);
      } catch (e) {
        console.warn('Failed to load deadzone settings:', e);
        this.deadzoneSettings = null;
      }
    } else {
      this.deadzoneSettings = null;
    }
  }

  /**
  * Get the current device (for backward compatibility)
  * @returns {HIDDevice|null} Current device or null if none set
  */
  getDevice() {
    return this.currentController?.getDevice() || null;
  }

  getInputConfig() {
    return this.currentController.getInputConfig();
  }

  async getDeviceInfo() {
    if (!this.currentController) return null;
    return await this.currentController.getInfo();
  }

  getFinetuneMaxValue() {
    if (!this.currentController) return null;
    return this.currentController.getFinetuneMaxValue();
  }

  /**
  * Set input report handler on the underlying device
  * @param {Function|null} handler Input report handler function or null to clear
  */
  setInputReportHandler(handler) {
    if (!this.currentController) return;
    this.currentController.device.oninputreport = handler;
  }

  /**
  * Query NVS (Non-Volatile Storage) status
  * @returns {Promise<Object>} NVS status object
  */
  async queryNvStatus() {
    const nv = await this.currentController.queryNvStatus();
    this.handleNvStatusUpdate(nv);
    return nv;
  }

  /**
  * Get in-memory module data (finetune data)
  * @returns {Promise<Array>} Module data array
  */
  async getInMemoryModuleData() {
    return await this.currentController.getInMemoryModuleData();
  }

  /**
  * Write finetune data to controller
  * @param {Array} data Finetune data array
  */
  async writeFinetuneData(data) {
    await this.currentController.writeFinetuneData(data);
  }

  getModel() {
    if (!this.currentController) return null;
    return this.currentController.getModel();
  }

  /**
   * Get the list of supported quick tests for the current controller
   * @returns {Array<string>} Array of supported test types
   */
  getSupportedQuickTests() {
    if (!this.currentController) {
      return [];
    }
    return this.currentController.getSupportedQuickTests();
  }

  /**
  * Check if a controller is connected
  * @returns {boolean} True if controller is connected
  */
  isConnected() {
    return this.currentController !== null;
  }

  /**
  * Set the input callback function
  * @param {Function} callback - Function to call after processing input
  */
  setInputHandler(callback) {
    this.inputHandler = callback;
  }

  /**
  * Disconnect the current controller
  */
  async disconnect() {
    if (this.currentController) {
      await this.currentController.close();
      this.currentController = null;
    }
  }

  /**
  * Update NVS changes status and UI
  * @param {boolean} hasChanges Changes status
  */
  setHasChangesToWrite(hasChanges) {
    if (hasChanges === this.has_changes_to_write)
      return;

    this.has_changes_to_write = hasChanges;
    this._updateUI();
    this._saveHasChangesState().catch(e => console.warn('Failed to save changes state:', e));
  }

  // Unified controller operations that delegate to the current controller

  /**
  * Flash/save changes to the controller
  */
  async flash(progressCallback = null) {
    await this._clearControllerState();
    return this.currentController.flash(progressCallback);
  }

  /**
  * Reset the controller
  */
  async reset() {
    await this._clearControllerState();
    return this.currentController.reset();
  }

  /**
  * Unlock NVS (Non-Volatile Storage)
  */
  async nvsUnlock() {
    await this.currentController.nvsUnlock();
    await this.queryNvStatus(); // Refresh NVS status
  }

  /**
  * Lock NVS (Non-Volatile Storage)
  */
  async nvsLock() {
    const res = await this.currentController.nvsLock();
    if (!res.ok) {
      throw new Error(l("NVS Lock failed"), { cause: res.error });
    }

    await this.queryNvStatus(); // Refresh NVS status
    return res;
  }

  /**
  * Begin stick calibration
  */
  async calibrateSticksBegin() {
    const res = await this.currentController.calibrateSticksBegin();
    if (!res.ok) {
      throw new Error(l(NOT_GENUINE_SONY_CONTROLLER_MSG), { cause: res.error });
    }
  }

  /**
  * Sample stick position during calibration
  */
  async calibrateSticksSample() {
    const res = await this.currentController.calibrateSticksSample();
    if (!res.ok) {
      await sleep(500);
      throw new Error(l("Stick calibration failed"), { cause: res.error });
    }
  }

  /**
  * End stick calibration
  */
  async calibrateSticksEnd() {
    const res = await this.currentController.calibrateSticksEnd();
    if (!res.ok) {
      await sleep(500);
      throw new Error(l("Stick calibration failed"), { cause: res.error });
    }

    this.setHasChangesToWrite(true);
  }

  /**
  * Begin stick range calibration (for UI-driven calibration)
  */
  async calibrateRangeBegin() {
    const res = await this.currentController.calibrateRangeBegin();
    if (!res.ok) {
      throw new Error(l(NOT_GENUINE_SONY_CONTROLLER_MSG), { cause: res.error });
    }
  }

  /**
  * Handle range calibration on close
  */
  async calibrateRangeOnClose() {
    if(!this.currentController) {
      return { success: false };
    }
    const res = await this.currentController.calibrateRangeEnd();
    if(res?.ok) {
      this.setHasChangesToWrite(true);
      return { success: true, message: l("Range calibration completed") };
    } else {
      // Check if the error is code 3 (DS4/DS5) or codes 4/5 (DS5 Edge), which typically means 
      // the calibration was already ended or the controller is not in range calibration mode
      if (res?.code === 3 || res?.code === 4 || res?.code === 5) {
        console.log("Range calibration end returned expected error code", res.code, "- treating as successful completion");
        // This is likely not an error - the calibration may have already been completed
        // or the user closed the window without starting calibration
        return { success: true };
      }

      console.log("Range calibration end failed with unexpected error:", res);
      await sleep(500);
      const msg = res?.code ? (`${l("Range calibration failed")}. ${l("Error")} ${res.code}`) : (`${l("Range calibration failed")}. ${res?.error || ""}`);
      return { success: false, message: msg, error: res?.error };
    }
  }

  /**
  * Full stick calibration process ("OLD" fully automated calibration)
  * @param {Function} progressCallback - Callback function to report progress (0-100)
  */
  async calibrateSticks(progressCallback) {
    try {
      la("multi_calibrate_sticks");

      progressCallback(20);
      await this.calibrateSticksBegin();
      progressCallback(30);

      // Sample multiple times during the process
      const sampleCount = 5;
      for (let i = 0; i < sampleCount; i++) {
        await sleep(100);
        await this.calibrateSticksSample();

        // Progress from 30% to 80% during sampling
        const sampleProgress = 30 + ((i + 1) / sampleCount) * 50;
        progressCallback(Math.round(sampleProgress));
      }

      progressCallback(90);
      await this.calibrateSticksEnd();
      progressCallback(100);

      return { success: true, message: l("Stick calibration completed") };
    } catch (e) {
      la("multi_calibrate_sticks_failed", {"r": e});
      throw e;
    }
  }

  /**
   * Disable left adaptive trigger effects (DS5 only)
   * @returns {Promise<Object>} Result object with success status and message
   */
  async disableLeftAdaptiveTrigger() {
    if (!this.currentController) {
      throw new Error(l("No controller connected"));
    }

    // Check if the controller supports adaptive triggers (DS5 only)
    if (this.getModel() !== "DS5") {
      throw new Error(l("Adaptive triggers are only supported on DualSense controllers"));
    }

    // Check if the controller has the disableLeftAdaptiveTrigger method
    if (typeof this.currentController.disableLeftAdaptiveTrigger !== 'function') {
      throw new Error(l("Controller does not support adaptive trigger control"));
    }

    try {
      const result = await this.currentController.disableLeftAdaptiveTrigger();
      return result;
    } catch (error) {
      throw new Error(l("Failed to disable adaptive trigger"), { cause: error });
    }
  }

  /**
   * Set left adaptive trigger with preset configurations (DS5 only)
   * @param {string} preset - Preset name: 'light', 'medium', 'heavy', 'custom'
   * @param {Object} customParams - Custom parameters for 'custom' preset {start, end, force}
   * @returns {Promise<Object>} Result object with success status and message
   */
  async setAdaptiveTriggerPreset({left, right}/* , customParams = {} */) {
    const presets = {
      'off': { start: 0, end: 0, force: 0, mode: 'off' },
      'light': { start: 10, end: 80, force: 150, mode: 'single'},
      'medium': { start: 15, end: 100, force: 200, mode: 'single' },
      'heavy': { start: 20, end: 120, force: 255, mode: 'single' },
      // 'custom': customParams
    };

    if (!presets[left] || !presets[right]) {
      throw new Error(`Invalid preset. Available presets: light, medium, heavy, custom. Got "${left}" and "${right}".`);
    }

    const leftPreset = presets[left];
    const rightPreset = presets[right];

    // if (preset === 'custom') {
    //   // Validate custom parameters
    //   if (typeof start !== 'number' || typeof end !== 'number' || typeof force !== 'number') {
    //     throw new Error(l("Custom preset requires start, end, and force parameters"));
    //   }
    // }

    return await this.currentController?.setAdaptiveTrigger(leftPreset, rightPreset);
  }

  /**
   * Set vibration motors for haptic feedback (DS5 only)
   * @param {Object} options - Vibration options
   * @param {number} options.heavyLeft - Left motor intensity (0-255)
   * @param {number} options.lightRight - Right motor intensity (0-255)
   * @param {number} options.duration - Duration in milliseconds (optional)
   * @param {Function} doneCb - Callback function called when vibration ends (optional)
   */
  async setVibration({heavyLeft, lightRight, duration = 0}, doneCb = ({success}) => {}) {
    try {
      await this.currentController.setVibration(heavyLeft, lightRight);

      // If duration is specified, automatically turn off vibration after the duration
      if (duration > 0) {
        setTimeout(async () => {
          if(!this.currentController) return doneCb({success: true});
          await this.currentController.setVibration(0, 0); // Turn off vibration
          doneCb({success: true});
        }, duration);
      }
    } catch (error) {
      if(!this.currentController) return; // the controller was unplugged
      if(duration) doneCb({ success: false});
      throw new Error(l("Failed to set vibration"), { cause: error });
    }
  }

  /**
   * Test speaker tone (DS5 only)
   * @param {number} duration - Duration in milliseconds (optional)
   * @param {Function} doneCb - Callback function called when tone ends (optional)
   * @param {string} output - Audio output destination: "speaker" (default) or "headphones" (optional)
   */
  async setSpeakerTone(duration = 1000, doneCb = ({success}) => {}, output = "speaker") {
    try {
      await this.currentController.setSpeakerTone(output);

      // If duration is specified, automatically reset speaker after the duration
      if (duration > 0) {
        setTimeout(async () => {
          if(!this.currentController) return doneCb({success: true});
          // Reset speaker settings to default by calling setSpeakerTone with reset parameters
          try {
            if (this.currentController.resetSpeakerSettings) {
              await this.currentController.resetSpeakerSettings();
            }
          } catch (resetError) {
            console.warn("Failed to reset speaker settings:", resetError);
          }
          doneCb({success: true});
        }, duration);
      }
    } catch (error) {
      if(!this.currentController) return; // the controller was unplugged
      if(duration) doneCb({ success: false});
      throw new Error(l("Failed to set speaker tone"), { cause: error });
    }
  }

  /**
  * Helper function to check if stick positions have changed
  */
  _sticksChanged(current, newValues) {
    return current.left.x !== newValues.left.x || current.left.y !== newValues.left.y ||
    current.right.x !== newValues.right.x || current.right.y !== newValues.right.y;
  }

  /**
   * Apply deadzone to stick value
   * @param {number} value - Raw stick value (-1 to 1)
   * @param {number} innerDeadzone - Inner deadzone (0 to 1)
   * @param {number} outerDeadzone - Outer deadzone (0 to 1)
   * @returns {number} Adjusted value
   */
  _applyDeadzone(value, innerDeadzone, outerDeadzone) {
    const absValue = Math.abs(value);
    const sign = Math.sign(value);

    // Apply inner deadzone
    if (absValue < innerDeadzone) {
      return 0;
    }

    // Map input range to output range capped by outerDeadzone
    // outerDeadzone represents the maximum output magnitude (0..1)
    const denom = Math.max(1e-6, 1 - innerDeadzone);
    const normalized = (absValue - innerDeadzone) / denom;
    const scaledValue = Math.min(1, Math.max(0, normalized)) * outerDeadzone;
    return Math.round(sign * scaledValue * 100) / 100;
  }

  /**
  * Generic button processing for DS4/DS5
  * Records button states and returns changes
  */
  _recordButtonStates(data, BUTTON_MAP, dpad_byte, l2_analog_byte, r2_analog_byte) {
    const changes = {};

    // Stick positions (always at bytes 0-3)
    const [new_lx, new_ly, new_rx, new_ry] = [0, 1, 2, 3]
      .map(i => data.getUint8(i))
      .map(v => Math.round((v - 127.5) / 128 * 100) / 100);

    let newSticks = {
      left: { x: new_lx, y: new_ly },
      right: { x: new_rx, y: new_ry }
    };

    // Apply deadzone settings if available
    if (this.deadzoneSettings) {
      newSticks = {
        left: {
          x: this._applyDeadzone(new_lx, this.deadzoneSettings.left.inner, this.deadzoneSettings.left.outer),
          y: this._applyDeadzone(new_ly, this.deadzoneSettings.left.inner, this.deadzoneSettings.left.outer)
        },
        right: {
          x: this._applyDeadzone(new_rx, this.deadzoneSettings.right.inner, this.deadzoneSettings.right.outer),
          y: this._applyDeadzone(new_ry, this.deadzoneSettings.right.inner, this.deadzoneSettings.right.outer)
        }
      };
    }

    if (this._sticksChanged(this.button_states.sticks, newSticks)) {
      this.button_states.sticks = newSticks;
      changes.sticks = newSticks;
    }

    // L2/R2 analog values
    [
      ['l2', l2_analog_byte],
      ['r2', r2_analog_byte]
    ].forEach(([name, byte]) => {
      const val = data.getUint8(byte);
      const key = name + '_analog';
      if (val !== this.button_states[key]) {
        this.button_states[key] = val;
        changes[key] = val;
      }
    });

    // Dpad is a 4-bit hat value
    const hat = data.getUint8(dpad_byte) & 0x0F;
    const dpad_map = {
      up:    (hat === 0 || hat === 1 || hat === 7),
      right: (hat === 1 || hat === 2 || hat === 3),
      down:  (hat === 3 || hat === 4 || hat === 5),
      left:  (hat === 5 || hat === 6 || hat === 7)
    };
    for (const dir of ['up', 'right', 'down', 'left']) {
      const pressed = dpad_map[dir];
      if (this.button_states[dir] !== pressed) {
        this.button_states[dir] = pressed;
        changes[dir] = pressed;
      }
    }

    // Other buttons
    for (const btn of BUTTON_MAP) {
      if (['up', 'right', 'down', 'left'].includes(btn.name)) continue; // Dpad handled above
      const pressed = (data.getUint8(btn.byte) & btn.mask) !== 0;
      if (this.button_states[btn.name] !== pressed) {
        this.button_states[btn.name] = pressed;
        changes[btn.name] = pressed;
      }
    }

    return changes;
  }

  /**
  * Process controller input data and call callback if set
  * This is the first part of the split process_controller_input function
  * @param {Object} inputData - The input data from the controller
  * @returns {Object} Changes object containing processed input data
  */
  processControllerInput(inputData) {
    const { data } = inputData;

    const inputConfig = this.currentController.getInputConfig();
    const { buttonMap, dpadByte, l2AnalogByte, r2AnalogByte } = inputConfig;
    const { touchpadOffset } = inputConfig;

    // Process button states using the device-specific configuration
    const changes = this._recordButtonStates(data, buttonMap, dpadByte, l2AnalogByte, r2AnalogByte);

    // Parse and store touch points if touchpad data is available
    if (touchpadOffset) {
      this.touchPoints = this._parseTouchPoints(data, touchpadOffset);
    }

    // Parse and store battery status
    this.batteryStatus = this._parseBatteryStatus(data);

    const result = {
      changes,
      inputConfig: { buttonMap },
      touchPoints: this.touchPoints,
      batteryStatus: this.batteryStatus,
    };

    this.inputHandler(result);
  }

  /**
  * Parse touch points from input data
  * @param {DataView} data - Input data view
  * @param {number} offset - Offset to touchpad data
  * @returns {Array} Array of touch points with {active, id, x, y} properties
  */
  _parseTouchPoints(data, offset) {
    // Returns array of up to 2 points: {active, id, x, y}
    const points = [];
    for (let i = 0; i < 2; i++) {
      const base = offset + i * 4;
      const arr = [];
      for (let j = 0; j < 4; j++) arr.push(data.getUint8(base + j));
      const b0 = data.getUint8(base);
      const active = (b0 & 0x80) === 0; // 0 = finger down, 1 = up
      const id = b0 & 0x7F;
      const b1 = data.getUint8(base + 1);
      const b2 = data.getUint8(base + 2);
      const b3 = data.getUint8(base + 3);
      // x: 12 bits, y: 12 bits
      const x = ((b2 & 0x0F) << 8) | b1;
      const y = (b3 << 4) | (b2 >> 4);
      points.push({ active, id, x, y });
    }
    return points;
  }

  /**
  * Parse battery status from input data
  */
  _parseBatteryStatus(data) {
    const batteryInfo = this.currentController.parseBatteryStatus(data);
    const bat_txt = this._batteryPercentToText(batteryInfo);

    const changed = bat_txt !== this._lastBatteryText;
    this._lastBatteryText = bat_txt;

    return { bat_txt, changed, ...batteryInfo };
  }

  /**
  * Convert battery percentage to display text with icons
  */
  _batteryPercentToText({charge_level, is_charging, is_error}) {
    if (is_error) {
      return '<font color="red">' + l("error") + '</font>';
    }

    const batteryIcons = [
      { threshold: 20, icon: 'fa-battery-empty' },
      { threshold: 40, icon: 'fa-battery-quarter' },
      { threshold: 60, icon: 'fa-battery-half' },
      { threshold: 80, icon: 'fa-battery-three-quarters' },
    ];

    const icon_txt = batteryIcons.find(item => charge_level < item.threshold)?.icon || 'fa-battery-full';
    const icon_full = `<i class="fa-solid ${icon_txt}"></i>`;
    const bolt_txt = is_charging ? '<i class="fa-solid fa-bolt"></i>' : '';
    return [`${charge_level}%`, icon_full, bolt_txt].join(' ');
  }

  /**
  * Get a bound input handler function that can be assigned to device.oninputreport
  * @returns {Function} Bound input handler function
  */
  getInputHandler() {
    return this.processControllerInput.bind(this);
  }
}

// Function to initialize the controller manager with dependencies
function initControllerManager(dependencies = {}) {
  const self = new ControllerManager(dependencies);

  // This disables the save button until something actually changes
  self.setHasChangesToWrite(false);
  return self;
}

/**
* Base Controller class that provides common functionality for all controller types
*/
class BaseController {
  constructor(device) {
    this.device = device;
    this.model = "undefined"; // to be set by subclasses
    this.finetuneMaxValue; // to be set by subclasses
  }

  getModel() {
    return this.model;
  }

  /**
  * Get the underlying HID device
  * @returns {HIDDevice} The HID device
  */
  getDevice() {
    return this.device;
  }

  getInputConfig() {
    throw new Error('getInputConfig() must be implemented by subclass');
  }

  /**
   * Get the maximum value for finetune data
   * @returns {number} Maximum value for finetune adjustments
   */
  getFinetuneMaxValue() {
    if(!this.finetuneMaxValue) throw new Error('getFinetuneMaxValue() must be implemented by subclass');
    return this.finetuneMaxValue;
  }

  getNumberOfSticks() {
    return 0;
  }

  /**
  * Set input report handler
  * @param {Function} handler Input report handler function
  */
  setInputReportHandler(handler) {
    this.device.oninputreport = handler;
  }

  /**
  * Allocate request buffer with proper size based on device feature reports
  * @param {number} id Report ID
  * @param {Array} data Data array to include in the request
  * @returns {Uint8Array} Allocated request buffer
  */
  alloc_req(id, data = []) {
    const fr = this.device.collections[0].featureReports;
    const [report] = fr.find(e => e.reportId === id)?.items || [];
    const maxLen = report?.reportCount || data.length;

    const len = Math.min(data.length, maxLen);
    const out = new Uint8Array(maxLen);
    out.set(data.slice(0, len));
    return out;
  }

  /**
  * Send feature report to device
  * @param {number} reportId Report ID
  * @param {ArrayBuffer|Array} data Data to send (if Array, will be processed through allocReq)
  */
  async sendFeatureReport(reportId, data) {
    // If data is an array, use allocReq to create proper buffer
    if (Array.isArray(data)) {
      data = this.alloc_req(reportId, data);
    }

    try {
      return await this.device.sendFeatureReport(reportId, data);
    } catch (error) {
      // HID doesn't throw proper Errors with stack (stack is "name: message") so generate a new stack here
      throw new Error(error.stack);
    }
  }

  /**
  * Receive feature report from device
  * @param {number} reportId Report ID
  */
  async receiveFeatureReport(reportId) {
    return await this.device.receiveFeatureReport(reportId);
  }

  /**
  * Close the HID device connection
  */
  async close() {
    if (this.device?.opened) {
      await this.device.close();
    }
  }

  /**
  * Get the serial number of the device
  * @returns {Promise<string>} The device serial number
  */
  async getSerialNumber() {
    throw new Error('getSerialNumber() must be implemented by subclass');
  }

  // Abstract methods that must be implemented by subclasses
  async getInfo() {
    throw new Error('getInfo() must be implemented by subclass');
  }

  async flash(progressCallback = null) {
    throw new Error('flash() must be implemented by subclass');
  }

  async reset() {
    throw new Error('reset() must be implemented by subclass');
  }

  async nvsLock() {
    throw new Error('nvsLock() must be implemented by subclass');
  }

  async nvsUnlock() {
    throw new Error('nvsUnlock() must be implemented by subclass');
  }

  async calibrateSticksBegin() {
    throw new Error('calibrateSticksBegin() must be implemented by subclass');
  }

  async calibrateSticksEnd() {
    throw new Error('calibrateSticksEnd() must be implemented by subclass');
  }

  async calibrateSticksSample() {
    throw new Error('calibrateSticksSample() must be implemented by subclass');
  }

  async calibrateRangeBegin() {
    throw new Error('calibrateRangeBegin() must be implemented by subclass');
  }

  async calibrateRangeEnd() {
    throw new Error('calibrateRangeEnd() must be implemented by subclass');
  }

  parseBatteryStatus(data) {
    throw new Error('parseBatteryStatus() must be implemented by subclass');
  }
  
  async setAdaptiveTrigger(left, right) {
    // Default no-op implementation for controllers that don't support adaptive triggers
    return { success: true, message: "This controller does not support adaptive triggers" };
  }

  async setVibration(heavyLeft = 0, lightRight = 0) {
    // Default no-op implementation for controllers that don't support vibration
    return { success: true, message: "This controller does not support vibration" };
  }

  async setAdaptiveTriggerPreset(config) {
    // Default no-op implementation for controllers that don't support adaptive trigger presets
    return { success: true, message: "This controller does not support adaptive trigger presets" };
  }

  async setSpeakerTone(output = 'speaker') {
    // Default no-op implementation for controllers that don't support speaker audio
    if (callback) callback({ success: true, message: "This controller does not support speaker audio" });
    return { success: true, message: "This controller does not support speaker audio" };
  }

  async resetLights() {
    // Default no-op implementation for controllers that don't support controllable lights
    return { success: true, message: "This controller does not support controllable lights" };
  }

  async setMuteLed(mode) {
    // Default no-op implementation for controllers that don't support mute LED
    return { success: true, message: "This controller does not support mute LED" };
  }

  async setLightbarColor(r, g, b) {
    // Default no-op implementation for controllers that don't support lightbar colors
    return { success: true, message: "This controller does not support lightbar colors" };
  }

  async setPlayerIndicator(pattern) {
    // Default no-op implementation for controllers that don't support player indicators
    return { success: true, message: "This controller does not support player indicators" };
  }

  /**
   * Get the list of supported quick tests for this controller
   * @returns {Array<string>} Array of supported test types
   */
  getSupportedQuickTests() {
    // Default implementation - supports all tests
    return ['usb', 'buttons', 'adaptive', 'haptic', 'lights', 'speaker', 'headphone', 'microphone'];
  }
}

// DS4 Button mapping configuration
const DS4_BUTTON_MAP = [
  { name: 'up', byte: 4, mask: 0x0 }, // Dpad handled separately
  { name: 'right', byte: 4, mask: 0x1 },
  { name: 'down', byte: 4, mask: 0x2 },
  { name: 'left', byte: 4, mask: 0x3 },
  { name: 'square', byte: 4, mask: 0x10, svg: 'Square' },
  { name: 'cross', byte: 4, mask: 0x20, svg: 'Cross' },
  { name: 'circle', byte: 4, mask: 0x40, svg: 'Circle' },
  { name: 'triangle', byte: 4, mask: 0x80, svg: 'Triangle' },
  { name: 'l1', byte: 5, mask: 0x01, svg: 'L1' },
  { name: 'l2', byte: 5, mask: 0x04, svg: 'L2' }, // analog handled separately
  { name: 'r1', byte: 5, mask: 0x02, svg: 'R1' },
  { name: 'r2', byte: 5, mask: 0x08, svg: 'R2' }, // analog handled separately
  { name: 'create', byte: 5, mask: 0x10, svg: 'Create' },
  { name: 'options', byte: 5, mask: 0x20, svg: 'Options' },
  { name: 'l3', byte: 5, mask: 0x40, svg: 'L3' },
  { name: 'r3', byte: 5, mask: 0x80, svg: 'R3' },
  { name: 'ps', byte: 6, mask: 0x01, svg: 'PS' },
  { name: 'touchpad', byte: 6, mask: 0x02, svg: 'Trackpad' },
  // No mute button on DS4
];

// DS4 Input processing configuration
const DS4_INPUT_CONFIG = {
  buttonMap: DS4_BUTTON_MAP,
  dpadByte: 4,
  l2AnalogByte: 7,
  r2AnalogByte: 8,
  touchpadOffset: 34,
};

// DS4 Output Report Constants
const DS4_OUTPUT_REPORT = {
  USB_REPORT_ID: 0x05,
  BT_REPORT_ID: 0x11,
};

const DS4_VALID_FLAG0 = {
  RUMBLE: 0x01,           // Bit 0 for rumble motors
  LED: 0x02,              // Bit 1 for LED control
  LED_BLINK: 0x04,        // Bit 2 for LED blink control
};

// Basic DS4 Output Structure for vibration and LED control
class DS4OutputStruct {
  constructor(currentState = null) {
    // Create a 32-byte buffer for DS4 output report (USB)
    this.buffer = new ArrayBuffer(31);
    this.view = new DataView(this.buffer);

    // Control flags
    this.validFlag0 = currentState?.validFlag0 || 0;
    this.validFlag1 = currentState?.validFlag1 || 0;

    // Vibration motors
    this.rumbleRight = currentState?.rumbleRight || 0;
    this.rumbleLeft = currentState?.rumbleLeft || 0;

    // LED control
    this.ledRed = currentState?.ledRed || 0;
    this.ledGreen = currentState?.ledGreen || 0;
    this.ledBlue = currentState?.ledBlue || 0;

    // LED timing
    this.ledFlashOn = currentState?.ledFlashOn || 0;
    this.ledFlashOff = currentState?.ledFlashOff || 0;
  }

  // Pack the data into the output buffer
  pack() {
    // Based on DS4 output report structure
    // Byte 0-2: Valid flags and padding
    this.view.setUint8(0, this.validFlag0);
    this.view.setUint8(1, this.validFlag1);
    this.view.setUint8(2, 0x00);

    // Byte 3-4: Rumble motors
    this.view.setUint8(3, this.rumbleRight);
    this.view.setUint8(4, this.rumbleLeft);

    // Bytes 5-7: LED RGB
    this.view.setUint8(5, this.ledRed);
    this.view.setUint8(6, this.ledGreen);
    this.view.setUint8(7, this.ledBlue);

    // Bytes 8-9: LED flash timing
    this.view.setUint8(8, this.ledFlashOn);
    this.view.setUint8(9, this.ledFlashOff);

    return this.buffer;
  }
}

/**
* DualShock 4 Controller implementation
*/
class DS4Controller extends BaseController {
  constructor(device) {
    super(device);
    this.model = "DS4";

    // Initialize current output state to track controller settings
    this.currentOutputState = {
      validFlag0: 0,
      validFlag1: 0,
      rumbleRight: 0,
      rumbleLeft: 0,
      ledRed: 0,
      ledGreen: 0,
      ledBlue: 0,
      ledFlashOn: 0,
      ledFlashOff: 0,
    };
  }

  getInputConfig() {
    return DS4_INPUT_CONFIG;
  }

  async getSerialNumber() {
    return await this.getBdAddr();
  }

  async getInfo() {
    // Device-only: collect info and return a common structure; do not touch the DOM
    try {
      let deviceTypeText = l("unknown");
      let is_clone = false;

      const view = await this.receiveFeatureReport(0xa3);

      const cmd = view.getUint8(0, true);

      if(cmd != 0xa3 || view.buffer.byteLength < 49) {
        if(view.buffer.byteLength != 49) {
          deviceTypeText = l("clone");
          is_clone = true;
        }
      }

      const k1 = new TextDecoder().decode(view.buffer.slice(1, 0x10)).replace(/\0/g, '');
      const k2 = new TextDecoder().decode(view.buffer.slice(0x10, 0x20)).replace(/\0/g, '');

      const hw_ver_major = view.getUint16(0x21, true);
      const hw_ver_minor = view.getUint16(0x23, true);
      const sw_ver_major = view.getUint32(0x25, true);
      const sw_ver_minor = view.getUint16(0x25+4, true);
      try {
        if(!is_clone) {
          // If this feature report succeeds, it's an original device
          await this.receiveFeatureReport(0x81);
          deviceTypeText = l("original");
        }
      } catch(e) {
        la("clone");
        is_clone = true;
        deviceTypeText = l("clone");
      }

      const hw_version = `${dec2hex(hw_ver_major)}:${dec2hex(hw_ver_minor)}`;
      const sw_version = `${dec2hex(sw_ver_major)}:${dec2hex(sw_ver_minor)}`;
      const infoItems = [
        { key: l("Build Date"), value: `${k1} ${k2}`, cat: "fw" },
        { key: l("HW Version"), value: hw_version, cat: "hw" },
        { key: l("SW Version"), value: sw_version, cat: "fw" },
        { key: l("Device Type"), value: deviceTypeText, cat: "hw", severity: is_clone ? 'danger' : undefined },
      ];

      const board_model = this.hwToBoardModel(hw_ver_minor);
      const bd_addr = await this.getBdAddr();

      if(!is_clone) {
        // Add Board Model (UI will append the info icon)
        infoItems.push({ key: l("Board Model"), value: board_model, cat: "hw", addInfoIcon: 'board', copyable: true });
        infoItems.push({ key: l("Bluetooth Address"), value: bd_addr, cat: "hw" });
      }

      const nv = await this.queryNvStatus();
      const rare = this.isRare(hw_ver_minor);
      const disable_bits = is_clone ? 1 : 0; // 1: clone

      la("ds4_get_info", { hw_version, board_model, bd_addr, is_clone });  // Collect Bluetooth address for analytics

      return { ok: true, infoItems, nv, disable_bits, rare };
    } catch(error) {
      // Return error but do not touch DOM
      return { ok: false, error, disable_bits: 1 };
    }
  }

  async flash(progressCallback = null) {
    la("ds4_flash");
    try {
      await this.nvsUnlock();
      const lockRes = await this.nvsLock();
      if(!lockRes.ok) throw (lockRes.error || new Error("NVS lock failed"));

      return { success: true, message: l("Changes saved successfully") };
    } catch(error) {
      throw new Error(l("Error while saving changes"), { cause: error });
    }
  }

  async reset() {
    la("ds4_reset");
    try {
      await this.sendFeatureReport(0xa0, [4,1,0]);
    } catch(error) {
    }
  }

  async nvsLock() {
    // la("ds4_nvlock");
    try {
      await this.sendFeatureReport(0xa0, [10,1,0]);
      return { ok: true };
    } catch(error) {
      return { ok: false, error };
    }
  }

  async nvsUnlock() {
    // la("ds4_nvunlock");
    try {
      await this.sendFeatureReport(0xa0, [10,2,0x3e,0x71,0x7f,0x89]);
      return { ok: true };
    } catch(error) {
      return { ok: false, error };
    }
  }

  async getBdAddr() {
    const view = await this.receiveFeatureReport(0x12);
    return format_mac_from_view(view, 1);
  }

  async calibrateRangeBegin() {
    la("ds4_calibrate_range_begin");
    try {
      // Begin
      await this.sendFeatureReport(0x90, [1,1,2]);
      await sleep(200);

      // Assert
      const data = await this.receiveFeatureReport(0x91);
      const data2 = await this.receiveFeatureReport(0x92);
      const [d1, d2] = [data, data2].map(v => v.buffer.byteLength == 4 ? v.getUint32(0, false) : undefined);
      if(d1 != 0x91010201 || d2 != 0x920102ff) {
        la("ds4_calibrate_range_begin_failed", {"d1": d1, "d2": d2});
        return {
          ok: false,
          error: new Error(`Stick range calibration begin failed: ${d1}, ${d2}`),
          code: 1, d1, d2
        };
      }
      return { ok: true };
    } catch(error) {
      la("ds4_calibrate_range_begin_failed", {"r": error});
      return { ok: false, error };
    }
  }

  async calibrateRangeEnd() {
    la("ds4_calibrate_range_end");
    try {
      // Write
      await this.sendFeatureReport(0x90, [2,1,2]);
      await sleep(200);

      const data = await this.receiveFeatureReport(0x91);
      const data2 = await this.receiveFeatureReport(0x92);
      const [d1, d2] = [data, data2].map(v => v.getUint32(0, false));
      if(d1 != 0x91010202 || d2 != 0x92010201) {
        la("ds4_calibrate_range_end_failed", {"d1": d1, "d2": d2});
        return { ok: false, code: 3, d1, d2 };
      }

      return { ok: true };
    } catch(error) {
      la("ds4_calibrate_range_end_failed", {"r": error});
      return { ok: false, error };
    }
  }

  async calibrateSticksBegin() {
    la("ds4_calibrate_sticks_begin");
    try {
      // Begin
      await this.sendFeatureReport(0x90, [1,1,1]);
      await sleep(200);

      // Assert
      const data = await this.receiveFeatureReport(0x91);
      const data2 = await this.receiveFeatureReport(0x92);
      const [d1, d2] = [data, data2].map(v => v.buffer.byteLength == 4 ? v.getUint32(0, false) : undefined);
      if(d1 != 0x91010101 || d2 != 0x920101ff) {
        la("ds4_calibrate_sticks_begin_failed", {"d1": d1, "d2": d2});
        return {
          ok: false,
          error: new Error(`Stick center calibration begin failed: ${d1}, ${d2}`),
          code: 1, d1, d2,
        };
      }

      return { ok: true };
    } catch(error) {
      la("ds4_calibrate_sticks_begin_failed", {"r": error});
      return { ok: false, error };
    }
  }

  async calibrateSticksSample() {
    la("ds4_calibrate_sticks_sample");
    try {
      // Sample
      await this.sendFeatureReport(0x90, [3,1,1]);
      await sleep(200);

      // Assert
      const data = await this.receiveFeatureReport(0x91);
      const data2 = await this.receiveFeatureReport(0x92);
      if(data.getUint32(0, false) != 0x91010101 || data2.getUint32(0, false) != 0x920101ff) {
        const [d1, d2] = [data, data2].map(v => dec2hex32(v.getUint32(0, false)));
        la("ds4_calibrate_sticks_sample_failed", {"d1": d1, "d2": d2});
        return { ok: false, code: 2, d1, d2 };
      }
      return { ok: true };
    } catch(error) {
      return { ok: false, error };
    }
  }

  async calibrateSticksEnd() {
    la("ds4_calibrate_sticks_end");
    try {
      // Write
      await this.sendFeatureReport(0x90, [2,1,1]);
      await sleep(200);

      const data = await this.receiveFeatureReport(0x91);
      const data2 = await this.receiveFeatureReport(0x92);
      if(data.getUint32(0, false) != 0x91010102 || data2.getUint32(0, false) != 0x92010101) {
        const [d1, d2] = [data, data2].map(v => dec2hex32(v.getUint32(0, false)));
        la("ds4_calibrate_sticks_end_failed", {"d1": d1, "d2": d2});
        return { ok: false, code: 3, d1, d2 };
      }

      return { ok: true };
    } catch(error) {
      la("ds4_calibrate_sticks_end_failed", {"r": error});
      return { ok: false, error };
    }
  }

  async queryNvStatus() {
    try {
      await this.sendFeatureReport(0x08, [0xff,0, 12]);
      const data = await this.receiveFeatureReport(0x11);
      const ret = data.getUint8(1, false);
      const res = { device: 'ds4', code: ret };
      switch(ret) {
        case 1:
          return { ...res, status: 'locked', locked: true, mode: 'temporary' };
        case 0:
          return { ...res, status: 'unlocked', locked: false, mode: 'permanent' };
        default:
          return { ...res, status: 'unknown', locked: null };
      }
    } catch (error) {
      return { device: 'ds4', status: 'error', locked: null, code: 2, error };
    }
  }

  hwToBoardModel(hw_ver) {
    const a = hw_ver >> 8;
    if(a == 0x31) {
      return "JDM-001";
    } else if(a == 0x43) {
      return "JDM-011";
    } else if(a == 0x54) {
      return "JDM-030";
    } else if(a >= 0x64 && a <= 0x74) {
      return "JDM-040";
    } else if((a > 0x80 && a < 0x84) || a == 0x93) {
      return "JDM-020";
    } else if(a == 0xa4 || a == 0x90 || a == 0xa0) {
      return "JDM-050";
    } else if(a == 0xb0) {
      return "JDM-055 (Scuf?)";
    } else if(a == 0xb4) {
      return "JDM-055";
    } else {
      if(this.isRare(hw_ver))
        return "WOW!";
      return l("Unknown");
    }
  }

  isRare(hw_ver) {
    const a = hw_ver >> 8;
    const b = a >> 4;
    return ((b == 7 && a > 0x74) || (b == 9 && a != 0x93 && a != 0x90));
  }

  /**
  * Parse DS4 battery status from input data
  */
  parseBatteryStatus(data) {
    const bat = data.getUint8(29); // DS4 battery byte is at position 29

    // DS4: bat_data = low 4 bits, bat_status = bit 4
    const bat_data = bat & 0x0f;
    const bat_status = (bat >> 4) & 1;
    const cable_connected = bat_status === 1;

    let charge_level = 0;
    let is_charging = false;
    let is_error = false;

    if (cable_connected) {
      if (bat_data < 10) {
        charge_level = Math.min(bat_data * 10 + 5, 100);
        is_charging = true;
      } else if (bat_data === 10) {
        charge_level = 100;
        is_charging = true;
      } else if (bat_data === 11) {
        charge_level = 100; // Fully charged
      } else {
        charge_level = 0;
        is_error = true;
      }
    } else {
      // On battery power
      charge_level = bat_data < 10 ? bat_data * 10 + 5 : 100;
    }

    return { charge_level, cable_connected, is_charging, is_error };
  }

  /**
   * Send output report to the DS4 controller
   * @param {ArrayBuffer} data - The output report data
   */
  async sendOutputReport(data, reason = "") {
    if (!this.device?.opened) {
      throw new Error('Device is not opened');
    }
    try {
      console.log(`Sending output report${ reason ? ` to ${reason}` : '' }:`, DS4_OUTPUT_REPORT.USB_REPORT_ID, buf2hex(data));
      await this.device.sendReport(DS4_OUTPUT_REPORT.USB_REPORT_ID, new Uint8Array(data));
    } catch (error) {
      throw new Error(`Failed to send output report: ${error.message}`);
    }
  }

  /**
   * Update the current output state with values from an OutputStruct
   * @param {DS4OutputStruct} outputStruct - The output structure to copy state from
   */
  updateCurrentOutputState(outputStruct) {
    this.currentOutputState = { ...outputStruct };
  }

  /**
   * Get a copy of the current output state
   * @returns {Object} A copy of the current output state
   */
  getCurrentOutputState() {
    return { ...this.currentOutputState };
  }

  /**
   * Initialize the current output state when the controller is first connected.
   * This method sets up reasonable defaults for the DS4 controller.
   */
  async initializeCurrentOutputState() {
    try {
      // Reset all output state to known defaults
      this.currentOutputState = {
        ...this.getCurrentOutputState(),
        validFlag0: DS4_VALID_FLAG0.RUMBLE | DS4_VALID_FLAG0.LED,
        ledRed: 0,
        ledGreen: 0,
        ledBlue: 255, // Default to blue
        ledFlashOn: 0,
        ledFlashOff: 0
      };

      // Send a "reset" output report to ensure the controller is in a known state
      const resetOutputStruct = new DS4OutputStruct(this.currentOutputState);
      await this.sendOutputReport(resetOutputStruct.pack(), 'init default states');

      // Update our state to reflect what we just sent
      this.updateCurrentOutputState(resetOutputStruct);
    } catch (error) {
      console.warn("Failed to initialize DS4 output state:", error);
      // Even if the reset fails, we still have the default state initialized
    }
  }

  /**
   * Set vibration motors for haptic feedback
   * @param {number} heavyLeft - Left motor intensity (0-255)
   * @param {number} lightRight - Right motor intensity (0-255)
   */
  async setVibration(heavyLeft = 0, lightRight = 0) {
    try {
      const { validFlag0 } = this.currentOutputState;
      const outputStruct = new DS4OutputStruct({
        ...this.currentOutputState,
        rumbleLeft: Math.max(0, Math.min(255, heavyLeft)),
        rumbleRight: Math.max(0, Math.min(255, lightRight)),
        validFlag0: validFlag0 | DS4_VALID_FLAG0.RUMBLE,
      });
      await this.sendOutputReport(outputStruct.pack(), 'set vibration');
      outputStruct.validFlag0 &= ~DS4_VALID_FLAG0.RUMBLE;

      // Update current state to reflect the changes
      this.updateCurrentOutputState(outputStruct);

      return { success: true, message: "Vibration set successfully" };
    } catch (error) {
      throw new Error("Failed to set vibration", { cause: error });
    }
  }

  /**
   * Set lightbar color
   * @param {number} red - Red component (0-255)
   * @param {number} green - Green component (0-255)
   * @param {number} blue - Blue component (0-255)
   */
  async setLightbarColor(red = 0, green = 0, blue = 0) {
    try {
      const { validFlag0 } = this.currentOutputState;
      const outputStruct = new DS4OutputStruct({
        ...this.currentOutputState,
        ledRed: Math.max(0, Math.min(255, red)),
        ledGreen: Math.max(0, Math.min(255, green)),
        ledBlue: Math.max(0, Math.min(255, blue)),
        validFlag0: validFlag0 | DS4_VALID_FLAG0.LED,
      });
      await this.sendOutputReport(outputStruct.pack(), 'set lightbar color');
      outputStruct.validFlag0 &= ~DS4_VALID_FLAG0.LED;

      // Update current state to reflect the changes
      this.updateCurrentOutputState(outputStruct);
    } catch (error) {
      throw new Error("Failed to set lightbar color", { cause: error });
    }
  }

  /**
   * Set lightbar blink pattern
   * @param {number} red - Red component (0-255)
   * @param {number} green - Green component (0-255)
   * @param {number} blue - Blue component (0-255)
   * @param {number} flashOn - On duration in deciseconds (0-255)
   * @param {number} flashOff - Off duration in deciseconds (0-255)
   */
  async setLightbarBlink(red = 0, green = 0, blue = 0, flashOn = 0, flashOff = 0) {
    try {
      const { validFlag0 } = this.currentOutputState;
      const outputStruct = new DS4OutputStruct({
        ...this.currentOutputState,
        ledRed: Math.max(0, Math.min(255, red)),
        ledGreen: Math.max(0, Math.min(255, green)),
        ledBlue: Math.max(0, Math.min(255, blue)),
        ledFlashOn: Math.max(0, Math.min(255, flashOn)),
        ledFlashOff: Math.max(0, Math.min(255, flashOff)),
        validFlag0: validFlag0 | DS4_VALID_FLAG0.LED | DS4_VALID_FLAG0.LED_BLINK,
      });
      await this.sendOutputReport(outputStruct.pack(), 'set lightbar blink');
      outputStruct.validFlag0 &= ~(DS4_VALID_FLAG0.LED | DS4_VALID_FLAG0.LED_BLINK);

      // Update current state to reflect the changes
      this.updateCurrentOutputState(outputStruct);
    } catch (error) {
      throw new Error("Failed to set lightbar blink", { cause: error });
    }
  }

  /**
   * Set speaker tone for audio output through the controller's headphone jack
   * Note: DS4 only supports playing sound through headphones connected to the controller.
   * The built-in speaker is not supported. DS4 audio is a standard USB audio device,
   * not controlled via HID output reports.
   * @param {string} output - Audio output destination: "headphones" only (throws error if "speaker")
   * @throws {Error} If output is set to "speaker" (not supported on DS4)
   */
  async setSpeakerTone(output = "speaker") {
    // Throw error if trying to use the built-in speaker
    if (output === "speaker") {
      throw new Error("DS4 does not support playing sound through the built-in speaker. Only 'headphones' output is supported.");
    }

    // DS4 speaker works as a standard USB audio device (class-compliant)
    // It cannot be controlled through HID output reports like DS5

    // Create Web Audio Context
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    if (audioContext.state === 'suspended') {
      await audioContext.resume();
    }

    // Try to get microphone permission to see device labels
    let hasPermission = false;
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach(track => track.stop());
      hasPermission = true;
    } catch (error) {
      throw new Error('Microphone permission required to enumerate audio devices', { cause: error });
    }

    // Check if we have access to audio devices and setSinkId support
    if (navigator.mediaDevices && navigator.mediaDevices.enumerateDevices) {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const audioOutputs = devices.filter(device => device.kind === 'audiooutput');

      // Look for DualShock 4 audio device
      const ds4AudioDevice = audioOutputs.find(device =>
        device.label && /wireless controller|dualshock|sony/i.test(device.label)
      );

      // Create audio elements for tone generation
      const oscillator = audioContext.createOscillator();
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(880, audioContext.currentTime);

      // Configure volume envelope (fade in/out to avoid clicks)
      // Use max volume for better audibility
      const gainNode = audioContext.createGain();
      gainNode.gain.setValueAtTime(0, audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(1, audioContext.currentTime + 0.05);
      gainNode.gain.linearRampToValueAtTime(1, audioContext.currentTime + 0.5);
      gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.25);

      // Connect audio graph
      oscillator.connect(gainNode);

      let audioElement = null;

      // If DS4 audio device is found and setSinkId is supported, route to it
      if (ds4AudioDevice && typeof HTMLMediaElement !== 'undefined' && HTMLMediaElement.prototype.setSinkId) {
        try {
          // Create a MediaStreamDestination to capture the audio
          const streamDestination = audioContext.createMediaStreamDestination();
          gainNode.connect(streamDestination);

          // Create an audio element to play the stream
          audioElement = new Audio();
          audioElement.autoplay = false;
          audioElement.volume = 1.0; // Max volume

          // Set the audio output to the DS4 speaker BEFORE setting srcObject
          await audioElement.setSinkId(ds4AudioDevice.deviceId);
          audioElement.srcObject = streamDestination.stream;

          // Play the audio element FIRST
          await audioElement.play();

          // THEN start the oscillator (so the stream is already being consumed)
          oscillator.start();
          oscillator.stop(audioContext.currentTime + 0.8);
        } catch (error) {
          throw new Error('Could not set DS4 as audio sink', { cause: error });
        }
      }

      // Clean up audio context and element after tone completes
      setTimeout(() => {
        if (audioElement) {
          audioElement.pause();
          audioElement.srcObject = null;
        }
        if (audioContext.state !== 'closed') {
          audioContext.close();
        }
      }, 1000);
    } else {
      throw new Error('WebRTC getUserMedia API or mediaDevices enumeration not available.');
    }
  }

  getNumberOfSticks() {
    return 2;
  }

  /**
   * Get the list of supported quick tests for DS4 controller
   * DS4 does not support adaptive triggers, speaker, or microphone
   * @returns {Array<string>} Array of supported test types
   */
  getSupportedQuickTests() {
    return ['usb', 'buttons', 'haptic', 'lights', 'headphone'];
  }
}

// DS5 Button mapping configuration
const DS5_BUTTON_MAP$1 = [
  { name: 'up', byte: 7, mask: 0x0 }, // Dpad handled separately
  { name: 'right', byte: 7, mask: 0x1 },
  { name: 'down', byte: 7, mask: 0x2 },
  { name: 'left', byte: 7, mask: 0x3 },
  { name: 'square', byte: 7, mask: 0x10, svg: 'Square' },
  { name: 'cross', byte: 7, mask: 0x20, svg: 'Cross' },
  { name: 'circle', byte: 7, mask: 0x40, svg: 'Circle' },
  { name: 'triangle', byte: 7, mask: 0x80, svg: 'Triangle' },
  { name: 'l1', byte: 8, mask: 0x01, svg: 'L1' },
  { name: 'l2', byte: 4, mask: 0xff }, // analog handled separately
  { name: 'r1', byte: 8, mask: 0x02, svg: 'R1' },
  { name: 'r2', byte: 5, mask: 0xff }, // analog handled separately
  { name: 'create', byte: 8, mask: 0x10, svg: 'Create' },
  { name: 'options', byte: 8, mask: 0x20, svg: 'Options' },
  { name: 'l3', byte: 8, mask: 0x40, svg: 'L3' },
  { name: 'r3', byte: 8, mask: 0x80, svg: 'R3' },
  { name: 'ps', byte: 9, mask: 0x01, svg: 'PS' },
  { name: 'touchpad', byte: 9, mask: 0x02, svg: 'Trackpad' },
  { name: 'mute', byte: 9, mask: 0x04, svg: 'Mute' },
];

// DS5 Input processing configuration
const DS5_INPUT_CONFIG$1 = {
  buttonMap: DS5_BUTTON_MAP$1,
  dpadByte: 7,
  l2AnalogByte: 4,
  r2AnalogByte: 5,
  touchpadOffset: 32,
};

// DS5 Adaptive Trigger Effect Modes
const DS5_TRIGGER_EFFECT_MODE = {
  OFF: 0x00,           // No effect
  RESISTANCE: 0x01,    // Constant resistance
  TRIGGER: 0x02,       // Single-trigger effect with release
  AUTO_TRIGGER: 0x06,  // Automatic trigger with vibration
};

// DS5 Output Report Constants
const DS5_OUTPUT_REPORT$1 = {
  USB_REPORT_ID: 0x02,
  BT_REPORT_ID: 0x31,
};

const DS5_VALID_FLAG0 = {
  RIGHT_VIBRATION: 0x01,  // Bit 0 for right vibration motor
  LEFT_VIBRATION: 0x02,   // Bit 1 for left vibration motor
  LEFT_TRIGGER: 0x04,     // Bit 2 for left adaptive trigger
  RIGHT_TRIGGER: 0x08,    // Bit 3 for right adaptive trigger
  HEADPHONE_VOLUME: 0x10, // Bit 4 for headphone volume control
  SPEAKER_VOLUME: 0x20,   // Bit 5 for speaker volume control
  MIC_VOLUME: 0x40,       // Bit 6 for microphone volume control
  AUDIO_CONTROL: 0x80,    // Bit 7 for audio control
};

const DS5_VALID_FLAG1 = {
  MUTE_LED: 0x01,          // Bit 0 for mute LED control
  POWER_SAVE_MUTE: 0x02,   // Bit 1 for power-save mute control
  LIGHTBAR_COLOR: 0x04,    // Bit 2 for lightbar color control
  RESERVED_BIT_3: 0x08,    // Bit 3 (reserved)
  PLAYER_INDICATOR: 0x10,  // Bit 4 for player indicator LED control
  LED_BRIGHTNESS: 0x20,    // Bit 6 for LED brightness control
  LIGHTBAR_SETUP: 0x40,    // Bit 6 for lightbar setup control
  RESERVED_BIT_7: 0x80,    // Bit 7 (reserved)
};

// Basic DS5 Output Structure for adaptive trigger control
let DS5OutputStruct$1 = class DS5OutputStruct {
  constructor(currentState = null) {
    // Create a 47-byte buffer for DS5 output report (USB)
    this.buffer = new ArrayBuffer(47);
    this.view = new DataView(this.buffer);

    // Control flags
    this.validFlag0 = currentState.validFlag0 || 0;
    this.validFlag1 = currentState.validFlag1 || 0;
    this.validFlag2 = currentState.validFlag2 || 0;

    // Vibration motors
    this.bcVibrationRight = currentState.bcVibrationRight || 0;
    this.bcVibrationLeft = currentState.bcVibrationLeft || 0;

    // Audio control
    this.headphoneVolume = currentState.headphoneVolume || 0;
    this.speakerVolume = currentState.speakerVolume || 0;
    this.micVolume = currentState.micVolume || 0;
    this.audioControl = currentState.audioControl || 0;
    this.audioControl2 = currentState.audioControl2 || 0;

    // LED and indicator control
    this.muteLedControl = currentState.muteLedControl || 0;
    this.powerSaveMuteControl = currentState.powerSaveMuteControl || 0;
    this.lightbarSetup = currentState.lightbarSetup || 0;
    this.ledBrightness = currentState.ledBrightness || 0;
    this.playerIndicator = currentState.playerIndicator || 0;
    this.ledCRed = currentState.ledCRed || 0;
    this.ledCGreen = currentState.ledCGreen || 0;
    this.ledCBlue = currentState.ledCBlue || 0;

    // Adaptive trigger parameters
    this.adaptiveTriggerLeftMode = currentState.adaptiveTriggerLeftMode || 0;
    this.adaptiveTriggerLeftParam0 = currentState.adaptiveTriggerLeftParam0 || 0;
    this.adaptiveTriggerLeftParam1 = currentState.adaptiveTriggerLeftParam1 || 0;
    this.adaptiveTriggerLeftParam2 = currentState.adaptiveTriggerLeftParam2 || 0;

    this.adaptiveTriggerRightMode = currentState.adaptiveTriggerRightMode || 0;
    this.adaptiveTriggerRightParam0 = currentState.adaptiveTriggerRightParam0 || 0;
    this.adaptiveTriggerRightParam1 = currentState.adaptiveTriggerRightParam1 || 0;
    this.adaptiveTriggerRightParam2 = currentState.adaptiveTriggerRightParam2 || 0;

    // Haptic feedback
    this.hapticVolume = currentState.hapticVolume || 0;
  }

  // Pack the data into the output buffer
  pack() {
    // Based on DS5 output report structure from HID descriptor
    // Byte 0-1: Control flags (16-bit little endian)
    this.view.setUint16(0, (this.validFlag1 << 8) | this.validFlag0, true);

    // Byte 2-3: Vibration motors
    this.view.setUint8(2, this.bcVibrationRight);
    this.view.setUint8(3, this.bcVibrationLeft);

    // Bytes 4-7: Audio control (reserved for now)
    this.view.setUint8(4, this.headphoneVolume);
    this.view.setUint8(5, this.speakerVolume);
    this.view.setUint8(6, this.micVolume);
    this.view.setUint8(7, this.audioControl);

    // Byte 8: Mute LED control
    this.view.setUint8(8, this.muteLedControl);

    // Byte 9: Reserved
    this.view.setUint8(9, 0);

    // Bytes 10-20: Right adaptive trigger
    this.view.setUint8(10, this.adaptiveTriggerRightMode);
    this.view.setUint8(11, this.adaptiveTriggerRightParam0);
    this.view.setUint8(12, this.adaptiveTriggerRightParam1);
    this.view.setUint8(13, this.adaptiveTriggerRightParam2);
    // Additional trigger parameters (bytes 14-20 reserved for extended params)
    for (let i = 14; i <= 20; i++) {
      this.view.setUint8(i, 0);
    }

    // Bytes 21-31: Left adaptive trigger
    this.view.setUint8(21, this.adaptiveTriggerLeftMode);
    this.view.setUint8(22, this.adaptiveTriggerLeftParam0);
    this.view.setUint8(23, this.adaptiveTriggerLeftParam1);
    this.view.setUint8(24, this.adaptiveTriggerLeftParam2);
    // Additional trigger parameters (bytes 25-31 reserved for extended params)
    for (let i = 25; i <= 31; i++) {
      this.view.setUint8(i, 0);
    }

    // Bytes 32-42: Reserved
    for (let i = 32; i <= 42; i++) {
      this.view.setUint8(i, 0);
    }

    // Byte 43: Player LED indicator
    this.view.setUint8(43, this.playerIndicator);

    // Bytes 44-46: Lightbar RGB
    this.view.setUint8(44, this.ledCRed);
    this.view.setUint8(45, this.ledCGreen);
    this.view.setUint8(46, this.ledCBlue);

    return this.buffer;
  }
};

function ds5_color(serialNumber) {
  // Color is obtained by the 5th and 6th characters of the serial number
  // e.g. A12305xxx0000000 -> '05' -> Starlight Blue
  const colorMap = {
    '00': 'White',
    '01': 'Midnight Black',
    '02': 'Cosmic Red',
    '03': 'Nova Pink',
    '04': 'Galactic Purple',
    '05': 'Starlight Blue',
    '06': 'Grey Camouflage',
    '07': 'Volcanic Red',
    '08': 'Sterling Silver',
    '09': 'Cobalt Blue',
    '10': 'Chroma Teal',
    '11': 'Chroma Indigo',
    '12': 'Chroma Pearl',
    '30': '30th Anniversary',
    'Z1': 'God of War Ragnarok',
    'Z2': 'Spider-Man 2',
    'Z3': 'Astro Bot',
    'Z4': 'Fortnite',
    'Z6': 'The Last of Us',
    'ZB': 'Icon Blue Limited Edition',
  };

  const colorCode = serialNumber.slice(4, 6);
  const colorName = colorMap[colorCode] || 'Unknown';
  return colorName;
}

/**
* DualSense (DS5) Controller implementation
*/
class DS5Controller extends BaseController {
  constructor(device) {
    super(device);
    this.model = "DS5";
    this.finetuneMaxValue = 65535; // 16-bit max value for DS5

    // Initialize current output state to track controller settings
    this.currentOutputState = {
      validFlag0: 0,
      validFlag1: 0,
      validFlag2: 0,
      bcVibrationRight: 0,
      bcVibrationLeft: 0,
      headphoneVolume: 0,
      speakerVolume: 0,
      micVolume: 0,
      audioControl: 0,
      audioControl2: 0,
      muteLedControl: 0,
      powerSaveMuteControl: 0,
      lightbarSetup: 0,
      ledBrightness: 0,
      playerIndicator: 0,
      ledCRed: 0,
      ledCGreen: 0,
      ledCBlue: 0,
      adaptiveTriggerLeftMode: 0,
      adaptiveTriggerLeftParam0: 0,
      adaptiveTriggerLeftParam1: 0,
      adaptiveTriggerLeftParam2: 0,
      adaptiveTriggerRightMode: 0,
      adaptiveTriggerRightParam0: 0,
      adaptiveTriggerRightParam1: 0,
      adaptiveTriggerRightParam2: 0,
      hapticVolume: 0
    };
  }

  getInputConfig() {
    return DS5_INPUT_CONFIG$1;
  }

  async getSerialNumber() {
    return await this.getSystemInfo(1, 19, 17);
  }

  async getInfo() {
    return this._getInfo(false);
  }

  async _getInfo(is_edge) {
    // Device-only: collect info and return a common structure; do not touch the DOM
    try {
      console.log("Fetching DS5 info...");
      const view = await this.receiveFeatureReport(0x20);
      console.log("Got DS5 info report:", buf2hex(view.buffer));
      const cmd = view.getUint8(0, true);
      if(cmd != 0x20 || view.buffer.byteLength != 64)
        return { ok: false, error: new Error("Invalid response for ds5_info") };

      const build_date = new TextDecoder().decode(view.buffer.slice(1, 1+11));
      const build_time = new TextDecoder().decode(view.buffer.slice(12, 20));

      const fwtype     = view.getUint16(20, true);
      const swseries   = view.getUint16(22, true);
      const hwinfo     = view.getUint32(24, true);
      const fwversion  = view.getUint32(28, true);

      const updversion = view.getUint16(44, true);
      const unk        = view.getUint8(46, true);

      const fwversion1 = view.getUint32(48, true);
      const fwversion2 = view.getUint32(52, true);
      const fwversion3 = view.getUint32(56, true);

      const serial_number = await this.getSystemInfo(1, 19, 17);
      const color = ds5_color(serial_number);
      const infoItems = [
        { key: l("Serial Number"), value: serial_number, cat: "hw", copyable: true },
        { key: l("MCU Unique ID"), value: await this.getSystemInfo(1, 9, 9, false), cat: "hw", isExtra: true, copyable: true },
        { key: l("PCBA ID"), value: reverse_str(await this.getSystemInfo(1, 17, 14)), cat: "hw", isExtra: true },
        { key: l("Battery Barcode"), value: await this.getSystemInfo(1, 24, 23), cat: "hw", isExtra: true, copyable: true },
        { key: l("VCM Left Barcode"), value: await this.getSystemInfo(1, 26, 16), cat: "hw", isExtra: true, copyable: true },
        { key: l("VCM Right Barcode"), value: await this.getSystemInfo(1, 28, 16), cat: "hw", isExtra: true, copyable: true },

        { key: l("Color"), value: l(color), cat: "hw", addInfoIcon: 'color', copyable: true },

        ...(is_edge ? [] : [{ key: l("Board Model"), value: this.hwToBoardModel(hwinfo), cat: "hw", addInfoIcon: 'board', copyable: true }]),

        { key: l("FW Build Date"), value: build_date + " " + build_time, cat: "fw" },
        { key: l("FW Type"), value: "0x" + dec2hex(fwtype), cat: "fw", isExtra: true },
        { key: l("FW Series"), value: "0x" + dec2hex(swseries), cat: "fw", isExtra: true },
        { key: l("HW Model"), value: "0x" + dec2hex32(hwinfo), cat: "hw", isExtra: true },
        { key: l("FW Version"), value: "0x" + dec2hex32(fwversion), cat: "fw", isExtra: true },
        { key: l("FW Update"), value: "0x" + dec2hex(updversion), cat: "fw", isExtra: true },
        { key: l("FW Update Info"), value: "0x" + dec2hex8(unk), cat: "fw", isExtra: true },
        { key: l("SBL FW Version"), value: "0x" + dec2hex32(fwversion1), cat: "fw", isExtra: true },
        { key: l("Venom FW Version"), value: "0x" + dec2hex32(fwversion2), cat: "fw", isExtra: true },
        { key: l("Spider FW Version"), value: "0x" + dec2hex32(fwversion3), cat: "fw", isExtra: true },

        { key: l("Touchpad ID"), value: await this.getSystemInfo(5, 2, 8, false), cat: "hw", isExtra: true, copyable: true },
        { key: l("Touchpad FW Version"), value: await this.getSystemInfo(5, 4, 8, false), cat: "fw", isExtra: true },
      ];

      const old_controller = build_date.search(/ 2020| 2021/);
      let disable_bits = 0;
      if(old_controller != -1) {
        la("ds5_info_error", {"r": "old"});
        disable_bits |= 2; // 2: outdated firmware
      }

      const nv = await this.queryNvStatus();
      const bd_addr = await this.getBdAddr();
      infoItems.push({ key: l("Bluetooth Address"), value: bd_addr, cat: "hw", isExtra: true });

      const pending_reboot = (nv?.status === 'pending_reboot');

      return { ok: true, infoItems, nv, disable_bits, pending_reboot };
    } catch(error) {
      la("ds5_info_error", {"r": error});
      return { ok: false, error, disable_bits: 1 };
    }
  }

  async flash(progressCallback = null) {
    la("ds5_flash");
    try {
      await this.nvsUnlock();
      const lockRes = await this.nvsLock();
      if(!lockRes.ok) throw (lockRes.error || new Error("NVS lock failed"));

      return { success: true, message: l("Changes saved successfully") };
    } catch(error) {
      throw new Error(l("Error while saving changes"), { cause: error });
    }
  }

  async reset() {
    la("ds5_reset");
    try {
      await this.sendFeatureReport(0x80, [1,1]);
    } catch(error) {
    }
  }

  async nvsLock() {
    // la("ds5_nvlock");
    try {
      await this.sendFeatureReport(0x80, [3,1]);
      await this.receiveFeatureReport(0x81);
      return { ok: true };
    } catch(error) {
      return { ok: false, error };
    }
  }

  async nvsUnlock() {
    // la("ds5_nvunlock");
    try {
      await this.sendFeatureReport(0x80, [3,2, 101, 50, 64, 12]);
      const data = await this.receiveFeatureReport(0x81);
    } catch(error) {
      await sleep(500);
      throw new Error(l("NVS Unlock failed"), { cause: error });
    }
  }

  async getBdAddr() {
    await this.sendFeatureReport(0x80, [9,2]);
    const data = await this.receiveFeatureReport(0x81);
    return format_mac_from_view(data, 4);
  }

  async getSystemInfo(base, num, length, decode = true) {
    await this.sendFeatureReport(128, [base,num]);
    const pcba_id = await this.receiveFeatureReport(129);
    if(pcba_id.getUint8(1) != base || pcba_id.getUint8(2) != num || pcba_id.getUint8(3) != 2) {
      return l("error");
    }
    if(decode)
      return new TextDecoder().decode(pcba_id.buffer.slice(4, 4+length));

    return buf2hex(pcba_id.buffer.slice(4, 4+length));
  }

  async calibrateSticksBegin() {
    la("ds5_calibrate_sticks_begin");
    try {
      // Begin
      await this.sendFeatureReport(0x82, [1,1,1]);

      // Assert
      const data = await this.receiveFeatureReport(0x83);
      if(data.getUint32(0, false) != 0x83010101) {
        const d1 = dec2hex32(data.getUint32(0, false));
        la("ds5_calibrate_sticks_begin_failed", {"d1": d1});
        throw new Error(`Stick center calibration begin failed: ${d1}`);
      }
      return { ok: true };
    } catch(error) {
      la("ds5_calibrate_sticks_begin_failed", {"r": error});
      return { ok: false, error };
    }
  }

  async calibrateSticksSample() {
    la("ds5_calibrate_sticks_sample");
    try {
      // Sample
      await this.sendFeatureReport(0x82, [3,1,1]);

      // Assert
      const data = await this.receiveFeatureReport(0x83);
      if(data.getUint32(0, false) != 0x83010101) {
        const d1 = dec2hex32(data.getUint32(0, false));
        la("ds5_calibrate_sticks_sample_failed", {"d1": d1});
        throw new Error(`Stick center calibration sample failed: ${d1}`);
      }
      return { ok: true };
    } catch(error) {
      la("ds5_calibrate_sticks_sample_failed", {"r": error});
      return { ok: false, error };
    }
  }

  async calibrateSticksEnd() {
    la("ds5_calibrate_sticks_end");
    try {
      // Write
      await this.sendFeatureReport(0x82, [2,1,1]);

      const data = await this.receiveFeatureReport(0x83);

      if(data.getUint32(0, false) != 0x83010102) {
        const d1 = dec2hex32(data.getUint32(0, false));
        la("ds5_calibrate_sticks_failed", {"s": 3, "d1": d1});
        throw new Error(`Stick center calibration end failed: ${d1}`);
      }

      return { ok: true };
    } catch(error) {
      la("ds5_calibrate_sticks_end_failed", {"r": error});
      return { ok: false, error };
    }
  }

  async calibrateRangeBegin() {
    la("ds5_calibrate_range_begin");
    try {
      // Begin
      await this.sendFeatureReport(0x82, [1,1,2]);

      // Assert
      const data = await this.receiveFeatureReport(0x83);
      if(data.getUint32(0, false) != 0x83010201) {
        const d1 = dec2hex32(data.getUint32(0, false));
        la("ds5_calibrate_range_begin_failed", {"d1": d1});
        throw new Error(`Stick range calibration begin failed: ${d1}`);
      }
      return { ok: true };
    } catch(error) {
      la("ds5_calibrate_range_begin_failed", {"r": error});
      return { ok: false, error };
    }
  }

  async calibrateRangeEnd() {
    la("ds5_calibrate_range_end");
    try {
      // Write
      await this.sendFeatureReport(0x82, [2,1,2]);

      // Assert
      const data = await this.receiveFeatureReport(0x83);

      if(data.getUint32(0, false) != 0x83010202) {
        const d1 = dec2hex32(data.getUint32(0, false));
        la("ds5_calibrate_range_end_failed", {"d1": d1});
        throw new Error(`Stick range calibration end failed: ${d1}`);
      }

      return { ok: true };
    } catch(error) {
      la("ds5_calibrate_range_end_failed", {"r": error});
      return { ok: false, error };
    }
  }

  async queryNvStatus() {
    try {
      await this.sendFeatureReport(0x80, [3,3]);
      const data = await this.receiveFeatureReport(0x81);
      const ret = data.getUint32(1, false);
      if (ret === 0x15010100) {
        return { device: 'ds5', status: 'pending_reboot', locked: null, code: 4, raw: ret };
      }
      if (ret === 0x03030201) {
        return { device: 'ds5', status: 'locked', locked: true, mode: 'temporary', code: 1, raw: ret };
      }
      if (ret === 0x03030200) {
        return { device: 'ds5', status: 'unlocked', locked: false, mode: 'permanent', code: 0, raw: ret };
      }
      if (ret === 1 || ret === 2) {
        return { device: 'ds5', status: 'unknown', locked: null, code: 2, raw: ret };
      }
      return { device: 'ds5', status: 'unknown', locked: null, code: ret, raw: ret };
    } catch (error) {
      return { device: 'ds5', status: 'error', locked: null, code: 2, error };
    }
  }

  hwToBoardModel(hw_ver) {
    const a = (hw_ver >> 8) & 0xff;
    if(a == 0x03) return "BDM-010";
    if(a == 0x04) return "BDM-020";
    if(a == 0x05) return "BDM-030";
    if(a == 0x06) return "BDM-040";
    if(a == 0x07 || a == 0x08) return "BDM-050";
    // TODO 0x09..0x10?
    if(a == 0x11) return "BDM-060M";
    // TODO 0x12?
    if(a == 0x13) return "BDM-060X";
    return l("Unknown");
  }

  async getInMemoryModuleData() {
    // DualSense
    await this.sendFeatureReport(0x80, [12, 2]);
    await sleep(100);
    const data = await this.receiveFeatureReport(0x81);
    const cmd = data.getUint8(0, true);
    const [p1, p2, p3] = [1, 2, 3].map(i => data.getUint8(i, true));

    if(cmd != 129 || p1 != 12 || (p2 != 2 && p2 != 4) || p3 != 2)
      return null;

    return Array.from({ length: 12 }, (_, i) => data.getUint16(4 + i * 2, true));
  }

  async writeFinetuneData(data) {
    const pkg = data.reduce((acc, val) => acc.concat([val & 0xff, val >> 8]), [12, 1]);
    await this.sendFeatureReport(0x80, pkg);
  }

  /**
   * Send output report to the DS5 controller
   * @param {ArrayBuffer} data - The output report data
   */
  async sendOutputReport(data, reason = "") {
    if (!this.device?.opened) {
      throw new Error('Device is not opened');
    }
    try {
      console.log(`Sending output report${ reason ? ` to ${reason}` : '' }:`, DS5_OUTPUT_REPORT$1.USB_REPORT_ID, buf2hex(data));
      await this.device.sendReport(DS5_OUTPUT_REPORT$1.USB_REPORT_ID, new Uint8Array(data));
    } catch (error) {
      throw new Error(`Failed to send output report: ${error.message}`);
    }
  }

  /**
   * Update the current output state with values from an OutputStruct
   * @param {DS5OutputStruct} outputStruct - The output structure to copy state from
   */
  updateCurrentOutputState(outputStruct) {
    this.currentOutputState = { ...outputStruct };
  }

  /**
   * Get a copy of the current output state
   * @returns {Object} A copy of the current output state
   */
  getCurrentOutputState() {
    return { ...this.currentOutputState };
  }

  /**
   * Initialize the current output state when the controller is first connected.
   * Since DS5 controllers don't provide a way to read the current output state,
   * this method sets up reasonable defaults and attempts to detect any current settings.
   */
  async initializeCurrentOutputState() {
    try {
      // Reset all output state to known defaults
      this.currentOutputState = {
        ...this.getCurrentOutputState(),
        validFlag1: 0b1111_0111,
        ledCRed: 0,
        ledCGreen: 0,
        ledCBlue: 255,
      };

      // Send a "reset" output report to ensure the controller is in a known state
      // This will turn off any existing effects and set the controller to defaults
      const resetOutputStruct = new DS5OutputStruct$1(this.currentOutputState);
      await this.sendOutputReport(resetOutputStruct.pack(), 'init default states');

      // Update our state to reflect what we just sent
      this.updateCurrentOutputState(resetOutputStruct);
    } catch (error) {
      console.warn("Failed to initialize DS5 output state:", error);
      // Even if the reset fails, we still have the default state initialized
    }
  }

  /**
   * Set left adaptive trigger to single-trigger mode
   */
  async setAdaptiveTrigger(left, right) {
    try {
      const modeMap = {
        'off': DS5_TRIGGER_EFFECT_MODE.OFF,
        'single': DS5_TRIGGER_EFFECT_MODE.TRIGGER,
        'auto': DS5_TRIGGER_EFFECT_MODE.AUTO_TRIGGER,
        'resistance': DS5_TRIGGER_EFFECT_MODE.RESISTANCE,
      };

      // Create output structure with current controller state
      const { validFlag0 } = this.currentOutputState;
      const outputStruct = new DS5OutputStruct$1({
        ...this.currentOutputState,
        adaptiveTriggerLeftMode: modeMap[left.mode],
        adaptiveTriggerLeftParam0: left.start,
        adaptiveTriggerLeftParam1: left.end,
        adaptiveTriggerLeftParam2: left.force,

        adaptiveTriggerRightMode: modeMap[right.mode],
        adaptiveTriggerRightParam0: right.start,
        adaptiveTriggerRightParam1: right.end,
        adaptiveTriggerRightParam2: right.force,

        validFlag0: validFlag0 | DS5_VALID_FLAG0.LEFT_TRIGGER | DS5_VALID_FLAG0.RIGHT_TRIGGER,
      });
      await this.sendOutputReport(outputStruct.pack(), 'set adaptive trigger mode');
      outputStruct.validFlag0 &= ~(DS5_VALID_FLAG0.LEFT_TRIGGER | DS5_VALID_FLAG0.RIGHT_TRIGGER);

      // Update current state to reflect the changes
      this.updateCurrentOutputState(outputStruct);

      return { success: true };
    } catch (error) {
      throw new Error("Failed to set left adaptive trigger mode", { cause: error });
    }
  }

  /**
   * Set vibration motors for haptic feedback
   * @param {number} heavyLeft - Left motor intensity (0-255)
   * @param {number} lightRight - Right motor intensity (0-255)
   */
  async setVibration(heavyLeft = 0, lightRight = 0) {
    try {
      const { validFlag0 } = this.currentOutputState;
      const outputStruct = new DS5OutputStruct$1({
        ...this.currentOutputState,
        bcVibrationLeft: Math.max(0, Math.min(255, heavyLeft)),
        bcVibrationRight: Math.max(0, Math.min(255, lightRight)),
        validFlag0: validFlag0 | DS5_VALID_FLAG0.LEFT_VIBRATION | DS5_VALID_FLAG0.RIGHT_VIBRATION, // Update both vibration motors
      });
      await this.sendOutputReport(outputStruct.pack(), 'set vibration');
      outputStruct.validFlag0 &= ~(DS5_VALID_FLAG0.LEFT_VIBRATION | DS5_VALID_FLAG0.RIGHT_VIBRATION);

      // Update current state to reflect the changes
      this.updateCurrentOutputState(outputStruct);
    } catch (error) {
      throw new Error("Failed to set vibration", { cause: error });
    }
  }

  /**
   * Test speaker tone by controlling speaker volume and audio settings
   * This creates a brief audio feedback through the controller's speaker or headphones
   * @param {string} output - Audio output destination: "speaker" (default) or "headphones"
   */
  async setSpeakerTone(output = "speaker") {
    try {
      const { validFlag0 } = this.currentOutputState;
      const outputStruct = new DS5OutputStruct$1({
        ...this.currentOutputState,
        speakerVolume: 85,
        headphoneVolume: 55,
        validFlag0: validFlag0 | DS5_VALID_FLAG0.HEADPHONE_VOLUME | DS5_VALID_FLAG0.SPEAKER_VOLUME | DS5_VALID_FLAG0.AUDIO_CONTROL,
      });
      await this.sendOutputReport(outputStruct.pack(), output === "headphones" ? 'play headphone tone' : 'play speaker tone');
      outputStruct.validFlag0 &= ~(DS5_VALID_FLAG0.HEADPHONE_VOLUME | DS5_VALID_FLAG0.SPEAKER_VOLUME | DS5_VALID_FLAG0.AUDIO_CONTROL);

      // Send feature reports to enable audio
      if (output === "headphones") {
        // Audio configuration command for headphones
        await this.sendFeatureReport(128, [6, 4, 0, 0, 0, 0, 4, 0, 6]);
        // Enable headphone tone
        await this.sendFeatureReport(128, [6, 2, 1, 1, 0]);
      } else {
        // Audio configuration command for speakers
        await this.sendFeatureReport(128, [6, 4, 0, 0, 8]);
        // Enable speaker tone
        await this.sendFeatureReport(128, [6, 2, 1, 1, 0]);
      }

      // Update current state to reflect the changes
      this.updateCurrentOutputState(outputStruct);
    } catch (error) {
      throw new Error("Failed to set speaker tone", { cause: error });
    }
  }

  /**
   * Reset speaker settings to default (turn off speaker)
   */
  async resetSpeakerSettings() {
    try {
      // Disable speaker tone first via feature report
      await this.sendFeatureReport(128, [6, 2, 0, 1, 0]);

      const { validFlag0 } = this.currentOutputState;
      const outputStruct = new DS5OutputStruct$1({
        ...this.currentOutputState,
        speakerVolume: 0,
        validFlag0: validFlag0 | DS5_VALID_FLAG0.SPEAKER_VOLUME | DS5_VALID_FLAG0.AUDIO_CONTROL,
      });
      // outputStruct.audioControl = 0x00;
      await this.sendOutputReport(outputStruct.pack(), 'stop speaker tone');
      outputStruct.validFlag0 &= ~(DS5_VALID_FLAG0.SPEAKER_VOLUME | DS5_VALID_FLAG0.AUDIO_CONTROL);

      // Update current state to reflect the changes
      this.updateCurrentOutputState(outputStruct);
    } catch (error) {
      throw new Error("Failed to reset speaker settings", { cause: error });
    }
  }

  /**
   * Set lightbar color
   * @param {number} red - Red component (0-255)
   * @param {number} green - Green component (0-255)
   * @param {number} blue - Blue component (0-255)
   */
  async setLightbarColor(red = 0, green = 0, blue = 0) {
    try {
      const { validFlag1 } = this.currentOutputState;
      const outputStruct = new DS5OutputStruct$1({
        ...this.currentOutputState,
        ledCRed: Math.max(0, Math.min(255, red)),
        ledCGreen: Math.max(0, Math.min(255, green)),
        ledCBlue: Math.max(0, Math.min(255, blue)),
        validFlag1: validFlag1 | DS5_VALID_FLAG1.LIGHTBAR_COLOR,
      });
      await this.sendOutputReport(outputStruct.pack(), 'set lightbar color');
      outputStruct.validFlag1 &= ~DS5_VALID_FLAG1.LIGHTBAR_COLOR;

      // Update current state to reflect the changes
      this.updateCurrentOutputState(outputStruct);
    } catch (error) {
      throw new Error("Failed to set lightbar color", { cause: error });
    }
  }

  /**
   * Set player indicator lights
   * @param {number} pattern - Player indicator pattern (0-31, each bit represents a light)
   */
  async setPlayerIndicator(pattern = 0) {
    try {
      const { validFlag1 } = this.currentOutputState;
      const outputStruct = new DS5OutputStruct$1({
        ...this.currentOutputState,
        playerIndicator: Math.max(0, Math.min(31, pattern)),
        validFlag1: validFlag1 | DS5_VALID_FLAG1.PLAYER_INDICATOR,
      });
      await this.sendOutputReport(outputStruct.pack(), 'set player indicator');
      outputStruct.validFlag1 &= ~DS5_VALID_FLAG1.PLAYER_INDICATOR;

      // Update current state to reflect the changes
      this.updateCurrentOutputState(outputStruct);
    } catch (error) {
      throw new Error("Failed to set player indicator", { cause: error });
    }
  }

  /**
   * Reset lights to default state (turn off)
   */
  async resetLights() {
    try {
      await this.setLightbarColor(0, 0, 0);
      await this.setPlayerIndicator(0);
      await this.setMuteLed(0);
    } catch (error) {
      throw new Error("Failed to reset lights", { cause: error });
    }
  }

  /**
   * Set mute button LED state
   * @param {number} state - Mute LED state (0 = off, 1 = solid, 2 = pulsing)
   */
  async setMuteLed(state = 0) {
    try {
      const { validFlag1 } = this.currentOutputState;
      const outputStruct = new DS5OutputStruct$1({
        ...this.currentOutputState,
        muteLedControl: Math.max(0, Math.min(2, state)),
        validFlag1: validFlag1 | DS5_VALID_FLAG1.MUTE_LED,
      });
      await this.sendOutputReport(outputStruct.pack(), 'set mute LED');
      outputStruct.validFlag1 &= ~DS5_VALID_FLAG1.MUTE_LED;

      // Update current state to reflect the changes
      this.updateCurrentOutputState(outputStruct);
    } catch (error) {
      throw new Error("Failed to set mute LED", { cause: error });
    }
  }

  getNumberOfSticks() {
    return 2;
  }

  /**
  * Parse DS5 battery status from input data
  */
  parseBatteryStatus(data) {
    const bat = data.getUint8(52); // DS5 battery byte is at position 52

    // DS5: bat_charge = low 4 bits, bat_status = high 4 bits
    const bat_charge = bat & 0x0f;
    const bat_status = bat >> 4;

    let charge_level = 0;
    let cable_connected = false;
    let is_charging = false;
    let is_error = false;

    switch (bat_status) {
      case 0:
        // On battery power
        charge_level = Math.min(bat_charge * 10 + 5, 100);
        break;
      case 1:
        // Charging
        charge_level = Math.min(bat_charge * 10 + 5, 100);
        is_charging = true;
        cable_connected = true;
        break;
      case 2:
        // Fully charged
        charge_level = 100;
        cable_connected = true;
        break;
      case 15:
        // Battery is flat
        charge_level = 0;
        is_charging = true;
        cable_connected = true;
        break;
      case 11: // not sure yet what this error means
      default:
        // Error state
        is_error = true;
        break;
    }

    return { charge_level, cable_connected, is_charging, is_error };
  }
}

/**
* DualSense Edge (DS5 Edge) Controller implementation
*/
class DS5EdgeController extends DS5Controller {
  constructor(device) {
    super(device);
    this.model = "DS5_Edge";
    this.finetuneMaxValue = 4095; // 12-bit max value for DS5 Edge
  }

  async getInfo() {
    // DS5 Edge uses the same info structure as DS5 but with is_edge=true
    const result = await this._getInfo(true);

    if (result.ok) {
      // DS Edge extra module info
      const empty = Array(17).fill('\x00').join('');
      try {
        const sticks_barcode = (await this.getBarcode()).map(barcode => barcode === empty ? l("Unknown") : barcode);
        result.infoItems.push({ key: l("Left Module Barcode"), value: sticks_barcode[1], cat: "fw" });
        result.infoItems.push({ key: l("Right Module Barcode"), value: sticks_barcode[0], cat: "fw" });
      } catch(_e) {
        // ignore module read errors here
      }
    }

    return result;
  }

  async flash(progressCallback = null) {
    la("ds5_edge_flash");
    try {
      const ret = await this.flashModules(progressCallback);
      if(ret) {
        return { 
          success: true, 
          message: "<b>" + l("Changes saved successfully") + "</b>.<br><br>" + l("If the calibration is not stored permanently, please double-check the wirings of the hardware mod."),
          isHtml: true
        };
      }
    } catch(error) {
      throw new Error(l("Error while saving changes"), { cause: error });
    }
  }

  async getBarcode() {
    try {
      const td = new TextDecoder();
  
      await this.sendFeatureReport(0x80, [21,34,0]);
      await sleep(100);
  
      const r_data = await this.receiveFeatureReport(0x81);
      const r_bc = td.decode(r_data.buffer.slice(21, 21+17));
  
      await this.sendFeatureReport(0x80, [21,34,1]);
      await sleep(100);
  
      const l_data = await this.receiveFeatureReport(0x81);
      const l_bc = td.decode(l_data.buffer.slice(21, 21+17));
      return [l_bc, r_bc];
    } catch(error) {
      la("ds5_edge_barcode_modules_failed", {"r": error});
      throw new Error(l("Cannot read module barcodes"), { cause: error });
    }
  }

  async unlockModule(i) {
    const m_name = i == 0 ? "left module" : "right module";

    await this.sendFeatureReport(0x80, [21, 6, i, 11]);
    await sleep(200);
    const ret = await this.waitUntilWritten([21, 6, 2]);
    if(!ret) {
      throw new Error(l("Cannot unlock") + " " + l(m_name));
    }
  }

  async lockModule(i) {
    const m_name = i == 0 ? "left module" : "right module";

    await this.sendFeatureReport(0x80, [21, 4, i, 8]);
    await sleep(200);
    const ret = await this.waitUntilWritten([21, 4, 2]);
    if(!ret) {
      throw new Error(l("Cannot lock") + " " + l(m_name));
    }
  }

  async storeDataInto(i) {
    const m_name = i == 0 ? "left module" : "right module";

    await this.sendFeatureReport(0x80, [21, 5, i]);
    await sleep(200);
    const ret = await this.waitUntilWritten([21, 3, 2]);
    if(!ret) {
      throw new Error(l("Cannot store data into") + " " + l(m_name));
    }
  }

  async flashModules(progressCallback) {
    la("ds5_edge_flash_modules");
    try {
      progressCallback(0);

      // Reload data, this ensures correctly writing data in the controller
      await sleep(100);
      progressCallback(10);

      // Unlock modules
      await this.unlockModule(0);
      progressCallback(15);
      await this.unlockModule(1);
      progressCallback(30);

      // Unlock NVS
      await this.nvsUnlock();
      await sleep(50);
      progressCallback(45);

      // This should trigger write into modules
      const data = await this.getInMemoryModuleData();
      await sleep(50);
      progressCallback(60);
      await this.writeFinetuneData(data);

      // Extra delay
      await sleep(100);

      // Lock back modules
      await this.lockModule(0);
      progressCallback(80);
      await this.lockModule(1);
      progressCallback(100);

      // Lock back NVS
      await sleep(100);
      const lockRes = await this.nvsLock();
      if(!lockRes.ok) throw (lockRes.error || new Error("NVS lock failed"));

      await sleep(250);

      return true;
    } catch(error) {
      la("ds5_edge_flash_modules_failed", {"r": error});
      throw error;
    }
  }

  async waitUntilWritten(expected) {
    let attempts = 0;
    const maxAttempts = 10;

    while (attempts < maxAttempts) {
      const data = await this.receiveFeatureReport(0x81);

      // Check if all expected bytes match
      const allMatch = expected.every((expectedByte, i) => 
        data.getUint8(1 + i, true) === expectedByte
      );

      if (allMatch) {
        return true;
      }

      attempts++;
      await sleep(50);
    }

    return false;
  }

  async calibrateSticksEnd() {
    la("ds5_calibrate_sticks_end");
    try {
      // Write
      await this.sendFeatureReport(0x82, [2,1,1]);

      let data = await this.receiveFeatureReport(0x83);

      if(data.getUint32(0, false) != 0x83010101) {
        const d1 = dec2hex32(data.getUint32(0, false));
        la("ds5_calibrate_sticks_failed", {"s": 3, d1});
        return { ok: false, code: 4, d1 };
      }

      await this.sendFeatureReport(0x82, [2,1,1]);
      data = await this.receiveFeatureReport(0x83);
      if(data.getUint32(0, false) != 0x83010103 && data.getUint32(0, false) != 0x83010312) {
        const d1 = dec2hex32(data.getUint32(0, false));
        la("ds5_calibrate_sticks_failed", {"s": 3, d1});
        return { ok: false, code: 5, d1 };
      }

      return { ok: true };
    } catch(error) {
      la("ds5_calibrate_sticks_end_failed", {"r": error});
      return { ok: false, error };
    }
  }

  async calibrateRangeEnd() {
    la("ds5_calibrate_range_end");
    try {
      // Write
      await this.sendFeatureReport(0x82, [2,1,2]);

      // Assert
      let data = await this.receiveFeatureReport(0x83);

      if(data.getUint32(0, false) != 0x83010201) {
        const d1 = dec2hex32(data.getUint32(0, false));
        la("ds5_calibrate_range_end_failed", {d1});
        return { ok: false, code: 4, d1 };
      }

      await this.sendFeatureReport(0x82, [2,1,2]);
      data = await this.receiveFeatureReport(0x83);
      if(data.getUint32(0, false) != 0x83010203) {
        const d1 = dec2hex32(data.getUint32(0, false));
        la("ds5_calibrate_range_end_failed", {d1});
        return { ok: false, code: 5, d1 };
      }

      return { ok: true };
    } catch(error) {
      la("ds5_calibrate_range_end_failed", {"r": error});
      return { ok: false, error };
    }
  }

  async getInMemoryModuleData() {
    // DualSense Edge
    await this.sendFeatureReport(0x80, [12, 4]);
    await sleep(100);
    const data = await this.receiveFeatureReport(0x81);
    const cmd = data.getUint8(0, true);
    const [p1, p2, p3] = [1, 2, 3].map(i => data.getUint8(i, true));

    if(cmd != 129 || p1 != 12 || (p2 != 2 && p2 != 4) || p3 != 2)
      return null;

    return Array.from({ length: 12 }, (_, i) => data.getUint16(4 + i * 2, true));
  }

  async writeFinetuneData(data) {
    const pkg = data.reduce((acc, val) => acc.concat([val & 0xff, val >> 8]), [12, 1]);
    await this.sendFeatureReport(0x80, pkg);
  }

  getNumberOfSticks() {
    return 2;
  }

}

// DS5 Button mapping configuration
const DS5_BUTTON_MAP = [
  { name: 'up', byte: 0, mask: 0x0 }, // Disabled
  { name: 'right', byte: 0, mask: 0x0 }, // Disabled
  { name: 'down', byte: 0, mask: 0x0 }, // Disabled
  { name: 'left', byte: 0, mask: 0x0 }, // Disabled
  { name: 'square', byte: 9, mask: 0x10, svg: 'Square' },
  { name: 'cross', byte: 9, mask: 0x20, svg: 'Cross' },
  { name: 'circle', byte: 9, mask: 0x40, svg: 'Circle' },
  { name: 'triangle', byte: 9, mask: 0x80, svg: 'Triangle' },
  { name: 'l1', byte: 9, mask: 0x10, svg: 'L1' },
  { name: 'l2', byte: 4, mask: 0xff }, // analog handled separately
  { name: 'r1', byte: 9, mask: 0x20, svg: 'R1' },
  { name: 'r2', byte: 4, mask: 0xff }, // analog handled separately
  { name: 'create', byte: 10, mask: 0x01, svg: 'Create' },
  { name: 'options', byte: 10, mask: 0x02, svg: 'Options' },
  { name: 'l3', byte: 10, mask: 0x04, svg: 'L3' },
  { name: 'r3', byte: 10, mask: 0x08, svg: 'R3' },
  { name: 'ps', byte: 10, mask: 0x10, svg: 'PS' },
  { name: 'touchpad', byte: 0, mask: 0x00, svg: 'Trackpad' },
  { name: 'mute', byte: 0, mask: 0x00, svg: 'Mute' },
];

// DS5 Input processing configuration
const DS5_INPUT_CONFIG = {
  buttonMap: DS5_BUTTON_MAP,
  dpadByte: 7,
  l2AnalogByte: 4,
  r2AnalogByte: 4,
  touchpadOffset: 32,
};

// DS5 Output Report Constants
const DS5_OUTPUT_REPORT = {
  USB_REPORT_ID: 0x02,
  BT_REPORT_ID: 0x31,
};

// Basic DS5 Output Structure for adaptive trigger control
class DS5OutputStruct {
  constructor(currentState = null) {
    // Create a 47-byte buffer for DS5 output report (USB)
    this.buffer = new ArrayBuffer(47);
    this.view = new DataView(this.buffer);

    // Control flags
    this.validFlag0 = currentState.validFlag0 || 0;
    this.validFlag1 = currentState.validFlag1 || 0;
    this.validFlag2 = currentState.validFlag2 || 0;

    // Vibration motors
    this.bcVibrationRight = currentState.bcVibrationRight || 0;
    this.bcVibrationLeft = currentState.bcVibrationLeft || 0;

    // Audio control
    this.headphoneVolume = currentState.headphoneVolume || 0;
    this.speakerVolume = currentState.speakerVolume || 0;
    this.micVolume = currentState.micVolume || 0;
    this.audioControl = currentState.audioControl || 0;
    this.audioControl2 = currentState.audioControl2 || 0;

    // LED and indicator control
    this.muteLedControl = currentState.muteLedControl || 0;
    this.powerSaveMuteControl = currentState.powerSaveMuteControl || 0;
    this.lightbarSetup = currentState.lightbarSetup || 0;
    this.ledBrightness = currentState.ledBrightness || 0;
    this.playerIndicator = currentState.playerIndicator || 0;
    this.ledCRed = currentState.ledCRed || 0;
    this.ledCGreen = currentState.ledCGreen || 0;
    this.ledCBlue = currentState.ledCBlue || 0;

    // Adaptive trigger parameters
    this.adaptiveTriggerLeftMode = currentState.adaptiveTriggerLeftMode || 0;
    this.adaptiveTriggerLeftParam0 = currentState.adaptiveTriggerLeftParam0 || 0;
    this.adaptiveTriggerLeftParam1 = currentState.adaptiveTriggerLeftParam1 || 0;
    this.adaptiveTriggerLeftParam2 = currentState.adaptiveTriggerLeftParam2 || 0;

    this.adaptiveTriggerRightMode = currentState.adaptiveTriggerRightMode || 0;
    this.adaptiveTriggerRightParam0 = currentState.adaptiveTriggerRightParam0 || 0;
    this.adaptiveTriggerRightParam1 = currentState.adaptiveTriggerRightParam1 || 0;
    this.adaptiveTriggerRightParam2 = currentState.adaptiveTriggerRightParam2 || 0;

    // Haptic feedback
    this.hapticVolume = currentState.hapticVolume || 0;
  }

  // Pack the data into the output buffer
  pack() {
    // Based on DS5 output report structure from HID descriptor
    // Byte 0-1: Control flags (16-bit little endian)
    this.view.setUint16(0, (this.validFlag1 << 8) | this.validFlag0, true);

    // Byte 2-3: Vibration motors
    this.view.setUint8(2, this.bcVibrationRight);
    this.view.setUint8(3, this.bcVibrationLeft);

    // Bytes 4-7: Audio control (reserved for now)
    this.view.setUint8(4, this.headphoneVolume);
    this.view.setUint8(5, this.speakerVolume);
    this.view.setUint8(6, this.micVolume);
    this.view.setUint8(7, this.audioControl);

    // Byte 8: Mute LED control
    this.view.setUint8(8, this.muteLedControl);

    // Byte 9: Reserved
    this.view.setUint8(9, 0);

    // Bytes 10-20: Right adaptive trigger
    this.view.setUint8(10, this.adaptiveTriggerRightMode);
    this.view.setUint8(11, this.adaptiveTriggerRightParam0);
    this.view.setUint8(12, this.adaptiveTriggerRightParam1);
    this.view.setUint8(13, this.adaptiveTriggerRightParam2);
    // Additional trigger parameters (bytes 14-20 reserved for extended params)
    for (let i = 14; i <= 20; i++) {
      this.view.setUint8(i, 0);
    }

    // Bytes 21-31: Left adaptive trigger
    this.view.setUint8(21, this.adaptiveTriggerLeftMode);
    this.view.setUint8(22, this.adaptiveTriggerLeftParam0);
    this.view.setUint8(23, this.adaptiveTriggerLeftParam1);
    this.view.setUint8(24, this.adaptiveTriggerLeftParam2);
    // Additional trigger parameters (bytes 25-31 reserved for extended params)
    for (let i = 25; i <= 31; i++) {
      this.view.setUint8(i, 0);
    }

    // Bytes 32-42: Reserved
    for (let i = 32; i <= 42; i++) {
      this.view.setUint8(i, 0);
    }

    // Byte 43: Player LED indicator
    this.view.setUint8(43, this.playerIndicator);

    // Bytes 44-46: Lightbar RGB
    this.view.setUint8(44, this.ledCRed);
    this.view.setUint8(45, this.ledCGreen);
    this.view.setUint8(46, this.ledCBlue);

    return this.buffer;
  }
}

/**
* VR2 Controller implementation
*/
class VR2Controller extends BaseController {
  constructor(device, isLeft) {
    super(device);
    this.model = "VR2";
    this.finetuneMaxValue = 65535; // 16-bit max value for DS5

    // Initialize current output state to track controller settings
    this.currentOutputState = {
      validFlag0: 0,
      validFlag1: 0,
      validFlag2: 0,
      bcVibrationRight: 0,
      bcVibrationLeft: 0,
      headphoneVolume: 0,
      speakerVolume: 0,
      micVolume: 0,
      audioControl: 0,
      audioControl2: 0,
      muteLedControl: 0,
      powerSaveMuteControl: 0,
      lightbarSetup: 0,
      ledBrightness: 0,
      playerIndicator: 0,
      ledCRed: 0,
      ledCGreen: 0,
      ledCBlue: 0,
      adaptiveTriggerLeftMode: 0,
      adaptiveTriggerLeftParam0: 0,
      adaptiveTriggerLeftParam1: 0,
      adaptiveTriggerLeftParam2: 0,
      adaptiveTriggerRightMode: 0,
      adaptiveTriggerRightParam0: 0,
      adaptiveTriggerRightParam1: 0,
      adaptiveTriggerRightParam2: 0,
      hapticVolume: 0
    };
  }

  getInputConfig() {
    return DS5_INPUT_CONFIG;
  }

  async getSerialNumber() {
    return await this.getSystemInfo(1, 19, 17);
  }

  async getInfo() {
    return this._getInfo(false);
  }

  async _getInfo(is_edge) {
    // Device-only: collect info and return a common structure; do not touch the DOM
    try {
      console.log("Fetching controller info...");
      const view = await this.receiveFeatureReport(0x20);
      console.log("Got VR2 info report:", buf2hex(view.buffer));
      const cmd = view.getUint8(0, true);
      if(cmd != 0x20 || view.buffer.byteLength != 64)
        return { ok: false, error: new Error("Invalid response for ds5_info") };

      const build_date = new TextDecoder().decode(view.buffer.slice(1, 1+11));
      const build_time = new TextDecoder().decode(view.buffer.slice(12, 20));

      const fwtype     = view.getUint16(20, true);
      const swseries   = view.getUint16(22, true);
      const hwinfo     = view.getUint32(24, true);
      const fwversion  = view.getUint32(28, true);

      const updversion = view.getUint16(44, true);
      const unk        = view.getUint8(46, true);

      const fwversion1 = view.getUint32(48, true);
      const fwversion2 = view.getUint32(52, true);
      const fwversion3 = view.getUint32(56, true);

      const serial_number = await this.getSystemInfo(1, 19, 17);
      const infoItems = [
        { key: l("Serial Number"), value: serial_number, cat: "hw" },
        { key: l("MCU Unique ID"), value: await this.getSystemInfo(1, 9, 9, false), cat: "hw", isExtra: true },
        { key: l("PCBA ID"), value: reverse_str(await this.getSystemInfo(1, 17, 14)), cat: "hw", isExtra: true },
        { key: l("Battery Barcode"), value: await this.getSystemInfo(1, 24, 23), cat: "hw", isExtra: true },
        { key: l("VCM Left Barcode"), value: await this.getSystemInfo(1, 26, 16), cat: "hw", isExtra: true },
        { key: l("VCM Right Barcode"), value: await this.getSystemInfo(1, 28, 16), cat: "hw", isExtra: true },

        ...(is_edge ? [] : [{ key: l("Board Model"), value: this.hwToBoardModel(hwinfo), cat: "hw", addInfoIcon: 'board' }]),

        { key: l("FW Build Date"), value: build_date + " " + build_time, cat: "fw" },
        { key: l("FW Type"), value: "0x" + dec2hex(fwtype), cat: "fw", isExtra: true },
        { key: l("FW Series"), value: "0x" + dec2hex(swseries), cat: "fw", isExtra: true },
        { key: l("HW Model"), value: "0x" + dec2hex32(hwinfo), cat: "hw", isExtra: true },
        { key: l("FW Version"), value: "0x" + dec2hex32(fwversion), cat: "fw", isExtra: true },
        { key: l("FW Update"), value: "0x" + dec2hex(updversion), cat: "fw", isExtra: true },
        { key: l("FW Update Info"), value: "0x" + dec2hex8(unk), cat: "fw", isExtra: true },
        { key: l("SBL FW Version"), value: "0x" + dec2hex32(fwversion1), cat: "fw", isExtra: true },
        { key: l("Venom FW Version"), value: "0x" + dec2hex32(fwversion2), cat: "fw", isExtra: true },
        { key: l("Spider FW Version"), value: "0x" + dec2hex32(fwversion3), cat: "fw", isExtra: true },

        { key: l("Touchpad ID"), value: await this.getSystemInfo(5, 2, 8, false), cat: "hw", isExtra: true },
        { key: l("Touchpad FW Version"), value: await this.getSystemInfo(5, 4, 8, false), cat: "fw", isExtra: true },
      ];

      const old_controller = build_date.search(/ 2020| 2021/);
      let disable_bits = 0;
      if(old_controller != -1) {
        la("vr2_info_error", {"r": "old"});
        disable_bits |= 2; // 2: outdated firmware
      }

      const nv = await this.queryNvStatus();
      const bd_addr = await this.getBdAddr();
      infoItems.push({ key: l("Bluetooth Address"), value: bd_addr, cat: "hw", isExtra: true });

      const pending_reboot = (nv?.status === 'pending_reboot');

      return { ok: true, infoItems, nv, disable_bits, pending_reboot };
    } catch(error) {
      la("vr2_info_error", {"r": error});
      return { ok: false, error, disable_bits: 1 };
    }
  }

  async flash(progressCallback = null) {
    la("vr2_flash");
    try {
      await this.nvsUnlock();
      const lockRes = await this.nvsLock();
      if(!lockRes.ok) throw (lockRes.error || new Error("NVS lock failed"));

      return { success: true, message: l("Changes saved successfully") };
    } catch(error) {
      throw new Error(l("Error while saving changes"), { cause: error });
    }
  }

  async reset() {
    la("vr2_reset");
    try {
      await this.sendFeatureReport(0x80, [1,1]);
    } catch(error) {
    }
  }

  async nvsLock() {
    // la("vr2_nvlock");
    try {
      await this.sendFeatureReport(0x80, [3,1]);
      await this.receiveFeatureReport(0x81);
      return { ok: true };
    } catch(error) {
      return { ok: false, error };
    }
  }

  async nvsUnlock() {
    // la("vr2_nvunlock");
    try {
      await this.sendFeatureReport(0x80, [3,2, 101, 50, 64, 12]);
      const data = await this.receiveFeatureReport(0x81);
    } catch(error) {
      await sleep(500);
      throw new Error(l("NVS Unlock failed"), { cause: error });
    }
  }

  async getBdAddr() {
    await this.sendFeatureReport(0x80, [9,2]);
    const data = await this.receiveFeatureReport(0x81);
    return format_mac_from_view(data, 4);
  }

  async getSystemInfo(base, num, length, decode = true) {
    await this.sendFeatureReport(128, [base,num]);
    const pcba_id = await this.receiveFeatureReport(129);
    if(pcba_id.getUint8(1) != base || pcba_id.getUint8(2) != num || pcba_id.getUint8(3) != 2) {
      return l("error");
    }
    if(decode)
      return new TextDecoder().decode(pcba_id.buffer.slice(4, 4+length));

    return buf2hex(pcba_id.buffer.slice(4, 4+length));
  }

  async calibrateSticksBegin() {
    la("vr2_calibrate_sticks_begin");
    try {
      // Begin
      await this.sendFeatureReport(0x82, [1,1,1]);

      // Assert
      const data = await this.receiveFeatureReport(0x83);
      if(data.getUint32(0, false) != 0x83010101) {
        const d1 = dec2hex32(data.getUint32(0, false));
        la("vr2_calibrate_sticks_begin_failed", {"d1": d1});
        throw new Error(`Stick center calibration begin failed: ${d1}`);
      }
      return { ok: true };
    } catch(error) {
      la("vr2_calibrate_sticks_begin_failed", {"r": error});
      return { ok: false, error };
    }
  }

  async calibrateSticksSample() {
    la("vr2_calibrate_sticks_sample");
    try {
      // Sample
      await this.sendFeatureReport(0x82, [3,1,1]);

      // Assert
      const data = await this.receiveFeatureReport(0x83);
      if(data.getUint32(0, false) != 0x83010101) {
        const d1 = dec2hex32(data.getUint32(0, false));
        la("vr2_calibrate_sticks_sample_failed", {"d1": d1});
        throw new Error(`Stick center calibration sample failed: ${d1}`);
      }
      return { ok: true };
    } catch(error) {
      la("vr2_calibrate_sticks_sample_failed", {"r": error});
      return { ok: false, error };
    }
  }

  async calibrateSticksEnd() {
    la("vr2_calibrate_sticks_end");
    try {
      // Write
      await this.sendFeatureReport(0x82, [2,1,1]);

      const data = await this.receiveFeatureReport(0x83);

      if(data.getUint32(0, false) != 0x83010102) {
        const d1 = dec2hex32(data.getUint32(0, false));
        la("vr2_calibrate_sticks_failed", {"s": 3, "d1": d1});
        throw new Error(`Stick center calibration end failed: ${d1}`);
      }

      return { ok: true };
    } catch(error) {
      la("vr2_calibrate_sticks_end_failed", {"r": error});
      return { ok: false, error };
    }
  }

  async calibrateRangeBegin() {
    la("vr2_calibrate_range_begin");
    try {
      // Begin
      await this.sendFeatureReport(0x82, [1,1,2]);

      // Assert
      const data = await this.receiveFeatureReport(0x83);
      if(data.getUint32(0, false) != 0x83010201) {
        const d1 = dec2hex32(data.getUint32(0, false));
        la("vr2_calibrate_range_begin_failed", {"d1": d1});
        throw new Error(`Stick range calibration begin failed: ${d1}`);
      }
      return { ok: true };
    } catch(error) {
      la("vr2_calibrate_range_begin_failed", {"r": error});
      return { ok: false, error };
    }
  }

  async calibrateRangeEnd() {
    la("vr2_calibrate_range_end");
    try {
      // Write
      await this.sendFeatureReport(0x82, [2,1,2]);

      // Assert
      const data = await this.receiveFeatureReport(0x83);

      if(data.getUint32(0, false) != 0x83010202) {
        const d1 = dec2hex32(data.getUint32(0, false));
        la("vr2_calibrate_range_end_failed", {"d1": d1});
        throw new Error(`Stick range calibration end failed: ${d1}`);
      }

      return { ok: true };
    } catch(error) {
      la("vr2_calibrate_range_end_failed", {"r": error});
      return { ok: false, error };
    }
  }

  async queryNvStatus() {
    try {
      await this.sendFeatureReport(0x80, [3,3]);
      const data = await this.receiveFeatureReport(0x81);
      const ret = data.getUint32(1, false);
      if (ret === 0x15010100) {
        return { device: 'ds5', status: 'pending_reboot', locked: null, code: 4, raw: ret };
      }
      if (ret === 0x03030201) {
        return { device: 'ds5', status: 'locked', locked: true, mode: 'temporary', code: 1, raw: ret };
      }
      if (ret === 0x03030200) {
        return { device: 'ds5', status: 'unlocked', locked: false, mode: 'permanent', code: 0, raw: ret };
      }
      if (ret === 1 || ret === 2) {
        return { device: 'ds5', status: 'unknown', locked: null, code: 2, raw: ret };
      }
      return { device: 'ds5', status: 'unknown', locked: null, code: ret, raw: ret };
    } catch (error) {
      return { device: 'ds5', status: 'error', locked: null, code: 2, error };
    }
  }

  hwToBoardModel(hw_ver) {
    return l("Unknown");
  }

  async getInMemoryModuleData() {
    // DualSense
    await this.sendFeatureReport(0x80, [12, 2]);
    await sleep(100);
    const data = await this.receiveFeatureReport(0x81);
    const cmd = data.getUint8(0, true);
    const [p1, p2, p3] = [1, 2, 3].map(i => data.getUint8(i, true));

    if(cmd != 129 || p1 != 12 || (p2 != 2 && p2 != 4) || p3 != 2)
      return null;

    return Array.from({ length: 12 }, (_, i) => data.getUint16(4 + i * 2, true));
  }

  async writeFinetuneData(data) {
    const pkg = data.reduce((acc, val) => acc.concat([val & 0xff, val >> 8]), [12, 1]);
    await this.sendFeatureReport(0x80, pkg);
  }

  /**
   * Send output report to the DS5 controller
   * @param {ArrayBuffer} data - The output report data
   */
  async sendOutputReport(data, reason = "") {
    if (!this.device?.opened) {
      throw new Error('Device is not opened');
    }
    try {
      console.log(`Sending output report${ reason ? ` to ${reason}` : '' }:`, DS5_OUTPUT_REPORT.USB_REPORT_ID, buf2hex(data));
      await this.device.sendReport(DS5_OUTPUT_REPORT.USB_REPORT_ID, new Uint8Array(data));
    } catch (error) {
      throw new Error(`Failed to send output report: ${error.message}`);
    }
  }

  /**
   * Update the current output state with values from an OutputStruct
   * @param {DS5OutputStruct} outputStruct - The output structure to copy state from
   */
  updateCurrentOutputState(outputStruct) {
    this.currentOutputState = { ...outputStruct };
  }

  /**
   * Get a copy of the current output state
   * @returns {Object} A copy of the current output state
   */
  getCurrentOutputState() {
    return { ...this.currentOutputState };
  }

  /**
   * Initialize the current output state when the controller is first connected.
   * Since DS5 controllers don't provide a way to read the current output state,
   * this method sets up reasonable defaults and attempts to detect any current settings.
   */
  async initializeCurrentOutputState() {
    try {
      // Reset all output state to known defaults
      this.currentOutputState = {
        ...this.getCurrentOutputState(),
        validFlag1: 0b1111_0111,
        ledCRed: 0,
        ledCGreen: 0,
        ledCBlue: 255,
      };

      // Send a "reset" output report to ensure the controller is in a known state
      // This will turn off any existing effects and set the controller to defaults
      const resetOutputStruct = new DS5OutputStruct(this.currentOutputState);
      await this.sendOutputReport(resetOutputStruct.pack(), 'init default states');

      // Update our state to reflect what we just sent
      this.updateCurrentOutputState(resetOutputStruct);
    } catch (error) {
      console.warn("Failed to initialize DS5 output state:", error);
      // Even if the reset fails, we still have the default state initialized
    }
  }

  /**
  * Parse DS5 battery status from input data
  */
  parseBatteryStatus(data) {
    const bat = data.getUint8(52); // DS5 battery byte is at position 52

    // DS5: bat_charge = low 4 bits, bat_status = high 4 bits
    const bat_charge = bat & 0x0f;
    const bat_status = bat >> 4;

    let bat_capacity = 0;
    let cable_connected = false;
    let is_charging = false;
    let is_error = false;

    switch (bat_status) {
      case 0:
        // On battery power
        bat_capacity = Math.min(bat_charge * 10 + 5, 100);
        break;
      case 1:
        // Charging
        bat_capacity = Math.min(bat_charge * 10 + 5, 100);
        is_charging = true;
        cable_connected = true;
        break;
      case 2:
        // Fully charged
        bat_capacity = 100;
        cable_connected = true;
        break;
      case 15:
        // Battery is flat
        bat_capacity = 0;
        is_charging = true;
        cable_connected = true;
        break;
      default:
        // Error state
        is_error = true;
        break;
    }

    return { bat_capacity, cable_connected, is_charging, is_error };
  }

  getNumberOfSticks() {
    return 1;
  }

  getSupportedQuickTests() {
    return [];
  }
}

/**
* Controller Factory - Creates the appropriate controller instance based on device type
*/
class ControllerFactory {
  static getSupportedModels() {
    const ds4v1 = { vendorId: 0x054c, productId: 0x05c4 };
    const ds4v2 = { vendorId: 0x054c, productId: 0x09cc };
    const ds5 = { vendorId: 0x054c, productId: 0x0ce6 };
    const ds5edge = { vendorId: 0x054c, productId: 0x0df2 };
    const vr2_left = { vendorId: 0x054c, productId: 0x0e45 };
    const vr2_right = { vendorId: 0x054c, productId: 0x0e46 };
    return [ds4v1, ds4v2, ds5, ds5edge, vr2_left, vr2_right];
  }


  /**
  * Create a controller instance based on the HID device product ID
  * @param {HIDDevice} device The HID device
  * @returns {BaseController} The appropriate controller instance
  */
  static createControllerInstance(device) {
    switch (device.productId) {
      case 0x05c4: // DS4 v1
      case 0x09cc: // DS4 v2
        return new DS4Controller(device);

      case 0x0ce6: // DS5
        return new DS5Controller(device);

      case 0x0df2: // DS5 Edge
        return new DS5EdgeController(device);

      case 0x0e45: // VR2 Left
        return new VR2Controller(device, true);

      case 0x0e46: // VR2 Right
        return new VR2Controller(device, false);

      default:
        throw new Error(`Unsupported device: ${dec2hex(device.vendorId)}:${dec2hex(device.productId)}`);
    }
  }

  /**
  * Get device name based on product ID
  * @param {number} productId Product ID
  * @returns {string} Device name
  */
  static getDeviceName(productId) {
    switch (productId) {
      case 0x05c4:
        return "Sony DualShock 4 V1";
      case 0x09cc:
        return "Sony DualShock 4 V2";
      case 0x0ce6:
        return "Sony DualSense";
      case 0x0df2:
        return "Sony DualSense Edge";
      case 0x0e45:
        return "VR2 Left Controller";
      case 0x0e46:
        return "VR2 Right Controller";
      default:
        return "Unknown Device";
    }
  }

  /**
  * Get UI configuration based on product ID
  * @param {number} productId Product ID
  * @returns {Object} UI configuration
  */
  static getUIConfig(productId) {
    switch (productId) {
      case 0x05c4: // DS4 v1
      case 0x09cc: // DS4 v2
        return { 
          showInfo: false, 
          showFinetune: false, 
          showInfoTab: false,
          showQuickTests: true,
          showFourStepCalib: true,
          showQuickCalib: false,
          showCalibrationHistory: false
        };

      case 0x0ce6: // DS5
      case 0x0df2: // DS5 Edge
        return { 
          showInfo: true, 
          showFinetune: true, 
          showInfoTab: true,
          showQuickTests: true,
          showFourStepCalib: false,
          showQuickCalib: true,
          showCalibrationHistory: true
        };

      case 0x0e45: // VR2 Left Controller
      case 0x0e46: // VR2 Right Controller
        return { 
          showInfo: true, 
          showFinetune: false, 
          showInfoTab: true,
          showQuickTests: false,
          showFourStepCalib: true,
          showQuickCalib: false
        };

      default:
        return { 
          showInfo: false, 
          showFinetune: false, 
          showInfoTab: false,
          showQuickTests: false,
          showFourStepCalib: false,
          showQuickCalib: false,
          showCalibrationHistory: false
        };
    }
  }
}

// Cache for loaded templates
const templateCache = new Map();

/**
* Load a template from the templates directory or bundled assets
* @param {string} templateName - Name of the template file without extension
* @returns {Promise<string>} - Promise that resolves with the template HTML
*/
async function loadTemplate(templateName) {
  // Check if template is already in cache
  if (templateCache.has(templateName)) {
    return templateCache.get(templateName);
  }

  // Check if we have bundled assets (production mode)
  if (window.BUNDLED_ASSETS && window.BUNDLED_ASSETS.templates) {
    const templateHtml = window.BUNDLED_ASSETS.templates[templateName];
    if (templateHtml) {
      templateCache.set(templateName, templateHtml);
      return templateHtml;
    }
  }

  // Fallback to fetching from server (development mode)
  // Only append .html if the templateName doesn't already have an extension
  const hasExtension = templateName.includes('.');
  const templatePath = hasExtension ? `templates/${templateName}` : `templates/${templateName}.html`;

  const response = await fetch(templatePath);
  if (!response.ok) {
    throw new Error(`Failed to load template: ${templateName}`);
  }

  const templateHtml = await response.text();
  templateCache.set(templateName, templateHtml);
  return templateHtml;
}

/**
* Load SVG assets from bundled assets or server
* @param {string} assetPath - Path to the SVG asset
* @returns {Promise<string>} - Promise that resolves with the SVG content
*/
async function loadSvgAsset(assetPath) {
  // Check if we have bundled assets (production mode)
  if (window.BUNDLED_ASSETS && window.BUNDLED_ASSETS.svg) {
    const svgContent = window.BUNDLED_ASSETS.svg[assetPath];
    if (svgContent) {
      return svgContent;
    }
  }

  // Fallback to fetching from server (development mode)
  const response = await fetch(`assets/${assetPath}`);
  if (!response.ok) {
    throw new Error(`Failed to load SVG asset: ${assetPath}`);
  }

  return await response.text();
}

/**
* Load all templates and insert them into the DOM
*/
async function loadAllTemplates() {
  // Load SVG icons
  const iconsHtml = await loadSvgAsset('icons.svg');
  const iconsContainer = document.createElement('div');
  iconsContainer.innerHTML = iconsHtml;
  document.body.prepend(iconsContainer);

  // Load modals
  const faqModalHtml = await loadTemplate('faq-modal');
  const popupModalHtml = await loadTemplate('popup-modal');
  const finetuneModalHtml = await loadTemplate('finetune-modal');
  const calibCenterModalHtml = await loadTemplate('calib-center-modal');
  const welcomeModalHtml = await loadTemplate('welcome-modal');
  const autoCalibCenterModalHtml = await loadTemplate('auto-calib-center-modal');
  const rangeModalHtml = await loadTemplate('range-modal');
  const edgeProgressModalHtml = await loadTemplate('edge-progress-modal');
  const edgeModalHtml = await loadTemplate('edge-modal');
  const donateModalHtml = await loadTemplate('donate-modal');
  const quickTestModalHtml = await loadTemplate('quick-test-modal');
  const calibrationHistoryModalHtml = await loadTemplate('calibration-history-modal');
  const deadzoneModalHtml = await loadTemplate('deadzone-modal');
  const driftAnalysisModalHtml = await loadTemplate('drift-analysis-modal');

  // Create modals container
  const modalsContainer = document.createElement('div');
  modalsContainer.id = 'modals-container';
  modalsContainer.innerHTML = faqModalHtml + popupModalHtml + finetuneModalHtml + calibCenterModalHtml + welcomeModalHtml + autoCalibCenterModalHtml + rangeModalHtml + edgeProgressModalHtml + edgeModalHtml + donateModalHtml + quickTestModalHtml + calibrationHistoryModalHtml + deadzoneModalHtml + driftAnalysisModalHtml;
  document.body.appendChild(modalsContainer);
}

// Constants
const CIRCULARITY_DATA_SIZE = 48; // Number of angular positions to sample

/**
 * Draws analog stick position on a canvas with various visualization options.
 * @param {CanvasRenderingContext2D} ctx - Canvas rendering context
 * @param {number} center_x - X coordinate of stick center
 * @param {number} center_y - Y coordinate of stick center
 * @param {number} sz - Size/radius of the stick area
 * @param {number} stick_x - Current stick X position (-1 to 1)
 * @param {number} stick_y - Current stick Y position (-1 to 1)
 * @param {Object} opts - Options object
 * @param {number[]|null} opts.circularity_data - Array of circularity test data
 * @param {boolean} opts.enable_zoom_center - Whether to apply center zoom transformation
 * @param {boolean} opts.highlight - Whether to highlight the stick position
 */
function draw_stick_dial(ctx, center_x, center_y, sz, stick_x, stick_y, opts = {}) {
    const { circularity_data = null, enable_zoom_center = false, highlight } = opts;

    // Draw base circle
    ctx.lineWidth = 1;
    ctx.fillStyle = '#ffffff';
    ctx.strokeStyle = '#000000';
    ctx.beginPath();
    ctx.arc(center_x, center_y, sz, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Helper function for circularity visualization color
    function cc_to_color(cc) {
        const dd = Math.sqrt(Math.pow((1.0 - cc), 2));
        let hh;
        if(cc <= 1.0)
            hh = 220 - 220 * Math.min(1.0, Math.max(0, (dd - 0.05)) / 0.1);
        else
            hh = (245 + (360-245) * Math.min(1.0, Math.max(0, (dd - 0.05)) / 0.15)) % 360;
        return hh;
    }

    // Draw circularity visualization if data provided
    if (circularity_data?.length > 0) {
        const MAX_N = CIRCULARITY_DATA_SIZE;

        for(let i = 0; i < MAX_N; i++) {
            const kd = circularity_data[i];
            const kd1 = circularity_data[(i+1) % CIRCULARITY_DATA_SIZE];
            if (kd === undefined || kd1 === undefined) continue;
            const ka = i * Math.PI * 2 / MAX_N;
            const ka1 = ((i+1)%MAX_N) * 2 * Math.PI / MAX_N;

            const kx = Math.cos(ka) * kd;
            const ky = Math.sin(ka) * kd;
            const kx1 = Math.cos(ka1) * kd1;
            const ky1 = Math.sin(ka1) * kd1;

            ctx.beginPath();
            ctx.moveTo(center_x, center_y);
            ctx.lineTo(center_x+kx*sz, center_y+ky*sz);
            ctx.lineTo(center_x+kx1*sz, center_y+ky1*sz);
            ctx.lineTo(center_x, center_y);
            ctx.closePath();

            const cc = (kd + kd1) / 2;
            const hh = cc_to_color(cc);
            ctx.fillStyle = 'hsla(' + parseInt(hh) + ', 100%, 50%, 0.5)';
            ctx.fill();
        }
    }

    // Draw circularity error text if enough data provided
    if (circularity_data?.filter(n => n > 0.3).length > 10) {
        const circularityError = calculateCircularityError(circularity_data);

        ctx.fillStyle = '#fff';
        ctx.strokeStyle = '#444';
        ctx.lineWidth = 3;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        ctx.font = '24px Arial';
        const text_y = center_y + sz * 0.5;
        const text = `${circularityError.toFixed(1)} %`;

        ctx.strokeText(text, center_x, text_y);
        ctx.fillText(text, center_x, text_y);
    }

    // Draw crosshairs
    ctx.strokeStyle = '#aaaaaa';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(center_x-sz, center_y);
    ctx.lineTo(center_x+sz, center_y);
    ctx.closePath();
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(center_x, center_y-sz);
    ctx.lineTo(center_x, center_y+sz);
    ctx.closePath();
    ctx.stroke();

    // Apply center zoom transformation if enabled
    let display_x = stick_x;
    let display_y = stick_y;
    if (enable_zoom_center) {
        const transformed = apply_center_zoom(stick_x, stick_y);
        display_x = transformed.x;
        display_y = transformed.y;

        // Draw light gray circle at 50% radius to show border of zoomed center
        ctx.strokeStyle = '#d3d3d3'; // light gray
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(center_x, center_y, sz * 0.5, 0, 2 * Math.PI);
        ctx.stroke();
    }

    ctx.fillStyle = '#000000';
    ctx.strokeStyle = '#000000';

    // Draw stick line with variable thickness
    // Calculate distance from center
    const stick_distance = Math.sqrt(display_x*display_x + display_y*display_y);
    const boundary_radius = 0.5; // 50% radius

    // Determine if we need to draw a two-segment line
    const use_two_segments = enable_zoom_center && stick_distance > boundary_radius;
    if (use_two_segments) {
        // Calculate boundary point
        const boundary_x = (display_x / stick_distance) * boundary_radius;
        const boundary_y = (display_y / stick_distance) * boundary_radius;

        // First segment: thicker line from center to boundary
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(center_x, center_y);
        ctx.lineTo(center_x + boundary_x*sz, center_y + boundary_y*sz);
        ctx.stroke();

        // Second segment: thinner line from boundary to stick position
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(center_x + boundary_x*sz, center_y + boundary_y*sz);
        ctx.lineTo(center_x + display_x*sz, center_y + display_y*sz);
        ctx.stroke();
    } else {
        // Single line from center to stick position
        ctx.lineWidth = enable_zoom_center ? 3 : 1;
        ctx.beginPath();
        ctx.moveTo(center_x, center_y);
        ctx.lineTo(center_x + display_x*sz, center_y + display_y*sz);
        ctx.stroke();
    }

    // Draw filled circle at stick position
    ctx.beginPath();
    ctx.arc(center_x+display_x*sz, center_y+display_y*sz, highlight ? 4 : 3, 0, 2*Math.PI);
    ctx.fillStyle = highlight ? '#2989f7ff' : '#030b84ff';
    ctx.fill();
}

/**
 * Calculates circularity error for stick movement data.
 * @param {number[]} data - Array of distance values at different angular positions
 * @returns {number} RMS deviation as percentage
 */
function calculateCircularityError(data) {
    // Sum of squared deviations from ideal distance of 1.0, only for values > 0.2
    const sumSquaredDeviations = data.reduce((acc, val) =>
        val > 0.2 ? acc + Math.pow(val - 1, 2) : acc, 0);

    // Calculate RMS deviation as percentage
    const validDataCount = data.filter(val => val > 0.2).length;
    return validDataCount > 0 ? Math.sqrt(sumSquaredDeviations / validDataCount) * 100 : 0;
}

/**
 * Applies center zoom transformation to stick coordinates.
 * @param {number} x - X coordinate
 * @param {number} y - Y coordinate
 * @returns {Object} Transformed coordinates {x, y}
 */
function apply_center_zoom(x, y) {
    // Calculate distance from center
    const distance = Math.sqrt(x * x + y * y);

    // If distance is 0, return original values
    if (distance === 0) {
        return { x, y};
    }

    // Calculate angle
    const angle = Math.atan2(y, x);

    // Apply center zoom transformation
    const new_distance =
        distance <= 0.05
        ? (distance / 0.05) * 0.5 // 0 to 0.05 maps to 0 to 0.5 (half the radius)
        : 0.5 + ((distance - 0.05) / 0.95) * 0.5; // 0.05 to 1.0 maps to 0.5 to 1.0 (other half)

    // Convert back to x, y coordinates
    return {
        x: Math.cos(angle) * new_distance,
        y: Math.sin(angle) * new_distance
    };
}

/**
 * Calibration Center Modal Class
 * Handles step-by-step manual stick center calibration
 */
class CalibCenterModal {
  constructor(controllerInstance, doneCallback = null) {
    this.controller = controllerInstance;
    this.doneCallback = doneCallback;

    this._initEventListeners();

    // Hide the spinner in case it's showing after prior failure
    $("#calibNext").prop("disabled", false);
    $("#btnSpinner").hide();
  }

  /**
   * Initialize event listeners for the calibration modal
   */
  _initEventListeners() {
    $('#calibCenterModal').on('hidden.bs.modal', () => {
      console.log("Closing calibration modal");
      destroyCurrentInstance$4();
    });
  }

  /**
   * Set progress bar width
   * @param {number} i - Progress percentage (0-100)
   */
  setProgress(i) {
    $("#calib-center-progress").css('width', '' + i + '%');
  }

  /**
   * Remove event listeners
   */
  removeEventListeners() {
    $('#calibCenterModal').off('hidden.bs.modal');
  }

  /**
   * Open the calibration modal
   */
  async open() {
    la("calib_open");
    this.calibrationGenerator = this.calibrationSteps();
    await this.next();
    new bootstrap.Modal(document.getElementById('calibCenterModal'), {}).show();
  }

  /**
   * Proceed to the next calibration step (legacy method)
   */
  async next() {
    la("calib_next");
    const result = await this.calibrationGenerator.next();
    if (result.done) {
      this.calibrationGenerator = null;
    }
  }

  /**
   * Generator function for calibration steps
   */
  async* calibrationSteps() {
    // Step 1: Initial setup
    la("calib_step", {"i": 1});
    this._updateUI(1, "Stick center calibration", "Start", true);
    yield 1;

    // Step 2: Initialize calibration
    la("calib_step", {"i": 2});
    this._showSpinner("Initializing...");
    await sleep(100);
    await this._multiCalibSticksBegin();
    await this._hideSpinner();

    this._updateUI(2, "Calibration in progress", "Continue", false);
    yield 2;

    // Steps 3-5: Sample calibration data
    for (let sampleStep = 3; sampleStep <= 5; sampleStep++) {
      la("calib_step", {"i": sampleStep});
      this._showSpinner("Sampling...");
      await sleep(150);
      await this._multiCalibSticksSample();
      await this._hideSpinner();

      this._updateUI(sampleStep, "Calibration in progress", "Continue", false);
      yield sampleStep;
    }

    // Step 6: Final sampling and storage
    la("calib_step", {"i": 6});
    this._showSpinner("Sampling...");
    await this._multiCalibSticksSample();
    await sleep(200);
    $("#calibNextText").text(l("Storing calibration..."));
    await sleep(500);
    await this._multiCalibSticksEnd();
    await this._hideSpinner();

    this._updateUI(6, "Stick center calibration", "Done", true);
    yield 6;

    this._close(true, l("Stick calibration completed"));
  }

  /**
   * "Old" fully automatic stick center calibration
   */
  async multiCalibrateSticks() {
    if(!this.controller.isConnected())
      return;

    this.setProgress(0);
    new bootstrap.Modal(document.getElementById('autoCalibCenterModal'), {}).show();

    await sleep(1000);

    // Use the controller manager's calibrateSticks method with UI progress updates
    this.setProgress(10);

    const result = await this.controller.calibrateSticks((progress) => {
      this.setProgress(progress);
    });

    await sleep(500);
    this._close(true, result?.message);
  }

  /**
   * Helper functions for step-by-step manual calibration UI
   */
  async _multiCalibSticksBegin() {
    await this.controller.calibrateSticksBegin();
  }

  async _multiCalibSticksEnd() {
    await this.controller.calibrateSticksEnd();
  }

  async _multiCalibSticksSample() {
    await this.controller.calibrateSticksSample();
  }

  /**
   * Close the calibration modal
   */
  _close(success = false, message = null) {
    // Call the done callback if provided
    if (this.doneCallback && typeof this.doneCallback === 'function') {
      this.doneCallback(success, message);
    }

    $(".modal.show").modal("hide");
  }

  /**
   * Update the UI for a specific calibration step
   */
  _updateUI(step, title, buttonText, allowDismiss) {
    // Hide all step lists and remove active class
    for (let j = 1; j < 7; j++) {
      $("#list-" + j).hide();
      $("#list-" + j + "-calib").removeClass("active");
    }

    // Show current step and mark as active
    $("#list-" + step).show();
    $("#list-" + step + "-calib").addClass("active");

    // Update title and button text
    $("#calibTitle").text(l(title));
    $("#calibNextText").text(l(buttonText));

    // Show/hide cross icon
    if (allowDismiss) {
      $("#calibCross").show();
    } else {
      $("#calibCross").hide();
    }

    // Show/hide Quick calibrate button - only show on step 1 (welcome screen)
    $("#quickCalibBtn").toggle(step === 1);
  }

  /**
   * Show spinner and disable button
   */
  _showSpinner(text) {
    $("#calibNextText").text(l(text));
    $("#btnSpinner").show();
    $("#calibNext").prop("disabled", true);
  }

  /**
   * Hide spinner and enable button
   */
  async _hideSpinner() {
    await sleep(200);
    $("#calibNext").prop("disabled", false);
    $("#btnSpinner").hide();
  }
}

// Global reference to the current calibration instance
let currentCalibCenterInstance = null;

/**
 * Helper function to safely clear the current calibration instance
 */
function destroyCurrentInstance$4() {
  if (currentCalibCenterInstance) {
    console.log("Destroying current calibration instance");
    currentCalibCenterInstance.removeEventListeners();
    currentCalibCenterInstance = null;
  }
}

// Legacy function exports for backward compatibility
async function calibrate_stick_centers(controller, doneCallback = null) {
  currentCalibCenterInstance = new CalibCenterModal(controller, doneCallback);
  await currentCalibCenterInstance.open();
}

async function calib_next() {
  if (currentCalibCenterInstance) {
    await currentCalibCenterInstance.next();
  }
}

// Function to close current manual calibration and start auto calibration instead
async function quick_calibrate_instead() {
  if (currentCalibCenterInstance) {
    // Get the callback from the current instance before closing
    currentCalibCenterInstance.doneCallback;

    // Close the current manual calibration modal (without calling callback)
    currentCalibCenterInstance.doneCallback = null; // Temporarily remove callback to avoid double-calling
    currentCalibCenterInstance._close();

    // Get the controller from the current instance
    const { controller } = currentCalibCenterInstance;

    // Destroy the current instance
    destroyCurrentInstance$4();

    // Start auto calibration with the original callback
    await auto_calibrate_stick_centers(controller, {});
  }
}

// "Old" fully automatic stick center calibration
async function auto_calibrate_stick_centers(controller, doneCallback = null) {
  currentCalibCenterInstance = new CalibCenterModal(controller, doneCallback);
  await currentCalibCenterInstance.multiCalibrateSticks();
}

// Legacy compatibility - expose functions to window for HTML onclick handlers
window.calib_next = calib_next;
window.quick_calibrate_instead = quick_calibrate_instead;

const SECONDS_UNTIL_UNLOCK = 15;

/**
 * Calibrate Stick Range Modal Class
 * Handles stick range calibration
 */
class CalibRangeModal {
  constructor(controllerInstance, { ll_data, rr_data }, doneCallback = null, expertMode = false) {
    // Dependencies
    this.controller = controllerInstance;
    this.ll_data = ll_data;
    this.rr_data = rr_data;

    // Progress tracking
    this.buttonText = l("Done");
    this.leftNonZeroCount = 0;
    this.rightNonZeroCount = 0;
    this.leftFullCycles = 0;
    this.rightFullCycles = 0;
    this.requiredFullCycles = 4;
    this.progressUpdateInterval = null;

    // Countdown timer
    this.countdownSeconds = 0;
    this.countdownInterval = null;

    // Progress alert enhancement
    this.leftCycleProgress = 0;
    this.rightCycleProgress = 0;

    this.expertMode = expertMode;

    this.allDonePromiseResolve = undefined;
    this.doneCallback = doneCallback;

    this.hasSingleStick = (this.controller.currentController.getNumberOfSticks() == 1);

    // Stick rendering
    this.stickRenderInterval = null;
    this.currentStickPositions = {
      left: { x: 0, y: 0 },
      right: { x: 0, y: 0 }
    };

    this._initEventListeners();
  }

  /**
   * Initialize event listeners for the calibration modal
   */
  _initEventListeners() {
    $('#rangeModal').on('hidden.bs.modal', () => {
      console.log("Closing range calibration modal");
      if (currentCalibRangeInstance === this) {
        this.onClose().catch(err => console.error("Error in onClose:", err));
      }
    });
  }

  /**
   * Remove event listeners
   */
  removeEventListeners() {
    $('#rangeModal').off('hidden.bs.modal');
  }

  async open() {
    if(!this.controller.isConnected())
      return;

    $('#range-calibration-alert').hide();
    $('#keep-rotating-alert').removeClass('blink-text');
    $('#range-done-btn')
      .prop('disabled', true)
      .toggleClass('btn-primary', false)
      .toggleClass('btn-outline-primary', true);
    bootstrap.Modal.getOrCreateInstance('#rangeModal').show();

    this.ll_data.fill(0);
    this.rr_data.fill(0);

    // Start rendering loop
    this.startStickRendering();

    this._updateUIVisibility();
    if (!this.expertMode) {
      this.updateProgress();  // reset progress bar
      this.startProgressMonitoring();

      this.resetAlertEnhancement();
      this.startCountdown();
    }

    await sleep(1000);
    await this.controller.calibrateRangeBegin();
  }

  async onClose() {
    this.stopStickRendering();
    this.stopProgressMonitoring();
    this.stopCountdown();

    const result = await this.controller.calibrateRangeOnClose();

    // Call the done callback if provided
    if (result && this.doneCallback && typeof this.doneCallback === 'function') {
      this.doneCallback(result.success, result.message);
    }
    if (this.allDonePromiseResolve) {
      this.allDonePromiseResolve();
    }
    destroyCurrentInstance$3();
  }

  /**
   * Start monitoring progress by checking ll_data and rr_data arrays
   */
  startProgressMonitoring() {
    this.progressUpdateInterval = setInterval(() => {
      this.checkDataProgress();
    }, 100); // Check every 100ms
  }

  /**
   * Stop progress monitoring
   */
  stopProgressMonitoring() {
    if (this.progressUpdateInterval) {
      clearInterval(this.progressUpdateInterval);
      this.progressUpdateInterval = null;
    }
  }

  /**
   * Start countdown timer for Done button
   */
  startCountdown() {
    this.countdownSeconds = SECONDS_UNTIL_UNLOCK;
    this.updateCountdownButton();

    // Every second, update countdown
    this.countdownInterval = setInterval(() => {
      this.countdownSeconds--;
      // If there is only one stick, sum two times leftCycleProgress, so that it can reach 100.
      if (this.countdownSeconds <= 0 || this.leftCycleProgress + (this.hasSingleStick ? this.leftCycleProgress : this.rightCycleProgress) >= 100) {
        this.stopCountdown();
        this._enableDoneButton();
      } else {
        this.checkAndEnhanceAlert();
      }
      this.updateCountdownButton();
    }, 1000);
  }

  /**
   * Stop countdown timer
   */
  stopCountdown() {
    if (!this.countdownInterval) return;

    clearInterval(this.countdownInterval);
    this.countdownInterval = null;
    this.countdownSeconds = 0;
    this.updateCountdownButton();
  }

  /**
   * Update countdown button text and state
   */
  updateCountdownButton() {
    const seconds = this.countdownSeconds;
    const text = this.buttonText + (seconds > 0 ? ` (${seconds})` : "");
    $('#range-done-btn').text(text);
  }

  /**
   * Enable the Done button and hide calibration alert
   */
  _enableDoneButton() {
    $('#range-calibration-alert').hide();
    $('#range-done-btn')
      .prop('disabled', false)
      .toggleClass('btn-primary', true)
      .toggleClass('btn-outline-primary', false);
  }

  /**
   * Check if ll_data and rr_data have received data
   */
  checkDataProgress() {
    const JOYSTICK_EXTREME_THRESHOLD = 0.80;
    const CIRCLE_FILL_THRESHOLD = 0.95;

    // Count the number of times the joysticks have been rotated full circle
    const leftNonZeroCount = this.ll_data.filter(v => v > JOYSTICK_EXTREME_THRESHOLD).length;
    const leftFillRatio = leftNonZeroCount / CIRCULARITY_DATA_SIZE;
    if (leftFillRatio >= CIRCLE_FILL_THRESHOLD) {
      this.leftFullCycles++;
      this.ll_data.fill(0);
    }

    if(this.hasSingleStick) {
      // Update progress if counts changed
      if (leftNonZeroCount !== this.leftNonZeroCount) {
        this.leftNonZeroCount = leftNonZeroCount;
        this.updateProgress();
      }
    } else {
      const rightNonZeroCount = this.rr_data.filter(v => v > JOYSTICK_EXTREME_THRESHOLD).length;
      const rightFillRatio = rightNonZeroCount / CIRCULARITY_DATA_SIZE;
      if (rightFillRatio >= CIRCLE_FILL_THRESHOLD) {
        this.rightFullCycles++;
        this.rr_data.fill(0);
      }

      // Update progress if counts changed
      if (leftNonZeroCount !== this.leftNonZeroCount || rightNonZeroCount !== this.rightNonZeroCount) {
        this.leftNonZeroCount = leftNonZeroCount;
        this.rightNonZeroCount = rightNonZeroCount;
        this.updateProgress();
      }

    }

  }

  /**
   * Update the progress bar and enable/disable Done button
   */
  updateProgress() {
    // Calculate progress based on full cycles completed
    // Each stick needs to complete 4 full cycles to contribute 50% to total progress
    const leftCycleProgress = Math.min(1, this.leftFullCycles / this.requiredFullCycles) * 50;
    const rightCycleProgress = Math.min(1, this.rightFullCycles / this.requiredFullCycles) * 50;
    this.leftCycleProgress = leftCycleProgress;
    this.rightCycleProgress = rightCycleProgress;

    // Add current partial progress for visual feedback
    const leftCurrentProgress = (this.leftNonZeroCount / CIRCULARITY_DATA_SIZE) * (50 / this.requiredFullCycles);
    const rightCurrentProgress = (this.rightNonZeroCount / CIRCULARITY_DATA_SIZE) * (50 / this.requiredFullCycles);

    const totalProgress = Math.round(
      this.hasSingleStick ? 
        Math.min(100, 2*(leftCycleProgress + leftCurrentProgress)) : (
          Math.min(50, leftCycleProgress + leftCurrentProgress) +
          Math.min(50, rightCycleProgress  + rightCurrentProgress)
        )
    );

    const $progressBar = $('#range-progress-bar');
    const $progressText = $('#range-progress-text');

    $progressBar
      .css('width', `${totalProgress}%`)
      .attr('aria-valuenow', totalProgress);

    if(!this.hasSingleStick) {
      $progressText.text(`${totalProgress}% (L:${this.leftFullCycles}/${this.requiredFullCycles}, R:${this.rightFullCycles}/${this.requiredFullCycles})`);
    } else {
      $progressText.text(`${totalProgress}% (L:${this.leftFullCycles}/${this.requiredFullCycles})`);
    }
  }

  checkAndEnhanceAlert() {
    const secondsElapsed = SECONDS_UNTIL_UNLOCK - this.countdownSeconds;

    const alertIsVisible = $('#range-calibration-alert').is(":visible");
    const progressBelowThreshold = this.leftCycleProgress < 10 || (this.hasSingleStick ? false : this.rightCycleProgress < 10);

    if (secondsElapsed >= 5 && progressBelowThreshold && !alertIsVisible) {
      $('#range-calibration-alert').show();
    }

    const isBlinking = $('#keep-rotating-alert').hasClass('blink-text');
    if (secondsElapsed >= 7 && progressBelowThreshold && !isBlinking) {
      $('#keep-rotating-alert').addClass('blink-text');
    }
  }

  resetAlertEnhancement() {
    $('#keep-rotating-alert').removeClass('blink-text');
  }

  /**
   * Update UI visibility based on expert mode
   */
  _updateUIVisibility() {
    if (this.expertMode) {
      // Hide progress bar, progress text, and alert in expert mode. Enable Done button immediately.
      $('#range-progress-container').hide();
      $('#range-progress-text-container').hide();
      $('#range-calibration-alert').hide();
      this._enableDoneButton();
    } else {
      // Show progress bar and progress text in normal mode
      $('#range-progress-container').show();
      $('#range-progress-text-container').show();
    }

    // Hide right stick elements if single stick controller
    $('#range-right-stick-canvas').toggle(!this.hasSingleStick);
    $('#range-rx').toggle(!this.hasSingleStick);
    $('#range-ry').toggle(!this.hasSingleStick);
  }

  /**
   * Clear a canvas with white background
   */
  _clearCanvas(ctx, canvas) {
    if (!ctx) return;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  /**
   * Update current stick positions for rendering
   */
  handleControllerInput({sticks}) {
    if (sticks?.left) {
      this.currentStickPositions.left = { ...sticks.left };
    }
    if (sticks?.right) {
      this.currentStickPositions.right = { ...sticks.right };
    }
  }

  /**
   * Start stick rendering loop
   */
  startStickRendering() {
    if (this.stickRenderInterval) return;

    this.stickRenderInterval = setInterval(() => {
      this._renderSticks();
    }, 16); // ~60 FPS
  }

  /**
   * Stop stick rendering loop
   */
  stopStickRendering() {
    if (this.stickRenderInterval) {
      clearInterval(this.stickRenderInterval);
      this.stickRenderInterval = null;
    }
  }

  /**
   * Render both stick dials
   */
  _renderSticks() {
    const leftCanvas = document.getElementById('range-left-stick-canvas');
    const leftCtx = leftCanvas.getContext('2d');

    // Draw stick dials in normal mode (no circularity data, no zoom)
    const size = 60;
    const centerX = leftCanvas.width / 2;
    const centerY = leftCanvas.height / 2;
    const {left, right} = this.currentStickPositions;

    this._clearCanvas(leftCtx, leftCanvas);
    draw_stick_dial(leftCtx, centerX, centerY, size, left.x, left.y);

    const precision = 2;
    $("#range-lx-lbl").text(float_to_str(left.x, precision));
    $("#range-ly-lbl").text(float_to_str(left.y, precision));

    // Only render right stick if not a single stick controller
    if (!this.hasSingleStick) {
      const rightCanvas = document.getElementById('range-right-stick-canvas');
      const rightCtx = rightCanvas.getContext('2d');

      this._clearCanvas(rightCtx, rightCanvas);
      draw_stick_dial(rightCtx, centerX, centerY, size, right.x, right.y);

      $("#range-rx-lbl").text(float_to_str(right.x, precision));
      $("#range-ry-lbl").text(float_to_str(right.y, precision));
    }
  }
}

// Global reference to the current range calibration instance
let currentCalibRangeInstance = null;

function destroyCurrentInstance$3() {
  if (currentCalibRangeInstance) {
    console.log("Destroying current range calibration instance");
    currentCalibRangeInstance.removeEventListeners();
    currentCalibRangeInstance = null;
  }
}

async function calibrate_range(controller, dependencies, doneCallback = null, expertMode = false) {
  destroyCurrentInstance$3(); // Clean up any existing instance
  currentCalibRangeInstance = new CalibRangeModal(controller, dependencies, doneCallback, expertMode);

  await currentCalibRangeInstance.open();
  return new Promise((resolve) => {
    currentCalibRangeInstance.allDonePromiseResolve = resolve;
  });
}

async function calibrate_range_on_close() {
  if (currentCalibRangeInstance) {
    bootstrap.Modal.getOrCreateInstance('#rangeModal').hide();
  }
}

function rangeCalibHandleControllerInput(changes) {
  if (currentCalibRangeInstance) {
    currentCalibRangeInstance.handleControllerInput(changes);
  }
}

// Expose functions to window for HTML onclick handlers
window.calibrate_range_on_close = calibrate_range_on_close;

const FINETUNE_INPUT_SUFFIXES = ["LL", "LT", "RL", "RT", "LR", "LB", "RR", "RB", "LX", "LY", "RX", "RY"];
const LEFT_AND_RIGHT = ['left', 'right'];

// Configuration for stick-specific operations
const STICK_CONFIG = {
  left: {
    suffixes: ['LL', 'LT', 'LR', 'LB'],
    axisX: 'LX',
    axisY: 'LY',
    circDataName: 'll_data',
    canvasName: 'finetuneStickCanvasL'
  },
  right: {
    suffixes: ['RL', 'RT', 'RR', 'RB'],
    axisX: 'RX',
    axisY: 'RY',
    circDataName: 'rr_data',
    canvasName: 'finetuneStickCanvasR'
  }
};

// Event listener configurations
const EVENT_CONFIGS = [
  // Mode toggles
  { selector: '#finetuneModeCenter', event: 'change', handler: (instance, e) => e.target.checked && instance.setMode('center') },
  { selector: '#finetuneModeCircularity', event: 'change', handler: (instance, e) => e.target.checked && instance.setMode('circularity') },

  // General controls
  { selector: '#showRawNumbersCheckbox', event: 'change', handler: (instance) => instance._showRawNumbersChanged() },
  { selector: '#learn-more-link', event: 'click', handler: (instance, e) => { e.preventDefault(); $('#learn-more-link').hide(); $('#learn-more-text').show(); } },
  { selector: '.dropdown-item[data-step]', event: 'click', handler: (instance, e) => { e.preventDefault(); instance.stepSize = parseInt($(e.target).data('step')); } },

  // Modal events
  { selector: '#finetuneModal', event: 'hidden.bs.modal', handler: (instance) => instance._onModalHidden() }
];

/**
 * DS5 Finetuning Class
 * Handles controller stick calibration and fine-tuning operations
 */
class Finetune {
  constructor() {
    this._mode = 'center'; // 'center' or 'circularity'
    this.original_data = [];
    this.active_stick = null; // 'left', 'right', or null
    this._centerStepSize = 5; // Default step size for center mode
    this._circularityStepSize = 5; // Default step size for circularity mode
    this.isQuickCalibrating = false; // Prevents dialog destruction during quick calibration

    // Dependencies
    this.controller = null;
    this.ll_data = null;
    this.rr_data = null;
    this.clearCircularity = null;
    this.doneCallback = null;

    // Closure functions
    this.refresh_finetune_sticks = this._createRefreshSticksThrottled();
    this.update_finetune_warning_messages = this._createUpdateWarningMessagesClosure();
    this.flash_finetune_warning = this._createFlashWarningClosure();

    // Continuous adjustment state
    this.continuous_adjustment = {
      initial_delay: null,
      repeat_delay: null,
    };

    // Track previous slider values for incremental adjustments
    this._previousSliderValues = {
      left: 0,
      right: 0
    };

    // Store the values of the input fields when slider adjustment starts
    this._inputStartValuesForSlider = {
      left: null,
      right: null
    };

    // Track slider usage state for undo functionality
    this._sliderUsed = {
      left: false,
      right: false
    };

    // Track previous axis values for stopping continuous adjustment
    this._previousAxisValues = {
      left: { x: 0, y: 0 },
      right: { x: 0, y: 0 }
    };

    // Binary search state for R2/L2 circularity calibration
    this.binarySearch = {
      active: false,
      minValue: 0,
      maxValue: 65535,
      lastAdjustedValue: 0,
      inputSuffix: null,
      lastAxisValue: 0,
      targetAxisMin: 0.99,
      searchIterations: 0,
      maxIterations: 20
    };
  }

  get mode() {
    return this._mode;
  }

  set mode(mode) {
    if (mode !== 'center' && mode !== 'circularity') {
      throw new Error(`Invalid finetune mode: ${mode}. Must be 'center' or 'circularity'`);
    }
    this._mode = mode;
    this._updateUI();
  }

  get stepSize() {
    return this._mode === 'center' ? this._centerStepSize : this._circularityStepSize;
  }

  set stepSize(size) {
    if (this._mode === 'center') {
      this._centerStepSize = size;
    } else {
      this._circularityStepSize = size;
    }
    this._updateStepSizeUI();
    this._saveStepSizeToLocalStorage();
  }

  async init(controllerInstance, { ll_data, rr_data, clear_circularity }, doneCallback = null) {
    la("finetune_modal_open");

    this.controller = controllerInstance;
    this.ll_data = ll_data;
    this.rr_data = rr_data;
    this.clearCircularity = clear_circularity;
    this.doneCallback = doneCallback;

    this._initEventListeners();
    this._restoreShowRawNumbersCheckbox();
    this._restoreStepSizeFromLocalStorage();

    // Lock NVS before
    const nv = await this.controller.queryNvStatus();
    if(!nv.locked) {
      const res = await this.controller.nvsLock();
      if(!res.ok) {
        return;
      }

      const nv2 = await this.controller.queryNvStatus();
      if(!nv2.locked) {
        const errTxt = "0x" + dec2hex32(nv2.raw);
        throw new Error("ERROR: Cannot lock NVS (" + errTxt + ")");
      }
    } else if(nv.status !== 'locked') {
      throw new Error("ERROR: Cannot read NVS status. Finetuning is not safe on this device.");
    }

    const data = await this._readFinetuneData();

    const modal = new bootstrap.Modal(document.getElementById('finetuneModal'), {});
    modal.show();

    this._initializeFinetuneInputs(data);

    // Start in center mode
    this.setMode('center');
    this.setStickToFinetune('left');

    // Initialize the raw numbers display state
    this._showRawNumbersChanged();

    this.original_data = data;

    // Update error slack button states
    this._updateErrorSlackButtonStates();

    // Reset the Learn More link
    $('#learn-more-link').show();
    $('#learn-more-text').hide();

    this.refresh_finetune_sticks();
  }

  /**
   * Initialize event listeners for the finetune modal
   */
  _initEventListeners() {
    // Initialize finetune input listeners
    FINETUNE_INPUT_SUFFIXES.forEach((suffix) => {
      $("#finetune" + suffix).on('change', () => this._onFinetuneChange());
    });

    // Initialize general event listeners
    EVENT_CONFIGS.forEach(config => {
      $(config.selector).on(config.event, (e) => config.handler(this, e));
    });

    // Initialize stick-specific event listeners
    this._initStickEventListeners();
  }

  /**
   * Initialize stick-specific event listeners (left and right)
   */
  _initStickEventListeners() {
    LEFT_AND_RIGHT.forEach(lOrR => {
      $(`#${lOrR}-stick-card`).on('click', () => {
        this.setStickToFinetune(lOrR);
      });

      this._initSliderListeners(lOrR);
      this._initButtonListeners(lOrR);
      this._initKeyboardListeners(lOrR);
    });
  }

  /**
   * Initialize slider event listeners for a specific stick
   */
  _initSliderListeners(lOrR) {
    const sliderId = `#${lOrR}CircularitySlider`;

    $(sliderId).on('input', (e) => {
      this._onCircularitySliderChange(lOrR, parseInt(e.target.value));
    });

    $(sliderId).on('mousedown touchstart', (e) => {
      this._onCircularitySliderStart(lOrR, parseInt(e.target.value));
    });

    $(sliderId).on('change', (e) => {
      this._onCircularitySliderRelease(lOrR);
    });
  }

  /**
   * Initialize button event listeners for a specific stick
   */
  _initButtonListeners(lOrR) {
    // Reset button
    $(`#${lOrR}CircularityResetBtn`).on('click', () => {
      this._resetCircularitySlider(lOrR);
    });

    // Error slack button
    $(`#${lOrR}ErrorSlackBtn`).on('click', () => {
      this._onErrorSlackButtonClick(lOrR);
    });

    // Error slack undo button
    $(`#${lOrR}ErrorSlackUndoBtn`).on('click', () => {
      this._onErrorSlackUndoButtonClick(lOrR);
    });
  }

  /**
   * Initialize keyboard event listeners for a specific stick card
   */
  _initKeyboardListeners(lOrR) {
    const stickCard = $(`#${lOrR}-stick-card`);

    stickCard.on('keydown', (e) => {
      this._onKeyboardEvent(e, true);
    });

    stickCard.on('keyup', (e) => {
      this._onKeyboardEvent(e, false);
    });

    // Make stick cards focusable
    stickCard.attr('tabindex', '0');
  }

  /**
   * Clean up event listeners for the finetune modal
   */
  removeEventListeners() {
    // Remove finetune input listeners
    FINETUNE_INPUT_SUFFIXES.forEach((suffix) => {
      $("#finetune" + suffix).off('change');
    });

    // Remove general event listeners
    EVENT_CONFIGS.forEach(config => {
      $(config.selector).off(config.event);
    });

    // Remove stick-specific event listeners
    this._removeStickEventListeners();
  }

  /**
   * Remove stick-specific event listeners
   */
  _removeStickEventListeners() {
    LEFT_AND_RIGHT.forEach(lOrR => {
      // Remove stick card listeners
      $(`#${lOrR}-stick-card`).off('click keydown keyup');

      // Remove slider listeners
      const sliderId = `#${lOrR}CircularitySlider`;
      $(sliderId).off('input mousedown touchstart change');

      // Remove button listeners
      $(`#${lOrR}CircularityResetBtn`).off('click');
      $(`#${lOrR}ErrorSlackBtn`).off('click');
      $(`#${lOrR}ErrorSlackUndoBtn`).off('click');
    });
  }

  /**
   * Handle modal hidden event
   */
  _onModalHidden() {
    console.log("Finetune modal hidden event triggered");

    // Don't destroy the instance if quick calibration is in progress
    if (this.isQuickCalibrating) {
      console.log("Quick calibration in progress, preventing dialog destruction");
      return;
    }

    // Reset circularity sliders to zero when modal closes
    LEFT_AND_RIGHT.forEach(lOrR => {
      $(`#${lOrR}CircularitySlider`).val(0);
      this._sliderUsed[lOrR] = false;
    });

    destroyCurrentInstance$2();
  }

  /**
   * Handle mode switching based on controller input
   */
  handleModeSwitching(changes) {
    if (changes.l1) {
      this.setMode('center');
      this._clearFinetuneAxisHighlights();
    } else if (changes.r1) {
      this.setMode('circularity');
      this._clearFinetuneAxisHighlights();
    }
  }

  /**
   * Handle stick switching based on controller input
   */
  handleStickSwitching(changes) {
    if (changes.sticks) {
      this._updateActiveStickBasedOnMovement();
    }
  }

  /**
   * Handle D-pad adjustments for finetuning
   */
  handleDpadAdjustment(changes) {
    if(!this.active_stick) return;

    if (this._mode === 'center') {
      this._handleCenterModeAdjustment(changes);
    } else {
      this._handleCircularityModeAdjustment(changes);
    }
  }

  /**
   * Handle keyboard events for arrow key adjustments
   * Arrow keys work like D-pad buttons for fine-tuning
   */
  _onKeyboardEvent(event, isKeyDown) {
    const key = event.key;

    // Map arrow keys to button names (D-pad)
    const keyToButtonMap = {
      'ArrowLeft': 'left',
      'ArrowRight': 'right',
      'ArrowUp': 'up',
      'ArrowDown': 'down'
    };

    const button = keyToButtonMap[key];
    if (!button) return;

    event.preventDefault();

    // Arrow keys work as D-pad buttons for adjustments
    if (!this.active_stick) return;

    const changes = {};

    if (isKeyDown) {
      // Simulate button press by creating a change object
      changes[button] = true;
      this.handleDpadAdjustment(changes);
    } else {
      // Simulate button release
      changes[button] = false;
      this.handleDpadAdjustment(changes);
    }
  }

  /* Set the quick calibrating state to prevent dialog destruction
  * @param {boolean} isCalibrating - Whether quick calibration is in progress
  */
  setQuickCalibrating(isCalibrating) {
    this.isQuickCalibrating = isCalibrating;
    const finetuneModal = bootstrap.Modal.getInstance('#finetuneModal');
    finetuneModal.toggle(!isCalibrating);

    if(!isCalibrating) {
      this.clearCircularity();

        // Refresh the finetune data after calibration
      this._readFinetuneData().then((data) => {
        this._initializeFinetuneInputs(data);
        this.refresh_finetune_sticks();
        console.log('Finetune modal refreshed');
      });
    }
  }

  /**
   * Save finetune changes
   */
  save() {
    // Unlock save button
    this.controller.setHasChangesToWrite(true);

    this._close(true);
  }

  /**
   * Cancel finetune changes and restore original data
   */
  async cancel() {
    if(this.original_data.length == 12)
      await this._writeFinetuneData(this.original_data);

    this._close(false);
  }

  /**
   * Set the finetune mode
   */
  setMode(mode) {
    this._mode = mode;
    this._updateUI();

    // Reset toggle states when switching modes
    if (mode === 'center') {
      LEFT_AND_RIGHT.forEach(lOrR => {
        $(`#${lOrR}-stick-card`).removeClass('show-slider');
        this._sliderUsed[lOrR] = false;
        this._showErrorSlackButton(lOrR);
      });
    }
  }

  /**
   * Set which stick to finetune
   */
  setStickToFinetune(lOrR) {
    if(this.active_stick === lOrR) {
      return;
    }

    // Stop any continuous adjustments when switching sticks
    this.stopContinuousDpadAdjustment();
    this._clearFinetuneAxisHighlights();

    // Hide slider on the previously active stick (when it becomes inactive)
    if (this.active_stick && this._mode === 'circularity') {
      const previousStickCard = $(`#${this.active_stick}-stick-card`);
      previousStickCard.removeClass('show-slider');
    }

    this.active_stick = lOrR;

    const other_stick = lOrR === 'left' ? 'right' : 'left';
    $(`#${this.active_stick}-stick-card`).addClass("stick-card-active");
    $(`#${other_stick}-stick-card`).removeClass("stick-card-active");
  }

  // Private methods

  /**
   * Restore the show raw numbers checkbox state from storage
   */
  _restoreShowRawNumbersCheckbox() {
    const isChecked = Storage.showRawNumbersCheckbox.get();
    if (isChecked) {
      $("#showRawNumbersCheckbox").prop('checked', true);
    }
  }

  /**
   * Initialize finetune input fields with data and max values
   * @param {Array} data - Array of finetune values
   */
  _initializeFinetuneInputs(data) {
    const maxValue = this.controller.getFinetuneMaxValue();
    FINETUNE_INPUT_SUFFIXES.forEach((suffix, i) => {
      $("#finetune" + suffix)
        .attr('max', maxValue)
        .val(data[i]);
    });
  }

  /**
   * Check if stick is in extreme position (close to edges)
   * @param {Object} stick - Stick object with x and y properties
   * @returns {boolean} True if stick is in extreme position
   */
  _isStickInExtremePosition(stick) {
    const primeAxis = Math.max(Math.abs(stick.x), Math.abs(stick.y));
    const otherAxis = Math.min(Math.abs(stick.x), Math.abs(stick.y));
    return primeAxis >= 0.5 && otherAxis < 0.2;
  }

  _updateUI() {
    // Clear circularity data - we'll call this from core.js
    this.clearCircularity();

    const modal = $('#finetuneModal');
    if (this._mode === 'center') {
      $("#finetuneModeCenter").prop('checked', true);
      modal.removeClass('circularity-mode');
    } else if (this._mode === 'circularity') {
      $("#finetuneModeCircularity").prop('checked', true);
      modal.addClass('circularity-mode');
    }

    // Update step size UI when mode changes
    this._updateStepSizeUI();

    // Update error slack button states when mode changes
    this._updateErrorSlackButtonStates();
  }

  async _onFinetuneChange() {
    const out = FINETUNE_INPUT_SUFFIXES.map((suffix) => {
      const el = $("#finetune" + suffix);
      const v = parseInt(el.val());
      return isNaN(v) ? 0 : v;
    });
    await this._writeFinetuneData(out);
  }

  async _readFinetuneData() {
    const data = await this.controller.getInMemoryModuleData();
    if(!data) {
      throw new Error("ERROR: Cannot read calibration data");
    }

    return data;
  }

  async _writeFinetuneData(data) {
    if (data.length != 12) {
      return;
    }

    if (this.controller.isConnected()) {
      await this.controller.writeFinetuneData(data);
    }
  }

  _createRefreshSticksThrottled() {
    let timeout = null;

    return () => {
      if (timeout) return;

      timeout = setTimeout(() => {
        const sticks = this.controller.button_states.sticks;

        // Update both stick displays using configuration
        Object.entries(STICK_CONFIG).forEach(([stick, config]) => {
          const stickData = sticks[stick];
          this._ds5FinetuneUpdate(config.canvasName, stickData.x, stickData.y);
        });

        this.update_finetune_warning_messages();
        this._highlightActiveFinetuneAxis();
        this._updateErrorSlackButtonStates();

        timeout = null;
      }, 10);
    };
  }

  _createUpdateWarningMessagesClosure() {
    let timeout = null; // to prevent unnecessary flicker

    return () => {
      if(!this.active_stick) return;

      const currentStick = this.controller.button_states.sticks[this.active_stick];
      if (this._mode === 'center') {
        const isNearCenter = Math.abs(currentStick.x) <= 0.5 && Math.abs(currentStick.y) <= 0.5;
        if(!isNearCenter && timeout) return;

        clearTimeout(timeout);
        timeout = setTimeout(() => {
          timeout = null;
          if(this._mode !== 'center') return; // in case it changed during timeout

          $('#finetuneCenterSuccess').toggle(isNearCenter);
          $('#finetuneCenterWarning').toggle(!isNearCenter);
        }, isNearCenter ? 0 : 200);
      }

      if (this._mode === 'circularity') {
        const isInExtremePosition = this._isStickInExtremePosition(currentStick);
        if(!isInExtremePosition && timeout) return;

        clearTimeout(timeout);
        timeout = setTimeout(() => {
          timeout = null;
          if(this._mode !== 'circularity') return; // in case it changed during timeout

          // Check if stick is in extreme position (close to edges)
          $('#finetuneCircularitySuccess').toggle(isInExtremePosition);
          $('#finetuneCircularityWarning').toggle(!isInExtremePosition);
        }, isInExtremePosition ? 0 : 200);
      }
    };
  }

  _clearFinetuneAxisHighlights(to_clear = {center: true, circularity: true}) {
    const { center, circularity } = to_clear;

    if(this._mode === 'center' && center || this._mode === 'circularity' && circularity) {
      // Clear label highlights
      const labelIds = ["Lx-lbl", "Ly-lbl", "Rx-lbl", "Ry-lbl"];
      labelIds.forEach(suffix => {
        $(`#finetuneStickCanvas${suffix}`).removeClass("text-primary");
      });
    }
  }

  _highlightActiveFinetuneAxis(opts = {}) {
    if(!this.active_stick) return;

    if (this._mode === 'center') {
      const { axis } = opts;
      if(!axis) return;

      this._clearFinetuneAxisHighlights({center: true});

      const labelSuffix = `${this.active_stick === 'left' ? "L" : "R"}${axis.toLowerCase()}`;
      $(`#finetuneStickCanvas${labelSuffix}-lbl`).addClass("text-primary");
    } else {
      this._clearFinetuneAxisHighlights({circularity: true});

      const sticks = this.controller.button_states.sticks;
      const currentStick = sticks[this.active_stick];

      // Only highlight if stick is moved significantly from center
      const deadzone = 0.5;
      if (Math.abs(currentStick.x) >= deadzone || Math.abs(currentStick.y) >= deadzone) {
        const quadrant = this._getStickQuadrant(currentStick.x, currentStick.y);
        const inputSuffix = this._getFinetuneInputSuffixForQuadrant(this.active_stick, quadrant);
        if (inputSuffix) {
          // Highlight the corresponding LX/LY label to observe
          const labelId = `finetuneStickCanvas${
            this.active_stick === 'left' ? 'L' : 'R'}${
              quadrant === 'left' || quadrant === 'right' ? 'x' : 'y'}-lbl`;
              $(`#${labelId}`).addClass("text-primary");
            }
          }
        }
      }

  _ds5FinetuneUpdate(name, plx, ply) {
    const showRawNumbers = $("#showRawNumbersCheckbox").is(":checked");
    const canvasId = `${name}${showRawNumbers ? '' : '_large'}`;
    const c = document.getElementById(canvasId);

    if (!c) {
      console.error(`Canvas element not found: ${canvasId}`);
      return;
    }

    const ctx = c.getContext("2d");

    const margins = 5;
    const radius = c.width / 2 - margins;
    const sz = c.width/2 - margins;
    const hb = radius + margins;
    const yb = radius + margins;
    ctx.clearRect(0, 0, c.width, c.height);

    // Determine which stick this is using configuration
    const lOrR = this._getStickFromCanvasName(name);
    const highlight = this.active_stick === lOrR && this._isDpadAdjustmentActive();

    if (this._mode === 'circularity') {
      // Draw stick position with circle
      const circularityData = lOrR === 'left' ? this.ll_data : this.rr_data;
      draw_stick_dial(ctx, hb, yb, sz, plx, ply, {
        circularity_data: circularityData,
        highlight
      });
    } else {
      // Draw stick position with crosshair
      draw_stick_dial(ctx, hb, yb, sz, plx, ply, {
        enable_zoom_center: true,
        highlight
      });
    }

    $("#"+ name + "x-lbl").text(float_to_str(plx, 3));
    $("#"+ name + "y-lbl").text(float_to_str(ply, 3));
  }

  /**
   * Get lOrR from canvas name using configuration
   */
  _getStickFromCanvasName(canvasName) {
    return LEFT_AND_RIGHT.find(lOrR =>
      STICK_CONFIG[lOrR].canvasName === canvasName
    );
  }

  _showRawNumbersChanged() {
    const showRawNumbers = $("#showRawNumbersCheckbox").is(":checked");
    const modal = $("#finetuneModal");
    modal.toggleClass("hide-raw-numbers", !showRawNumbers);
    Storage.showRawNumbersCheckbox.set(showRawNumbers);

    this.refresh_finetune_sticks();
  }

  _close(success = false, message = null) {
    console.log("Closing finetune modal");

    // Call the done callback if provided
    if (this.doneCallback && typeof this.doneCallback === 'function') {
      this.doneCallback(success, message);
    }

    $("#finetuneModal").modal("hide");
  }

  _isStickAwayFromCenter(stick_pos, deadzone = 0.2) {
    return Math.abs(stick_pos.x) >= deadzone || Math.abs(stick_pos.y) >= deadzone;
  }

  _updateActiveStickBasedOnMovement() {
    const sticks = this.controller.button_states.sticks;
    const deadzone = 0.2;

    const left_is_away = this._isStickAwayFromCenter(sticks.left, deadzone);
    const right_is_away = this._isStickAwayFromCenter(sticks.right, deadzone);

    if (left_is_away && right_is_away) {
      // Both sticks are away from center - clear highlighting
      this._clearActiveStick();
    } else if (left_is_away && !right_is_away) {
      // Only left stick is away from center
      this.setStickToFinetune('left');
    } else if (right_is_away && !left_is_away) {
      // Only right stick is away from center
      this.setStickToFinetune('right');
    }
    // If both sticks are centered, keep current active stick (no change)
  }

  _clearActiveStick() {
    // Remove active class from both cards
    $("#left-stick-card").removeClass("stick-card-active");
    $("#right-stick-card").removeClass("stick-card-active");

    this.active_stick = null; // Clear active stick
    this._clearFinetuneAxisHighlights();
  }

  _getStickQuadrant(x, y) {
    // Determine which quadrant the stick is in based on x,y coordinates
    // x and y are normalized values between -1 and 1
    if (Math.abs(x) > Math.abs(y)) {
      return x > 0 ? 'right' : 'left';
    } else {
      return y > 0 ? 'down' : 'up';
    }
  }

  _getFinetuneInputSuffixForQuadrant(stick, quadrant) {
    // This function should only be used in circularity mode
    // In center mode, we don't care about quadrants - use direct axis mapping instead
    if (this._mode === 'center') {
      // This function shouldn't be called in center mode
      console.warn('get_finetune_input_suffix_for_quadrant called in center mode - this should not happen');
      return null;
    }

    // Circularity mode: map quadrants to specific calibration points using configuration
    const config = STICK_CONFIG[stick];
    if (!config) return null;

    const quadrantMap = {
      'left': 0,   // LL, RL
      'up': 1,     // LT, RT
      'right': 2,  // LR, RR
      'down': 3    // LB, RB
    };

    const index = quadrantMap[quadrant];
    return index !== undefined ? config.suffixes[index] : null;
  }

  _handleCenterModeAdjustment(changes) {
    const adjustmentStep = this._centerStepSize; // Use center step size for center mode

    // Define button mappings for center mode
    const buttonMappings = [
      { buttons: ['left', 'square'], adjustment: adjustmentStep, axis: 'X' },
      { buttons: ['right', 'circle'], adjustment: -adjustmentStep, axis: 'X' },
      { buttons: ['up', 'triangle'], adjustment: adjustmentStep, axis: 'Y' },
      { buttons: ['down', 'cross'], adjustment: -adjustmentStep, axis: 'Y' }
    ];

    // Check if any relevant button was released
    const relevantButtons = ['left', 'right', 'square', 'circle', 'up', 'down', 'triangle', 'cross'];
    if (relevantButtons.some(button => changes[button] === false)) {
      this.stopContinuousDpadAdjustment();
      return;
    }

    // Check for button presses
    for (const mapping of buttonMappings) {
      // Check if active stick is away from center (> 0.5)
      const sticks = this.controller.button_states.sticks;
      const currentStick = sticks[this.active_stick];
      const stickAwayFromCenter = Math.abs(currentStick.x) > 0.5 || Math.abs(currentStick.y) > 0.5;
      if (stickAwayFromCenter && this._isNavigationKeyPressed()) {
        this.flash_finetune_warning();
        return;
      }

      if (mapping.buttons.some(button => changes[button])) {
        this._highlightActiveFinetuneAxis({axis: mapping.axis});
        this._startContinuousDpadAdjustmentCenterMode(this.active_stick, mapping.axis, mapping.adjustment);
        return;
      }
    }
  }

  _isNavigationKeyPressed() {
    const nav_buttons = ['left', 'right', 'up', 'down', 'square', 'circle', 'triangle', 'cross'];
    return nav_buttons.some(button => this.controller.button_states[button] === true);
  }

  _createFlashWarningClosure() {
    let timeout = null;

    return () => {
      function toggle() {
        $("#finetuneCenterWarning").toggleClass(['alert-warning', 'alert-danger']);
        $("#finetuneCircularityWarning").toggleClass(['alert-warning', 'alert-danger']);
      }

      if(timeout) return;

      toggle();   // on
      timeout = setTimeout(() => {
        toggle();   // off
        timeout = null;
      }, 300);
    };
  }

  _handleCircularityModeAdjustment({sticks: _, ...changes}) {
    const sticks = this.controller.button_states.sticks;
    const currentStick = sticks[this.active_stick];

    // Only adjust if stick is moved significantly from center
    const isInExtremePosition = this._isStickInExtremePosition(currentStick);
    if (!isInExtremePosition) {
      this.stopContinuousDpadAdjustment();
      if(this._isNavigationKeyPressed()) {
        this.flash_finetune_warning();
      }
      return;
    }

    const quadrant = this._getStickQuadrant(currentStick.x, currentStick.y);

    if (changes.r2_analog !== undefined || changes.l2_analog !== undefined) {
      const r2Value = this.controller.button_states.r2_analog || 0;
      const l2Value = this.controller.button_states.l2_analog || 0;

      if (r2Value === 0 && l2Value === 0) {
        this.binarySearch.inputSuffix = null;
        this.stopContinuousDpadAdjustment();
        return;
      }

      if (!this.binarySearch.active && !this.binarySearch.inputSuffix && !this._isDpadAdjustmentActive()) {
        const inputSuffix = this._getFinetuneInputSuffixForQuadrant(this.active_stick, quadrant);
        if (inputSuffix) {
          this._startBinarySearch(inputSuffix);
        }
      }
      return;
    }

    // Use circularity step size for circularity mode
    const adjustmentStep = this._circularityStepSize;

    // Define button mappings for each quadrant type
    const horizontalButtons = ['left', 'right', 'square', 'circle'];
    const verticalButtons = ['up', 'down', 'triangle', 'cross'];

    let adjustment = 0;
    let relevantButtons = [];

    if (quadrant === 'left' || quadrant === 'right') {
      // Horizontal quadrants: left increases, right decreases
      relevantButtons = horizontalButtons;
      if (changes.left || changes.square) {
        adjustment = adjustmentStep;
      } else if (changes.right || changes.circle) {
        adjustment = -adjustmentStep;
      }
    } else if (quadrant === 'up' || quadrant === 'down') {
      // Vertical quadrants: up increases, down decreases
      relevantButtons = verticalButtons;
      if (changes.up || changes.triangle) {
        adjustment = adjustmentStep;
      } else if (changes.down || changes.cross) {
        adjustment = -adjustmentStep;
      }
    }

    // Check if any relevant button was released
    if (relevantButtons.some(button => changes[button] === false)) {
      this.stopContinuousDpadAdjustment();
      return;
    }

    // Start continuous adjustment on button press
    if (adjustment !== 0) {
      this._startContinuousDpadAdjustment(this.active_stick, quadrant, adjustment);
    }
  }

  _startContinuousDpadAdjustment(stick, quadrant, adjustment) {
    const inputSuffix = this._getFinetuneInputSuffixForQuadrant(stick, quadrant);
    this._startContinuousAdjustmentWithSuffix(inputSuffix, adjustment);
  }

  _startContinuousDpadAdjustmentCenterMode(stick, targetAxis, adjustment) {
    // In center mode, directly map to X/Y axes using configuration
    const config = STICK_CONFIG[stick];
    const inputSuffix = targetAxis === 'X' ? config.axisX : config.axisY;
    this._startContinuousAdjustmentWithSuffix(inputSuffix, adjustment);
  }

  _startContinuousAdjustmentWithSuffix(inputSuffix, adjustment) {
    this.stopContinuousDpadAdjustment();

    const element = $(`#finetune${inputSuffix}`);
    if (!element.length) return;

    this._savePreviousStickPosition();

    this._performDpadAdjustment(element, adjustment);
    this.clearCircularity();

    // ...then prime continuous adjustment
    this.continuous_adjustment.initial_delay = setTimeout(() => {
      this.continuous_adjustment.repeat_delay = setInterval(() => {
        this._performDpadAdjustment(element, adjustment);
        this.clearCircularity();
      }, 150);
    }, 400); // Initial delay before continuous adjustment starts (400ms)
  }

  stopContinuousDpadAdjustment() {
    clearInterval(this.continuous_adjustment.repeat_delay);
    this.continuous_adjustment.repeat_delay = null;

    clearTimeout(this.continuous_adjustment.initial_delay);
    this.continuous_adjustment.initial_delay = null;

    this.binarySearch.active = false;
  }

  _isDpadAdjustmentActive() {
    return !!this.continuous_adjustment.initial_delay;
  }

  _savePreviousStickPosition() {
    if (this.active_stick && this.controller.button_states.sticks) {
      const currentStick = this.controller.button_states.sticks[this.active_stick];
      this._previousAxisValues[this.active_stick].x = currentStick.x;
      this._previousAxisValues[this.active_stick].y = currentStick.y;
    }
  }

  _startBinarySearch(inputSuffix) {
    const element = $(`#finetune${inputSuffix}`);
    if (!element.length) return;

    const currentValue = parseInt(element.val()) || 0;

    this.binarySearch = {
      active: true,
      minValue: Math.max(0, currentValue - 500),
      maxValue: Math.min(65535, currentValue + 500),
      lastAdjustedValue: currentValue,
      inputSuffix: inputSuffix,
      lastAxisValue: 0,
      targetAxisMin: 0.99,
      searchIterations: 0,
      maxIterations: 20
    };

    this._savePreviousStickPosition();
    this._performBinarySearchStep();
  }

  async _performBinarySearchStep() {
    if (!this.binarySearch.active || !this.binarySearch.inputSuffix) return;

    const element = $(`#finetune${this.binarySearch.inputSuffix}`);
    if (!element.length) return;

    const midValue = this._calculateBinarySearchMidpoint();
    element.val(midValue);
    this.binarySearch.lastAdjustedValue = midValue;

    await this._onFinetuneChange();
    this.clearCircularity();
    await new Promise(resolve => setTimeout(resolve, 50));

    const absAxis = this._calculateBinarySearchAxisValue();
    this.binarySearch.lastAxisValue = absAxis;
    this.binarySearch.searchIterations++;

    if (this._isBinarySearchConverged(absAxis)) {
      this.binarySearch.active = false;
      this.stopContinuousDpadAdjustment();
      return;
    }

    this._updateBinarySearchBounds(midValue, absAxis);

    this.continuous_adjustment.repeat_delay = setTimeout(
      () => this._performBinarySearchStep(),
      50
    );
  }

  _calculateBinarySearchMidpoint() {
    const { minValue, maxValue, searchIterations, lastAdjustedValue } = this.binarySearch;
    return searchIterations === 0
      ? lastAdjustedValue
      : Math.floor((minValue + maxValue) / 2);
  }

  _calculateBinarySearchAxisValue() {
    if (!this.binarySearch.inputSuffix || !this.active_stick) {
      return 0;
    }
    const currentStick = this.controller.button_states.sticks[this.active_stick];
    if (!currentStick) {
      return 0;
    }
    const lastChar = this.binarySearch.inputSuffix.slice(-1);
    const axis = (['X', 'L', 'R'].includes(lastChar)) ? currentStick.x : currentStick.y;
    return Math.abs(axis);
  }

  _isBinarySearchConverged(absAxis) {
    const convergenceThreshold = 0.005;
    const diff = Math.abs(absAxis - this.binarySearch.targetAxisMin);
    const hasConverged = diff < convergenceThreshold;
    const maxIterationsReached = this.binarySearch.searchIterations >= this.binarySearch.maxIterations;
    return hasConverged || maxIterationsReached;
  }

  _updateBinarySearchBounds(midValue, absAxis) {
    if (!this.binarySearch.inputSuffix) return;

    const isInvertedDirection = this.binarySearch.inputSuffix.endsWith('R') || this.binarySearch.inputSuffix.endsWith('B');
    const isAxisTooLow = absAxis < this.binarySearch.targetAxisMin;

    if (isAxisTooLow === isInvertedDirection) {
      this.binarySearch.maxValue = midValue;
    } else {
      this.binarySearch.minValue = midValue;
    }
  }

  async _performDpadAdjustment(element, adjustment) {
    const currentValue = parseInt(element.val()) || 0;
    const maxValue = this.controller.getFinetuneMaxValue();

    const newValue = Math.max(0, Math.min(maxValue, currentValue + adjustment));
    element.val(newValue);

    // Trigger the change event to update the finetune data
    await this._onFinetuneChange();

    // Check if axis values have dropped from 1.00 to below 1.00 and stop adjustment if so
    this._checkAxisValuesForStopCondition();
  }

  /**
   * Check if axis values have dropped from 1.00 to below 1.00 and stop adjustment
   */
  _checkAxisValuesForStopCondition() {
    if (!this.active_stick || !this.continuous_adjustment.repeat_delay) {
      return; // No continuous adjustment active
    }

    const currentStick = this.controller.button_states.sticks[this.active_stick];
    const previousStick = this._previousAxisValues[this.active_stick];

    // Check if X axis dropped from 1.00+ to below 1.00
    const xDropped = Math.abs(previousStick.x) >= 1.00 && Math.abs(currentStick.x) < 1.00;
    // Check if Y axis dropped from 1.00+ to below 1.00
    const yDropped = Math.abs(previousStick.y) >= 1.00 && Math.abs(currentStick.y) < 1.00;

    if (xDropped || yDropped) {
      console.log(`Stopping continuous adjustment: ${this.active_stick} axis dropped below 1.00`);
      this.stopContinuousDpadAdjustment();
    }

    // Update previous values for next check
    this._previousAxisValues[this.active_stick] = currentStick;
  }

  /**
   * Update the step size UI display
   */
  _updateStepSizeUI() {
    const currentStepSize = this._mode === 'center' ? this._centerStepSize : this._circularityStepSize;
    $('#stepSizeValue').text(currentStepSize);
  }

  /**
   * Save step size to storage
   */
  _saveStepSizeToLocalStorage() {
    Storage.finetuneCenterStepSize.set(this._centerStepSize);
    Storage.finetuneCircularityStepSize.set(this._circularityStepSize);
  }

  /**
   * Restore step size from storage
   */
  _restoreStepSizeFromLocalStorage() {
    const savedCenterStepSize = Storage.finetuneCenterStepSize.get();
    if (savedCenterStepSize) {
      this._centerStepSize = parseInt(savedCenterStepSize);
    }

    const savedCircularityStepSize = Storage.finetuneCircularityStepSize.get();
    if (savedCircularityStepSize) {
      this._circularityStepSize = parseInt(savedCircularityStepSize);
    }

    this._updateStepSizeUI();
  }

  /**
   * Handle the start of circularity slider adjustment
   * Store base values and reset previous slider value
   */
  _onCircularitySliderStart(lOrR, value) {
    console.log(`Slider start for ${lOrR} stick, value: ${value}`);

    const config = STICK_CONFIG[lOrR];
    const baseValues = {};

    // Store the base values when slider adjustment starts
    config.suffixes.forEach(suffix => {
      const element = $(`#finetune${suffix}`);
      baseValues[suffix] = parseInt(element.val()) || 0;
    });

    this._inputStartValuesForSlider[lOrR] = baseValues;
    this._previousSliderValues[lOrR] = value;

    // Store base values for circularity data arrays
    const circData = this[config.circDataName];
    if (circData && Array.isArray(circData)) {
      this._inputStartValuesForSlider[lOrR][config.circDataName] = [...circData]; // Create a copy
    }

    console.log(`Base values stored for ${lOrR}:`, baseValues);
  }

  /**
   * Handle circularity slider changes with incremental adjustments
   */
  _onCircularitySliderChange(lOrR, value) {
    // Debug: Log the data structure
    console.log(`Slider change for ${lOrR} stick, value: ${value}`);

    // If we don't have base values, treat this as the start
    if (!this._inputStartValuesForSlider[lOrR]) {
      this._onCircularitySliderStart(lOrR, value);
      return;
    }

    // Calculate the incremental change from the previous slider position
    const previousValue = this._previousSliderValues[lOrR];
    const deltaValue = value - previousValue;

    // If no change, return early
    if (deltaValue === 0) {
      return;
    }

    // Get the start values and suffixes for the current stick
    const config = STICK_CONFIG[lOrR];
    const startValues = this._inputStartValuesForSlider[lOrR];

    // Calculate the total adjustment based on slider value from 0
    // Value 0-100 maps to adjustment range (we'll use a reasonable range)
    const maxAdjustment = 175; // Adjust this value as needed
    const totalAdjustment = (value / 100) * maxAdjustment;

    config.suffixes.forEach(suffix => {
      const element = $(`#finetune${suffix}`);
      let newValue;

      if (suffix.endsWith('L') || suffix.endsWith('T')) {
        newValue = Math.min(65535, startValues[suffix] + totalAdjustment);
      } else if (suffix.endsWith('R') || suffix.endsWith('B')) {
        newValue = Math.max(0, startValues[suffix] - totalAdjustment);
      }

      element.val(Math.round(newValue));
    });

    // Update circularity data with incremental changes proportional to slider movement
    const adjustmentConstant = 0.00085; // Small constant for incremental adjustments
    const totalAdjustmentFromBase = totalAdjustment * adjustmentConstant; // Total adjustment from slider position 0

    const startingData = this._inputStartValuesForSlider[lOrR][config.circDataName];
    const circData = this[config.circDataName];

    // Apply total adjustment from base values to maintain relative differences
    startingData.forEach((value, i) => circData[i] = Math.max(0, value + totalAdjustmentFromBase));

    // Convert polar coordinates to cartesian, trim to square, and convert back
    this._trimCircularityDataToSquare(circData);

    // Update previous slider value
    this._previousSliderValues[lOrR] = value;

    // Refresh the stick displays to show updated circularity data
    this.refresh_finetune_sticks();
  }

  /**
   * Handle slider release - clear circularity data
   * @param {string} lOrR - 'left' or 'right'
   */
  _onCircularitySliderRelease(lOrR) {
    console.log(`Circularity slider released for ${lOrR} stick`);

    // Mark that this slider has been used
    this._sliderUsed[lOrR] = true;

    // Clear the circularity data - zero out the array while maintaining its size
    const config = STICK_CONFIG[lOrR];
    const circData = this[config.circDataName];
    circData.fill(0);

    // Call the clearCircularity function to update the display
    this.clearCircularity(lOrR);

    // Trigger the change event to update the finetune data once when slider is released
    this._onFinetuneChange();

    // Toggle the slider off and change button to undo
    const stickCard = $(`#${lOrR}-stick-card`);
    stickCard.removeClass('show-slider');
    this._showErrorSlackUndoButton(lOrR);

    // Refresh the stick displays to show cleared circularity data
    this.refresh_finetune_sticks();
  }

  /**
   * Convert circularity data (polar radii) to cartesian coordinates,
   * trim to a -1,-1 to 1,1 square, then convert back to polar radii
   * @param {Array} data - Array of radius values representing sectors around a circle
   */
  _trimCircularityDataToSquare(data) {
    const numSectors = data.length;
    data.forEach((radius, i) => {
      // Calculate angle for this sector
      const angle = (i * 2 * Math.PI) / numSectors;

      // Convert polar to cartesian coordinates
      const x = radius * Math.cos(angle);
      const y = radius * Math.sin(angle);

      // Trim to -1,-1 to 1,1 square
      const trimmedX = Math.max(-1, Math.min(1, x));
      const trimmedY = Math.max(-1, Math.min(1, y));

      // Convert back to polar coordinates
      const trimmedRadius = Math.sqrt(trimmedX * trimmedX + trimmedY * trimmedY);
      data[i] = trimmedRadius;
    });
  }

  /**
   * Reset circularity slider to zero and restore input values to their base state
   * @param {string} lOrR - 'left' or 'right'
   */
  _resetCircularitySlider(lOrR) {
    console.log(`Resetting circularity slider for ${lOrR} stick`);

    // If we have starting values stored, use them to reset properly
    // Reset the slider to zero first
    $(`#${lOrR}CircularitySlider`).val(0);

    // Trigger the slider change with value 0 to recalculate input values
    this._onCircularitySliderChange(lOrR, 0);

    // Reset the slider used state and update button back to slack
    this._sliderUsed[lOrR] = false;
    this._showErrorSlackButton(lOrR);

    // Clear the circularity data display
    this.clearCircularity(lOrR);

    // Trigger the change event to update the finetune data
    this._onFinetuneChange();

    // Refresh the stick displays
    this.refresh_finetune_sticks();
  }

  /**
   * Check if data array contains only non-zero values
   * @param {Array} data - The data array to check
   * @returns {boolean} True if all values are non-zero, false otherwise
   */
  _hasOnlyNonZeroValues(data) {
    if (!data || !Array.isArray(data)) {
      return false;
    }
    return data.every(value => value !== 0);
  }

  /**
   * Update the state of error slack buttons based on data content
   */
  _updateErrorSlackButtonStates() {
    Object.entries(STICK_CONFIG).forEach(([lOrR, config]) => {
      if (this._sliderUsed[lOrR]) {
        // Show undo button, hide slack button
        this._showErrorSlackUndoButton(lOrR);
      } else {
        // Show slack button, hide undo button
        this._showErrorSlackButton(lOrR);

        const hasData = this._hasOnlyNonZeroValues(this[config.circDataName]);
        const slackBtn = $(`#${lOrR}ErrorSlackBtn`);
        slackBtn
          .prop('disabled', !hasData)
          .toggleClass('btn-secondary', hasData)
          .toggleClass('btn-outline-secondary', !hasData);
      }
    });
  }

  /**
   * Handle error slack button click
   * @param {string} lOrR - 'left' or 'right'
   */
  _onErrorSlackButtonClick(lOrR) {
    console.log(`Error slack button clicked for ${lOrR} stick`);

    // Only allow toggle in circularity mode
    if (this._mode !== 'circularity') {
      console.log('Error slack button only works in circularity mode');
      return;
    }

    // Toggle between showing LX/LY values and circularity slider
    const stickCard = $(`#${lOrR}-stick-card`);
    const isShowingSlider = stickCard.hasClass('show-slider');
    stickCard.toggleClass('show-slider', !isShowingSlider);
  }

  /**
   * Handle error slack undo button click
   * @param {string} lOrR - 'left' or 'right'
   */
  _onErrorSlackUndoButtonClick(lOrR) {
    console.log(`Error slack undo button clicked for ${lOrR} stick`);

    this._resetCircularitySlider(lOrR);
  }

  /**
   * Toggle button visibility between slack and undo buttons
   * @param {string} lOrR - 'left' or 'right'
   * @param {boolean} showUndo - true to show undo button, false to show slack button
   */
  _toggleErrorSlackButtons(lOrR, showUndo) {
    const undoBtn = $(`#${lOrR}ErrorSlackUndoBtn`);
    const slackBtn = $(`#${lOrR}ErrorSlackBtn`);

    undoBtn.toggleClass('d-none', !showUndo);
    slackBtn.toggleClass('d-none', showUndo);
  }

  /**
   * Show undo button and hide slack button
   * @param {string} lOrR - 'left' or 'right'
   */
  _showErrorSlackUndoButton(lOrR) {
    this._toggleErrorSlackButtons(lOrR, true);
  }

  /**
   * Show slack button and hide undo button
   * @param {string} lOrR - 'left' or 'right'
   */
  _showErrorSlackButton(lOrR) {
    this._toggleErrorSlackButtons(lOrR, false);
  }
}

// Global reference to the current finetune instance
let currentFinetuneInstance = null;

/**
 * Helper function to safely clear the current finetune instance
 */
function destroyCurrentInstance$2() {
  if (currentFinetuneInstance) {
    currentFinetuneInstance.stopContinuousDpadAdjustment();
    currentFinetuneInstance.removeEventListeners();
    currentFinetuneInstance = null;
  }
}

// Function to create and initialize finetune instance
async function ds5_finetune(controller, dependencies, doneCallback = null) {
  // Create new instance
  currentFinetuneInstance = new Finetune();
  await currentFinetuneInstance.init(controller, dependencies, doneCallback);
}

function finetune_handle_controller_input(changes) {
  if (currentFinetuneInstance) {
    currentFinetuneInstance.refresh_finetune_sticks();
    currentFinetuneInstance.handleModeSwitching(changes);
    currentFinetuneInstance.handleStickSwitching(changes);
    currentFinetuneInstance.handleDpadAdjustment(changes);
  }
}

function finetune_save() {
  console.log("Saving finetune changes");
  if (currentFinetuneInstance) {
    currentFinetuneInstance.save();
  }
}

async function finetune_cancel() {
  console.log("Cancelling finetune changes");
  if (currentFinetuneInstance) {
    await currentFinetuneInstance.cancel();
  }
}

function isFinetuneVisible() {
  return !!currentFinetuneInstance;
}

// Quick calibrate functions
async function finetune_quick_calibrate_center() {
  // Hide the finetune modal
  currentFinetuneInstance.setQuickCalibrating(true);

  const { controller } = currentFinetuneInstance;
  await auto_calibrate_stick_centers(controller, (success, message) => {
    currentFinetuneInstance.setQuickCalibrating(false);
  });
}

async function finetune_quick_calibrate_range() {
  // Hide the finetune modal
  currentFinetuneInstance.setQuickCalibrating(true);

  const { controller, ll_data, rr_data } = currentFinetuneInstance;
  await calibrate_range(controller, { ll_data, rr_data }, (success, message) => {
    currentFinetuneInstance.setQuickCalibrating(false);
  });
}

window.finetune_cancel = finetune_cancel;
window.finetune_save = finetune_save;
window.finetune_quick_calibrate_center = finetune_quick_calibrate_center;
window.finetune_quick_calibrate_range = finetune_quick_calibrate_range;

const TEST_SEQUENCE = ['usb', 'buttons', 'adaptive', 'haptic', 'lights', 'speaker', 'headphone', 'microphone'];
const TEST_NAMES = {
  'usb': 'USB Connector',
  'buttons': 'Buttons',
  'haptic': 'Haptic Vibration',
  'adaptive': 'Adaptive Trigger',
  'lights': 'Lights',
  'speaker': 'Speaker',
  'headphone': 'Headphone Jack',
  'microphone': 'Microphone',
};

const BUTTONS = ['triangle', 'cross', 'circle', 'square', 'l1', 'r1', 'l2', 'r2', 'l3', 'r3', 'up', 'down', 'left', 'right', 'create', 'touchpad', 'options', 'ps', 'mute'];
const BUTTON_INFILL_MAPPING = {
  'triangle': 'qt-Triangle_infill',
  'cross': 'qt-Cross_infill',
  'circle': 'qt-Circle_infill',
  'square': 'qt-Square_infill',
  'l1': 'qt-L1_infill',
  'r1': 'qt-R1_infill',
  'l2': 'qt-L2_infill',
  'r2': 'qt-R2_infill',
  'l3': 'qt-L3_infill',
  'r3': 'qt-R3_infill',
  'up': 'qt-Up_infill',
  'down': 'qt-Down_infill',
  'left': 'qt-Left_infill',
  'right': 'qt-Right_infill',
  'create': 'qt-Create_infill',
  'touchpad': 'qt-Trackpad_infill',
  'options': 'qt-Options_infill',
  'ps': 'qt-PS_infill',
  'mute': 'qt-Mute_infill'
};

function addIcons(string) {
  return string
    .replace('[triangle]', '<svg width="20" height="20" style="vertical-align: -4px;"><use xlink:href="#ps-triangle"/></svg>')
    .replace('[square]', '<svg width="20" height="20" style="vertical-align: -4px;"><use xlink:href="#ps-square"/></svg>')
    .replace('[circle]', '<svg width="20" height="20" style="vertical-align: -4px;"><use xlink:href="#ps-circle"/></svg>')
    .replace('[cross]', '<svg width="20" height="20" style="vertical-align: -4px;"><use xlink:href="#ps-cross"/></svg>')
}

/**
 * Quick Test Modal Class
 * Handles controller feature testing including haptic feedback, adaptive triggers, speaker, and microphone functionality
 */
class QuickTestModal {
  constructor(controllerInstance) {
    this.controller = controllerInstance;

    this.resetAllTests();

    this._loadSkippedTestsFromStorage();

    // Bind event handlers to maintain proper context
    this._boundAccordionShown = (event) => this._handleAccordionShown(event);
    this._boundAccordionHidden = (event) => this._handleAccordionHidden(event);
    this._boundModalHidden = () => {
    // Clean up any active tests BEFORE resetting state
      this._stopButtonsTest();
      this._stopAdaptiveTest();
      this._stopLightsTest();
      this._stopMicrophoneTest();

      destroyCurrentInstance$1();
    };

    this._initEventListeners();
  }

  _initializeState() {
    this.state = {
      usb: null,
      buttons: null,
      haptic: null,
      adaptive: null,
      lights: null,
      speaker: null,
      microphone: null,
      headphone: null,
      microphoneStream: null,
      microphoneContext: null,
      microphoneMonitoring: false,
      buttonPressCount: {},
      longPressTimers: {},
      longPressThreshold: 400,
      isTransitioning: false,
      skippedTests: [],
      lightsAnimationInterval: null,
      batteryAlertShown: false,
    };
  }

  /**
   * Save skipped tests to storage
   */
  _saveSkippedTestsToStorage() {
    try {
      Storage.quickTestSkippedTests.set(this.state.skippedTests);
    } catch (error) {
      console.warn('Failed to save skipped tests to storage:', error);
    }
  }

  /**
   * Load skipped tests from storage
   */
  _loadSkippedTestsFromStorage() {
    try {
      const skippedTests = Storage.quickTestSkippedTests.get();
      if (Array.isArray(skippedTests) && skippedTests.length > 0) {
        this.state.skippedTests = skippedTests.filter(test => TEST_SEQUENCE.includes(test));
        this._applySkippedTestsToUI();
      }
    } catch (error) {
      console.warn('Failed to load skipped tests from storage:', error);
      this.state.skippedTests = [];
    }
  }

  /**
   * Apply skipped tests to the UI (rebuild accordion with non-skipped tests)
   */
  async _applySkippedTestsToUI() {
    this._buildDynamicAccordion();
    await this._initSvgController();
    this._updateSkippedTestsDropdown();
  }

  /**
   * Build dynamic accordion with only non-skipped tests
   */
  _buildDynamicAccordion() {
    const $accordion = $('#quickTestAccordion');
    $accordion.empty();

    // Get supported tests from the controller
    const supportedTests = this.controller.getSupportedQuickTests();

    // Get non-skipped tests in order, filtered by what the controller supports
    let activeTests = TEST_SEQUENCE.filter(testType =>
      !this.state.skippedTests.includes(testType) && supportedTests.includes(testType)
    );

    activeTests.forEach(testType => {
      const accordionItem = this._createAccordionItem(testType);
      $accordion.append(accordionItem);
    });

    // Re-initialize event listeners for the new accordion items
    this._initEventListeners();
  }

  /**
   * Create an accordion item for a specific test type
   */
  _createAccordionItem(testType) {
    const testName = l(TEST_NAMES[testType]);
    const testIcons = {
      'usb': 'fas fa-plug',
      'buttons': 'fas fa-gamepad',
      'haptic': 'fas fa-mobile-alt',
      'adaptive': 'fas fa-hand-pointer',
      'lights': 'fas fa-lightbulb',
      'speaker': 'fas fa-volume-up',
      'microphone': 'fas fa-microphone',
      'headphone': 'fas fa-headphones'
    };

    const testContent = this._getTestContent(testType);

    const notTested = l('Not tested');
    const hide = l('hide');
    return $(`
      <div class="accordion-item" id="${testType}-test-item">
        <h2 class="accordion-header">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#${testType}-test-collapse" aria-expanded="false" aria-controls="${testType}-test-collapse">
            <div class="d-flex align-items-center w-100">
              <i class="${testIcons[testType]} me-3 test-icon-${testType}"></i>
              <span class="flex-grow-1">${testName}</span>
              <a href="#" class="btn btn-link text-decoration-none skip-btn" id="${testType}-skip-btn" onclick="skipTest('${testType}'); return false;">
                <span>${hide}</span>
              </a>
              <span class="badge bg-secondary me-2" id="${testType}-test-status">${notTested}</span>
            </div>
          </button>
        </h2>
        <div id="${testType}-test-collapse" class="accordion-collapse collapse" data-bs-parent="#quickTestAccordion">
          <div class="accordion-body">
            ${testContent}
          </div>
        </div>
      </div>
    `);
  }

  /**
   * Get the content for a specific test type
   */
  _getTestContent(testType) {
    const instructions = l('Instructions');
    const pass = l('Pass');
    const fail = l('Fail');
    switch (testType) {
      case 'usb':
        const usbTestDesc = l('This test checks the reliability of the USB port.');
        const wiggleTheCable = l('Wiggle the USB cable to see if the controller disconnects.');
        const beGentle = l('Be gentle to avoid damage.');
        return `
          <p>${usbTestDesc}</p>
          <p><strong>${instructions}:</strong> ${wiggleTheCable}</p>
          <div class="alert alert-warning mb-3">
            <i class="fas fa-exclamation-triangle me-2"></i>
            <span>${beGentle}</span>
          </div>
          <div class="d-flex gap-2 mt-3">
            <button type="button" class="btn btn-success" id="usb-pass-btn" onclick="markTestResult('usb', true)">
              <i class="fas fa-check me-1"></i><span>${pass}</span>
            </button>
            <button type="button" class="btn btn-danger" id="usb-fail-btn" onclick="markTestResult('usb', false)">
              <i class="fas fa-times me-1"></i><span>${fail}</span>
            </button>
          </div>
        `;
      case 'buttons':
        const buttonsTestDesc = l('This test checks all controller buttons by requiring you to press each button up to three times.');
        const buttonsInstructions = l('Press each button until they turn green.');
        const buttonsLongPress = l('Long-press [circle] to skip ahead.');
        const restart = l('Restart');
        return addIcons(`
          <p>${buttonsTestDesc}</p>
          <p><strong>${instructions}:</strong> ${buttonsInstructions}</p>
          <div class="d-flex justify-content-center mb-3">
            <div style="width: 80%; max-width: 400px;" id="quick-test-controller-svg-placeholder">
              <!-- SVG will be loaded dynamically -->
            </div>
          </div>
          <div class="alert alert-info mb-3">
            <i class="fas fa-info-circle me-2"></i>
            <span>${buttonsLongPress}</span>
          </div>
          <div class="d-flex gap-2 mt-3">
            <button type="button" class="btn btn-success" id="buttons-pass-btn" onclick="markTestResult('buttons', true)">
              <i class="fas fa-check me-1"></i><span>${pass}</span>
            </button>
            <button type="button" class="btn btn-danger" id="buttons-fail-btn" onclick="markTestResult('buttons', false)">
              <i class="fas fa-times me-1"></i><span>${fail}</span>
            </button>
            <button type="button" class="btn btn-outline-primary" id="buttons-reset-btn" onclick="resetButtonsTest()">
              <i class="fas fa-redo me-1"></i><span>${restart}</span>
            </button>
          </div>
        `);
      case 'haptic':
        const hapticTestDesc = l('This test will activate the controller\'s vibration motors, first the heavy one, and then the light one.');
        const hapticInstructions = l('Feel for vibration in the controller.');
        const hapticRepeat = l('Repeat');
        return `
          <p>${hapticTestDesc}</p>
          <p><strong>${instructions}:</strong> ${hapticInstructions}</p>
          <div class="d-flex gap-2 mt-3">
            <button type="button" class="btn btn-success" id="haptic-pass-btn" onclick="markTestResult('haptic', true)">
              <i class="fas fa-check me-1"></i><span>${pass}</span>
            </button>
            <button type="button" class="btn btn-danger" id="haptic-fail-btn" onclick="markTestResult('haptic', false)">
              <i class="fas fa-times me-1"></i><span>${fail}</span>
            </button>
            <button type="button" class="btn btn-outline-primary" id="haptic-replay-btn" onclick="replayHapticTest()">
              <i class="fas fa-redo me-1"></i><span>${hapticRepeat}</span>
            </button>
          </div>
        `;
      case 'adaptive':
        const adaptiveTestDesc = l('This test will enable heavy resistance on both L2 and R2 triggers.');
        const adaptiveInstructions = l('Press L2 and R2 triggers to feel the trigger resistance.');
        return `
          <p>${adaptiveTestDesc}</p>
          <p><strong>${instructions}:</strong> ${adaptiveInstructions}</p>
          <div class="d-flex gap-2 mt-3">
            <button type="button" class="btn btn-success" id="adaptive-pass-btn" onclick="markTestResult('adaptive', true)">
              <i class="fas fa-check me-1"></i><span>${pass}</span>
            </button>
            <button type="button" class="btn btn-danger" id="adaptive-fail-btn" onclick="markTestResult('adaptive', false)">
              <i class="fas fa-times me-1"></i><span>${fail}</span>
            </button>
          </div>
        `;
      case 'lights':
        const lightsTestDesc = l('This test will cycle through red, green, and blue colors on the controller lightbar, animate the player indicator lights, and flash the mute button.');
        const lightsInstructions = l('Watch the controller lights change colors, the player lights animate, and the mute button flash.');
        return `
          <p>${lightsTestDesc}</p>
          <p><strong>${instructions}:</strong> ${lightsInstructions}</p>
          <div class="d-flex gap-2 mt-3">
            <button type="button" class="btn btn-success" id="lights-pass-btn" onclick="markTestResult('lights', true)">
              <i class="fas fa-check me-1"></i><span>${pass}</span>
            </button>
            <button type="button" class="btn btn-danger" id="lights-fail-btn" onclick="markTestResult('lights', false)">
              <i class="fas fa-times me-1"></i><span>${fail}</span>
            </button>
          </div>
        `;
      case 'speaker':
        const speakerTestDesc = l('This test will play a tone through the controller\'s built-in speaker.');
        const speakerInstructions = l('Listen for a tone from the controller speaker.');
        const repeat = l('Repeat');
        return `
          <p>${speakerTestDesc}</p>
          <p><strong>${instructions}:</strong> ${speakerInstructions}</p>
          <div class="d-flex gap-2 mt-3">
            <button type="button" class="btn btn-success" id="speaker-pass-btn" onclick="markTestResult('speaker', true)">
              <i class="fas fa-check me-1"></i><span>${pass}</span>
            </button>
            <button type="button" class="btn btn-danger" id="speaker-fail-btn" onclick="markTestResult('speaker', false)">
              <i class="fas fa-times me-1"></i><span>${fail}</span>
            </button>
            <button type="button" class="btn btn-outline-primary" id="speaker-replay-btn" onclick="replaySpeakerTest()">
              <i class="fas fa-redo me-1"></i><span>${repeat}</span>
            </button>
          </div>
        `;
      case 'microphone':
        const microphoneTestDesc = l('This test will monitor the controller\'s microphone input levels.');
        const microphoneInstructions = l('Blow gently into the controller\'s microphone. You should see the audio level indicator respond.');
        const microphoneLevel = l('Microphone Level:');
        return `
          <p>${microphoneTestDesc}</p>
          <p><strong>${instructions}:</strong> ${microphoneInstructions}</p>
          <div class="mb-3" id="mic-level-container" style="display: none;">
            <label class="form-label">${microphoneLevel}</label>
            <div class="progress">
              <div class="progress-bar bg-info" role="progressbar" id="mic-level-bar" style="width: 0%" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
          </div>
          <div class="d-flex gap-2 mt-3">
            <button type="button" class="btn btn-success" id="microphone-pass-btn" onclick="markTestResult('microphone', true)">
              <i class="fas fa-check me-1"></i><span>${pass}</span>
            </button>
            <button type="button" class="btn btn-danger" id="microphone-fail-btn" onclick="markTestResult('microphone', false)">
              <i class="fas fa-times me-1"></i><span>${fail}</span>
            </button>
          </div>
        `;
      case 'headphone':
        const headphoneTestDesc = l('This test checks the headphone jack functionality.');
        const headphoneStep1 = l('Plug in headphones to the 3.5mm jack');
        const headphoneStep2 = l('Click "Test Speaker" to listen for the tone through the headphones');
        const testSpeaker = l('Test Speaker');
        return `
          <p>${headphoneTestDesc}</p>
          <p><strong>${instructions}:</strong></p>
          <ol>
            <li>${headphoneStep1}</li>
            <li>${headphoneStep2}</li>
          </ol>
          <div class="d-flex gap-2 mt-3">
            <button type="button" class="btn btn-primary" id="headphone-test-btn" onclick="testHeadphoneAudio()">
              <i class="fas fa-volume-up me-1"></i><span>${testSpeaker}</span>
            </button>
            <button type="button" class="btn btn-success" id="headphone-pass-btn" onclick="markTestResult('headphone', true)">
              <i class="fas fa-check me-1"></i><span>${pass}</span>
            </button>
            <button type="button" class="btn btn-danger" id="headphone-fail-btn" onclick="markTestResult('headphone', false)">
              <i class="fas fa-times me-1"></i><span>${fail}</span>
            </button>
          </div>
        `;
      default:
        return '';
    }
  }

  /**
   * Clear saved skipped tests from storage
   */
  _clearSkippedTestsFromStorage() {
    try {
      Storage.quickTestSkippedTests.clear();
    } catch (error) {
      console.warn('Failed to clear skipped tests from storage:', error);
    }
  }

  /**
   * Start icon animation for a specific test type
   */
  _startIconAnimation(testType) {
    const $accordionItem = $(`#${testType}-test-item`);
    const $icon = $accordionItem.find('.accordion-button i');
    $icon.addClass(`test-icon-${testType}`);
  }

  /**
   * Stop icon animation for a specific test type
   */
  _stopIconAnimation(testType) {
    const $accordionItem = $(`#${testType}-test-item`);
    const $icon = $accordionItem.find('.accordion-button i');
    $icon.removeClass(`test-icon-${testType}`);
  }

  /**
   * Update the instruction text based on current test state
   */
  _updateInstructions() {
    const $instructionsText = $('#quick-test-instructions-text');
    const activeTest = this._getCurrentActiveTest();
    const allTestsCompleted = this._areAllTestsCompleted();

    let instruction;
    if (activeTest === 'buttons') {
      instruction = l('Test all buttons, or long-press [square] to Pass and [cross] to Fail, or [circle] to skip.');
    } else if (activeTest) {
      instruction = l('Press [square] to Pass, [cross] to Fail, or [circle] to skip.');
    } else if (allTestsCompleted) {
      instruction = l('Press [circle] to close, or [square] to start over');
    } else {
      instruction = l('Press [square] to begin or [circle] to close');
    }

    // Append back instruction if test is active and not the first one
    if (activeTest && !this._isFirstTest(activeTest)) {
      instruction += ' ' + l('Press [triangle] to go back.');
    }

    $instructionsText.html(addIcons(instruction));
  }

  /**
   * Check if all tests have been completed
   */
  _areAllTestsCompleted() {
    return TEST_SEQUENCE.every(test => this.state[test] !== null || this.state.skippedTests.includes(test));
  }

  /**
   * Initialize event listeners for the quick test modal
   */
  // Set up event listeners for accordion collapse events to auto-start tests
  _initEventListeners() {
    // Remove existing listeners first
    this._removeAccordionEventListeners();

    // Add listeners for currently active tests
    const activeTests = TEST_SEQUENCE.filter(testType => !this.state.skippedTests.includes(testType));
    activeTests.forEach(testType => {
      const elementId = `${testType}-test-collapse`;
      const $element = $(`#${elementId}`);
      if ($element.length) {
        $element.on('shown.bs.collapse', this._boundAccordionShown);
        $element.on('hidden.bs.collapse', this._boundAccordionHidden);
      }
    });

    // Always try to add modal listeners (remove first to avoid duplicates)
    this._removeModalEventListeners();
    const $modal = $('#quickTestModal');
    $modal.on('hidden.bs.modal', this._boundModalHidden);
    $modal.on('shown.bs.modal', () => {
      this._updateInstructions();
      // Automatically start the test sequence when modal opens
      this._startTestSequence();
    });
  }

  /**
   * Remove accordion event listeners only
   */
  _removeAccordionEventListeners() {
    // Remove listeners from all possible test elements
    TEST_SEQUENCE.forEach(testType => {
      const elementId = `${testType}-test-collapse`;
      const $element = $(`#${elementId}`);
      if ($element.length) {
        $element.off('shown.bs.collapse');
        $element.off('hidden.bs.collapse');
      }
    });
  }

  /**
   * Remove modal event listeners only
   */
  _removeModalEventListeners() {
    const $modal = $('#quickTestModal');
    $modal.off('hidden.bs.modal', this._boundModalHidden);
    $modal.off('shown.bs.modal');
  }

  /**
   * Remove event listeners
   */
  removeEventListeners() {
    this._removeAccordionEventListeners();
    this._removeModalEventListeners();
  }

  /**
   * Open the Quick Test modal
   */
  async open() {
    la("quick_test_modal_open");

    // Build the dynamic accordion first
    this._buildDynamicAccordion();
    await this._initSvgController();
    bootstrap.Modal.getOrCreateInstance('#quickTestModal').show();
  }

  /**
   * Initialize SVG controller for the quick test modal
   */
  async _initSvgController() {
    // Only initialize SVG if buttons test is not skipped
    if (this.state.skippedTests.includes('buttons')) {
      return;
    }

    const svgContainer = document.getElementById('quick-test-controller-svg-placeholder');
    if (!svgContainer) {
      console.warn('Quick test SVG container not found - buttons test may be skipped');
      return;
    }

    // Determine which SVG to load based on controller model
    const model = this.controller.getModel();
    let svgFileName;
    if (model === 'DS4') {
      svgFileName = 'dualshock-controller.svg';
    } else if (model === 'DS5' || model === 'DS5_Edge') {
      svgFileName = 'dualsense-controller.svg';
    } else {
      throw new Error(`Unknown controller model: ${model}`);
    }

    let svgContent;

    // Check if we have bundled assets (production mode)
    if (window.BUNDLED_ASSETS && window.BUNDLED_ASSETS.svg && window.BUNDLED_ASSETS.svg[svgFileName]) {
      svgContent = window.BUNDLED_ASSETS.svg[svgFileName];
    } else {
      // Fallback to fetching from server (development mode)
      const response = await fetch(`assets/${svgFileName}`);
      if (!response.ok) {
        throw new Error(`Failed to load controller SVG: ${svgFileName}`);
      }
      svgContent = await response.text();
    }

    // Modify SVG content to use unique IDs for the quick test modal
    svgContent = svgContent.replace(/id="([^"]+)"/g, 'id="qt-$1"');

    svgContainer.innerHTML = svgContent;

    // Apply initial styling to the SVG
    const svg = svgContainer.querySelector('svg');
    if (svg) {
      svg.id = 'qt-controller-svg';
      svg.style.width = '100%';
      svg.style.height = 'auto';
    }

    // Store reference to the SVG container for scoped queries
    this.svgContainer = svgContainer;

    const lightBlue = '#7ecbff';
    const midBlue = '#3399cc';
    const dualshock = this._getQuickTestElement('qt-Controller');
    this._setSvgGroupColor(dualshock, lightBlue);

    ['qt-Button_outlines','qt-Button_outlines_behind', 'qt-L3_outline', 'qt-R3_outline', 'qt-Trackpad_outline'].forEach(id => {
      const group = this._getQuickTestElement(id);
      this._setSvgGroupColor(group, midBlue);
    });

    ['qt-Controller_infills', 'qt-Button_infills', 'qt-L3_infill', 'qt-R3_infill', 'qt-Trackpad_infill'].forEach(id => {
      const group = document.getElementById(id);
      this._setSvgGroupColor(group, 'white');
    });

    this._resetButtonColors();
  }

  /**
   * Get element from the quick test modal's SVG (scoped to avoid conflicts with main page)
   */
  _getQuickTestElement(id) {
    if (!this.svgContainer) {
      return null;
    }
    return this.svgContainer.querySelector(`#${id}`);
  }

  /**
   * Get the list of buttons to test based on controller model
   * DS4 controllers don't have a mute button
   */
  _getAvailableButtons() {
    const model = this.controller.getModel();
    if (!model) {
      return BUTTONS;
    }
    if (model === 'DS4') {
      return BUTTONS.filter(button => button !== 'mute');
    }
    return BUTTONS;
  }

  /**
   * Set color for SVG group elements
   */
  _setSvgGroupColor(group, color) {
    if (group) {
      const elements = group.querySelectorAll('path,rect,circle,ellipse,line,polyline,polygon');
      elements.forEach(el => {
        // Set up a smooth transition for fill and stroke if not already set
        if (!el.style.transition) {
          el.style.transition = 'fill 0.10s, stroke 0.10s';
        }
        el.setAttribute('fill', color);
        el.setAttribute('stroke', color);
      });
    }
  }

  /**
   * Handle accordion section being shown (expanded)
   */
  _handleAccordionShown(event) {
    const collapseId = event.target.id;
    const testType = collapseId.replace('-test-collapse', '');

    // Update instructions when a test becomes active
    this._updateInstructions();

    // Always auto-start test when section is expanded
    // Small delay to ensure UI is fully expanded
    setTimeout(() => {
      switch (testType) {
        case 'usb':
          // USB test is manual - no auto-start needed
          break;
        case 'buttons':
          this._startButtonsTest();
          break;
        case 'haptic':
          this._startHapticTest();
          break;
        case 'adaptive':
          this._startAdaptiveTest();
          break;
        case 'lights':
          this._startLightsTest();
          break;
        case 'speaker':
          this._startSpeakerTest();
          break;
        case 'microphone':
          this._startMicrophoneTest();
          break;
      }
    }, 100);
  }

  /**
   * Handle accordion section being hidden (collapsed)
   */
  _handleAccordionHidden(event) {
    const collapseId = event.target.id;
    const testType = collapseId.replace('-test-collapse', '');

    // Stop ongoing tests when section is collapsed
    switch (testType) {
      case 'usb':
        // USB test is manual - no stop needed
        break;
      case 'buttons':
        this._stopButtonsTest();
        break;
      case 'adaptive':
        this._stopAdaptiveTest();
        break;
      case 'lights':
        this._stopLightsTest();
        break;
      case 'microphone':
        this._stopMicrophoneTest();
        break;
    }

    // Update instructions when a test is collapsed
    setTimeout(() => {
      this._updateInstructions();
    }, 300);
  }

  /**
   * Start buttons test
   */
  _startButtonsTest() {
    this._startIconAnimation('buttons');

    // Initialize button press counts only if not already initialized
    if (!this.state.buttonPressCount || Object.keys(this.state.buttonPressCount).length === 0) {
      this.state.buttonPressCount = {};
      this._getAvailableButtons().forEach(button => {
        this.state.buttonPressCount[button] = 0;
      });
    }

    // Check for any buttons that are already stuck pressed when the test starts
    // and draw them as pressed
    this._getAvailableButtons().forEach(button => {
      if (this.controller.button_states[button] === true) {
        this._setButtonPressed(button, true);
      }
    });
  }

  /**
   * Stop buttons test
   */
  _stopButtonsTest() {
    this._stopIconAnimation('buttons');

    // Clear any active long-press timers
    this._clearAllLongPressTimers();
  }

  /**
   * Reset all button colors to light blue
   */
  _resetButtonColors() {
    Object.keys(BUTTON_INFILL_MAPPING).forEach(button => {
      const buttonElement = this._getQuickTestElement(BUTTON_INFILL_MAPPING[button]);
      this._setSvgGroupColor(buttonElement, 'orange');
    });
  }

  /**
   * Update button color based on press count
   */
  _updateButtonColor(button) {
    const count = this.state.buttonPressCount[button] || 0;
    const buttonElement = this._getQuickTestElement(BUTTON_INFILL_MAPPING[button]);

    if (buttonElement) {
      const checkOnce = ['create', 'touchpad', 'options', 'l3', 'ps', 'mute', 'r3'].includes(button);
      const colors = checkOnce ? ['orange'] : ['orange', '#a5c9fcff', '#287ffaff'];
      const color = colors[count] || '#16c016ff';
      this._setSvgGroupColor(buttonElement, color);
    }
  }

  /**
   * Check if all buttons have been pressed the required number of times
   */
  _checkButtonsTestComplete() {
    const allPressed = this._getAvailableButtons().every(button => {
      const count = this.state.buttonPressCount[button] || 0;
      // Special buttons (create, options, mute, ps) only need 1 press
      const checkOnce = ['create', 'touchpad', 'options', 'l3', 'ps', 'mute', 'r3'].includes(button);
      return checkOnce ? count >= 1 : count >= 3;
    });
    if (allPressed) {
      // Auto-pass the test
      setTimeout(() => {
        this.markTestResult('buttons', true);
      }, 500);
    }
  }

  /**
   * Reset the buttons test to initial state
   */
  resetButtonsTest() {
    // Reset button press counts
    this.state.buttonPressCount = {};
    this._getAvailableButtons().forEach(button => {
      this.state.buttonPressCount[button] = 0;
    });

    // Clear any active long-press timers
    this._clearAllLongPressTimers();

    // Reset all button colors to orange (initial state)
    this._resetButtonColors();

    // Check for any buttons that are already stuck pressed and draw them as pressed
    this._getAvailableButtons().forEach(button => {
      if (this.controller.button_states[button] === true) {
        this._setButtonPressed(button, true);
      }
    });
  }

  /**
   * Start haptic vibration test
   */
  async _startHapticTest() {
    this._startIconAnimation('haptic');
    await this.controller.setVibration({ heavyLeft: 255, lightRight: 0, duration: 500 }, async () => {
      await setTimeout(async () => {
        await this.controller.setVibration({ heavyLeft: 0, lightRight: 255, duration: 500 });
      }, 500);
    });
    setTimeout(() => { this._stopIconAnimation('haptic'); }, 1500); }

  /**
   * Start adaptive trigger test
   */
  async _startAdaptiveTest() {
    this._startIconAnimation('adaptive');
    await this.controller.setAdaptiveTriggerPreset({ left: 'heavy', right: 'heavy' });
  }

  /**
   * Stop adaptive trigger test
   */
  async _stopAdaptiveTest() {
    this._stopIconAnimation('adaptive');
    console.log("Stopping Adaptive Trigger Test", this.controller);
    await this.controller.setAdaptiveTriggerPreset({ left: 'off', right: 'off' });
  }

  /**
   * Start lights test - cycles through colors and animates player lights
   */
  async _startLightsTest() {
    this._startIconAnimation('lights');
    const { currentController } = this.controller;

    if (!currentController?.setLightbarColor || !currentController?.setPlayerIndicator) {
      console.warn('Controller does not support light control');
      alert('This controller does not support light control. Only DualSense (DS5) controllers support this feature.');
      this._stopIconAnimation('lights');
      return;
    }

    const colors = [
      { r: 255, g: 0, b: 0 },   // Red
      { r: 0, g: 255, b: 0 },   // Green
      { r: 0, g: 0, b: 255 },   // Blue
    ];

    const playerPatterns = [
      0b10001,  // Light 1 & 5
      0b01010,  // Light 2 & 4
      0b00100,  // Light 3
      0b01010,  // Light 4 & 2
      0b10001,  // Light 5 & 1
      0b11111,  // All lights
      0b00000,  // No lights
      0b11111,  // All lights
      0b00000,  // No lights
    ];

    let colorIndex = 0;
    let patternIndex = 0;

    // Set mute LED - cycle through off, solid, pulsing
    if (currentController.setMuteLed) {
      await currentController.setMuteLed(2); // pulsing
    }

    // Start the animation
    this.state.lightsAnimationInterval = setInterval(async () => {
      try {
        const color = colors[colorIndex];
        const pattern = playerPatterns[patternIndex];

        // Set lightbar color and player indicator
        await currentController.setLightbarColor(color.r, color.g, color.b);
        await currentController.setPlayerIndicator(pattern);

        // Cycle through colors every 3 pattern changes
        patternIndex = (patternIndex + 1) % playerPatterns.length;
        if (patternIndex === 0) {
          colorIndex = (colorIndex + 1) % colors.length;
        }
      } catch (error) {
        console.error('Error during lights test:', error);
      }
    }, 200);
  }

  /**
   * Stop lights test and reset lights
   */
  async _stopLightsTest() {
    if(!this.state) return;

    this._stopIconAnimation('lights');

    // Clear the animation interval
    if (this.state.lightsAnimationInterval) {
      clearInterval(this.state.lightsAnimationInterval);
      this.state.lightsAnimationInterval = null;
    }

    await this.controller.currentController?.resetLights();
  }

  /**
   * Start speaker tone test
   */
  async _startSpeakerTest() {
    this._startIconAnimation('speaker');
    await this.controller.setSpeakerTone(300);
    setTimeout(() => { this._stopIconAnimation('speaker'); }, 1000);
  }

  /**
   * Start microphone test
   */
  async _startMicrophoneTest() {
    const $levelContainer = $('#mic-level-container');
    const $levelBar = $('#mic-level-bar');

    if (this.state.microphoneMonitoring) {
      // Stop monitoring
      this._stopMicrophoneTest();
      return;
    }

    try {
      // Request microphone access
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: false,
          noiseSuppression: false,
          autoGainControl: false
        }
      });

      // Create audio context and analyzer
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const source = audioContext.createMediaStreamSource(stream);
      const analyzer = audioContext.createAnalyser();

      analyzer.fftSize = 256;
      const bufferLength = analyzer.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      source.connect(analyzer);

      this.state.microphoneStream = stream;
      this.state.microphoneContext = audioContext;
      this.state.microphoneMonitoring = true;

      this._startIconAnimation('microphone');

      $levelContainer.show();

      // Monitor audio levels
      let isVibrating = false;
      const vibrationThreshold = 30; // Audio level threshold to trigger vibration
      let count = 0;

      const updateLevel = () => {
        if (!this.state.microphoneMonitoring) return;

        analyzer.getByteFrequencyData(dataArray);

        // Calculate average level
        const sum = dataArray.reduce((acc, value) => acc + value, 0);
        const average = sum / bufferLength;
        const percentage = Math.min(100, (average / 255) * 100);

        $levelBar.css('width', percentage + '%');
        $levelBar.attr('aria-valuenow', percentage);

        // Trigger vibration when audio level exceeds threshold
        if (percentage > vibrationThreshold && !isVibrating) {
          this.controller.setVibration({ heavyLeft: 50, duration: 50 }, () => { isVibrating = false; });
          isVibrating = true;
          count++;
        }

        if(count > 5){
          const activeTest = this._getCurrentActiveTest();
          this.markTestResult(activeTest, true);
        }

        requestAnimationFrame(updateLevel);
      };

      updateLevel();

    } catch (error) {
      console.error('Microphone test failed:', error);
    }
  }

  /**
   * Stop microphone test
   */
  _stopMicrophoneTest() {
    if(!this.state) return;

    const $levelContainer = $('#mic-level-container');

    this.state.microphoneMonitoring = false;

    this._stopIconAnimation('microphone');

    if (this.state.microphoneStream) {
      this.state.microphoneStream.getTracks().forEach(track => track.stop());
      this.state.microphoneStream = null;
    }

    if (this.state.microphoneContext) {
      this.state.microphoneContext.close();
      this.state.microphoneContext = null;
    }

    $levelContainer.hide();
  }

  /**
   * Test headphone audio output by playing through controller headphones
   * This specifically routes audio to headphones instead of the built-in speaker
   */
  async testHeadphoneAudio() {
    this._startIconAnimation('headphone');

    try {
      // Play a test tone through the controller's headphone output
      // The third parameter specifies "headphones" as the output destination
      await this.controller.setSpeakerTone(500, ({success}) => {}, "headphones");

      // Stop the animation after the tone completes
      setTimeout(() => {
        this._stopIconAnimation('headphone');
      }, 700); // Slightly longer than tone duration

    } catch (error) {
      console.error('Error testing headphone audio:', error);
      this._stopIconAnimation('headphone');
    }
  }

  /**
   * Mark test result and update UI
   */
  markTestResult(testType, passed) {
    this.state[testType] = passed;

    this._stopIconAnimation(testType);

    const $statusBadge = $(`#${testType}-test-status`);
    const $accordionItem = $(`#${testType}-test-item`);
    const $accordionButton = $accordionItem.find('.accordion-button');

    $accordionItem.removeClass('border-success border-danger');

    if (passed) {
      $statusBadge.attr('class', 'badge bg-success me-2');
      $statusBadge.text(l('Passed'));
      $accordionItem.addClass('border-success');
      $accordionButton.css('backgroundColor', 'rgba(25, 135, 84, 0.1)'); // Light green background
    } else {
      $statusBadge.attr('class', 'badge bg-danger me-2');
      $statusBadge.text(l('Failed'));
      $accordionItem.addClass('border-danger');
      $accordionButton.css('backgroundColor', 'rgba(220, 53, 69, 0.1)'); // Light red background
    }

    // Clean up any active tests
    if (testType === 'adaptive') {
      this._stopAdaptiveTest();
    } else if (testType === 'microphone') {
      this._stopMicrophoneTest();
    }

    this._updateTestSummary();

    // Auto-expand next test
    this._expandNextTest(testType);
  }

  /**
   * Skip a test and remove it from the accordion
   */
  async skipTest(testType) {
    // Add to skipped tests if not already there
    if (!this.state.skippedTests.includes(testType)) {
      this.state.skippedTests.push(testType);
    }

    // Save to storage
    this._saveSkippedTestsToStorage();

    // Stop any ongoing test activities
    this._stopIconAnimation(testType);
    if (testType === 'adaptive') {
      this._stopAdaptiveTest();
    } else if (testType === 'microphone') {
      this._stopMicrophoneTest();
    } else if (testType === 'buttons') {
      this._stopButtonsTest();
    }

    // Rebuild the accordion without the skipped test
    this._buildDynamicAccordion();
    await this._initSvgController();

    this._updateSkippedTestsDropdown();
    this._updateTestSummary();
    this._expandNextTest(testType);
    this._updateInstructions();
  }

  /**
   * Add a test back from the skipped list
   */
  async addTestBack(testType) {
    // Remove from skipped tests
    const index = this.state.skippedTests.indexOf(testType);
    if (index > -1) {
      this.state.skippedTests.splice(index, 1);
    }

    this._saveSkippedTestsToStorage();

    // Reset test status in state
    this.state[testType] = null;

    // Rebuild the accordion with the restored test
    this._buildDynamicAccordion();
    await this._initSvgController();

    this._updateSkippedTestsDropdown();
    this._updateTestSummary();
    this._updateInstructions();
  }

  /**
   * Update the skipped tests dropdown
   */
  _updateSkippedTestsDropdown() {
    const $dropdown = $('#skipped-tests-dropdown');
    const $list = $('#skipped-tests-list');

    if (this.state.skippedTests.length === 0) {
      $dropdown.hide();
      return;
    }

    $dropdown.show();
    $list.empty();

    this.state.skippedTests.forEach(testType => {
      const testName = l(TEST_NAMES[testType]);
      const $item = $(`
        <li>
          <a class="dropdown-item" href="#" onclick="addTestBack('${testType}'); return false;">
            <i class="fas fa-plus me-2"></i>${testName}
          </a>
        </li>
      `);
      $list.append($item);
    });
  }

  /**
   * Update test summary display
   */
  _updateTestSummary() {
    const $summary = $('#test-summary');

    let completed = 0;
    let passed = 0;
    let skipped = this.state.skippedTests.length;

    // Get supported tests from the controller
    const supportedTests = this.controller.getSupportedQuickTests();

    // Get active tests for this controller model (non-skipped and supported)
    let activeTests = TEST_SEQUENCE.filter(testType =>
      !this.state.skippedTests.includes(testType) && supportedTests.includes(testType)
    );

    activeTests.forEach(test => {
      if (this.state[test] !== null) {
        completed++;
        if (this.state[test]) passed++;
      }
    });

    const numTests = activeTests.length;
    const totalProcessed = completed + skipped;

    if (totalProcessed === 0) {
      $summary.text(l('No tests completed yet.'));
      $summary.attr('class', 'text-muted');
    } else {
      let summaryText = `${completed}/${numTests} ${l("tests completed")}. ${passed} ${l("passed")}, ${completed - passed} ${l("failed")}.`;
      if (skipped > 0) {
        summaryText += ` ${skipped} ${l("skipped")}.`;
      }
      $summary.text(summaryText);
      $summary.attr('class', totalProcessed === numTests ? 'text-success' : 'text-info');
    }
  }

  /**
   * Expand the next untested item
   */
  _expandNextTest(currentTest) {
    const currentIndex = TEST_SEQUENCE.indexOf(currentTest);

    // Always collapse the current test first
    const $currentCollapse = $(`#${currentTest}-test-collapse`);
    bootstrap.Collapse.getInstance($currentCollapse[0])?.hide();

    // Find next untested item (not skipped and not completed)
    for (let i = currentIndex + 1; i < TEST_SEQUENCE.length; i++) {
      const nextTest = TEST_SEQUENCE[i];
      if (this.state[nextTest] === null && !this.state.skippedTests.includes(nextTest)) {
        const $nextCollapse = $(`#${nextTest}-test-collapse`);

        // Check if the element exists in the DOM before trying to create a Collapse instance
        if ($nextCollapse.length === 0 || !$nextCollapse[0]) {
          continue;
        }

        // Expand next
        setTimeout(() => {
          bootstrap.Collapse.getOrCreateInstance($nextCollapse[0]).show();
        }, 300);

        break;
      }
    }
  }

  /**
   * Get the currently active (expanded) test type
   */
  _getCurrentActiveTest() {
    for (const test of TEST_SEQUENCE) {
      // Skip tests that are in the skipped list
      if (this.state.skippedTests.includes(test)) {
        continue;
      }
      const $collapse = $(`#${test}-test-collapse`);
      if ($collapse.hasClass('show')) {
        return test;
      }
    }
    return null;
  }

  /**
   * Check if the given test is the first test in the sequence (excluding skipped tests)
   */
  _isFirstTest(testType) {
    // Get the first non-skipped test
    const firstTest = TEST_SEQUENCE.find(test => !this.state.skippedTests.includes(test));
    return testType === firstTest;
  }

  /**
   * Handle controller input for test navigation and control
   */
  handleControllerInput(changes, batteryStatus) {
    if(this.state.isTransitioning) return;

    // Check battery status and show/hide warning if charge is 5% or less
    if (batteryStatus) {
      // Only update visibility if alert hasn't been shown or charge level changed
      if (!this.state.batteryAlertShown || batteryStatus.changed ) {
        console.log("Battery status changed:", batteryStatus);
        const { charge_level, is_error } = batteryStatus;
        const $batteryWarning = $('#battery-warning-alert');
        $batteryWarning.toggle(charge_level <= 5 || is_error);
        this.state.batteryAlertShown = true;
      }
    }

    const activeTest = this._getCurrentActiveTest();

    // If buttons test is active, track button presses
    if (activeTest === 'buttons') {
      this._trackButtonPresses(changes);
      return;
    }

    // Helper function to handle button press with transition
    const handleButtonPress = (action) => {
      this._setTransitioning();
      action();
    };

    // Handle button presses
    if (changes.square === true) {
      handleButtonPress(() => {
        if (!activeTest) {
          this._startTestSequence();
        } else {
          this.markTestResult(activeTest, true);
        }
      });
    } else if (activeTest && changes.cross === true) {
      handleButtonPress(() => this.markTestResult(activeTest, false));
    } else if (changes.triangle === true) {
      handleButtonPress(() => this._moveToPreviousTest());
    } else if (changes.circle === true) {
      handleButtonPress(() => {
        if (activeTest) {
          // Skip the current test by expanding the next one
          this._expandNextTest(activeTest);
        } else {
          // Close the modal if no test is active
          bootstrap.Modal.getOrCreateInstance('#quickTestModal').hide();
        }
      });
    }
  }

  /**
   * Set transitioning state to prevent rapid button presses
   */
  _setTransitioning() {
    this.state.isTransitioning = true;
    setTimeout(() => {
      this.state.isTransitioning = false;
    }, 750);
  }

  /**
   * Track button presses for the buttons test
   */
  _trackButtonPresses(changes) {
    this._getAvailableButtons().forEach(button => {
      const handleLongpress = ['cross', 'square', 'triangle', 'circle'].includes(button);
      if (changes[button] === true) {
        // Button pressed - increment count and show dark blue infill
        this.state.buttonPressCount[button]++;
        this._setButtonPressed(button, true);

        // Start long-press timer for square and cross buttons
        if (handleLongpress) {
          this._startLongPressTimer(button);
        }
      } else if (changes[button] === false) {
        // Button released - restore appropriate color based on press count
        this._setButtonPressed(button, false);

        // Clear long-press timer for square and cross buttons
        if (handleLongpress) {
          this._clearLongPressTimer(button);
        }
      }
    });

    // Check if test is complete
    this._checkButtonsTestComplete();
  }

  /**
   * Set button pressed state and update visual appearance
   */
  _setButtonPressed(button, isPressed) {
    const buttonElement = this._getQuickTestElement(BUTTON_INFILL_MAPPING[button]);
    if (buttonElement) {
      if (isPressed) {
        // Show dark blue infill while pressed
        this._setSvgGroupColor(buttonElement, 'rgba(0, 0, 120, 1)');
      } else {
        // Restore color based on press count when released
        this._updateButtonColor(button);
      }
    }
  }

  /**
   * Start long-press timer for a button
   */
  _startLongPressTimer(button) {
    if(this.state.isTransitioning) return;

    // Clear any existing timer for this button
    this._clearLongPressTimer(button);

    // Start new timer
    this.state.longPressTimers[button] = setTimeout(() => {
      this._handleLongPress(button);
    }, this.state.longPressThreshold);
  }

  /**
   * Clear long-press timer for a button
   */
  _clearLongPressTimer(button) {
    if (this.state.longPressTimers[button]) {
      clearTimeout(this.state.longPressTimers[button]);
      delete this.state.longPressTimers[button];
    }
  }

  /**
   * Clear all active long-press timers
   */
  _clearAllLongPressTimers() {
    if(!this.state) return;

    Object.keys(this.state.longPressTimers).forEach(button => {
      this._clearLongPressTimer(button);
    });
  }

  /**
   * Handle long-press action for square and cross buttons during button test
   */
  _handleLongPress(button) {
    const activeTest = this._getCurrentActiveTest();
    if (activeTest === 'buttons') {
     this._setTransitioning();

      if (button === 'square') {
        this.markTestResult('buttons', true);
      } else if (button === 'cross') {
        this.markTestResult('buttons', false);
      } else if (button === 'triangle') {
        this._moveToPreviousTest();
      } else if (button === 'circle') {
        this._expandNextTest(activeTest);
      }
    }

    // Clear the timer since it has been handled
    delete this.state.longPressTimers[button];
  }

  /**
   * Start the test sequence from the beginning
   */
  async _startTestSequence() {
    // First, reset all tests to ensure clean state
    await this.resetAllTests();

    // After a short delay, start with the first non-skipped test
    setTimeout(() => {
      // Find the first test that is not skipped
      const firstAvailableTest = TEST_SEQUENCE.find(test => !this.state.skippedTests.includes(test));

      if (firstAvailableTest) {
        const $firstCollapse = $(`#${firstAvailableTest}-test-collapse`);
        // Check if the element exists in the DOM before trying to create a Collapse instance
        if ($firstCollapse.length > 0 && $firstCollapse[0]) {
          bootstrap.Collapse.getOrCreateInstance($firstCollapse[0]).show();
        }
      }
    }, 300);
  }

  /**
   * Move to the previous test in the sequence
   */
  _moveToPreviousTest() {
    const activeTest = this._getCurrentActiveTest();
    if (!activeTest) return;

    const currentIndex = TEST_SEQUENCE.indexOf(activeTest);

    // Find the previous non-skipped test
    let previousIndex = -1;
    for (let i = currentIndex - 1; i >= 0; i--) {
      if (!this.state.skippedTests.includes(TEST_SEQUENCE[i])) {
        previousIndex = i;
        break;
      }
    }

    // If no previous test found, stay on current
    if (previousIndex === -1) return;

    const previousTest = TEST_SEQUENCE[previousIndex];

    // Collapse current test
    const $currentCollapse = $(`#${activeTest}-test-collapse`);
    bootstrap.Collapse.getInstance($currentCollapse[0])?.hide();


    // Expand previous test after a short delay
    setTimeout(() => {
      const $previousCollapse = $(`#${previousTest}-test-collapse`);
      // Check if the element exists in the DOM before trying to create a Collapse instance
      if ($previousCollapse.length > 0 && $previousCollapse[0]) {
        bootstrap.Collapse.getOrCreateInstance($previousCollapse[0]).show();
      }
    }, 300);
  }

  /**
   * Reset all tests to initial state
   */
  async resetAllTests() {
    // Clear any active long-press timers before resetting state
    this._clearAllLongPressTimers();

    // Reset state
    this._initializeState();

    // Load saved skipped tests from storage
    this._loadSkippedTestsFromStorage();

    // Reset button colors to initial state
    this._resetButtonColors();

    // Reset UI
    TEST_SEQUENCE.forEach(test => {
      this._stopIconAnimation(test);

      const $statusBadge = $(`#${test}-test-status`);
      const $accordionItem = $(`#${test}-test-item`);
      const $accordionButton = $accordionItem.find('.accordion-button');

      $statusBadge.attr('class', 'badge bg-secondary me-2');
      $statusBadge.text(l('Not tested'));
      $accordionItem.removeClass('border-success border-danger');
      $accordionButton.css('backgroundColor', ''); // Clear background color

      // Show all test items initially
      $accordionItem.show();

      if (test === 'microphone') {
        const $levelContainer = $('#mic-level-container');
        $levelContainer.hide();
      }
    });

    // Apply skipped tests to UI (hide skipped items)
    await this._applySkippedTestsToUI();

    this._updateTestSummary();

    // Update instructions after reset
    this._updateInstructions();

    // Collapse all accordions
    const $accordions = $('#quickTestAccordion .accordion-collapse');
    $accordions.each((index, accordion) => {
      bootstrap.Collapse.getInstance(accordion)?.hide();
    });
  }
}

// Global reference to the current quick test instance
let currentQuickTestInstance = null;

/**
 * Helper function to safely clear the current quick test instance
 */
function destroyCurrentInstance$1() {
  if (currentQuickTestInstance) {
    console.log("Destroying current quick test instance");
    currentQuickTestInstance.removeEventListeners();
    currentQuickTestInstance = null;
  }
}

/**
 * Check if the Quick Test Modal is currently visible
 */
function isQuickTestVisible() {
  const $modal = $('#quickTestModal');
  return $modal.hasClass('show');
}

/**
 * Handle controller input for the Quick Test Modal
 */
function quicktest_handle_controller_input(changes, batteryStatus) {
  if (currentQuickTestInstance && isQuickTestVisible()) {
    currentQuickTestInstance.handleControllerInput(changes, batteryStatus);
  }
}

/**
 * Show the Quick Test modal (legacy function for backward compatibility)
 */
async function show_quick_test_modal(controller) {
  // Destroy any existing instance
  destroyCurrentInstance$1();

  // Create new instance
  currentQuickTestInstance = new QuickTestModal(controller);
  await currentQuickTestInstance.open();
}

function markTestResult(testType, passed) {
  if (currentQuickTestInstance) {
    currentQuickTestInstance.markTestResult(testType, passed);
  }
}

function resetAllTests() {
  if (currentQuickTestInstance) {
    currentQuickTestInstance.resetAllTests();
  }
}

function resetButtonsTest() {
  if (currentQuickTestInstance) {
    currentQuickTestInstance.resetButtonsTest();
  }
}

function skipTest(testType) {
  if (currentQuickTestInstance) {
    currentQuickTestInstance.skipTest(testType);
  }
}

function addTestBack(testType) {
  if (currentQuickTestInstance) {
    currentQuickTestInstance.addTestBack(testType);
  }
}

function testHeadphoneAudio() {
  if (currentQuickTestInstance) {
    currentQuickTestInstance.testHeadphoneAudio();
  }
}

function replaySpeakerTest() {
  if (currentQuickTestInstance) {
    currentQuickTestInstance._startSpeakerTest();
  }
}

function replayHapticTest() {
  if (currentQuickTestInstance) {
    currentQuickTestInstance._startHapticTest();
  }
}

// Legacy compatibility - expose functions to window for HTML onclick handlers
window.markTestResult = markTestResult;
window.resetAllTests = resetAllTests;
window.resetButtonsTest = resetButtonsTest;
window.skipTest = skipTest;
window.addTestBack = addTestBack;
window.testHeadphoneAudio = testHeadphoneAudio;
window.replaySpeakerTest = replaySpeakerTest;
window.replayHapticTest = replayHapticTest;

const MAX_HISTORY_ENTRIES_PER_CONTROLLER = 10;

/**
 * Manages finetune parameter history for DS5 and Edge controllers
 * Stores entries per controller identified by serial number
 */
class FinetuneHistory {
  /**
   * Save current finetune settings for a controller
   * @param {Array} finetuneData - Array of 12 finetune values
   * @param {string} controllerSerialNumber - Serial number of the controller
   * @returns {string} The ID of the saved entry
   */
  static save(finetuneData, controllerSerialNumber) {
    if (!Array.isArray(finetuneData) || finetuneData.length !== 12) {
      throw new Error(`Finetune data must be an array of 12 values, got "${finetuneData}"`);
    }

    if (!controllerSerialNumber || typeof controllerSerialNumber !== 'string') {
      throw new Error('Controller serial number is required');
    }

    const allHistory = this._getAllHistory();
    const controllerHistory = allHistory[controllerSerialNumber] || [];

    // Check if the most recent entry has the same data
    if (controllerHistory.length > 0 && this._dataEquals(controllerHistory[0].data, finetuneData)) {
      // Update the timestamp of the existing entry
      controllerHistory[0].timestamp = Date.now();
      allHistory[controllerSerialNumber] = controllerHistory;
      this._saveAllHistory(allHistory);
      return controllerHistory[0].id;
    }

    const entry = {
      id: this._generateId(),
      timestamp: Date.now(),
      data: finetuneData
    };

    controllerHistory.unshift(entry);

    // Keep only the latest MAX_HISTORY_ENTRIES_PER_CONTROLLER for this controller
    if (controllerHistory.length > MAX_HISTORY_ENTRIES_PER_CONTROLLER) {
      controllerHistory.pop();
    }

    allHistory[controllerSerialNumber] = controllerHistory;
    this._saveAllHistory(allHistory);
    return entry.id;
  }

  /**
   * Get all saved finetune settings for a specific controller
   * @param {string} controllerSerialNumber - Serial number of the controller
   * @returns {Array} Array of saved settings entries for the controller
   */
  static getAll(controllerSerialNumber) {
    if (!controllerSerialNumber || typeof controllerSerialNumber !== 'string') {
      return [];
    }

    const allHistory = this._getAllHistory();
    return allHistory[controllerSerialNumber] || [];
  }

  /**
   * Get finetune settings by ID
   * @param {string} id - Entry ID
   * @param {string} controllerSerialNumber - Serial number of the controller
   * @returns {Object|null} Entry object or null if not found
   */
  static getById(id, controllerSerialNumber) {
    if (!controllerSerialNumber || typeof controllerSerialNumber !== 'string') {
      return null;
    }

    const history = this.getAll(controllerSerialNumber);
    return history.find(entry => entry.id === id) || null;
  }

  /**
   * Delete a saved entry
   * @param {string} id - Entry ID
   * @param {string} controllerSerialNumber - Serial number of the controller
   * @returns {boolean} True if deleted, false if not found
   */
  static delete(id, controllerSerialNumber) {
    if (!controllerSerialNumber || typeof controllerSerialNumber !== 'string') {
      return false;
    }

    const allHistory = this._getAllHistory();
    const controllerHistory = allHistory[controllerSerialNumber] || [];
    const index = controllerHistory.findIndex(entry => entry.id === id);

    if (index >= 0) {
      controllerHistory.splice(index, 1);
      allHistory[controllerSerialNumber] = controllerHistory;
      this._saveAllHistory(allHistory);
      return true;
    }
    return false;
  }

  /**
   * Clear all saved finetune settings for a specific controller
   * @param {string} controllerSerialNumber - Serial number of the controller
   */
  static clearAll(controllerSerialNumber) {
    if (!controllerSerialNumber || typeof controllerSerialNumber !== 'string') {
      return;
    }

    const allHistory = this._getAllHistory();
    delete allHistory[controllerSerialNumber];
    this._saveAllHistory(allHistory);
  }

  /**
   * Get finetune data from a specific entry
   * @param {string} id - Entry ID
   * @param {string} controllerSerialNumber - Serial number of the controller
   * @returns {Array|null} Finetune data array or null if not found
   */
  static getDataById(id, controllerSerialNumber) {
    const entry = this.getById(id, controllerSerialNumber);
    return entry ? entry.data : null;
  }

  // ==================== PRIVATE METHODS ====================

  /**
   * Get all history from storage (for all controllers)
   * @private
   */
  static _getAllHistory() {
    try {
      return Storage.finetuneHistory.getAll();
    } catch (e) {
      console.error('Failed to parse finetune history:', e);
      return {};
    }
  }

  /**
   * Save all history to storage
   * @private
   */
  static _saveAllHistory(allHistory) {
    try {
      Storage.finetuneHistory.setAll(allHistory);
    } catch (e) {
      console.error('Failed to save finetune history:', e);
    }
  }

  /**
   * Generate unique ID
   * @private
   */
  static _generateId() {
    return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Compare two data arrays for equality
   * @private
   */
  static _dataEquals(data1, data2) {
    if (!Array.isArray(data1) || !Array.isArray(data2)) {
      return false;
    }
    if (data1.length !== data2.length) {
      return false;
    }
    return data1.every((val, idx) => val === data2[idx]);
  }
}

class CalibrationHistoryModal {
  constructor(controllerInstance = null, doneCallback = null) {
    this.modalElement = null;
    this.bootstrapModal = null;
    this.currentFinetuneData = null;
    this.currentControllerSerialNumber = null;
    this.controller = controllerInstance;
    this.doneCallback = doneCallback;

    this._boundModalHidden = () => {
      destroyCurrentInstance();
    };

    this._initEventListeners();
  }

  _initEventListeners() {
    this.modalElement = document.getElementById('calibrationHistoryModal');
    if (this.modalElement) {
      this.bootstrapModal = new bootstrap.Modal(this.modalElement);
      this.modalElement.addEventListener('hidden.bs.modal', this._boundModalHidden);
    }
  }

  removeEventListeners() {
    if (this.modalElement) {
      this.modalElement.removeEventListener('hidden.bs.modal', this._boundModalHidden);
    }
  }

  async open(currentFinetuneData = null, controllerSerialNumber = null) {
    this.currentFinetuneData = currentFinetuneData;
    this.currentControllerSerialNumber = controllerSerialNumber;
    await this._populateHistory();
    this.bootstrapModal.show();
  }

  close() {
    if (this.bootstrapModal) {
      this.bootstrapModal.hide();
    }
  }

  /**
   * Populate the history list
   * @private
   */
  async _populateHistory() {
    const history = FinetuneHistory.getAll(this.currentControllerSerialNumber);
    const container = document.getElementById('historyListContainer');

    if (!history || history.length === 0) {
      container.innerHTML = `<p class="text-muted ds-i18n">${l('No saved calibrations found.')}</p>`;
      document.getElementById('clearAllBtn').style.display = 'none';
      return;
    }

    document.getElementById('clearAllBtn').style.display = 'block';

    let html = '<div class="list-group">';

    history.forEach(entry => {
      const date = formatLocalizedDate(entry.timestamp);
      const isCurrent = this.currentFinetuneData && this._dataEquals(entry.data, this.currentFinetuneData);

      html += `
        <div class="list-group-item">
          <div class="d-flex justify-content-between align-items-start">
            <div class="flex-grow-1">
              <h6 class="mb-1">${date}</h6>
              <p class="mb-0 small">${l('Values')}: ${entry.data.join(', ')}</p>
            </div>
            <div class="btn-group-sm" role="group">
              ${isCurrent ?
                `<button type="button" class="btn btn-sm btn-success ds-i18n" disabled>${l('Current')}</button>` :
                `<button type="button" class="btn btn-sm btn-primary ds-i18n" onclick="calibration_history_restore('${entry.id}')">${l('Restore')}</button>
                 <button type="button" class="btn btn-sm btn-outline-danger ds-i18n" onclick="calibration_history_delete('${entry.id}')">${l('Delete')}</button>`
              }
            </div>
          </div>
        </div>
      `;
    });

    html += '</div>';
    container.innerHTML = html;
  }

  /**
   * Compare two data arrays for equality
   * @private
   */
  _dataEquals(data1, data2) {
    if (!Array.isArray(data1) || !Array.isArray(data2)) {
      return false;
    }
    if (data1.length !== data2.length) {
      return false;
    }
    return data1.every((val, idx) => val === data2[idx]);
  }

  /**
   * Apply finetune calibration to the controller
   * @param {Array} finetuneData - The finetune data to apply
   * @private
   */
  async _applyCalibration(finetuneData) {
    if (!this.controller || !this.controller.isConnected()) {
      throw new Error('Controller not connected');
    }
    if (!Array.isArray(finetuneData) || finetuneData.length !== 12) {
      throw new Error('Invalid finetune data');
    }
    await this.controller.writeFinetuneData(finetuneData);
    this.controller.setHasChangesToWrite(true);
  }

  /**
   * Restore a saved calibration
   * @param {string} entryId - The ID of the entry to revert to
   */
  async restoreCalibration(entryId) {
    const entry = FinetuneHistory.getById(entryId, this.currentControllerSerialNumber);
    if (!entry) throw new Error('Calibration settings not found.');

    await this._applyCalibration(entry.data);
    this.close();
    this.doneCallback(true, l('The calibration was restored successfully! Remember to save the changes in order not to loose them when the controller is rebooted.'));
    la("calibration_history_restored");
  }

  /**
   * Delete a saved entry
   * @param {string} entryId - The ID of the entry to delete
   */
  async delete(entryId) {
    const entry = FinetuneHistory.getById(entryId, this.currentControllerSerialNumber);
    if (!entry) {
      return;
    }

    if (confirm(l(`Delete this calibration entry?`))) {
      FinetuneHistory.delete(entryId, this.currentControllerSerialNumber);
      await this._populateHistory();
    }
  }

  /**
   * Clear all saved entries
   */
  async clearAll() {
    if (confirm(l('Delete all calibration history for this controller? This cannot be undone.'))) {
      FinetuneHistory.clearAll(this.currentControllerSerialNumber);
      await this._populateHistory();
    }
  }
}

let currentCalibrationHistoryInstance = null;

function destroyCurrentInstance() {
  if (currentCalibrationHistoryInstance) {
    currentCalibrationHistoryInstance.removeEventListeners();
    currentCalibrationHistoryInstance = null;
  }
}

async function show_calibration_history_modal(controllerInstance = null, currentFinetuneData = null, controllerSerialNumber = null, doneCallback = null) {
  destroyCurrentInstance();

  currentCalibrationHistoryInstance = new CalibrationHistoryModal(controllerInstance, doneCallback);
  await currentCalibrationHistoryInstance.open(currentFinetuneData, controllerSerialNumber);
}

window.calibration_history_restore = (entryId) => {
  if (currentCalibrationHistoryInstance) {
    currentCalibrationHistoryInstance.restoreCalibration(entryId);
  }
};

window.calibration_history_delete = (entryId) => {
  if (currentCalibrationHistoryInstance) {
    currentCalibrationHistoryInstance.delete(entryId);
  }
};

window.calibration_history_clear_all = () => {
  if (currentCalibrationHistoryInstance) {
    currentCalibrationHistoryInstance.clearAll();
  }
};

window.show_calibration_history_modal = show_calibration_history_modal;

let deadzoneCanvas = {
  left: null,
  right: null
};

let currentSettings = null;
let animationFrameId$1 = null;

/**
 * Get default deadzone settings
 * @returns {Object} Default deadzone settings
 */
function getDefaultDeadzoneSettings() {
  return {
    left: { inner: 0, outer: 1.0 },
    right: { inner: 0, outer: 1.0 }
  };
}

/**
 * Initialize deadzone modal
 */
function initDeadzoneModal() {
  const modal = document.getElementById('deadzoneModal');
  if (!modal) return;

  // Setup event listeners for sliders
  setupSliderListeners();

  // Setup preset buttons
  setupPresetButtons();

  // Setup save button
  document.getElementById('saveDeadzoneSettings').addEventListener('click', saveDeadzoneSettings);

  // Setup apply to controller button
  document.getElementById('applyDeadzoneToController').addEventListener('click', applyDeadzoneToController);

  // Initialize canvas contexts
  deadzoneCanvas.left = document.getElementById('leftStickDeadzoneCanvas');
  deadzoneCanvas.right = document.getElementById('rightStickDeadzoneCanvas');
}

/**
 * Show deadzone configuration modal
 * @param {string} serialNumber - Controller serial number
 * @param {Function} onSave - Callback when settings are saved
 */
function showDeadzoneModal(serialNumber, onSave = null) {
  
  // Always reset to default settings on modal open
  currentSettings = getDefaultDeadzoneSettings();

  // Update UI with default settings
  updateUIFromSettings();
  
  // Uncheck the "apply to both sticks" checkbox
  document.getElementById('applyToBothSticks').checked = false;

  // Draw initial visualizations
  drawDeadzoneVisualization('left');
  drawDeadzoneVisualization('right');

  // Store callback
  const modalElement = document.getElementById('deadzoneModal');
  if (onSave) {
    modalElement._onSaveCallback = onSave;
  }

  // Start real-time stick position updates
  startRealtimeUpdates();

  // Show modal
  const modal = new bootstrap.Modal(modalElement);
  modal.show();

  // Stop updates when modal is closed
  modalElement.addEventListener('hidden.bs.modal', () => {
    stopRealtimeUpdates();
  }, { once: true });
}

/**
 * Start real-time stick position updates
 */
function startRealtimeUpdates() {
  function updateLoop() {
    // Get current stick positions from global controller manager
    if (window.controllerManagerInstance && window.controllerManagerInstance.button_states) {
      const sticks = window.controllerManagerInstance.button_states.sticks;
      
      ({ x: sticks.left.x, y: sticks.left.y });
      ({ x: sticks.right.x, y: sticks.right.y });

      // Update position displays
      document.getElementById('leftStickPosition').textContent = 
        `${sticks.left.x.toFixed(2)}, ${sticks.left.y.toFixed(2)}`;
      document.getElementById('rightStickPosition').textContent = 
        `${sticks.right.x.toFixed(2)}, ${sticks.right.y.toFixed(2)}`;

      // Redraw canvases with current stick positions
      // Note: Y axis is inverted for canvas (negative Y = up in game, but down in canvas)
      drawDeadzoneVisualizationWithStick('left', sticks.left.x, sticks.left.y);
      drawDeadzoneVisualizationWithStick('right', sticks.right.x, sticks.right.y);
    }

    animationFrameId$1 = requestAnimationFrame(updateLoop);
  }

  animationFrameId$1 = requestAnimationFrame(updateLoop);
}

/**
 * Stop real-time stick position updates
 */
function stopRealtimeUpdates() {
  if (animationFrameId$1) {
    cancelAnimationFrame(animationFrameId$1);
    animationFrameId$1 = null;
  }
}

/**
 * Setup slider event listeners
 */
function setupSliderListeners() {
  // Left stick sliders
  const leftInner = document.getElementById('leftInnerDeadzone');
  const leftOuter = document.getElementById('leftOuterDeadzone');
  const applyToBoth = document.getElementById('applyToBothSticks');

  leftInner.addEventListener('input', (e) => {
    const value = parseInt(e.target.value);
    document.getElementById('leftInnerValue').textContent = value + '%';
    
    if (applyToBoth.checked) {
      document.getElementById('rightInnerDeadzone').value = value;
      document.getElementById('rightInnerValue').textContent = value + '%';
    }
    
    // No need to redraw - real-time updates will handle it
  });

  leftOuter.addEventListener('input', (e) => {
    const value = parseInt(e.target.value);
    document.getElementById('leftOuterValue').textContent = value + '%';
    
    if (applyToBoth.checked) {
      document.getElementById('rightOuterDeadzone').value = value;
      document.getElementById('rightOuterValue').textContent = value + '%';
    }
    
    // No need to redraw - real-time updates will handle it
  });

  // Right stick sliders
  const rightInner = document.getElementById('rightInnerDeadzone');
  const rightOuter = document.getElementById('rightOuterDeadzone');

  rightInner.addEventListener('input', (e) => {
    const value = parseInt(e.target.value);
    document.getElementById('rightInnerValue').textContent = value + '%';
    // No need to redraw - real-time updates will handle it
  });

  rightOuter.addEventListener('input', (e) => {
    const value = parseInt(e.target.value);
    document.getElementById('rightOuterValue').textContent = value + '%';
    // No need to redraw - real-time updates will handle it
  });
}

/**
 * Setup preset buttons
 */
function setupPresetButtons() {
  const presets = {
    default: { inner: 0, outer: 100 },
    tight: { inner: 10, outer: 90 },
    loose: { inner: 2, outer: 98 },
    competitive: { inner: 8, outer: 92 }
  };

  Object.keys(presets).forEach(key => {
    document.getElementById(`preset${key.charAt(0).toUpperCase() + key.slice(1)}`).addEventListener('click', () => {
      applyPreset(presets[key]);
    });
  });
}

/**
 * Apply a preset to sliders
 */
function applyPreset(preset) {
  // Apply to left stick
  document.getElementById('leftInnerDeadzone').value = preset.inner;
  document.getElementById('leftInnerValue').textContent = preset.inner + '%';
  document.getElementById('leftOuterDeadzone').value = preset.outer;
  document.getElementById('leftOuterValue').textContent = preset.outer + '%';

  // Apply to right stick
  document.getElementById('rightInnerDeadzone').value = preset.inner;
  document.getElementById('rightInnerValue').textContent = preset.inner + '%';
  document.getElementById('rightOuterDeadzone').value = preset.outer;
  document.getElementById('rightOuterValue').textContent = preset.outer + '%';

  // No need to redraw - real-time updates will handle it
}

/**
 * Update UI from loaded settings
 */
function updateUIFromSettings() {
  if (!currentSettings) return;

  // Left stick
  const leftInner = Math.round(currentSettings.left.inner * 100);
  const leftOuter = Math.round(currentSettings.left.outer * 100);
  document.getElementById('leftInnerDeadzone').value = leftInner;
  document.getElementById('leftInnerValue').textContent = leftInner + '%';
  document.getElementById('leftOuterDeadzone').value = leftOuter;
  document.getElementById('leftOuterValue').textContent = leftOuter + '%';

  // Right stick
  const rightInner = Math.round(currentSettings.right.inner * 100);
  const rightOuter = Math.round(currentSettings.right.outer * 100);
  document.getElementById('rightInnerDeadzone').value = rightInner;
  document.getElementById('rightInnerValue').textContent = rightInner + '%';
  document.getElementById('rightOuterDeadzone').value = rightOuter;
  document.getElementById('rightOuterValue').textContent = rightOuter + '%';
}

/**
 * Draw deadzone visualization on canvas
 */
function drawDeadzoneVisualization(stick) {
  drawDeadzoneVisualizationWithStick(stick, 0, 0);
}

/**
 * Draw deadzone visualization on canvas with stick position
 * @param {string} stick - 'left' or 'right'
 * @param {number} stickX - Current stick X position (-1 to 1)
 * @param {number} stickY - Current stick Y position (-1 to 1)
 */
function drawDeadzoneVisualizationWithStick(stick, stickX = 0, stickY = 0) {
  const canvas = stick === 'left' ? deadzoneCanvas.left : deadzoneCanvas.right;
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const width = canvas.width;
  const height = canvas.height;
  const centerX = width / 2;
  const centerY = height / 2;
  const maxRadius = Math.min(width, height) / 2 - 10;

  // Get current values
  const innerSlider = document.getElementById(`${stick}InnerDeadzone`);
  const outerSlider = document.getElementById(`${stick}OuterDeadzone`);
  const innerValue = parseInt(innerSlider.value) / 100;
  const outerValue = parseInt(outerSlider.value) / 100;

  // Clear canvas
  ctx.clearRect(0, 0, width, height);

  // Draw outer dead zone (grey area beyond outer threshold)
  ctx.fillStyle = '#ff6b6b44';
  ctx.beginPath();
  ctx.arc(centerX, centerY, maxRadius, 0, 2 * Math.PI);
  ctx.fill();

  // Draw active zone (green area)
  ctx.fillStyle = '#51cf6644';
  ctx.beginPath();
  ctx.arc(centerX, centerY, maxRadius * outerValue, 0, 2 * Math.PI);
  ctx.fill();

  // Draw inner dead zone (red area)
  ctx.fillStyle = '#ff6b6b88';
  ctx.beginPath();
  ctx.arc(centerX, centerY, maxRadius * innerValue, 0, 2 * Math.PI);
  ctx.fill();

  // Draw border circles
  ctx.strokeStyle = '#333';
  ctx.lineWidth = 2;
  
  // Outer border
  ctx.beginPath();
  ctx.arc(centerX, centerY, maxRadius, 0, 2 * Math.PI);
  ctx.stroke();

  // Outer threshold
  ctx.strokeStyle = '#51cf66';
  ctx.lineWidth = 1.5;
  ctx.setLineDash([5, 5]);
  ctx.beginPath();
  ctx.arc(centerX, centerY, maxRadius * outerValue, 0, 2 * Math.PI);
  ctx.stroke();

  // Inner threshold
  ctx.strokeStyle = '#ff6b6b';
  ctx.setLineDash([3, 3]);
  ctx.beginPath();
  ctx.arc(centerX, centerY, maxRadius * innerValue, 0, 2 * Math.PI);
  ctx.stroke();

  // Reset line dash
  ctx.setLineDash([]);

  // Draw crosshair
  ctx.strokeStyle = '#aaa';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(centerX - maxRadius, centerY);
  ctx.lineTo(centerX + maxRadius, centerY);
  ctx.moveTo(centerX, centerY - maxRadius);
  ctx.lineTo(centerX, centerY + maxRadius);
  ctx.stroke();

  // Draw current stick position
  if (stickX !== 0 || stickY !== 0) {
    const stickPosX = centerX + stickX * maxRadius;
    const stickPosY = centerY + stickY * maxRadius;
    
    // Draw line from center to stick position
    ctx.strokeStyle = '#2196F3';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(stickPosX, stickPosY);
    ctx.stroke();
    
    // Draw stick position dot
    ctx.fillStyle = '#2196F3';
    ctx.beginPath();
    ctx.arc(stickPosX, stickPosY, 6, 0, 2 * Math.PI);
    ctx.fill();
    
    // Draw white border on dot
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(stickPosX, stickPosY, 6, 0, 2 * Math.PI);
    ctx.stroke();
  } else {
    // Draw center dot
    ctx.fillStyle = '#333';
    ctx.beginPath();
    ctx.arc(centerX, centerY, 3, 0, 2 * Math.PI);
    ctx.fill();
  }
}

/**
 * Save deadzone settings (software only - stored in browser)
 */
function saveDeadzoneSettings() {
  const settings = getDeadzoneSettingsFromUI();

  // Validate settings
  if (settings.left.inner >= settings.left.outer || settings.right.inner >= settings.right.outer) {
    alert(l('Inner dead zone must be smaller than outer dead zone'));
    return;
  }

  // Close modal
  const modal = bootstrap.Modal.getInstance(document.getElementById('deadzoneModal'));
  modal.hide();

  // Show success message
  showSuccessToast(l('Dead zone settings saved successfully') + ' (' + l('Software only - not written to controller') + ')');

  // Trigger callback to update controller manager
  const modalElement = document.getElementById('deadzoneModal');
  if (modalElement && modalElement._onSaveCallback) {
    modalElement._onSaveCallback(settings);
  }
}

/**
 * Apply deadzone to controller permanently (writes to firmware via fine-tune data)
 */
async function applyDeadzoneToController() {
  const applyBtn = document.getElementById('applyDeadzoneToController');
  const originalText = applyBtn.innerHTML;
  
  try {
    const settings = getDeadzoneSettingsFromUI();

    // Validate settings
    if (settings.left.inner >= settings.left.outer || settings.right.inner >= settings.right.outer) {
      alert(l('Inner dead zone must be smaller than outer dead zone'));
      return;
    }

    // Confirm action
    const confirmed = confirm(
      l('This will write deadzone settings to the controller firmware permanently.') + '\n\n' +
      l('Make sure the controller battery is fully charged.') + '\n' +
      l('Do not disconnect the controller during this process.') + '\n\n' +
      l('Continue?')
    );

    if (!confirmed) return;

    // Disable button during operation
    applyBtn.disabled = true;
    applyBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span class="ds-i18n">Writing to controller...</span>';

    // Get controller manager instance
    if (!window.controllerManagerInstance) {
      throw new Error('Controller manager not found');
    }

    const controller = window.controllerManagerInstance;

    // Read current fine-tune data
    const finetuneData = await controller.getInMemoryModuleData();
    
    // Convert deadzone settings to fine-tune data adjustments
    const modifiedData = applyDeadzoneToFinetuneData(finetuneData, settings);

    // Write modified data back to controller
    await controller.writeFinetuneData(modifiedData);

    // Mark controller as having unsaved changes
    controller.setHasChangesToWrite(true);

    // Close modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('deadzoneModal'));
    modal.hide();

    // Show success message
    alert(
      l('Deadzone settings applied to controller memory!') + '\n\n' +
      l('⚠️ IMPORTANT: Click "Save changes permanently" button to write to controller firmware.') + '\n' +
      l('Otherwise changes will be lost when controller is rebooted.')
    );

  } catch (error) {
    console.error('Failed to apply deadzone to controller:', error);
    alert(l('Failed to apply deadzone to controller') + ': ' + error.message);
  } finally {
    // Re-enable button
    if (applyBtn) {
      applyBtn.disabled = false;
      applyBtn.innerHTML = originalText;
    }
  }
}

/**
 * Get deadzone settings from UI
 */
function getDeadzoneSettingsFromUI() {
  return {
    left: {
      inner: parseInt(document.getElementById('leftInnerDeadzone').value) / 100,
      outer: parseInt(document.getElementById('leftOuterDeadzone').value) / 100
    },
    right: {
      inner: parseInt(document.getElementById('rightInnerDeadzone').value) / 100,
      outer: parseInt(document.getElementById('rightOuterDeadzone').value) / 100
    }
  };
}

/**
 * Apply deadzone settings to fine-tune data
 * This modifies the circularity values (LL, LT, LR, LB, RL, RT, RR, RB) to simulate deadzone effect
 */
function applyDeadzoneToFinetuneData(finetuneData, deadzoneSettings) {
  const modifiedData = [...finetuneData];

  // Apply left stick deadzone
  1 - (deadzoneSettings.left.inner * 0.5); // 0.5 factor to avoid too aggressive changes
  const leftOuterScale = deadzoneSettings.left.outer;

  // Left circularity adjustments (indices 0-3: LL, LT, LR, LB)
  for (let i = 0; i < 4; i++) {
    const originalValue = finetuneData[i];
    // Scale outer values based on outer deadzone
    modifiedData[i] = Math.round(originalValue * leftOuterScale);
  }

  // Apply right stick deadzone
  1 - (deadzoneSettings.right.inner * 0.5);
  const rightOuterScale = deadzoneSettings.right.outer;

  // Right circularity adjustments (indices 4-7: RL, RT, RR, RB)
  for (let i = 4; i < 8; i++) {
    const originalValue = finetuneData[i];
    modifiedData[i] = Math.round(originalValue * rightOuterScale);
  }

  return modifiedData;
}

/**
 * Show success toast notification
 */
function showSuccessToast(message) {
  // Create toast element if it doesn't exist
  let toastContainer = document.getElementById('toastContainer');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toastContainer';
    toastContainer.className = 'toast-container position-fixed bottom-0 end-0 p-3';
    document.body.appendChild(toastContainer);
  }

  const toastEl = document.createElement('div');
  toastEl.className = 'toast';
  toastEl.setAttribute('role', 'alert');
  toastEl.innerHTML = `
    <div class="toast-header bg-success text-white">
      <i class="fas fa-check-circle me-2"></i>
      <strong class="me-auto">Success</strong>
      <button type="button" class="btn-close btn-close-white" data-bs-dismiss="toast"></button>
    </div>
    <div class="toast-body">
      ${message}
    </div>
  `;

  toastContainer.appendChild(toastEl);
  const toast = new bootstrap.Toast(toastEl);
  toast.show();

  // Remove toast element after it's hidden
  toastEl.addEventListener('hidden.bs.toast', () => {
    toastEl.remove();
  });
}

let driftCanvas = {
  left: null,
  right: null
};

let driftData = {
  left: {
    samples: [],
    maxDrift: 0,
    avgDrift: 0,
    centerX: 0,
    centerY: 0
  },
  right: {
    samples: [],
    maxDrift: 0,
    avgDrift: 0,
    centerX: 0,
    centerY: 0
  }
};

let animationFrameId = null;
let measurementStartTime = null;
const MEASUREMENT_DURATION = 5000; // 5 seconds
const SAMPLE_INTERVAL = 50; // Sample every 50ms
const DRIFT_THRESHOLD = 0.05; // 5% drift threshold

/**
 * Initialize drift analysis modal
 */
function initDriftAnalysisModal() {
  const modal = document.getElementById('driftAnalysisModal');
  if (!modal) return;

  // Initialize canvas contexts
  driftCanvas.left = document.getElementById('leftDriftCanvas');
  driftCanvas.right = document.getElementById('rightDriftCanvas');

  // Setup restart button
  document.getElementById('restartDriftAnalysis').addEventListener('click', restartMeasurement);

  // Setup modal event listeners
  modal.addEventListener('shown.bs.modal', () => {
    startMeasurement();
  });

  modal.addEventListener('hidden.bs.modal', () => {
    stopMeasurement();
  });
}

/**
 * Show drift analysis modal
 */
function showDriftAnalysisModal() {
  const modal = new bootstrap.Modal(document.getElementById('driftAnalysisModal'));
  modal.show();
}

/**
 * Start drift measurement
 */
function startMeasurement() {
  // Reset data
  resetDriftData();
  
  // Show measurement status
  document.getElementById('driftMeasurementStatus').style.display = 'block';
  document.getElementById('driftAssessment').style.display = 'none';
  
  // Reset UI
  updateDriftUI('left', 0, 0, 0, 0);
  updateDriftUI('right', 0, 0, 0, 0);
  
  measurementStartTime = Date.now();
  
  // Start animation loop
  measurementLoop();
}

/**
 * Stop drift measurement
 */
function stopMeasurement() {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
  }
  measurementStartTime = null;
}

/**
 * Restart measurement
 */
function restartMeasurement() {
  stopMeasurement();
  startMeasurement();
}

/**
 * Reset drift data
 */
function resetDriftData() {
  driftData.left = {
    samples: [],
    maxDrift: 0,
    avgDrift: 0,
    centerX: 0,
    centerY: 0
  };
  driftData.right = {
    samples: [],
    maxDrift: 0,
    avgDrift: 0,
    centerX: 0,
    centerY: 0
  };
}

/**
 * Measurement loop
 */
function measurementLoop() {
  if (!measurementStartTime) return;
  
  const elapsed = Date.now() - measurementStartTime;
  
  if (elapsed < MEASUREMENT_DURATION) {
    // Continue measuring
    if (window.controllerManagerInstance && window.controllerManagerInstance.button_states) {
      const sticks = window.controllerManagerInstance.button_states.sticks;
      
      // Sample data
      if (elapsed % SAMPLE_INTERVAL < 20) { // Sample approximately every SAMPLE_INTERVAL ms
        sampleDrift('left', sticks.left.x, sticks.left.y);
        sampleDrift('right', sticks.right.x, sticks.right.y);
      }
      
      // Update visualizations (invert Y)
      drawDriftVisualization('left', sticks.left.x, -sticks.left.y);
      drawDriftVisualization('right', sticks.right.x, -sticks.right.y);
    }
    
    animationFrameId = requestAnimationFrame(measurementLoop);
  } else {
    // Measurement complete
    finalizeMeasurement();
  }
}

/**
 * Sample drift data
 */
function sampleDrift(stick, x, y) {
  const data = driftData[stick];
  
  // Invert Y axis to match stick behavior
  const adjustedY = -y;
  
  // Calculate distance from center
  const distance = Math.sqrt(x * x + adjustedY * adjustedY);
  
  // Store sample
  data.samples.push({ x, y: adjustedY, distance });
  
  // Update max drift
  if (distance > data.maxDrift) {
    data.maxDrift = distance;
  }
}

/**
 * Finalize measurement and show results
 */
function finalizeMeasurement() {
  // Calculate averages
  ['left', 'right'].forEach(stick => {
    const data = driftData[stick];
    
    if (data.samples.length > 0) {
      // Calculate average drift
      const totalDrift = data.samples.reduce((sum, sample) => sum + sample.distance, 0);
      data.avgDrift = totalDrift / data.samples.length;
      
      // Calculate center offset (average position)
      const totalX = data.samples.reduce((sum, sample) => sum + sample.x, 0);
      const totalY = data.samples.reduce((sum, sample) => sum + sample.y, 0);
      data.centerX = totalX / data.samples.length;
      data.centerY = totalY / data.samples.length;
    }
    
    // Update UI with final results - use maxDrift for status
    updateDriftUI(stick, data.avgDrift, data.centerX, data.centerY, data.maxDrift);
  });
  
  // Hide measurement status
  document.getElementById('driftMeasurementStatus').style.display = 'none';
  
  // Show overall assessment
  showOverallAssessment();
}

/**
 * Update drift UI for a stick
 */
function updateDriftUI(stick, avgDrift, centerX, centerY, maxDrift) {
  const driftPercentage = (maxDrift * 100).toFixed(2);
  const driftDistance = maxDrift.toFixed(4);
  
  // Update distance
  document.getElementById(`${stick}DriftDistance`).textContent = driftDistance;
  
  // Update percentage
  const percentageBadge = document.getElementById(`${stick}DriftPercentage`);
  percentageBadge.textContent = driftPercentage + '%';
  
  // Color code based on severity - use max drift instead of average
  percentageBadge.className = 'badge ms-2';
  if (maxDrift < DRIFT_THRESHOLD) {
    percentageBadge.classList.add('bg-success');
  } else if (maxDrift < DRIFT_THRESHOLD * 2) {
    percentageBadge.classList.add('bg-warning');
  } else {
    percentageBadge.classList.add('bg-danger');
  }
  
  // Update center offset
  document.getElementById(`${stick}CenterOffset`).textContent = 
    `X: ${centerX.toFixed(4)}, Y: ${centerY.toFixed(4)}`;
  
  // Update status - based on max drift
  const statusBadge = document.getElementById(`${stick}DriftStatus`);
  statusBadge.className = 'badge';
  
  if (maxDrift < DRIFT_THRESHOLD) {
    statusBadge.classList.add('bg-success');
    statusBadge.textContent = l('No Drift Detected');
  } else if (maxDrift < DRIFT_THRESHOLD * 2) {
    statusBadge.classList.add('bg-warning');
    statusBadge.textContent = l('Minor Drift');
  } else if (maxDrift < DRIFT_THRESHOLD * 4) {
    statusBadge.classList.add('bg-danger');
    statusBadge.textContent = l('Moderate Drift');
  } else {
    statusBadge.classList.add('bg-danger');
    statusBadge.textContent = l('Severe Drift');
  }
}

/**
 * Draw drift visualization on canvas
 */
function drawDriftVisualization(stick, stickX, stickY) {
  const canvas = stick === 'left' ? driftCanvas.left : driftCanvas.right;
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  const width = canvas.width;
  const height = canvas.height;
  const centerX = width / 2;
  const centerY = height / 2;
  const maxRadius = Math.min(width, height) / 2 - 10;
  
  // Clear canvas
  ctx.clearRect(0, 0, width, height);
  
  // Draw outer circle
  ctx.strokeStyle = '#ddd';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(centerX, centerY, maxRadius, 0, 2 * Math.PI);
  ctx.stroke();
  
  // Draw crosshair
  ctx.strokeStyle = '#ccc';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(centerX - 10, centerY);
  ctx.lineTo(centerX + 10, centerY);
  ctx.moveTo(centerX, centerY - 10);
  ctx.lineTo(centerX, centerY + 10);
  ctx.stroke();
  
  // Draw drift threshold circle
  ctx.strokeStyle = 'rgba(255, 193, 7, 0.5)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.arc(centerX, centerY, maxRadius * DRIFT_THRESHOLD, 0, 2 * Math.PI);
  ctx.stroke();
  
  // Draw current stick position
  const stickCanvasX = centerX + stickX * maxRadius;
  const stickCanvasY = centerY - stickY * maxRadius; // Invert Y for canvas
  
  ctx.fillStyle = '#0d6efd';
  ctx.beginPath();
  ctx.arc(stickCanvasX, stickCanvasY, 5, 0, 2 * Math.PI);
  ctx.fill();
  
  // Draw line from center to stick
  ctx.strokeStyle = 'rgba(13, 110, 253, 0.5)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(centerX, centerY);
  ctx.lineTo(stickCanvasX, stickCanvasY);
  ctx.stroke();
  
  // Draw all sample points with transparency
  const data = driftData[stick];
  if (data.samples.length > 0) {
    ctx.fillStyle = 'rgba(255, 107, 107, 0.3)';
    data.samples.forEach(sample => {
      const sampleX = centerX + sample.x * maxRadius;
      const sampleY = centerY - sample.y * maxRadius;
      ctx.beginPath();
      ctx.arc(sampleX, sampleY, 2, 0, 2 * Math.PI);
      ctx.fill();
    });
  }
}

/**
 * Show overall assessment
 */
function showOverallAssessment() {
  const leftDrift = driftData.left.maxDrift;
  const rightDrift = driftData.right.maxDrift;
  const maxDrift = Math.max(leftDrift, rightDrift);
  
  const assessmentCard = document.getElementById('driftAssessment');
  const assessmentText = document.getElementById('driftAssessmentText');
  
  assessmentCard.style.display = 'block';
  
  let text = '';
  
  if (maxDrift < DRIFT_THRESHOLD) {
    text = l('Both sticks are functioning normally with minimal drift. No action is required.');
  } else if (maxDrift < DRIFT_THRESHOLD * 2) {
    text = l('Minor drift detected. This is common and may not affect gameplay significantly.');
  } else if (maxDrift < DRIFT_THRESHOLD * 4) {
    text = l('Moderate drift detected. This may start to affect gameplay precision.');
  } else {
    text = l('Severe drift detected. The joystick requires replacement.');
  }
  
  assessmentText.textContent = text;
}

// Export for global access
window.showDriftAnalysisModal = showDriftAnalysisModal;

// Application State - manages app-wide state and UI
const app = {
  // Button disable state management
  disable_btn: 0,
  last_disable_btn: 0,

  shownRangeCalibrationWarning: false,
  failedCalibrationDetectionsCount: 0,
  failedCalibrationModalShownCount: 0,

  // Calibration method preference
  centerCalibrationMethod: 'four-step', // 'quick' or 'four-step'
  rangeCalibrationMethod: 'normal', // 'normal' or 'expert'

  // Language and UI state
  lang_orig_text: {},
  lang_orig_text: {},
  lang_cur: {},
  lang_disabled: true,
  lang_cur_direction: "ltr",

  // Session tracking
  gj: 0,
  gu: 0
};

const ll_data = new Array(CIRCULARITY_DATA_SIZE);
const rr_data = new Array(CIRCULARITY_DATA_SIZE);

let controller = null;

function gboot() {
  app.gu = crypto.randomUUID();

  async function initializeApp() {
    window.addEventListener("error", (event) => {
      console.error(event.error?.stack || event.message);
      show_popup(event.error?.message || event.message);
    });

    window.addEventListener("unhandledrejection", async (event) => {
      console.error("Unhandled rejection:", event.reason?.stack || event.reason);
      close_all_modals();
      // show_popup(event.reason?.message || event.reason);

      // Format the error message for better readability
      let errorMessage = "An unexpected error occurred";
      if (event.reason) {
        if (event.reason.message) {
          errorMessage = `<strong>Error:</strong> ${event.reason.message}`;
        } else if (typeof event.reason === 'string') {
          errorMessage = `<strong>Error:</strong> ${event.reason}`;
        }

        // Collect all stack traces (main error and causes) for a single expandable section
        let allStackTraces = '';
        if (event.reason.stack) {
          const stackTrace = event.reason.stack.replace(/\n/g, '<br>').replace(/ /g, '&nbsp;');
          allStackTraces += `<strong>Main Error Stack:</strong><br>${stackTrace}`;
        }

        // Add error chain information if available (ES2022 error chaining)
        let currentError = event.reason;
        let chainLevel = 0;
        while (currentError?.cause && chainLevel < 5) {
          chainLevel++;
          currentError = currentError.cause;
          if (currentError.stack) {
            const causeStackTrace = currentError.stack.replace(/\n/g, '<br>').replace(/ /g, '&nbsp;');
            if (allStackTraces) allStackTraces += '<br><br>';
            allStackTraces += `<strong>Cause ${chainLevel} Stack:</strong><br>${causeStackTrace}`;
          }
        }

        // Add single expandable section if we have any stack traces
        if (allStackTraces) {
          errorMessage += `
            <br>
            <details style="margin-top: 0px;">
              <summary style="cursor: pointer; color: #666;">Details</summary>
              <div style="font-family: monospace; font-size: 0.85em; margin-top: 8px; padding: 8px; background-color: #f8f9fa; border-radius: 4px; overflow-x: auto;">
                ${allStackTraces}
              </div>
            </details>
          `;
        }
      }

      errorAlert(errorMessage);
      // Prevent the default browser behavior (logging to console, again)
      event.preventDefault();
    });

    await loadAllTemplates();

    initAnalyticsApi(app); // init just with gu for now
    lang_init(app, handleLanguageChange, show_welcome_modal);
    show_welcome_modal();
    initCalibrationMethod();
    initDeadzoneModal(); // Initialize deadzone modal
    initDriftAnalysisModal(); // Initialize drift analysis modal

    $("input[name='displayMode']").on('change', on_stick_mode_change);

    $('#edgeModalDontShowAgain').on('change', function() {
      Storage.edgeModalDontShowAgain.set(this.checked);
    });
  }

  // Since modules are deferred, DOM might already be loaded
  if (document.readyState === 'loading') {
    window.addEventListener('DOMContentLoaded', initializeApp);
  } else {
    // DOM is already loaded, run immediately
    initializeApp();
  }

  if (!("hid" in navigator)) {
    $("#offlinebar").hide();
    $("#onlinebar").hide();
    $("#missinghid").show();
    return;
  }

  $("#offlinebar").show();
  $("#aboutdrift").show();
  updateLastConnectedInfo();
  navigator.hid.addEventListener("disconnect", handleDisconnectedDevice);
}

async function connect() {
  app.gj = crypto.randomUUID();
  initAnalyticsApi(app); // init with gu and jg

  // Initialize controller manager with translation function
  controller = initControllerManager({ handleNvStatusUpdate });
  controller.setInputHandler(handleControllerInput);
  
  // Make controller manager globally accessible for deadzone modal
  window.controllerManagerInstance = controller;

  la("begin");
  reset_circularity_mode();
  clearAllAlerts();
  await sleep(200);

  try {
    $("#btnconnect").prop("disabled", true);
    $("#connectspinner").show();
    await sleep(100);

    const supportedModels = ControllerFactory.getSupportedModels();
    const requestParams = { filters: supportedModels };
    let devices = await navigator.hid.getDevices(); // Already connected?
    if (devices.length == 0) {
      devices = await navigator.hid.requestDevice(requestParams);
    }
    if (devices.length == 0) {
      $("#btnconnect").prop("disabled", false);
      $("#connectspinner").hide();
      await disconnect();
      return;
    }

    if (devices.length > 1) { //mm: this should never happen
      infoAlert(l("Please connect only one controller at time."));
      $("#btnconnect").prop("disabled", false);
      $("#connectspinner").hide();
      await disconnect();
      return;
    }

    const [device] = devices;
    if(device.opened) {
      console.log("Device already opened, closing it before re-opening.");
      await device.close();
      await sleep(500);
    }
    await device.open();

    la("connect", {"p": device.productId, "v": device.vendorId});
    device.oninputreport = continue_connection; // continue below
  } catch(error) {
    $("#btnconnect").prop("disabled", false);
    $("#connectspinner").hide();
    await disconnect();
    throw error;
  }
}

async function continue_connection({data, device}) {
  try {
    if (!controller || controller.isConnected()) {
      device.oninputreport = null;  // this function is called repeatedly if not cleared
      return;
    }

    // Detect if the controller is connected via USB
    const reportLen = data.byteLength;
    if(reportLen != 63) {
      // throw new Error(l("Please connect the device using a USB cable."));
      infoAlert(l("The device is connected via Bluetooth. Disconnect and reconnect using a USB cable instead."));
      await disconnect();
      return;
    }

    // Helper to apply basic UI visibility based on device type
    function applyDeviceUI({ showInfo, showFinetune, showInfoTab, showQuickTests, showFourStepCalib, showQuickCalib, showCalibrationHistory }) {
      $("#infoshowall").toggle(!!showInfo);
      $("#ds5finetune").toggle(!!showFinetune);
      $("#info-tab").toggle(!!showInfoTab);
      $("#quick-tests-div").css("visibility", showQuickTests ? "visible" : "hidden");
      $("#four-step-center-calib").toggle(!!showFourStepCalib);
      $("#quick-center-calib").toggle(!!showQuickCalib);
      $("#quick-center-calib-group").toggle(!!showQuickCalib);
      $("#restore-calibration-btn").toggle(!!showCalibrationHistory);
    }

    let controllerInstance = null;
    let info = null;

    try {
      // Create controller instance using factory
      controllerInstance = ControllerFactory.createControllerInstance(device);
      controller.setControllerInstance(controllerInstance);

      info = await controllerInstance.getInfo();

      // Initialize output state for DS5 controllers
      if (controllerInstance.initializeCurrentOutputState) {
        await controllerInstance.initializeCurrentOutputState();
      }
    } catch (error) {
      const contextMessage = device 
        ? `${l("Connected invalid device")}: ${dec2hex(device.vendorId)}:${dec2hex(device.productId)}`
        : l("Failed to connect to device");
        throw new Error(contextMessage, { cause: error });
    }

    if(!info?.ok) {
      // Not connected/failed to fetch info
      if(info) console.error(JSON.stringify(info, null, 2));
      throw new Error(`${l("Connected invalid device")}: ${l("Error")}  1`, { cause: info?.error });
    }

    // Get UI configuration and device name
    const ui = ControllerFactory.getUIConfig(device.productId);
    applyDeviceUI(ui);

    // Assign input processor for stream
    console.log("Setting input report handler.");
    device.oninputreport = controller.getInputHandler();

    const deviceName = ControllerFactory.getDeviceName(device.productId);
    $("#devname").text(deviceName + " (" + dec2hex(device.vendorId) + ":" + dec2hex(device.productId) + ")");

    $("#offlinebar").hide();
    $("#onlinebar").show();
    $("#mainmenu").show();
    $("#resetBtn").show();
    $("#aboutdrift").hide();

    $("#d-nvstatus").text = l("Unknown");
    $("#d-bdaddr").text = l("Unknown");

    $('#controller-tab').tab('show');

    const numOfSticks = controllerInstance.getNumberOfSticks();
    if(numOfSticks == 2) {
      $("#stick-item-rx").show();
      $("#stick-item-ry").show();
    } else if(numOfSticks == 1) {
      $("#stick-item-rx").hide();
      $("#stick-item-ry").hide();
    } else {
      throw new Error(`Invalid number of sticks: ${numOfSticks}`);
    }

    const model = controllerInstance.getModel();

    // Save controller info to local storage
    const lastConnectedInfo = {
      deviceName: deviceName,
      timestamp: new Date().toISOString(),
      serialNumber: await controllerInstance.getSerialNumber(),
    };

    // Extract info from infoItems
    if (info.infoItems && Array.isArray(info.infoItems)) {
      for (const item of info.infoItems) {
        if (item.key === l("Board Model")) {
          lastConnectedInfo.boardModel = item.value;
        } else if (item.key === l("Color")) {
          lastConnectedInfo.color = item.value;
        }
      }
    }

    Storage.lastConnectedController.set(lastConnectedInfo);
    updateLastConnectedInfo();

    // Initialize SVG controller based on model
    await init_svg_controller(model);

    // Edge-specific: pending reboot check (from nv)
    if (model == "DS5_Edge" && info?.pending_reboot) {
      infoAlert(l("A reboot is needed to continue using this DualSense Edge. Please disconnect and reconnect your controller."));
      await disconnect();
      return;
    }

    // Render info collected from device
    render_info_to_dom(info.infoItems);

    // Render NV status
    if (info.nv) {
      render_nvstatus_to_dom(info.nv);
      // Optionally try to lock NVS if unlocked
      if (info.nv.locked === false) {
        await nvslock();
      }
    }

    // Apply disable button flags
    if (typeof info.disable_bits === 'number' && info.disable_bits) {
      app.disable_btn |= info.disable_bits;
    }
    if(app.disable_btn != 0) update_disable_btn();

    // DS4 rare notice
    if (model == "DS4" && info?.rare) {
      show_popup("Wow, this is a rare/weird controller! Please write me an email at ds4@the.al or contact me on Discord (the_al)");
    }

    // Edge onboarding modal
    if(model == "DS5_Edge") {
      show_edge_modal();
    }

    if(model == "VR2") {
      show_popup(l("<p>Support for PS VR2 controllers is <b>minimal and highly experimental</b>.</p><p>I currently don't own these controllers, so I cannot verify the calibration process myself.</p><p>If you'd like to help improve full support, you can contribute with a donation or even send the controllers for testing.</p><p>Feel free to contact me on Discord (the_al) or by email at ds4@the.al .</p><br><p>Thank you for your support!</p>"), true);
    }

    // Check for unsaved calibration changes
    if (controller.has_changes_to_write) {
      show_popup(`<p>${
        l("It appears the latest joystick calibration has not been saved.")
      }</p><p>${
        l("You should save your changes, or reboot the controller to revert back to the previous state.")
      }</p>`, true);
    }

    // Save finetune parameters for DS5 and Edge controllers
    if (model === "DS5" || model === "DS5_Edge") {
      if (!controller.has_changes_to_write) {
        const finetuneData = await controllerInstance.getInMemoryModuleData();
        const serialNumber = await controllerInstance.getSerialNumber();
        FinetuneHistory.save(finetuneData, serialNumber);
      }
    }
  } catch(err) {
    await disconnect();
    throw err;
  } finally {
    $("#btnconnect").prop("disabled", false);
    $("#connectspinner").hide();
  }
}

async function disconnect() {
  la("disconnect");
  if(!controller?.isConnected()) {
    controller = null;
    return;
  }
  app.gj = 0;
  app.disable_btn = 0;
  app.shownRangeCalibrationWarning = false;
  app.failedCalibrationDetectionsCount = 0;
  update_disable_btn();

  await controller.disconnect();
  controller = null; // Tear everything down
  close_all_modals();
  $("#offlinebar").show();
  $("#onlinebar").hide();
  $("#mainmenu").hide();
  $("#aboutdrift").show();
  updateLastConnectedInfo();
}

function updateLastConnectedInfo() {
  const $lastConnected = $("#lastConnected");
  const $infoDiv = $("#lastConnectedInfo");
  const info = Storage.lastConnectedController.get();

  if (!info) {
    console.log("No last connected info found.", $lastConnected);
    $lastConnected.hide();
    return;
  }

  try {
    const parts = [];
    if (info.color) parts.push(l(info.color));
    if (info.boardModel) parts.push(info.boardModel);
    if (info.deviceName) parts.push(info.deviceName);

    let text = parts.join(" ");
    if (info.serialNumber) {
      text += ", " + l("serial number") + " " + info.serialNumber;
    }

    $infoDiv.text(text);

    if (info.serialNumber) {
      const hasChanges = Storage.hasChangesState.get(info.serialNumber);
      const $warning = $("#lastConnectedWarning");
      $warning.toggle(hasChanges);
    }

    $lastConnected.show();
  } catch (error) {
    console.error("Error parsing last connected info:", error);
    $lastConnected.hide();
  }
}

// Wrapper function for HTML onclick handlers
function disconnectSync() {
  disconnect().catch(error => {
    throw new Error("Failed to disconnect", { cause: error });
  });
}

async function handleDisconnectedDevice(e) {
  la("disconnected");
  console.log("Disconnected: " + e.device.productName);
  await disconnect();
}

function render_nvstatus_to_dom(nv) {
  if(!nv?.status) {
    throw new Error("Invalid NVS status data", { cause: nv?.error });
  }

  switch (nv.status) {
    case 'locked':
      $("#d-nvstatus").html("<font color='green'>" + l("locked") + "</font>");
      break;
    case 'unlocked':
      $("#d-nvstatus").html("<font color='red'>" + l("unlocked") + "</font>");
      break;
    case 'pending_reboot':
      // Keep consistent styling with unknown/purple, but indicate reboot pending if possible
      const pendingTxt = nv.raw !== undefined ? ("0x" + dec2hex32(nv.raw)) : String(nv.code ?? '');
      $("#d-nvstatus").html("<font color='purple'>unk " + pendingTxt + "</font>");
      break;
    case 'unknown':
      const unknownTxt = nv.device === 'ds5' && nv.raw !== undefined ? ("0x" + dec2hex32(nv.raw)) : String(nv.code ?? '');
      $("#d-nvstatus").html("<font color='purple'>unk " + unknownTxt + "</font>");
      break;
    case 'error':
      $("#d-nvstatus").html("<font color='red'>" + l("error") + "</font>");
      break;
  }
}

async function refresh_nvstatus() {
  if (!controller.isConnected()) {
    return null;
  }

  return await controller.queryNvStatus();
}

function set_edge_progress(score) {
  $("#dsedge-progress").css({ "width": score + "%" });
}

function show_welcome_modal() {
  const already_accepted = Storage.getString("welcome_accepted");
  if(already_accepted == "1")
    return;

  bootstrap.Modal.getOrCreateInstance('#welcomeModal').show();
}

function welcome_accepted() {
  la("welcome_accepted");
  Storage.setString("welcome_accepted", "1");
  $("#welcomeModal").modal("hide");
}

async function init_svg_controller(model) {
  const svgContainer = document.getElementById('controller-svg-placeholder');

  // Determine which SVG to load based on controller model
  let svgFileName;
  if (model === 'DS4') {
    svgFileName = 'dualshock-controller.svg';
  } else if (model === 'DS5' || model === 'DS5_Edge') {
    svgFileName = 'dualsense-controller.svg';
  } else if (model === 'VR2') {
    // Disable SVG controller for VR2
    svgContainer.innerHTML = '';
    return;
  } else {
    throw new Error(`Unknown controller model: ${model}`);
  }

  let svgContent;

  // Check if we have bundled assets (production mode)
  if (window.BUNDLED_ASSETS && window.BUNDLED_ASSETS.svg && window.BUNDLED_ASSETS.svg[svgFileName]) {
    svgContent = window.BUNDLED_ASSETS.svg[svgFileName];
  } else {
    // Fallback to fetching from server (development mode)
    const response = await fetch(`assets/${svgFileName}`);
    if (!response.ok) {
      throw new Error(`Failed to load controller SVG: ${svgFileName}`);
    }
    svgContent = await response.text();
  }

  svgContainer.innerHTML = svgContent;

  // Reset trackpad bounding box so it's recalculated for the new SVG
  trackpadBbox = undefined;

  const lightBlue = '#7ecbff';
  const midBlue = '#3399cc';
  const dualshock = document.getElementById('Controller');
  set_svg_group_color(dualshock, lightBlue);

  ['Button_outlines', 'Button_outlines_behind', 'L3_outline', 'R3_outline', 'Trackpad_outline'].forEach(id => {
    const group = document.getElementById(id);
    set_svg_group_color(group, midBlue);
  });

  ['Controller_infills', 'Button_infills', 'L3_infill', 'R3_infill', 'Trackpad_infill'].forEach(id => {
    const group = document.getElementById(id);
    set_svg_group_color(group, 'white');
  });
}

/**
* Collects circularity data for both analog sticks during testing mode.
* This function tracks the maximum distance reached at each angular position
* around the stick's circular range, creating a polar coordinate map of
* stick movement capabilities.
*/
function collectCircularityData(stickStates, leftData, rightData) {
  const { left, right  } = stickStates || {};
  const MAX_N = CIRCULARITY_DATA_SIZE;

  for(const [stick, data] of [[left, leftData], [right, rightData]]) {
    if (!stick) return; // Skip if no stick changed position

    const { x, y } = stick;
    // Calculate distance from center (magnitude of stick position vector)
    const distance = Math.sqrt(x * x + y * y);
    // Convert cartesian coordinates to angular index (0 to MAX_N-1)
    // atan2 gives angle in radians, convert to array index with proper wrapping
    const angleIndex = (parseInt(Math.round(Math.atan2(y, x) * MAX_N / 2.0 / Math.PI)) + MAX_N) % MAX_N;
    // Store maximum distance reached at this angle (for circularity analysis)
    const oldValue = data[angleIndex] ?? 0;
    data[angleIndex] = Math.max(oldValue, distance);
  }
}

function clear_circularity(leftOrRight = 'both') {
  if(['left', 'both'].includes(leftOrRight)) ll_data.fill(0);
  if(['right', 'both'].includes(leftOrRight)) rr_data.fill(0);
}

function reset_circularity_mode() {
  clear_circularity();
  $("#normalMode").prop('checked', true);
  refresh_stick_pos();
}

function refresh_stick_pos() {
  if(!controller) return;

  const hasSingleStick = (controller.currentController?.getNumberOfSticks() == 1);

  const c = document.getElementById("stickCanvas");
  const ctx = c.getContext("2d");
  const sz = 60;
  const yb = 15 + sz;
  const w = c.width;
  const hb = hasSingleStick ? w / 2 : 20 + sz;
  ctx.clearRect(0, 0, c.width, c.height);

  const { left: { x: plx, y: ply }, right: { x: prx, y: pry } } = controller.button_states.sticks;

  const enable_zoom_center = center_zoom_checked();
  const enable_circ_test = circ_checked();

  // Draw left stick
  draw_stick_dial(ctx, hb, yb, sz, plx, ply, {
    circularity_data: enable_circ_test ? ll_data : null,
    enable_zoom_center,
  });

  if(!hasSingleStick) {
    // Draw right stick
    draw_stick_dial(ctx, w-hb, yb, sz, prx, pry, {
      circularity_data: enable_circ_test ? rr_data : null,
      enable_zoom_center,
    });
  }

  const precision = enable_zoom_center ? 3 : 2;
  $("#lx-lbl").text(float_to_str(plx, precision));
  $("#ly-lbl").text(float_to_str(ply, precision));
  if(!hasSingleStick) {
    $("#rx-lbl").text(float_to_str(prx, precision));
    $("#ry-lbl").text(float_to_str(pry, precision));
  }

  // Move L3 and R3 SVG elements according to stick position
  try {
    switch(controller.getModel()) {
      case "DS4":
        // These values are tuned for the SVG's coordinate system and visual effect
        const ds4_max_stick_offset = 25;
        // L3 center in SVG coordinates (from path: cx=295.63, cy=461.03)
        const ds4_l3_cx = 295.63, ds4_l3_cy = 461.03;
        // R3 center in SVG coordinates (from path: cx=662.06, cy=419.78)
        const ds4_r3_cx = 662.06, ds4_r3_cy = 419.78;

        const ds4_l3_x = ds4_l3_cx + plx * ds4_max_stick_offset;
        const ds4_l3_y = ds4_l3_cy + ply * ds4_max_stick_offset;
        const ds4_l3_group = document.querySelector('g#L3');
        ds4_l3_group?.setAttribute('transform', `translate(${ds4_l3_x - ds4_l3_cx},${ds4_l3_y - ds4_l3_cy})`);

        const ds4_r3_x = ds4_r3_cx + prx * ds4_max_stick_offset;
        const ds4_r3_y = ds4_r3_cy + pry * ds4_max_stick_offset;
        const ds4_r3_group = document.querySelector('g#R3');
        ds4_r3_group?.setAttribute('transform', `translate(${ds4_r3_x - ds4_r3_cx},${ds4_r3_y - ds4_r3_cy})`);
        break;
      case "DS5":
      case "DS5_Edge":
        // These values are tuned for the SVG's coordinate system and visual effect
        const ds5_max_stick_offset = 25;
        // L3 center in SVG coordinates (from path: cx=295.63, cy=461.03)
        const ds5_l3_cx = 295.63, ds5_l3_cy = 461.03;
        // R3 center in SVG coordinates (from path: cx=662.06, cy=419.78)
        const ds5_r3_cx = 662.06, ds5_r3_cy = 419.78;

        const ds5_l3_x = ds5_l3_cx + plx * ds5_max_stick_offset;
        const ds5_l3_y = ds5_l3_cy + ply * ds5_max_stick_offset;
        const ds5_l3_group = document.querySelector('g#L3');
        ds5_l3_group?.setAttribute('transform', `translate(${ds5_l3_x - ds5_l3_cx},${ds5_l3_y - ds5_l3_cy}) scale(0.70)`);

        const ds5_r3_x = ds5_r3_cx + prx * ds5_max_stick_offset;
        const ds5_r3_y = ds5_r3_cy + pry * ds5_max_stick_offset;
        const ds5_r3_group = document.querySelector('g#R3');
        ds5_r3_group?.setAttribute('transform', `translate(${ds5_r3_x - ds5_r3_cx},${ds5_r3_y - ds5_r3_cy}) scale(0.70)`);
        break;
      default:
        return; // Unsupported model, skip
    }
  } catch (e) {
    // Fail silently if SVG not present
  }

  const circularityCheckIcon = document.getElementById('circularityCheckIcon');
  if (!enable_circ_test) {
    circularityCheckIcon.style.display = 'none';
    return;
  }

  const ll_error = calculateCircularityError(ll_data);
  const rr_error = calculateCircularityError(rr_data);
  const isTooSmall = (ll_error && ll_error < 5 || rr_error && rr_error < 5);
  circularityCheckIcon.style.display = isTooSmall ? 'block' : 'none';
}

const circ_checked = () => $("#checkCircularityMode").is(':checked');
const center_zoom_checked = () => $("#centerZoomMode").is(':checked');

function resetStickDiagrams() {
  clear_circularity();
  refresh_stick_pos();
}

// Helper functions to switch display modes
function switchTo10xZoomMode() {
  $("#centerZoomMode").prop('checked', true);
  resetStickDiagrams();
}

function switchToRangeMode() {
  $("#checkCircularityMode").prop('checked', true);
  resetStickDiagrams();
}

const on_stick_mode_change = () => resetStickDiagrams();

const throttled_refresh_sticks = (() => {
  let delay = null;
  return function(changes) {
    if (!changes.sticks) return;
    if (delay) return;

    refresh_stick_pos();
    delay = setTimeout(() => {
      delay = null;
      refresh_stick_pos();
    }, 20);
  };
})();

const update_stick_graphics = (changes) => throttled_refresh_sticks(changes);

function update_battery_status({/* charge_level, cable_connected, is_charging, is_error, */ bat_txt, changed}) {
  if(changed) {
    $("#d-bat").html(bat_txt);
  }
}

function update_ds_button_svg(changes, BUTTON_MAP) {
  if (!changes || Object.keys(changes).length === 0) return;

  const pressedColor = '#1a237e'; // pleasing dark blue

  // Update L2/R2 analog infill
  for (const trigger of ['l2', 'r2']) {
    const key = trigger + '_analog';
    if (changes.hasOwnProperty(key)) {
      const val = changes[key];
      const t = val / 255;
      const color = lerp_color('#ffffff', pressedColor, t);
      const svg = trigger.toUpperCase() + '_infill';
      const infill = document.getElementById(svg);
      set_svg_group_color(infill, color);

      // Update percentage text
      const percentage = Math.round((val / 255) * 100);
      const percentageText = document.getElementById(trigger.toUpperCase() + '_percentage');
      if (percentageText) {
        percentageText.textContent = `${percentage} %`;
        percentageText.setAttribute('opacity', percentage > 0 ? '1' : '0');
        percentageText.setAttribute('fill', percentage < 35 ? pressedColor : 'white');
      }
    }
  }

  // Update dpad buttons
  for (const dir of ['up', 'right', 'down', 'left']) {
    if (changes.hasOwnProperty(dir)) {
      const pressed = changes[dir];
      const group = document.getElementById(dir.charAt(0).toUpperCase() + dir.slice(1) + '_infill');
      set_svg_group_color(group, pressed ? pressedColor : 'white');
    }
  }

  // Update other buttons
  for (const btn of BUTTON_MAP) {
    if (['up', 'right', 'down', 'left'].includes(btn.name)) continue; // Dpad handled above
    if (changes.hasOwnProperty(btn.name) && btn.svg) {
      const pressed = changes[btn.name];
      const group = document.getElementById(btn.svg + '_infill');
      set_svg_group_color(group, pressed ? pressedColor : 'white');
    }
  }
}

function set_svg_group_color(group, color) {
  if (group) {
    const elements = group.querySelectorAll('path,rect,circle,ellipse,line,polyline,polygon');
    elements.forEach(el => {
      // Set up a smooth transition for fill and stroke if not already set
      if (!el.style.transition) {
        el.style.transition = 'fill 0.10s, stroke 0.10s';
      }
      el.setAttribute('fill', color);
      el.setAttribute('stroke', color);
    });
  }
}

let hasActiveTouchPoints = false;
let trackpadBbox = undefined;

function update_touchpad_circles(points) {
  const hasActivePointsNow = points.some(pt => pt.active);
  if(!hasActivePointsNow && !hasActiveTouchPoints) return;

  // Find the Trackpad_infill group in the SVG
  const svg = document.getElementById('controller-svg');
  const trackpad = svg?.querySelector('g#Trackpad_infill');
  if (!trackpad) return;

  // Remove the previous touch points, if any
  trackpad.querySelectorAll('circle.ds-touch').forEach(c => c.remove());
  hasActiveTouchPoints = hasActivePointsNow;
  trackpadBbox = trackpadBbox ?? trackpad.querySelector('path')?.getBBox();

  // Draw up to 2 circles
  points.forEach((pt, idx) => {
    if (!pt.active) return;
    // Map raw x/y to SVG
    // DS4/DS5 touchpad is 1920x943 units (raw values)
    const RAW_W = 1920, RAW_H = 943;
    const pointRadius = trackpadBbox.width * 0.05;
    const cx = trackpadBbox.x + pointRadius + (pt.x / RAW_W) * (trackpadBbox.width - pointRadius*2);
    const cy = trackpadBbox.y + pointRadius + (pt.y / RAW_H) * (trackpadBbox.height - pointRadius*2);
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('class', 'ds-touch');
    circle.setAttribute('cx', cx);
    circle.setAttribute('cy', cy);
    circle.setAttribute('r', pointRadius);
    circle.setAttribute('fill', idx === 0 ? '#2196f3' : '#e91e63');
    circle.setAttribute('fill-opacity', '0.5');
    circle.setAttribute('stroke', '#3399cc');
    circle.setAttribute('stroke-width', '4');
    trackpad.appendChild(circle);
  });
}

function get_current_main_tab() {
  const mainTabs = document.getElementById('mainTabs');
  const activeBtn = mainTabs?.querySelector('.nav-link.active');
  return activeBtn?.id || 'controller-tab';
}

function get_current_test_tab() {
  const testsList = document.getElementById('tests-list');
  const activeBtn = testsList?.querySelector('.list-group-item.active');
  return activeBtn?.id || 'haptic-test-tab';
}

function detectFailedRangeCalibration(changes) {
  if (!changes.sticks || app.shownRangeCalibrationWarning) return;

  const { left, right } = changes.sticks;
  const failedCalibration = [left, right].some(({x, y}) => Math.abs(x) + Math.abs(y) == 2);
  const hasOpenModals = document.querySelectorAll('.modal.show').length > 0;

  if (failedCalibration && !app.shownRangeCalibrationWarning && !hasOpenModals) {
    app.failedCalibrationDetectionsCount++;
    if (app.failedCalibrationDetectionsCount < 5) {
      return; // require 5 consecutive detections
    }

    app.failedCalibrationModalShownCount++;
    Storage.failedCalibrationCount.set(app.failedCalibrationModalShownCount);

    app.shownRangeCalibrationWarning = true;
    if (app.failedCalibrationCount <= 6) {  // keep it from getting annoying
      show_popup(l("Range calibration appears to have failed. Please try again and make sure you rotate the sticks."));
    }
  }
}

function isRangeCalibrationVisible() {
  const modal = document.getElementById('rangeModal');
  if (!modal) return false;
  return modal.classList.contains('show');
}

// Callback function to handle UI updates after controller input processing
function handleControllerInput({ changes, inputConfig, touchPoints, batteryStatus }) {
  const { buttonMap } = inputConfig;

  // Open Quick Test modal if options button is pressed while L1 is held down
  if (changes.options && controller.button_states.l1) {
    update_ds_button_svg({ l1: false }, buttonMap); // Clear L1
    show_quick_test_modal(controller);
    return;
  }

  // Update range calibration modal stick visualization if visible
  if (isRangeCalibrationVisible() && changes.sticks) {
    collectCircularityData(changes.sticks, ll_data, rr_data);
    rangeCalibHandleControllerInput(changes);
    return;
  }

  // Handle Quick Test Modal input (can be open from any tab)
  if (isQuickTestVisible()) {
    quicktest_handle_controller_input(changes, batteryStatus);
    return;
  }

  const current_active_tab = get_current_main_tab();
  switch (current_active_tab) {
    case 'controller-tab': // Main controller tab
      collectCircularityData(changes.sticks, ll_data, rr_data);
      if(isFinetuneVisible()) {
        finetune_handle_controller_input(changes);
      } else {
        update_stick_graphics(changes);
        update_ds_button_svg(changes, buttonMap);
        update_touchpad_circles(touchPoints);
        detectFailedRangeCalibration(changes);
      }
      break;

    case 'tests-tab':
      handle_test_input();
      break;
  }

  update_battery_status(batteryStatus);
}

function handle_test_input(/* changes */) {
  const current_test_tab = get_current_test_tab();

  // Handle different test tabs
  switch (current_test_tab) {
    case 'haptic-test-tab':
      // Handle L2/R2 for haptic feedback
      controller.button_states.l2_analog || 0;
      controller.button_states.r2_analog || 0;
      break;

    // Add more test tabs here as needed
    default:
      console.log("Unknown test tab:", current_test_tab);
      break;
  }
}

function update_disable_btn() {
  const { disable_btn, last_disable_btn } = app;
  if(disable_btn == last_disable_btn)
    return;

  if(disable_btn == 0) {
    $(".ds-btn").prop("disabled", false);
    app.last_disable_btn = 0;
    return;
  }

  // Disable all buttons except Quick Test
  $(".ds-btn").not("#quick-test-btn").prop("disabled", true);

  // show only one popup
  if(disable_btn & 1 && !(last_disable_btn & 1)) {
    show_popup(l("The device appears to be a clone. All calibration functionality is disabled."));
  } else if(disable_btn & 2 && !(last_disable_btn & 2)) {
    show_popup(l("This DualSense controller has outdated firmware.") + "<br>" + l("Please update the firmware and try again."), true);
  }
  app.last_disable_btn = disable_btn;
}

async function handleLanguageChange() {
  if(!controller) return;

  const { infoItems } = await controller.getDeviceInfo();
  render_info_to_dom(infoItems);
}

function handleNvStatusUpdate(nv) {
  // Refresh NVS status display when it changes
  render_nvstatus_to_dom(nv);
}

async function flash_all_changes() {
  const isEdge = controller.getModel() == "DS5_Edge";
  const progressCallback = isEdge ? set_edge_progress : null;
  const edgeProgressModal = isEdge ? bootstrap.Modal.getOrCreateInstance('#edgeProgressModal') : null;
  edgeProgressModal?.show();

  const result = await controller.flash(progressCallback);
  edgeProgressModal?.hide();

  if (result?.success) {
    if(result.isHtml) {
      show_popup(result.message, result.isHtml);
    } else {
      successAlert(result.message);
    }
  }
}

async function reboot_controller() {
  await controller.reset();
}

async function nvsunlock() {
  await controller.nvsUnlock();
}

async function nvslock() {
  return await controller.nvsLock();
}

function close_all_modals() {
  $('.modal.show').modal('hide'); // Close any open modals
}

function render_info_to_dom(infoItems) {
  // Clear all info sections
  $("#fwinfo").html("");
  $("#fwinfoextra-hw").html("");
  $("#fwinfoextra-fw").html("");

  if (!Array.isArray(infoItems)) return;

  // Add new info items
  infoItems.forEach(({key, value, addInfoIcon, severity, isExtra, cat, copyable}) => {
    if (!key) return;

    // Compose value with optional info icon
    let valueHtml = String(value ?? "");

    // Apply severity formatting if requested
    if (severity) {
      const colors = { danger: 'red', success: 'green' };
      const color = colors[severity] || 'black';
      valueHtml = `<font color='${color}'><b>${valueHtml}</b></font>`;
    }

    if (isExtra) {
      appendInfoExtra(key, valueHtml, cat || "hw", copyable ?? false);
    } else {
      appendInfo(key, valueHtml, cat || "hw", copyable ?? false);
    }
  });
}

function copyValueToClipboard(text) {
  navigator.clipboard.writeText(text).then(function() {
    infoAlert(l("The item has been copied to the clipboard."), 2000);
  }).catch(function(err) {
    errorAlert(l("Cannot copy text to the clipboard:") + " " + str(err));
  });
}

function genCopyString(value, copyable) {
  if(!copyable)
    return '';

  const cleanStringRegex = value.match(/^[A-Za-z0-9_.-]+/);
  const escapedValue = cleanStringRegex ? cleanStringRegex[0] : "";

  return '&nbsp;<i style="cursor:pointer;" class="fa-regular fa-copy" onclick=\'copyValueToClipboard("' + escapedValue + '")\'></i>';
}

function appendInfoExtra(key, value, cat, copyable) {
  // TODO escape html
  const s = '<dt class="text-muted col-sm-4 col-md-6 col-xl-5">' + key + '</dt><dd class="col-sm-8 col-md-6 col-xl-7" style="text-align: right;">' + value + genCopyString(value, copyable) + '</dd>';
  $("#fwinfoextra-" + cat).html($("#fwinfoextra-" + cat).html() + s);
}


function appendInfo(key, value, cat, copyable) {
  // TODO escape html
  const s = '<dt class="text-muted col-6">' + key + '</dt><dd class="col-6" style="text-align: right;">' + value + genCopyString(value, copyable) + '</dd>';
  $("#fwinfo").html($("#fwinfo").html() + s);
  appendInfoExtra(key, value, cat, copyable);
}

function show_popup(text, is_html = false) {
  if(is_html) {
    $("#popupBody").html(text);
  } else {
    $("#popupBody").text(text);
  }
  bootstrap.Modal.getOrCreateInstance('#popupModal').show();
}

function show_faq_modal() {
  la("faq_modal");
  bootstrap.Modal.getOrCreateInstance('#faqModal').show();
}

function show_donate_modal() {
  la("donate_modal");
  bootstrap.Modal.getOrCreateInstance('#donateModal').show();
}

function show_edge_modal() {
  // Check if user has chosen not to show the modal again
  if (Storage.edgeModalDontShowAgain.get()) {
    return;
  }

  la("edge_modal");
  bootstrap.Modal.getOrCreateInstance('#edgeModal').show();
}

function show_info_tab() {
  la("info_modal");
  $('#info-tab').tab('show');
}

function show_circularity_warning() {
  const message = `<p>
  ${l("Sony controllers come from the factory calibrated to have an average circularity error of nearly 10 %, and this is now what games expect. Too perfect circularity can make movements and aim feel stiff and unresponsive in some games.")
  }</p><p>
  ${l("Aim for a circularity error of around 7-9 % for the best playing experience.")}`;
  
  show_popup(message, true);
}

// Alert Management Functions
let alertCounter = 0;

/**
 * Push a new alert message to the bottom of the screen
 * @param {string} message - The message to display
 * @param {string} type - Bootstrap alert type: 'primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark'
 * @param {number} duration - Auto-dismiss duration in milliseconds (0 = no auto-dismiss)
 * @param {boolean} dismissible - Whether the alert can be manually dismissed
 * @returns {string} - The ID of the created alert element
 */
function pushAlert(message, type = 'info', duration = 0, dismissible = true) {
  const alertContainer = document.getElementById('alert-container');
  if (!alertContainer) {
  console.error('Alert container not found');
  return null;
  }

  const alertId = `alert-${++alertCounter}`;
  const alertDiv = document.createElement('div');
  alertDiv.id = alertId;
  alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
  alertDiv.setAttribute('role', 'alert');
  alertDiv.innerHTML = `
    ${message}
    ${dismissible ? '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>' : ''}
  `;

  alertContainer.appendChild(alertDiv);

  if (duration > 0) {
    setTimeout(() => {
      dismissAlert(alertId);
    }, duration);
  }

  return alertId;
}

function dismissAlert(alertId) {
  const alertElement = document.getElementById(alertId);
  if (alertElement) {
    const bsAlert = new bootstrap.Alert(alertElement);
    bsAlert.close();
  }
}

function clearAllAlerts() {
  const alertContainer = document.getElementById('alert-container');
  if (alertContainer) {
    const alerts = alertContainer.querySelectorAll('.alert');
    alerts.forEach(alert => {
      const bsAlert = new bootstrap.Alert(alert);
      bsAlert.close();
    });
  }
}

function successAlert(message, duration = 1_500) {
  return pushAlert(message, 'success', duration, false);
}

function errorAlert(message, duration = 15_000) {
  return pushAlert(message, 'danger', /* duration */);
}

function infoAlert(message, duration = 5_000) {
  return pushAlert(message, 'info', duration, false);
}






// Export functions to global scope for HTML onclick handlers
window.gboot = gboot;
window.connect = connect;
window.disconnect = disconnectSync;
window.show_faq_modal = show_faq_modal;
window.show_info_tab = show_info_tab;
window.copyValueToClipboard = copyValueToClipboard;

window.calibrate_stick_centers = () => calibrate_stick_centers(
  controller,
  (success, message) => {
    if (success) {
      resetStickDiagrams();
      infoAlert(message, 2_000);
      switchTo10xZoomMode();
    }
  }
);

window.ds5_finetune = () => ds5_finetune(
  controller,
  { ll_data, rr_data, clear_circularity },
  (success) => success && switchToRangeMode()
);

window.openCalibrationHistoryModal = async () => {
  let currentFinetuneData = null;
  let controllerSerialNumber = null;
  try {
    if (controller && typeof controller.getInMemoryModuleData === 'function') {
      currentFinetuneData = await controller.getInMemoryModuleData('finetune');
    }
    if (controller && typeof controller.getDeviceInfo === 'function') {
      const info = await controller.getDeviceInfo();
      const serialNumberItem = info?.infoItems?.find(item => item.key === l("Serial Number"));
      controllerSerialNumber = serialNumberItem?.value;
    }
  } catch (error) {
    console.warn('Could not retrieve current finetune data or serial number:', error);
  }
  la("calibration_history_modal_open");
  await show_calibration_history_modal(controller, currentFinetuneData, controllerSerialNumber, (success, message) => {
    if(!message) return;
    success ? infoAlert(message) : errorAlert(message);
  });
};

window.flash_all_changes = flash_all_changes;
window.reboot_controller = reboot_controller;
window.refresh_nvstatus = refresh_nvstatus;
window.nvsunlock = nvsunlock;

// Calibration method selection
window.setCenterCalibrationMethod = (method, event) => {
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }
  app.centerCalibrationMethod = method;
  Storage.centerCalibrationMethod.set(method);
  updateCalibrationMethodUI();
  // Close the dropdown
  const dropdownButton = event?.target?.closest('.dropdown-menu')?.previousElementSibling;
  if (dropdownButton) {
    const dropdown = bootstrap.Dropdown.getInstance(dropdownButton);
    if (dropdown) dropdown.hide();
  }
};

window.executeSelectedCenterCalibration = () => {
  if (app.centerCalibrationMethod === 'quick') {
    auto_calibrate_stick_centers(
      controller,
      (success, message) => {
        if (success) {
          resetStickDiagrams();
          infoAlert(message, 2_000);
          switchTo10xZoomMode();
        }
      }
    );
  } else {
    calibrate_stick_centers(
      controller,
      (success, message) => {
        if (success) {
          resetStickDiagrams();
          infoAlert(message, 2_000);
          switchTo10xZoomMode();
        }
      }
    );
  }
};

window.setRangeCalibrationMethod = (method, event) => {
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }
  app.rangeCalibrationMethod = method;
  Storage.rangeCalibrationMethod.set(method);
  updateCalibrationMethodUI();
  // Close the dropdown
  const dropdownButton = event?.target?.closest('.dropdown-menu')?.previousElementSibling;
  if (dropdownButton) {
    const dropdown = bootstrap.Dropdown.getInstance(dropdownButton);
    if (dropdown) dropdown.hide();
  }
};

window.executeSelectedRangeCalibration = () => {
  calibrate_range(
    controller,
    { ll_data, rr_data },
    (success, message) => {
      resetStickDiagrams();
      if(message) {
        infoAlert(message, 2_000);
      }
      switchToRangeMode();
    },
    app.rangeCalibrationMethod === 'expert'
  );
};

function updateCalibrationMethodUI() {
  $('#check-quick').toggle(app.centerCalibrationMethod === 'quick');
  $('#check-four-step').toggle(app.centerCalibrationMethod === 'four-step');
  $('#check-range-normal').toggle(app.rangeCalibrationMethod === 'normal');
  $('#check-range-expert').toggle(app.rangeCalibrationMethod === 'expert');
}

function initCalibrationMethod() {
  const savedCenterMethod = Storage.centerCalibrationMethod.get();
  if (savedCenterMethod && (savedCenterMethod === 'quick' || savedCenterMethod === 'four-step')) {
    app.centerCalibrationMethod = savedCenterMethod;
  }

  const savedRangeMethod = Storage.rangeCalibrationMethod.get();
  if (savedRangeMethod && (savedRangeMethod === 'normal' || savedRangeMethod === 'expert')) {
    app.rangeCalibrationMethod = savedRangeMethod;
  }

  const savedFailedCalibrationCount = Storage.failedCalibrationCount.get();
  if (savedFailedCalibrationCount > 0) {
    app.failedCalibrationModalShownCount = savedFailedCalibrationCount;
  }

  updateCalibrationMethodUI();
}
window.nvslock = nvslock;
window.welcome_accepted = welcome_accepted;
window.show_donate_modal = show_donate_modal;
window.show_circularity_warning = show_circularity_warning;
window.show_quick_test_modal = () => {
  show_quick_test_modal(controller).catch(error => {
    throw new Error("Failed to show quick test modal", { cause: error });
  });
};

/**
 * Configure dead zone settings
 */
window.configureDeadzone = async () => {
  try {
    if (!controller || !controller.isConnected()) {
      errorAlert(l("Please connect a controller first"));
      return;
    }

    const serialNumber = await controller.currentController.getSerialNumber();
    showDeadzoneModal(serialNumber, (settings) => {
      // Update deadzone settings in controller manager immediately
      controller.deadzoneSettings = settings;
      console.log("Deadzone settings applied:", settings);
      infoAlert(l("Dead zone settings updated"), 2000);
    });
  } catch (error) {
    console.error("Failed to open deadzone configuration:", error);
    errorAlert(l("Failed to open dead zone configuration"));
  }
};

/**
 * Export all settings to a JSON file
 */
window.exportSettings = () => {
  try {
    const settings = Storage.exportAllSettings();
    
    // Create a Blob with the JSON data
    const blob = new Blob([JSON.stringify(settings, null, 2)], { type: 'application/json' });
    
    // Create a download link
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `dualshock-settings-${new Date().toISOString().split('T')[0]}.json`;
    
    // Trigger download
    document.body.appendChild(link);
    link.click();
    
    // Cleanup
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    la("export_settings");
    infoAlert(l("Settings exported successfully"), 2000);
  } catch (error) {
    console.error("Failed to export settings:", error);
    errorAlert(l("Failed to export settings"));
  }
};

/**
 * Import settings from a JSON file
 */
window.importSettings = () => {
  try {
    // Create file input element
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json,.json';
    
    input.onchange = async (event) => {
      const file = event.target.files[0];
      if (!file) return;
      
      try {
        const text = await file.text();
        const data = JSON.parse(text);
        
        // Show confirmation dialog
        const confirmed = confirm(
          l("Are you sure you want to import these settings? This will replace your current settings.") + 
          "\n\n" + 
          l("Version") + ": " + (data.version || 'Unknown') + "\n" +
          l("Export Date") + ": " + (data.exportDate ? new Date(data.exportDate).toLocaleString() : 'Unknown')
        );
        
        if (!confirmed) return;
        
        // Import settings
        const result = Storage.importSettings(data, false); // false = replace all
        
        if (result.success) {
          la("import_settings", { imported: result.imported });
          
          let message = l("Settings imported successfully") + ` (${result.imported} ${l("items")})`;
          if (result.errors.length > 0) {
            message += "\n\n" + l("Some errors occurred") + ":\n" + result.errors.slice(0, 3).join("\n");
          }
          
          alert(message);
          
          // Reload page to apply new settings
          if (confirm(l("Settings imported. Reload page to apply changes?"))) {
            window.location.reload();
          }
        } else {
          errorAlert(l("Failed to import settings") + ":\n" + result.errors.join("\n"));
        }
      } catch (error) {
        console.error("Failed to import settings:", error);
        errorAlert(l("Failed to parse settings file. Please check the file format."));
      }
    };
    
    // Trigger file selection
    input.click();
  } catch (error) {
    console.error("Failed to import settings:", error);
    errorAlert(l("Failed to import settings"));
  }
};

// Auto-initialize the application when the module loads
gboot();
//# sourceMappingURL=app.js.map
