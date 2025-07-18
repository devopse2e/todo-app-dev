#!/bin/bash

# Test debugging script
TIMESTAMP=$(date +%Y%m%d-%H%M%S)
LOG_FILE="test-debug-$TIMESTAMP.log"

echo "=== TEST DEBUG REPORT ===" > $LOG_FILE
echo "Timestamp: $(date)" >> $LOG_FILE
echo "Directory: $(pwd)" >> $LOG_FILE
echo "Node: $(node --version)" >> $LOG_FILE
echo "NPM: $(npm --version)" >> $LOG_FILE
echo "" >> $LOG_FILE

echo "=== PACKAGE.JSON SCRIPTS ===" >> $LOG_FILE
cat package.json | grep -A 10 '"scripts"' >> $LOG_FILE
echo "" >> $LOG_FILE

echo "=== TEST EXECUTION ===" >> $LOG_FILE
npm test -- --verbose --no-coverage 2>&1 | tee -a $LOG_FILE

echo "" >> $LOG_FILE
echo "=== FILES STRUCTURE ===" >> $LOG_FILE
find src -name "*.test.js" -o -name "*.spec.js" | head -20 >> $LOG_FILE

echo "Test debug report saved to: $LOG_FILE"

