

.PHONY: run


run: 
	cd client && npm install
	cd client && npm run-script build && npm start
	cd server && ./gradlew bootRun
	
	
