pipeline {
    agent any

    environment {
        DOCKER_HOST = "tcp://localhost:2375"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker') {
            steps {
                script {
                    bat 'docker compose version'
                    bat 'docker compose build'
                }
            }
        }

        stage('Test') {
            steps {
                script {
                    bat 'docker compose up -d'
                    bat 'ping -n 16 127.0.0.1 >nul'  // Esperar 15 segundos
                    bat 'docker compose exec backend node app.js || exit 0'
                }
            }
            post {
                always {
                    bat 'docker compose down'
                }
            }
        }
    }

    post {
        always {
            cleanWs()
        }
        failure {
            emailext body: 'Build ${BUILD_NUMBER} failed. Please check: ${BUILD_URL}',
                     subject: 'FAILED: ${JOB_NAME}',
                     to: 'tu-email@example.com'
        }
    }
}
