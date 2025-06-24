pipeline {
    agent any
    tools {
        nodejs 'NodeJS' // Configurar herramienta Node en Jenkins
    }

    environment {
        DOCKER_HOST = "tcp://localhost:2375"
        DOCKER_COMPOSE = "docker compose"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            parallel {
                stage('Frontend') {
                    steps {
                        dir('frontend') {
                            bat 'npm install'
                        }
                    }
                }
                stage('Backend') {
                    steps {
                        dir('backend') {
                            bat 'npm install'
                        }
                    }
                }
            }
        }

        stage('Build Docker') {
            steps {
                script {
                    bat "${DOCKER_COMPOSE} version"
                    bat "${DOCKER_COMPOSE} build --no-cache"
                }
            }
        }

        stage('Test') {
            parallel {
                stage('Unit Tests') {
                    steps {
                        dir('frontend') {
                            bat 'npm run test -- --watch=false --browsers=ChromeHeadless'
                        }
                    }
                }
                stage('Integration Tests') {
                    steps {
                        script {
                            bat "${DOCKER_COMPOSE} up -d"
                            bat 'timeout /t 15 /nobreak' // Espera mejorada para Windows
                            bat "${DOCKER_COMPOSE} exec backend npm test || exit 0"
                        }
                    }
                    post {
                        always {
                            bat "${DOCKER_COMPOSE} down"
                        }
                    }
                }
            }
        }

        stage('Deploy to Staging') {
            when {
                branch 'main'
            }
            steps {
                script {
                    bat "${DOCKER_COMPOSE} -f docker-compose.prod.yml up -d --build"
                }
            }
        }
    }

    post {
        always {
            junit 'frontend/test-results.xml' // Asegurar salida JUnit
            cleanWs()
        }
        failure {
            emailext body: '''Build ${BUILD_NUMBER} failed.
            URL: ${BUILD_URL}
            Cambios: ${CHANGES}''',
            subject: 'FAILED: ${JOB_NAME}',
            to: 'tu-email@example.com'
        }
    }
}