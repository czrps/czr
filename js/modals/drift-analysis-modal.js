'use strict';

import { l } from '../translations.js';

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
export function initDriftAnalysisModal() {
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
export function showDriftAnalysisModal() {
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
