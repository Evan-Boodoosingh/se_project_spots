export function setButtonText(
  button,
  isLoading,
  defaultText = "Save",
  loadingText = "Saving..."
) {
  if (isLoading) {
    button.textContent = loadingText;
    button.disabled = true;
  } else {
    button.textContent = defaultText;
    button.disabled = false;
  }
}

export function deleteButtonText(
  button,
  isLoading,
  defaultText = "Delete",
  loadingText = "Deleting..."
) {
  if (isLoading) {
    button.textContent = loadingText;
    button.disabled = true;
  } else {
    button.textContent = defaultText;
    button.disabled = false;
  }
}
// function setButtonText(button, isLoading, defaultText = "Save", loadingText = "Saving...") {
//   if (isLoading) {
//     button.textContent = loadingText;
//     // button.disabled = true;
//   } else {
//     button.textContent = defaultText;
//     // button.disabled = false;
//   }
// }

// // Utility function to set button text for loading state
// function setButtonText(button, isLoading) {
//   if (isLoading) {
//     button.textContent = "Saving...";
//   } else {
//     button.textContent = button.dataset.defaultText || "Save";
//   }
//   // Store default text if not already set
//   if (!button.dataset.defaultText) {
//     button.dataset.defaultText = button.textContent;
//   }
// }