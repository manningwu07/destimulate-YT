form = document.forms[0];

document.addEventListener('DOMContentLoaded', async () => {
  // Load existing settings
  const options = await loadOptions();
  form.syncSettings.checked = options.syncSettings;
  form.videoContent.checked = options.videoContent;
  form.suggestionsFeed.checked = options.suggestionsFeed;
  form.shortsTab.checked = options.shortsTab;
  form.subscriptionsTab.checked = options.subscriptionsTab;
  form.exploreTab.checked = options.exploreTab;
  form.views.checked = options.views;
  form.subscribers.checked = options.subscribers;
  form.comments.checked = options.comments;
  form.thumbnails.value = options.thumbnails;
  form.endScreen.checked = options.endScreen;
  form.shorts.checked = options.shorts;
  form.blockOutsideVideos.checked = options.blockOutsideSubscriptions;
});

// Save on change
form.addEventListener('change', async () => {
  const status = document.getElementById('status');
  status.textContent = `⏳ Saving...`;

  await saveOptions({
    syncSettings: form.syncSettings.checked,
    videoContent: form.videoContent.checked,
    suggestionsFeed: form.suggestionsFeed.checked,
    shortsTab: form.shortsTab.checked,
    subscriptionsTab: form.subscriptionsTab.checked,
    exploreTab: form.exploreTab.checked,
    views: form.views.checked,
    subscribers: form.subscribers.checked,
    comments: form.comments.checked,
    thumbnails: form.thumbnails.value,
    endScreen: form.endScreen.checked,
    shorts: form.shorts.checked,
    blockOutsideSubscriptions: form.blockOutsideVideos.checked,
  });

  
  // Artificial delay, so the 'saving' message actually appears
  await new Promise(resolve => setTimeout(resolve, 200));
  status.textContent = `✅ Preferences Saved`;
  
});

const saveOptions = async (options) => new Promise((resolve) => {
  chrome.storage.local.set(options, resolve);
  if (options.syncSettings) {
    chrome.storage.sync.set(options, resolve);
  }
})