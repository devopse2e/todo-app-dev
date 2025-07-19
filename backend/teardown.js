module.exports = async function () {
    // Add specific cleanups here, e.g., close servers or DB connections
    // Example: if (global.server) await global.server.close();
    // If no specific resources, just force exit after a short delay
    setTimeout(() => {
      process.exit(0);
    }, 1000);  // 1-second grace period for async ops
  };
  