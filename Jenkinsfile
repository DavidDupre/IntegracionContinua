pipeline {
    agent any 

    stages {
        // Etapa 1: Obtener el código
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/DavidDupre/IntegracionContinua'
            }
        }

        // Etapa 2: Construir imágenes Docker
        stage('Build Docker') {
            steps {
                sh 'docker-compose build'
            }
        }

        // Etapa 3: Ejecutar pruebas (necesitarás añadir tests luego)
        stage('Test') {
            steps {
                sh 'docker-compose up -d'
                sh 'docker exec tu-app-node npm test || true'
                sh 'docker-compose down'
            }
        }

        // Etapa 4: Desplegar en desarrollo (opcional)
        stage('Deploy to Dev') {
            when {
                branch 'main'
            }
            steps {
                sh 'docker-compose up -d'
            }
        }
    }

    // Post-acciones (notificaciones, limpieza)
    post {
        always {
            cleanWs()
        }
        failure {
            emailext (
                subject: '🚨 CI Falló: ${JOB_NAME}',
                body: 'Error en el build ${BUILD_NUMBER}. Revisa: ${BUILD_URL}',
                to: 'tu-email@example.com'
            )
        }
    }
}