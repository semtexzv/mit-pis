

.PHONY: run


run: 
	cd client && npm install
	cd client && npm run-script build
	cd server && ./gradlew bootRun
	
	
