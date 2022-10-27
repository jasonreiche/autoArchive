function gmailAutoarchive() {
  // User Variables
  var delayDays = 2; // will only impact emails more than 48h old
  var prefix = "_Lists";
  
  // Computation Variables
  var maxDate = new Date();
  maxDate.setDate(maxDate.getDate()-delayDays); // what was the date at that time?
  var threads;
  var inc = 0
  // Loop through all threads in Inbox
  while (true) {
    threads = GmailApp.getInboxThreads(inc,500);
    for (var t = 0; t < threads.length; t++) {
      // Check on last message in Thread and proceed if older than delayDays
      if (threads[t].getLastMessageDate()<maxDate) { 
        // Get all labels for the current thread
        var labels = threads[t].getLabels();
        for (var l = 0; l < labels.length; l++) {
          // Find labels that start with search keywords
          var curLabel = labels[l].getName();
          if ( curLabel.indexOf(prefix) === 0 ) { 
            // Archive threads with no updates since delayDays
            threads[t].moveToArchive();
          }
        }
      }
    }
    // Break if done, or process the next set of threads
    if (threads.length < 500) break;
    inc += 500;
  }
}
