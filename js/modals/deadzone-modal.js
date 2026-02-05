'use strict';

import { Storage } from '../storage.js';
import { l } from '../translations.js';

let deadzoneCanvas = {
  left: null,
  right: null
};

let currentSettings = null;
let controllerSerialNumber = null;
let currentStickPositions = {
  left: { x: 0, y: 0 },
  right: { x: 0, y: 0 }
};
let animationFrameId = null;

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
export function initDeadzoneModal() {
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
export function showDeadzoneModal(serialNumber, onSave = null) {
  controllerSerialNumber = serialNumber;
  
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
      
      currentStickPositions.left = { x: sticks.left.x, y: sticks.left.y };
      currentStickPositions.right = { x: sticks.right.x, y: sticks.right.y };

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

    animationFrameId = requestAnimationFrame(updateLoop);
  }

  animationFrameId = requestAnimationFrame(updateLoop);
}

/**
 * Stop real-time stick position updates
 */
function stopRealtimeUpdates() {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
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
  
  // Fine-tune data indices:
  // 0-3: LL, LT, LR, LB (left stick circularity: left, top, right, bottom)
  // 4-7: RL, RT, RR, RB (right stick circularity)
  // 8-11: LX, LY, RX, RY (stick centers)

  // For inner deadzone: Reduce center values slightly (makes center "smaller")
  // For outer deadzone: Reduce edge circularity values (makes edges "closer")

  const maxValue = 65535; // 16-bit unsigned max

  // Apply left stick deadzone
  const leftInnerScale = 1 - (deadzoneSettings.left.inner * 0.5); // 0.5 factor to avoid too aggressive changes
  const leftOuterScale = deadzoneSettings.left.outer;

  // Left circularity adjustments (indices 0-3: LL, LT, LR, LB)
  for (let i = 0; i < 4; i++) {
    const originalValue = finetuneData[i];
    // Scale outer values based on outer deadzone
    modifiedData[i] = Math.round(originalValue * leftOuterScale);
  }

  // Apply right stick deadzone
  const rightInnerScale = 1 - (deadzoneSettings.right.inner * 0.5);
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

/**
 * Apply deadzone to stick value
 * @param {number} value - Raw stick value (-1 to 1)
 * @param {number} innerDeadzone - Inner deadzone (0 to 1)
 * @param {number} outerDeadzone - Outer deadzone (0 to 1)
 * @returns {number} Adjusted value
 */
export function applyDeadzone(value, innerDeadzone, outerDeadzone) {
  const absValue = Math.abs(value);
  const sign = Math.sign(value);

  // Apply inner deadzone
  if (absValue < innerDeadzone) {
    return 0;
  }

  // Apply outer deadzone
  if (absValue > outerDeadzone) {
    return sign;
  }

  // Scale value between inner and outer deadzone
  const scaledValue = (absValue - innerDeadzone) / (outerDeadzone - innerDeadzone);
  return sign * scaledValue;
}
