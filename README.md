# Proyecto Integración Continua - Entrega 1

## Contenedores Docker comunicados

### Estructura
- **mi-db**: Contenedor MySQL
- **mi-app**: Aplicación Node.js que se conecta a la DB

### Configuración técnica
```yaml
# docker-compose.yml (opcional)
version: '3'
services:
  db:
    image: mysql:5.7
    environment:
      MYSQL_ROOT_PASSWORD: password
    networks:
      - mi-red

  app:
    build: .
    networks:
      - mi-red
    depends_on:
      - db

networks:
  mi-red: