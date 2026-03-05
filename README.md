<img width="41" height="46" alt="image" src="https://github.com/user-attachments/assets/68dc42df-3df2-4cb3-8acb-9a9478df07f6" />Plataforma de Gestión de Pedidos y Usuarios
1. Introducción

Este proyecto implementa una plataforma de gestión de usuarios, productos y pedidos utilizando una arquitectura moderna basada en microservicios.

El sistema integra tecnologías de backend, frontend, contenedores y orquestación, permitiendo aplicar conceptos como:

Desarrollo Backend con Java y Spring Boot

Desarrollo Frontend con React

Arquitectura Hexagonal

Microservicios

GraphQL

Seguridad con JWT

Docker

Kubernetes

La plataforma permite administrar usuarios, productos y pedidos mediante una arquitectura escalable y desacoplada.

🏗 Arquitectura del Sistema

El sistema sigue una arquitectura basada en Frontend + BFF + Microservicios.


┌──────────────────────────────┐
│            Usuario           │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│        Frontend Layer        │
│                              │
│   React + TypeScript        │
│   React Router              │
└──────────────┬───────────────┘
               │ GraphQL
               ▼
┌──────────────────────────────┐
│      BFF - API Gateway       │
│                              │
│  Spring Boot + GraphQL       │
└──────────────┬───────────────┘
               │ REST
               ▼
┌──────────────────────────────────────────┐
│             Microservices                │
│                                          │
│ ┌──────────────┐  ┌──────────────┐       │
│ │ User Service │  │ Product Svc  │       │
│ │ Spring Boot  │  │ Spring Boot  │       │
│ └───────┬──────┘  └───────┬──────┘       │
│         │ REST             │ REST        │
│         ▼                  ▼             │
│           ┌──────────────┐               │
│           │ Order Svc    │               │
│           │ Spring Boot  │               │
│           └───────┬──────┘               │
└───────────────────┼──────────────────────┘
                │
                ▼
     ┌───────────────────┐
     │     PostgreSQL    │
     │    Database       │
     └───────────────────┘



Arquitectura por capas



Usuario
   |
Frontend
   |
GraphQL
   |
BFF
  / \
Usuarios  Productos
     |
   Pedidos
     |
 PostgreSQL


Distribución visual


Controller
     |
Application Service
     |
Domain
     |
Repository
     |
PostgreSQL



📐 Componentes del Sistema
🎨 Frontend

Aplicación web desarrollada con:

React

TypeScript

React Router

Hooks

Responsabilidades:

Interfaz de usuario

Gestión de navegación

Consumo de API GraphQL

Manejo de autenticación

🔗 BFF (Backend for Frontend)

Implementado con Spring Boot + GraphQL.

Responsabilidades:

Servir como capa intermedia entre frontend y microservicios

Agregar datos de múltiples servicios

Reducir llamadas desde el frontend

Centralizar lógica de acceso

⚙ Microservicios

Se implementaron tres microservicios:

Servicio de Usuarios

Permite:

Registro de usuarios

Autenticación

Gestión de roles

Servicio de Productos

Permite:

Crear productos

Listar productos

Actualizar productos

Eliminar productos

Servicio de Pedidos

Permite:

Crear pedidos

Consultar pedidos por usuario

🧱 Arquitectura Interna de los Microservicios

Cada microservicio sigue el patrón de Arquitectura Hexagonal (Ports & Adapters).


       ┌───────────────┐
       │   Controller  │
       │   REST API    │
       └───────┬───────┘
               │
               ▼
   ┌──────────────────────┐
   │   Application Layer  │
   │   Services / UseCase │
   └──────────┬───────────┘
              │
              ▼
 ┌──────────────────────────┐
 │          Domain          │
 │                          │
 │ Entities                 │
 │ Business Rules           │
 │ Value Objects            │
 └──────────┬───────────────┘
            │
            ▼
  ┌───────────────────────┐
  │    Repository Port    │
  │  (Interface)          │
  └──────────┬────────────┘
             │
             ▼
 ┌─────────────────────────┐
 │ Infrastructure Adapter  │
 │ PostgreSQL Repository   │
 └──────────┬──────────────┘
            │
            ▼
      ┌───────────┐
      │ PostgreSQL│
      └───────────┘
       

Ventajas:

Separación de responsabilidades

Código desacoplado

Mayor mantenibilidad

🔐 Seguridad

El sistema utiliza JWT (JSON Web Token) para autenticación.

Flujo de autenticación:

El usuario realiza login.

El backend valida las credenciales.

Se genera un token JWT.

El frontend guarda el token.

Cada petición protegida envía el token en el header.

Ejemplo de header:

Authorization: Bearer <token>

El frontend implementa rutas protegidas para restringir el acceso a usuarios autenticados.

🐳 Contenerización con Docker

Cada componente del sistema se empaqueta en una imagen Docker independiente.

Construcción del Backend
cd Back
docker build -t backend-gestion:latest .
Construcción del Frontend
cd Front
docker build -t front-gestion:latest .
☸ Despliegue en Kubernetes

El sistema se despliega en un cluster Kubernetes usando Docker Desktop.

1️⃣ Crear Namespace
kubectl create namespace gestiona
2️⃣ Desplegar Base de Datos
cd kubernetes
kubectl apply -f postgres.yml -n gestiona

Verificar pods:

kubectl get pods -n gestiona
3️⃣ Desplegar Backend

Construir imagen:

cd Back
docker build -t backend-gestion:latest .

Desplegar:

cd ../kubernetes
kubectl apply -f backend.yml -n gestiona
4️⃣ Desplegar Frontend

Construir imagen:

cd Front
docker build -t front-gestion:latest .

Desplegar:

cd ../kubernetes
kubectl apply -f frontend.yml -n gestiona
🌐 Acceso a la Aplicación

Para acceder localmente se usa port-forward.

kubectl port-forward svc/frontend-service 80:80 -n gestiona

Abrir en navegador:

http://localhost
🔌 Puertos Expuestos (NodePort)
Servicio	Puerto
PostgreSQL	30001
Backend API	30002
Frontend	30003
🔎 Comandos de Verificación

Ver pods:
kubectl get pods -n gestiona

Ver servicios:
kubectl get svc -n gestiona

Ver logs de un pod:
kubectl logs <nombre-pod> -n gestiona

Eliminar un pod:
kubectl delete pod <nombre-pod> -n gestiona
🎥 Checklist para la Demo

Resume

Infraestructura
 Namespace creado
 Pods ejecutándose
 Servicios activos

Backend

 Microservicio de usuarios funcionando
 Microservicio de productos funcionando
 Microservicio de pedidos funcionando

Seguridad

 Login de usuario
 Generación de JWT
 Acceso a endpoints protegidos

Frontend

 Navegación entre páginas
 Listado de productos
 Creación de pedidos

Integración
 Comunicación Frontend → BFF
 Comunicación BFF → Microservicios
 Persistencia en PostgreSQL

🛠 Tecnologías Utilizadas

Backend
Java
Spring Boot
GraphQL
Maven
Frontend
React
TypeScript
React Router

Infraestructura
Docker
Kubernetes
PostgreSQL


Autor: Isabel Táez
