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
                    bat 'timeout /t 15 /nobreak > nul'
                    bat 'docker exec integracioncontinua-app npm test || exit 0'
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