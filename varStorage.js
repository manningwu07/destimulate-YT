const defaultOptions = {
    syncSettings: true,
    videoContent: true,
    suggestionsFeed: true,
    shortsTab: true,
    subscriptionsTab: true,
    exploreTab: true,
    views: true,
    subscribers: true,
    comments: true,
    thumbnails: 'normal',
    endScreen: true,
    shorts: true,
  };


  
  const loadOptions = async () => {
    /** @type {boolean} */
    const syncSettings = (await new Promise((resolve) => {
      chrome.storage.local.get(defaultOptions, resolve);
    })).syncSettings ?? defaultOptions.syncSettings;
  
    const options = await new Promise((resolve) => {
      chrome.storage[syncSettings ? 'sync' : 'local'].get(defaultOptions, resolve);
    })
  
    return { ...defaultOptions, ...options }
  }
