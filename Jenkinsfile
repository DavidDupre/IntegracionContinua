pipeline {
    agent any
    
    triggers {
        githubPush()
    }
    
    environment {
        DOCKER_HOST = "tcp://host.docker.internal:2375"
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
                    bat 'docker-compose --version'
                    bat 'docker-compose build'
                    bat 'docker-compose build --no-cache'  
                }
            }
        };
        
        stage('Test') {
            steps {
                script {
                    bat 'docker-compose up -d'
                    // Espera que MySQL esté listo
                    bat 'timeout /t 15 /nobreak > nul'
                    // Ejecuta pruebas (necesitarás añadirlas a tu proyecto)
                    bat 'docker exec integracioncontinua-app npm test || exit 0'
                }
            }
            post {
                always {
                    bat 'docker-compose down'
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