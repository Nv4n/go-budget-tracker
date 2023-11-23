package dotenv

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

func GetDotEnvVar(key string) string {
	err := godotenv.Load(".env")
	if err != nil {
		log.Fatalf("Error loading .env file")
	}
	// return the env variable using os package
	return os.Getenv(key)
}
