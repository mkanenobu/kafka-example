# Kafka example

## Setup

Create docker network
```bash
docker network create kafka_example_network
```

Install dependencies

```bash
npm install
```

## Commands

Up kafka containers

```bash
docker compose up
```

Start consumer

```bash
npm run start-consumer
```

Produce message

```bash
npm run produce-message [Message]
```
